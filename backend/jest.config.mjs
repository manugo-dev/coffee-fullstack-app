export default {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: {
    "^~prisma/client$": "<rootDir>/../prisma/generated/client",
    "^prisma.config$": "<rootDir>/../prisma.config",
  },
  collectCoverageFrom: [
    "**/*.ts",
    "!**/node_modules/**",
    "!**/*.module.ts",
    "!**/main.ts",
    "!**/dto/index.ts",
    "!**/prisma/prisma.service.ts",
  ],
  coverageDirectory: "../coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: "node",
};
