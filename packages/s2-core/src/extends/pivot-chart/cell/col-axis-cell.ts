import { Group } from '@antv/g';
import { corelib, renderToMountedElement, type G2Spec } from '@antv/g2';
import {
  CellBorderPosition,
  CellClipBox,
  CellType,
  ColCell,
  getOrCreateResizeAreaGroupById,
} from '@antv/s2';
import { AxisCellType, KEY_GROUP_COL_AXIS_RESIZE_AREA } from '../constant';
import { getAxisXOptions, getAxisYOptions } from '../utils/chart-options';
import { waitForCellMounted } from '../utils/schedule';

export class ColAxisCell extends ColCell {
  axisShape: Group;

  public get cellType() {
    return AxisCellType.ROW_AXIS_CELL as unknown as CellType;
  }

  protected getBorderPositions(): CellBorderPosition[] {
    return [CellBorderPosition.BOTTOM, CellBorderPosition.RIGHT];
  }

  protected isBolderText(): boolean {
    return false;
  }

  protected initCell(): void {
    this.drawBackgroundShape();
    this.drawInteractiveBgShape();
    this.drawInteractiveBorderShape();
    this.drawAxisShape();
    this.drawBorders();
    this.drawResizeArea();
    // this.update();
  }

  protected getColResizeArea() {
    return getOrCreateResizeAreaGroupById(
      this.spreadsheet,
      KEY_GROUP_COL_AXIS_RESIZE_AREA,
    );
  }

  protected isCrossColumnLeafNode() {
    return false;
  }

  getChartOptions(): G2Spec {
    const chartOptions = {
      ...this.getBBoxByType(CellClipBox.PADDING_BOX),
      ...(this.spreadsheet.isValueInCols()
        ? getAxisYOptions(this.meta, this.spreadsheet)
        : getAxisXOptions(this.meta, this.spreadsheet)),
      coordinate: {
        transform: this.spreadsheet.isValueInCols()
          ? [{ type: 'transpose' }]
          : undefined,
      },
      labelAutoRotate: false,
      labelAlign: 'horizontal',
    } as G2Spec;

    return chartOptions;
  }

  drawAxisShape() {
    const chartOptions = this.getChartOptions();

    this.axisShape = this.appendChild(new Group({}));

    // delay 到实例被挂载到 parent 后，再渲染 chart
    waitForCellMounted(() => {
      if (this.destroyed) {
        return;
      }

      // https://g2.antv.antgroup.com/manual/extra-topics/bundle#g2corelib
      renderToMountedElement(chartOptions, {
        group: this.axisShape,
        library: corelib(),
      });
    });
  }
}