const error = 2;

const commitlintConfig = {
  extends: [
    "@commitlint/config-conventional"
  ],

  rules: {
    "scope-enum": [
      error,
      "always",

      [
        "changelog",
        "code-of-conduct",
        "commitlint",
        "contributing",
        "dependencies",
        "editors",
        "error-handler",
        "input",
        "license",
        "lint",
        "main",
        "npm",
        "readme",
        "repo",
        "run",
        "types"
      ]
    ],

    "type-enum": [
      error,
      "always",

      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "release",
        "revert",
        "style",
        "test",
        "workflow"
      ]
    ]
  }
};

module.exports = commitlintConfig;
