// jest.config.js
export default {
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  // testEnvironment: 'jest-fixed-dom',
  testEnvironment: "jsdom",
  // testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
