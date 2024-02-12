import { FieldConfigProperty, PanelPlugin, SelectableValue } from '@grafana/data';
import { MetricCharacterReplacementEditor } from 'editors/MetricReplacementEditor';
import { DiagramPanel } from './DiagramPanel';
import { defaults } from './config/diagramDefaults';
import { diagramPanelChangeHandler } from './config/diagramPanelChangeHandler';
import { diagramPanelMigrationHandler } from './config/diagramPanelMigrationHandler';
import { DiagramOptions, ValueType } from './config/types';
import { CompositeMetricEditor } from './editors/CompositeMetricEditor';
import { SupportEditor } from './editors/SupportEditor';

const statSelectOptions: Array<SelectableValue<ValueType>> = [
  { label: 'mean', value: 'mean', description: 'Use the mean value of all datapoints' },
  { label: 'min', value: 'min', description: 'Use the minimum datapoint value' },
  { label: 'max', value: 'max', description: 'Use the maximum datapoint value' },
  { label: 'sum', value: 'sum', description: 'Use the summation of all datapoints' },
  { label: 'last', value: 'last', description: 'Use the last datapoint value' },
];

const createPanelPlugin = () => {
  const plugin = new PanelPlugin<DiagramOptions>(DiagramPanel)
    .setMigrationHandler(diagramPanelMigrationHandler)
    .setPanelChangeHandler(diagramPanelChangeHandler)
    // Field Configuration Options
    .useFieldConfig({
      disableStandardOptions: [
        FieldConfigProperty.Min,
        FieldConfigProperty.Max,
        FieldConfigProperty.DisplayName,
        FieldConfigProperty.Links,
        FieldConfigProperty.Color,
      ],
      useCustomConfig: (builder) => {
        builder.addSelect({
          name: 'Value by',
          path: 'valueName',
          description: 'Use this reduction function on each series to determine the value of the metric indicator',
          defaultValue: defaults.valueName,
          category: ['Indicator'],
          settings: {
            options: statSelectOptions,
          },
        });
      },
    })
    .setPanelOptions((builder) => {
      builder
        // Display Options
        .addBooleanSwitch({
          path: 'useBackground',
          name: 'Use shape background for metric indicator',
          defaultValue: defaults.useBackground,
        })
        .addTextInput({
          name: 'Diagram URL',
          path: 'contentUrl',
          description: `Get the diagram definition from a URL`,
        })
        .addTextInput({
          name: 'Diagram definition',
          path: 'content',
          description: `This area uses Viz.js syntax - https://viz-js.com/`,
          defaultValue: defaults.content,
          settings: {
            rows: 10,
            useTextarea: true,
          },
        })
        .addNumberInput({
          name: 'Minimum text node width',
          path: 'nodeSize.minWidth',
          defaultValue: defaults.nodeSize.minWidth,
          description: 'The minimum width a matched diagram text node should be',
        })
        .addNumberInput({
          name: 'Minimum text node height',
          path: 'nodeSize.minHeight',
          defaultValue: defaults.nodeSize.minHeight,
          description: 'The minimum height a matched diagram text node should be',
        })
        // Legend Options
        .addBooleanSwitch({
          name: 'Show legend',
          path: 'legend.show',
          description: 'Show the legend',
          category: ['Legend'],
          defaultValue: defaults.legend.show,
        })
        // Composites
        .addCustomEditor({
          editor: CompositeMetricEditor,
          id: 'composites',
          path: 'composites',
          name: 'Composite metrics',
          category: ['Composites'],
          description: 'Combine series into a composite metric',
        })
        // Advanced
        .addCustomEditor({
          editor: MetricCharacterReplacementEditor,
          id: 'metricCharacterReplacements',
          path: 'metricCharacterReplacements',
          name: 'Metric Character Replacements',
          category: ['Advanced'],
          description: 'Match/replace charactes in the metric name',
        });

      // Support
      builder.addCustomEditor({
        editor: SupportEditor,
        id: 'support',
        path: 'support',
        name: 'Support',
        category: ['Help'],
      });
      return builder;
    });

  return plugin;
};

export const plugin = createPanelPlugin();
