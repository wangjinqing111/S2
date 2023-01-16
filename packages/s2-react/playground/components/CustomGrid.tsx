/* eslint-disable no-console */
import type { S2DataConfig, SpreadSheet, ThemeCfg } from '@antv/s2';
import {
  customColGridFields,
  customRowGridFields,
} from '@antv/s2/__tests__/data/custom-grid-fields';
import { CustomGridData } from '@antv/s2/__tests__/data/data-custom-grid';
import { Radio, Space, Switch } from 'antd';
import React from 'react';
import {
  SheetComponent,
  type SheetComponentOptions,
  type SheetComponentsProps,
} from '../../src';
import { meta } from '../../__tests__/data/mock-dataset.json';
import { onSheetMounted } from '../utils';
import { ResizeConfig } from './ResizeConfig';

export const customRowGridOptions: SheetComponentOptions = {
  width: 1000,
  height: 480,
  hierarchyType: 'grid',
  cornerText: '自定义角头标题',
};

/**
 * 平铺模式-自定义行头
 */
export const pivotSheetCustomRowGridDataCfg: S2DataConfig = {
  data: CustomGridData,
  meta: [
    ...meta,
    {
      field: 'a-1',
      name: '层级1',
    },
    {
      field: 'a-1-1',
      name: '层级2',
    },

    {
      field: 'measure-1',
      name: '层级3',
    },
  ],
  fields: customRowGridFields,
};

/**
 * 平铺模式-自定义列头
 */
export const pivotSheetCustomColGridDataCfg: S2DataConfig = {
  data: CustomGridData,
  meta: [
    ...meta,
    {
      field: 'a-1',
      name: '层级1',
    },
    {
      field: 'a-1-1',
      name: '层级2',
    },
  ],
  fields: customColGridFields,
};

enum CustomType {
  Row = 'row',
  Col = 'col',
  All = 'all',
}

type CustomGridProps = Partial<SheetComponentsProps>;

export const CustomGrid = React.forwardRef<SpreadSheet, CustomGridProps>(
  (props, ref) => {
    const [customType, setCustomType] = React.useState<CustomType>(
      (localStorage.getItem('debugCustomType') as unknown as CustomType) ||
        CustomType.Row,
    );
    const [options, setOptions] = React.useState<SheetComponentOptions>({
      ...customRowGridOptions,
      hierarchyType: 'grid',
    });
    const [themeCfg, setThemeCfg] = React.useState<ThemeCfg>({
      name: 'default',
    });

    const logHandler =
      (name: string) =>
      (...args: unknown[]) => {
        console.log(name, ...args);
      };

    const dataCfg =
      customType === CustomType.Row
        ? pivotSheetCustomRowGridDataCfg
        : pivotSheetCustomColGridDataCfg;

    return (
      <>
        <Space style={{ marginBottom: 20 }}>
          <Radio.Group
            value={customType}
            onChange={(e) => {
              setCustomType(e.target.value);
            }}
          >
            <Radio.Button value={CustomType.Row}>自定义行头</Radio.Button>
            <Radio.Button value={CustomType.Col}>自定义列头</Radio.Button>
            <Radio.Button value={CustomType.All} disabled>
              TODO: 自定义行头和列头
            </Radio.Button>
          </Radio.Group>
          <Switch
            checkedChildren="树状模式"
            unCheckedChildren="平铺模式"
            checked={options.hierarchyType === 'tree'}
            onChange={(checked) => {
              setOptions({
                hierarchyType: checked ? 'tree' : 'grid',
              });
            }}
          />
        </Space>
        <Space style={{ marginBottom: 20 }}>
          <ResizeConfig
            options={options}
            setOptions={setOptions}
            setThemeCfg={setThemeCfg}
          />
        </Space>

        <SheetComponent
          {...props}
          dataCfg={dataCfg}
          options={options}
          themeCfg={themeCfg}
          ref={ref}
          onMounted={onSheetMounted}
          onLayoutResize={logHandler('onLayoutResize')}
        />
      </>
    );
  },
);