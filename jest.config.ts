export default {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        ".+\\.ts$": "ts-jest",
    },

    roots: ["<rootDir>/tests"],

    // Configurações de cobertura de código.
    collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
};
