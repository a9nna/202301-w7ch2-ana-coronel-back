/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/index.tsx",
    "!src/react-app-env.d.ts",
    "!src/setupTests.ts",
    "!src/server/index.ts",
    "!src/server/startServer.ts",
    "!src/loadEnvironment.ts",
  ],
};
