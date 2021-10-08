module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["./setupTests.ts", "jest-extended"],
  globalTeardown: "./test-teardown-globals.js",
};
