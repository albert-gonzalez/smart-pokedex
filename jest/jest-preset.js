const reactNativePreset = require("react-native/jest-preset");

module.exports = Object.assign({}, reactNativePreset, {
  setupFiles: [require.resolve("./save-promise.js")]
    .concat(reactNativePreset.setupFiles)
    .concat([require.resolve("./restore-promise.js")]),
});

// See https://github.com/callstack/react-native-testing-library/issues/379#issuecomment-714341282
