/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
    setupFilesAfterEnv: ['./jest.setup.ts'],

  moduleNameMapper: {
    '\\.svg$': './__mocks__/svgMock.ts',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  }
    
};
