module.exports = {
  rootDir: '.',
  moduleNameMapper: {
    '^@@/(?!node_modules)(.*)$': '<rootDir>/$1',
    '^~~/(?!node_modules)(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)': '<rootDir>/src/application/$1',
    '^@shared/(.*)': '<rootDir>/src/shared/$1',
    '^@ui/(.*)': '<rootDir>/src/ui/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/ui/components/**/*.vue',
    '<rootDir>/ui/pages/**/*.vue',
    '<rootDir>/application/**/*.js',
    // '!**/store.js',
    '!**/*.mock.js',
    '!**/index.js',
  ],
}
