export default {
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'Test Report',
      includeFailureMsg: true,
      includeSuiteFailure: true,
      styleOverridePath: './custom-style.css'  // Optional
    }]
  ]
} 