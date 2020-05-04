module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: ['last 100 version', 'ios 7'],
    },
    'postcss-pxtorem': {
      rootValue: 75,
      propList: ['*'],
    },
  },
};
