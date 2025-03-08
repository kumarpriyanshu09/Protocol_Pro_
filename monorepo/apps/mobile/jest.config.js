module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (if you're using them in your project)
    '^ui(.*)$': '<rootDir>/../../packages/ui/src$1',
    '^store(.*)$': '<rootDir>/../../packages/store/src$1',
    '^core(.*)$': '<rootDir>/../../packages/core/src$1',
    '^api(.*)$': '<rootDir>/../../packages/api/src$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.expo/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
  ],
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
}; 