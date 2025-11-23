const SVGO = require('svgo');

module.exports = {
  // Other Webpack settings...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: {
                plugins: [
                  { removeViewBox: false },
                  { cleanupIDs: false },
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
