import { defineConfig } from 'father';
import path from 'path';

export default (name: string) => {
  return defineConfig({
    sourcemap: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    esm: {
      output: 'esm',
    },
    cjs: {
      output: 'lib',
    },
    umd: {
      alias: {
        '@antv/s2': path.resolve(__dirname, 'packages/s2-core'),
        '@antv/s2/esm/shared': path.resolve(
          __dirname,
          'packages/s2-core/src/shared',
        ),
      },
      name,
      output: 'dist',
      externals: {
        '@antv/s2': 'S2',
        antd: 'antd',
        'ant-design-vue': 'antd',
        react: 'React',
        'react-dom': 'ReactDOM',
        vue: 'Vue',
      },
    },
  });
};
