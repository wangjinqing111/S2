import {
  PivotFacet,
  PivotSheet,
  setupDataConfig,
  setupOptions,
  type S2DataConfig,
  type S2Options,
} from '@antv/s2';
import { DEFAULT_OPTIONS, FIXED_DATA_CONFIG, FIXED_OPTIONS } from './constant';
import { PivotChartFacet } from './facet/pivot-chart-facet';
import { getCustomTheme } from './utils/theme';

export * from './interface';

export class PivotChart extends PivotSheet {
  protected override setupDataConfig(dataCfg: S2DataConfig): void {
    this.dataCfg = setupDataConfig(dataCfg, FIXED_DATA_CONFIG);
  }

  protected override setupOptions(options: S2Options | null) {
    this.options = setupOptions(DEFAULT_OPTIONS, options, FIXED_OPTIONS);
  }

  protected override initTheme() {
    this.setThemeCfg(
      {
        name: 'default',
      },
      getCustomTheme,
    );
  }

  protected override buildFacet(): void {
    super.buildFacet(
      this.isCustomRowFields() || this.isCustomColumnFields()
        ? PivotFacet
        : PivotChartFacet,
    );
  }
}
