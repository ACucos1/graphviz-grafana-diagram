import { LegendDisplayMode } from '@grafana/ui';
import { DiagramOptions, LegendOptions } from 'config/types';

export const defaultLegendOptions: LegendOptions = {
  show: false,
  stats: ['mean', 'last', 'min', 'max', 'sum'],
  asTable: true,
  hideEmpty: false,
  hideZero: false,
  placement: 'bottom',
  displayMode: LegendDisplayMode.Table,
  sortBy: 'last',
  sortDesc: true,
  gradient: {
    enabled: true,
    show: true,
  },
};

export const defaults: DiagramOptions = {
  pluginVersion: '',
  nodeSize: { minWidth: 30, minHeight: 30 },
  composites: [],
  metricCharacterReplacements: [],
  style: '',
  legend: defaultLegendOptions,
  maxWidth: true,
  moddedSeriesVal: 0,
  valueName: 'last',
  content: `digraph { a -> b }`,
  mode: 'content', //allowed values: 'content' and 'url'
  useBasicAuth: false,
  authUsername: '',
  authPassword: '',
  useBackground: false,
};
