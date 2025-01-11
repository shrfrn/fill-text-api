export default {
  verbose: true,
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './test-reports',
      filename: 'test-report.html',
      openReport: false,
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  watchPathIgnorePatterns: ['node_modules'],
  testMatch: ['**/test/**/*.test.js'],
  watchIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/build/',
    '<rootDir>/coverage/',
    '<rootDir>/test-reports/'
  ]
}; 