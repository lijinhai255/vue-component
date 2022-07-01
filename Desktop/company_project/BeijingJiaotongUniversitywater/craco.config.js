const CracoLessPlugin = require('craco-less');
const CracoAlias = require('craco-alias');


module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#005BAC',
              '@menuDarkColor': '#FFFFFF',
            }, // 修改这里的颜色即可
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './tsconfig.path.json',
      },
    },
  ],
};
