# project-seed v8

A basic starting point for web projects that uses vite as a Build System. 

Uses typescript and jest for testing

## Overview

Steps to follow as soon as you download this structure to start a project:
- [ ] Update `package.js` with data about the project (name, repo, license...)
- [ ] If the license is known update `LICENSE`
- [ ] Check `index.html` for bootstrap information that can be changed or removed.
- [ ] Update the application title and description in `.env`
- [ ] Remove unneeded images from the `static/meta` folder and replace the favicon with a project related one.
- [ ] Update the modules to the most recent version.
- [ ] **Delete this `README.md` and rename `_README.md`. Fill in the needed data. This is the most important task.** Others need to be able to know what the project is about and how to work with it. This can't be stressed enough.

It's better to do this straight away so no traces of project-seed are ever pushed to github and just looks more professional.
The values that are not immediately know should be left blank and filled ASAP.

## Vite for building

[Vite](https://vite.dev/) is used to bundle all the needed assets for the application.
There are two commands, both run via `pnpm`

- `pnpm build` - clean & build everything and put it into dist folder
- `pnpm serve` - serve the pages and utilize live reload on changes to fonts, images, scripts and HTML.

## Chakra UI for styling

Project Seed uses [Chakra UI](https://chakra-ui.com/) for styling as a UI framework. It is a component library that provides a set of accessible and reusable components facilitating the development of web applications.

If you don't want it, you just need to remove the `@chakra-ui/react` dependency from the `package.json` and remove the import from the `main.tsx` file.

### Configurations and environment variables

At times, it may be necessary to include options/variables specific to `production`, `staging` or `local` in the code. To handle this, there you can use `.env` files.
See Vite's documentation on [env variables](https://vite.dev/guide/env-and-mode.html#env-variables-and-modes).

## Github Actions for CI
Testing and deployment is taken care of by Github Actions. It is set up to:

1. run checks (test & lint) on every non-draft Pull Request
2. build and deploy the application on pushes to the `main` branch

To make sure that the site deploys with passing checks, branch protection should be set up for the `main` branch (`Require status checks to pass before merging`).

Deploy is not set up by default, but the project contains [sample workflows](.github/_workflow-samples/README.md) that can be used to set it up.

## Linting

Our [ESLint rules](.eslintrc) are based on `eslint:recommended` rules, with some custom options. To check linting errors run:

    npm run lint

## Tests

Tests are setup using [Jest](https://jestjs.io/), and can be run with

```
npm run test
```

## Coding style

File [.editorconfig](.editorconfig) defines basic code styling rules, like indent sizes. 

[Prettier](https://prettier.io) is the recommended code formatter. Atom and VSCode have extensions supporting Prettier-ESLint integration, which will help maintain style consistency while following linting rules.

## Path alias

Path alias allow you to define aliases for commonly used folders and avoid having very long file paths like `../../../component`. This also allows you to more easily move files around without worrying the imports will break.  

Paths are defined in the [package.json](./package.json) under `alias`. They start with a `$` and point to a folder.

The following paths are predefined, but feel free to change them to whatever is convenient to your project needs.

```json
"alias": {
    "$components": "~/app/scripts/components",
    "$styles": "~/app/scripts/styles",
    "$utils": "~/app/scripts/utils",
    "$test": "~/test"
  }
```

For example, to import a component from a file called `page-header` in the `"~/app/scripts/components"` folder, you'd just need to do `import Component from '$components/page-header'`.

## Pull Request templates

Project seed comes with pull request templates to simplify and standardize the pull requests in the project. This [issue on the how repo](https://github.com/developmentseed/how/issues/360#issuecomment-1041292591) provides some context to how this works.

To add more templates create them in the `.github/PULL_REQUEST_TEMPLATE` folder and link them in the [PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md) file.
