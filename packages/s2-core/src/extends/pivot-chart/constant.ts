import type { G2Spec } from '@antv/g2';
import { LayoutWidthType, type S2DataConfig, type S2Options } from '@antv/s2';
import { ChartDataCell } from './cell/chart-data-cell';
import type { Coordinate } from './interface';

export const FIXED_DATA_CONFIG: Partial<S2DataConfig> = {
  fields: {
    customValueOrder: null,
  },
};

export const DEFAULT_OPTIONS: S2Options = {
  dataCell: (viewMeta, spreadsheet) => new ChartDataCell(viewMeta, spreadsheet),
};

export const FIXED_OPTIONS: S2Options = {
  hierarchyType: 'grid',

  style: {
    layoutWidthType: LayoutWidthType.ColAdaptive,

    rowCell: {
      wordWrap: false,
      maxLines: 1,
    },
    colCell: {
      wordWrap: false,
      maxLines: 1,
      hideValue: false,
    },
    dataCell: {
      wordWrap: false,
      maxLines: 1,
    },
  },
};

export const DEFAULT_MEASURE_SIZE = 200;
export const DEFAULT_ROW_AXIS_SIZE = 100;
export const DEFAULT_COL_AXIS_SIZE = 50;
export const DEFAULT_DIMENSION_SIZE = 30;

export const DEFAULT_G2_SPEC: G2Spec = {
  autoFit: true,
  animate: false,
};

export enum AxisCellType {
  ROW_AXIS_CELL = 'rowAxisCell',
  COL_AXIS_CELL = 'colAxisCell',
  CORNER_AXIS_CELL = 'cornerAxisCell',
}

export const SUPPORT_CHART: { [key in Coordinate]: string[] } = {
  cartesian: ['interval'],
  polar: [],
};

/**
 * row axis
 */
export const KEY_GROUP_ROW_AXIS_SCROLL = 'rowAxisScrollGroup';
export const KEY_GROUP_ROW_AXIS_FROZEN = 'rowAxisHeaderFrozenGroup';
export const KEY_GROUP_ROW_AXIS_HEADER_FROZEN_TRAILING =
  'rowAxisHeaderFrozenTrailingGroup';
export const KEY_GROUP_ROW_AXIS_RESIZE_AREA = 'rowAxisHeaderResizeArea';

/**
 * column axis
 */
export const KEY_GROUP_COL_AXIS_SCROLL = 'colAxisScrollGroup';
export const KEY_GROUP_COL_AXIS_FROZEN = 'colAxisFrozenGroup';
export const KEY_GROUP_COL_AXIS_FROZEN_TRAILING = 'colAxisFrozenTrailingGroup';
export const KEY_GROUP_COL_AXIS_RESIZE_AREA = 'colAxisHeaderResizeArea';

export const PLACEHOLDER_FIELD = '$$placeholder$$';