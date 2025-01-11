export default {
  verbose: true,
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Test Report',
      outputPath: './test-reports/test-report.html',
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
}; 