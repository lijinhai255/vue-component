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
              '@primary-color': '#09C199',
              '@border-radius-base': '4px',
              '@menu-dark-bg': '#242424',
              '@menu-dark-inline-submenu-bg': '#242424',
              '@menuDarkColor': '#242424',
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
