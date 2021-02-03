module.exports = {
  rootDir: 'src/',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
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
    '!**/store.js',
    '!**/*.mock.js',
    '!**/index.js',
  ],
}
