const error = 2;

const commitlintConfig = {
  extends: [
    "@commitlint/config-conventional"
  ],

  rules: {
    "subject-case": [
      error,
      "always",
      "sentence-case"
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
        "revert",
        "style",
        "test",
        "workflow"
      ]
    ]
  }
  // TODO: configure to match commit style
};

module.exports = commitlintConfig;
