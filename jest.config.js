module.exports = {
  preset: "./jest/jest-preset.js",
  setupFiles: [
    "./jest/setup.js"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest/assetsTransformer.js",
  },
  testEnvironment: "jsdom",
  roots: ["src"],
};
