/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],

  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  }
  
};
