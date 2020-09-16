const tsconfig = require("./tsconfig.json");

const fromPairs = pairs =>
  pairs.reduce((res, [key, value]) => ({ ...res, [key]: value }), {});

const createJestModuleMapsForTesting = () => {
  return fromPairs(
    Object.entries(tsconfig.compilerOptions.paths).map(([k, [v]]) => [
      `^${k.replace(/\*/, "(.*)")}`,
      `<rootDir>/src/${v.replace(/\*/, "$1")}`
    ])
  );
};

const moduleNameMapper = createJestModuleMapsForTesting();

module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/test"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
      diagnostics: false
    }
  },
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper,
  collectCoverageFrom: [
    "!**/node_modules/**",
    "!**/errors/**",
    "!**/coverage/**",
    "!**/test/**",
    "**/*.{js,jsx,ts, tsx}"
  ],
  coverageDirectory: "./coverage/"
};
