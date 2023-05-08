// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  verbose: true,
  testMatch: [
      "**/?(*.)+(spec|test).[jt]s?(x)",
  ],
  testEnvironment: "node",
  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
};
