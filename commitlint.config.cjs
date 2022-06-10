const error = 2;

const commitlintConfig = {
  extends: [
    "@commitlint/config-conventional"
  ],

  rules: {
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
