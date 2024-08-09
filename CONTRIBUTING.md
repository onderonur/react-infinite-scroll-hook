# Contributing

This repository is created by using [Turborepo](https://turbo.build/repo). To understand the repository structure better, please check its [documentation](https://turbo.build/repo/docs).

## Local Development

After cloning the repository, we need to install the dependencies.

```bash
npm install
```

To start the demo Next.js app which uses the local version of `react-infinite-scroll-hook`, we can run `dev` script.

```bash
npm run dev
```

After this, we can open `http://localhost:3000` in the browser to display the app.

## Code Quality Checks

We use automated checks by using [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) and [TypeScript](https://www.typescriptlang.org/) to provide the highest quality code as it can be.

All checks are run automatically before committing by using [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/lint-staged/lint-staged).

The checks can be run manually by running the below command too.

```bash
npm run codequality:check
```

And the same checks can be run also by enabling fixes for auto-fixable issues.

```bash
npm run codequality:fix
```

`codequality` scripts run underlying ESLint (`lint`), Prettier (`format`) and TypeScript (`types`) scripts. To run these tools individually, we can also use the below scripts.

```bash
# ESLint checks
npm run lint:check
# ESLint fixes
npm run lint:fix

# Prettier checks
npm run format:check
# Prettier fixes
npm run format:fix

# TypeScript checks
npm run types:check
# There is no auto-fix script for TypeScript.
```

## Updating Dependencies

We use `npm-check-updates` package to automatically check if there are newer versions of our dependencies.

To run it, we can use the below command. It starts an interactive CLI to check the dependencies of all the apps and packages, including the root dependencies.

```bash
npm run updates:check
```

## Adding Contributors

[all-contributors-cli](https://github.com/all-contributors/cli) is used for maintaining the contributors of this repository.

To add a new contributor, we can run the below command and follow its instructions.

```bash
npm run contributors:add
```

## Prepublish Checks

To be sure everything is OK with the latest changes, we can use [publint](https://publint.dev/) and [Are the Types Wrong](https://github.com/arethetypeswrong/arethetypeswrong.github.io).

Firstly, we need to build the bundle with the latest changes.

```bash
npm run build:bundle
```

This command will create (or update) the `packages/react-infinite-scroll-hook/dist` folder, which will be used by the clients of this package.

To be sure the output is OK for ESM and CJS clients, we can run the below commands and check their outputs.

```bash
# For `publint`
npm run publint:check -w react-infinite-scroll-hook

# For `Are the Types Wrong`
npm run attw:check -w react-infinite-scroll-hook
```

To see the content of the package which can be uploaded to [npm](https://www.npmjs.com/) can be seen by using the below command. It will create a tarball from `react-infinite-scroll-hook` package.

```bash
npm pack -w react-infinite-scroll-hook
```

Or the below command can be used to only check the tarball contents without creating it.

```bash
npm pack --dry-run -w react-infinite-scroll-hook
```

Lastly, we can run the below command to auto correct common errors in `package.json` of the package to be published. `npm publish` command already does these auto-fixes too.

```bash
npm pkg fix -w react-infinite-scroll-hook
```

## Publishing the Package

Firstly, we need to bump the package version which can be done by using the below commands.

```bash
npm version patch -w react-infinite-scroll-hook
# Bumps the patch number like 0.0.0 -> 0.0.1

npm version minor -w react-infinite-scroll-hook
# Bumps the patch number like 0.0.x -> 0.1.0

npm version major -w react-infinite-scroll-hook
# Bumps the patch number like 0.x.y -> 1.0.0
```

And we can publish the new version now 🚀

```bash
npm publish -w react-infinite-scroll-hook
```
