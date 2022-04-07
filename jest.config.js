module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  preset: "@vue/cli-plugin-unit-jest",
  transform: { ".*\\.(vue)$": "vue-jest" },
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,vue}"],
};
