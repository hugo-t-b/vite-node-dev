# Contributing guidelines

We would love for you to contribute to vite-node-dev and help make it even better than it is today! As a contributor, here are the guidelines we would like you to follow:

* [Code of Conduct](#code-of-conduct)
* [Questions and Problems](#questions-and-problems)
* [Bugs](#bugs)
* [Feature Requests](#feature-requests)
  * [Major Features](#major-features)
  * [Minor Features](#minor-features)
* [Submissions](#submissions)
  * [Issues](#issues)
  * [Pull Requests](#pull-requests)
* [Coding Rules](#coding-rules)
* [Commit Message Format](#commit-message-format)

## Code of Conduct

Help us keep vite-node-dev open and inclusive. Please read and follow our [Code of Conduct](https://github.com/hugo-t-b/vite-node-dev/blob/main/CODE_OF_CONDUCT.md).

## Questions and Problems

Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. To save your and our time, we will systematically close all issues that are requests for general support.

## Bugs

If you find a bug in the source code, you can help us by [submitting an issue](#issues) to our [GitHub Repository](https://github.com/hugo-t-b/vite-node-dev). Even better, you can [submit a Pull Request](#pull-requests) with a fix.

## Feature Requests

You can request a new feature by [submitting an issue](#issues) to our [GitHub Repository](https://github.com/hugo-t-b/vite-node-dev). If you would like to implement a new feature, please consider the size of the change in order to determine the right steps to proceed.

### Major Features

For a Major Feature, first open an issue and outline your proposal so that it can be discussed. This process allows us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.

**Note**: Adding a new topic to the documentation, or significantly re-writing a topic, counts as a major feature.

### Minor Features

Minor Features can be crafted and directly [submitted as a Pull Request](#pull-requests).

## Submissions

### Issues

Before you submit an issue, please search the issue tracker. An issue for your problem might already exist and the discussion might inform you of workarounds readily available.

### Pull Requests

Before you submit your Pull Request (PR) consider the following:

1. Search [GitHub](https://github.com/hugo-t-b/vite-node-dev/pulls) for an open or closed PR that relates to your submission. You don't want to duplicate existing efforts.

2. [Fork](https://github.com/hugo-t-b/vite-node-dev/fork) the repository.

3. Make your changes in a new git branch:

    ```bash
    git checkout -b my-fix-branch main
    ```

4. Follow our [Coding Rules](#coding-rules).

5. Ensure that the test suite and linter run successfully.

6. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit-message-format).

7. Push your branch to GitHub:

    ```
    git push origin my-fix-branch
    ```

8. In GitHub, send a pull request to `vite-node-dev:main`.

#### Addressing review feedback

If we ask for changes via code reviews then:

1. Make the required updates to the code.

2. Re-run the test suite and linter and ensure that they run successfully.

3. Create a fixup commit and push to your GitHub repository (this will update your Pull Request):

    ```bash
    git commit --all --fixup HEAD
    git push
    ```

If a reviewer suggests changes to a commit message:

1. Check out your branch.

2. To modify the most recent commit message, use `git commit --ammend`. Otherwise use `git rebase`.

3. Push to your GitHub repository:

    ```bash
    git push --force-with-lease
    ```

That's it! Thank you for your contribution!

We reserve the right not to accept pull requests from community members who haven't been good citizens of the community. Such behavior includes not following our [Code of Conduct](https://github.com/hugo-t-b/vite-node-dev/blob/main/CODE_OF_CONDUCT.md) and applies within or outside of vite-node-dev managed channels.

## Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features must be tested by one or more unit tests.

* All command line options must be documented.

* Follow the [ESLint](https://eslint.org/) rules. To fix auto-fixable linting errors, run:

    ```bash
    pnpm lint -- --fix
    ```

## Commit Message Format

We have very precise rules over how our Git commit messages must be formatted, which leads to an easier to read commit history. Many of these rules are enforced by [commitlint](https://commitlint.js.org/).

A commit message must have only one line and should be under 75 characters in length. It should be in the following format:

```
<type>(<scope>)<breaking>: <Summary of changes>
```

### Type

Must be one of the following:

* **`build`**: Changes that affect the build system or linter
* **`chore`**: Repetitive tasks (e.g. upgrading dependencies)
* **`ci`**: Changes to our CI configuration files and scripts (e.g. GitHub Actions, commitlint)
* **`docs`**: Documentation only changes
* **`feat`**: Adding a feature
* **`fix`**: Fixing a bug
* **`perf`**: Improving performance
* **`refactor`**: A code change that neither fixes a bug nor adds a feature
* **`release`**: Bumping the npm version (including changelog updates)
* **`revert`**: Reverting a previous commit
* **`style`**: Fixing code formatting
* **`test`**: Adding missing tests, correcting existing tests, and modifying the testing workflow
* **`workflow`**: Miscellaneous workflow improvements (e.g. adding npm scripts, editor configuration)

### Scope

| Type(s) | Possible scopes | Rule |
| --- | --- | --- |
| `feat`, `fix`, `perf`, `refactor`, `style` | <ul><li>The names of the source files - `error-handler` and `run`</li><li>No scope</li></ul> | The name of the source file with significant changes. No scope if that is `index.ts` or if multiple files have significant changes. |
| `chore`, `release`, `revert` | No scope | Never include a scope. |
| `build` | <ul><li>`lint`</li><li>No scope</li></ul> | `lint` if the change affects the linter, otherwise no scope. |
| `ci` | <ul><li>`commitlint`</li><li>No scope</li></ul> | `commitlint` if the change affects commitlint, otherwise no scope. |
| `docs` | <ul><li>The names of the files containing documentation and community guidelines (e.g. `code-of-conduct`, `readme`)</li><li>No scope</li></ul> | No scope if feature documentation is changed, otherwise the name of the file with significant changes. |
| `test` | <ul><li>The names of the source files - `error-handler` and `run`</li><li>No scope</li></ul> | The name of the source file that corresponds to the test with significant changes. No scope if multiple tests have significant changes. |
| `workflow` | <ul><li>`npm`</li><li>`dependencies`</li><li>`editors`</li></ul> | `npm` if the change affects how the package is published to npm; `dependencies` if it alters how the package manager functions; `editors` if it configures a code editor/IDE. |

### Breaking

An exclamation mark (!) if the change is breaking, otherwise nothing.

### Summary

A succint description of the change:
* use the imperative, present tense: "change" not "changed" nor "changes"
* capitalize the first letter
* no period (.) at the end

For commits with the `release` type, the summary should be the new version number. If the commit reverts a previous one, quote the message of the reverted commit.

## Attribution

These guidelines are based on [Angular's contributing guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md).
