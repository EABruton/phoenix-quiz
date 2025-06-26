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
    "^.+\\.tsx?$": [
      "ts-jest",
      {
	diagnostics: {
	  ignoreCodes: [1343, 2339]
	},
	astTransformers: {
	  before: [
	    {
	      path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
	      // this is required in order for jest not to get angry at 'import.meta' is not defined
	      options: { metaObjectReplacement: { env: { VITE_API_BASE_URL: 'https://www.url.com' }} }
	    }
	  ]
	}
      }
    ]
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  preset: 'ts-jest/presets/default-esm'
};
