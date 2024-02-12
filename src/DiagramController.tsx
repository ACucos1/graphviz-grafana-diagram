import { css } from '@emotion/css';
import { AbsoluteTimeRange, FieldConfigSource, GrafanaTheme2, InterpolateFunction, TimeZone } from '@grafana/data';
import { CustomScrollbar, VizLegend, VizLegendItem, stylesFactory } from '@grafana/ui';
import { instance as viz_instance } from '@viz-js/viz';
import DiagramErrorBoundary from 'DiagramErrorBoundary';
import React from 'react';
import svgPanZoom from 'svg-pan-zoom';
import { DiagramOptions, DiagramSeriesModel, DiagramSeriesValue } from './config/types';

export interface DiagramPanelControllerProps {
  theme: GrafanaTheme2;
  id: number;
  width: number;
  height: number;
  options: DiagramOptions;
  fieldConfig: FieldConfigSource;
  data: DiagramSeriesModel[];
  timeZone: TimeZone;
  replaceVariables: InterpolateFunction;
  onOptionsChange: (options: DiagramOptions) => void;
  onChangeTimeRange: (timeRange: AbsoluteTimeRange) => void;
}

interface DiagramPanelControllerState {
  diagramContainer?: string;
  wrapper?: string;
  legendContainer?: string;
}

const getDiagramWithLegendStyles = stylesFactory(({ options }: DiagramPanelControllerProps) => ({
  wrapper: css`
    display: flex;
    flex-direction: ${options.legend.placement === 'bottom' ? 'column' : 'row'};
    height: 100%;
  `,
  diagramContainer: css`
    min-height: 65%;
    flex-grow: 1;
    overflow: scroll;
  `,
  legendContainer: css`
    padding: 10px 0;
    max-height: ${options.legend.placement === 'bottom' ? '35%' : 'none'};
  `,
}));

export class DiagramPanelController extends React.Component<DiagramPanelControllerProps, DiagramPanelControllerState> {
  diagramRef!: HTMLDivElement;
  bindFunctions?: Function;

  constructor(props: DiagramPanelControllerProps) {
    super(props);
    this.onToggleSort = this.onToggleSort.bind(this);
    this.setDiagramRef = this.setDiagramRef.bind(this);
    this.renderCallback = this.renderCallback.bind(this);
  }

  static getDerivedStateFromProps(props: DiagramPanelControllerProps, state: DiagramPanelControllerState) {
    const { diagramContainer, wrapper, legendContainer } = getDiagramWithLegendStyles(props);
    if (!state) {
      return {
        diagramContainer,
        wrapper,
        legendContainer,
      };
    } else {
      return null;
    }
  }

  setDiagramRef(element: HTMLDivElement) {
    this.diagramRef = element;
  }

  componentDidMount() {
    this.initVizGraph();
  }

  componentDidUpdate(prevProps: DiagramPanelControllerProps) {
    if (
      prevProps.options !== this.props.options ||
      prevProps.fieldConfig !== this.props.fieldConfig ||
      prevProps.theme !== this.props.theme ||
      prevProps.data !== this.props.data
    ) {
      this.initVizGraph();
    }
  }

  async getRemoteDiagramDefinition(url: string) {
    const response = await fetch(this.props.replaceVariables(url));
    return await response.text();
  }

  loadDiagramDefinition() {
    if (this.props.options.contentUrl) {
      return this.getRemoteDiagramDefinition(this.props.options.contentUrl);
    } else {
      return Promise.resolve(this.props.options.content);
    }
  }

  initVizGraph() {
    viz_instance().then((viz) => {
      if (this.diagramRef) {
        if (document.querySelector('#graph') == null) {
          this.loadDiagramDefinition().then((diagramDefinition) => {
            try {
              const graph = viz.renderSVGElement(diagramDefinition);
              graph.id = 'graph';
              this.diagramRef.appendChild(graph);
              svgPanZoom('#graph', {
                zoomEnabled: true,
                controlIconsEnabled: true,
              });
            } catch (err) {
              console.log(err);
              this.diagramRef.innerHTML = `<div><p>Error rendering diagram. Check the diagram definition</p><p>${err}</p></div>`;
            }
          });
        }
      }
    });
  }

  onToggleSort(sortBy: string) {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      legend: {
        ...options.legend,
        sortBy,
        sortDesc: sortBy === options.legend.sortBy ? !options.legend.sortDesc : false,
      },
    });
  }

  renderCallback(svgCode: string, bindFunctions: any) {
    if (this && bindFunctions) {
      console.log('binding diagram functions');
      this.bindFunctions = bindFunctions;
    }
  }

  legendStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  };

  shouldHideLegendItem = (data: DiagramSeriesValue[][], hideEmpty = false, hideZero = false) => {
    const isZeroOnlySeries = data.reduce((acc, current) => acc + (current[1] || 0), 0) === 0;
    const isNullOnlySeries = !data.reduce((acc, current) => acc && current[1] !== null, true);

    return (hideEmpty && isNullOnlySeries) || (hideZero && isZeroOnlySeries);
  };

  getLegendItems = () => {
    return this.props.data.reduce<VizLegendItem[]>((acc, s) => {
      return this.shouldHideLegendItem(s.data, this.props.options.legend.hideEmpty, this.props.options.legend.hideZero)
        ? acc
        : acc.concat([
            {
              label: s.label,
              color: '',
              disabled: !s.isVisible,
              yAxis: 0,
              getDisplayValues: () => {
                return s.info || [];
              },
            },
          ]);
    }, []);
  };

  render() {
    return (
      <div className={`diagram-container diagram-container-${this.props.id}` && this.state.wrapper}>
        <div
          ref={this.setDiagramRef}
          className={`diagram diagram-${this.props.id}` && this.state.diagramContainer}
        ></div>
        {this.props.options.legend.show && (
          <div className={this.state.legendContainer}>
            <CustomScrollbar hideHorizontalTrack>
              <DiagramErrorBoundary fallback="Error rendering Legend">
                <VizLegend
                  items={this.getLegendItems()}
                  displayMode={this.props.options.legend.displayMode}
                  placement={this.props.options.legend.placement}
                  sortBy={this.props.options.legend.sortBy}
                  sortDesc={this.props.options.legend.sortDesc}
                  onLabelClick={(item, event) => {}}
                  onToggleSort={this.onToggleSort}
                />
              </DiagramErrorBoundary>
            </CustomScrollbar>
          </div>
        )}
      </div>
    );
  }
}
