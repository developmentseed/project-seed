# project-seed

A basic starting point for web projects that uses parcel as a Build System.  
This is the result of a [build system research](https://github.com/developmentseed/project-seed/issues/97) and [experimentation](https://github.com/danielfdsilva/parcel-gulp/).  

For the previous version of project-seed, that used browserify see [tag v4.0.0](https://github.com/developmentseed/project-seed/tree/v4.0.0).

## Overview

Steps to follow as soon as you download this structure to start a project:
- [ ] Update `package.js` with data about the project (name, repo, license...)
- [ ] If the license is known update `LICENSE`
- [ ] Check `index.html` for bootstrap information that can be changed or removed.
- [ ] Update the application title and description in `.env`
- [ ] Remove unneeded images from the `graphics` folder and replace the favicon with a project related one.
- [ ] Update the modules to the most recent version.
- [ ] **Delete this `README.md` and rename `_README.md`. Fill in the needed data. This is the most important task.** Others need to be able to know what the project is about and how to work with it. This can't be stressed enough.

It's better to do this straight away so no traces of project-seed are ever pushed to github and just looks more professional.
The values that are not immediately know should be left blank and filled ASAP.

## Parcel for building, Gulp to orchestrate

[Parcel](https://parceljs.org/) is used to bundle all the needed assets for the application, but there are some edge cases in some projects that parcel can't handle very well. Anything that must happen outside the final bundle, parcel can't deal with properly. For example, [parcel's static file plugin](https://github.com/elwin013/parcel-reporter-static-files-copy) will just copy the files to the dist folder, [without watching them](https://github.com/elwin013/parcel-reporter-static-files-copy#flaws-and-problems) for changes.

To solve this problem, [Gulp](https://gulpjs.com/) is used to orchestrate tasks. With it, tasks can be setup to do all that is needed, and then parcel is executed to bundle the app.  

Unless you have a use case that needs data processing you shouldn't have to touch the gulpfile. For an example of extra tasks see the [research repo](https://github.com/danielfdsilva/parcel-gulp/).

There are two commands, both run via [`yarn`](https://yarnpkg.com/en/).

- `yarn build` - clean & build everything and put it into dist folder
- `yarn serve` - serve the pages and utilize live reload on changes to fonts, images, scripts and HTML.


### Configurations and environment variables

At times, it may be necessary to include options/variables specific to `production`, `staging` or `local` in the code. To handle this, there you can use `.env` files.
See Parcel documentation on [env variables](https://parceljs.org/features/node-emulation/#environment-variables).

## Github Actions for CI
Testing and deployment is taken care of by Github Actions. It is set up to:

1. run checks (test & lint) on every non-draft Pull Request
2. build and deploy the application on pushes to the `main` branch

To make sure that the site deploys with passing checks, branch protection should be set up for the `main` branch (`Require status checks to pass before merging`).

Deploy is not set up by default, but the project contains [sample workflows](.github/_workflow-samples/README.md) that can be used to set it up.

## Linting

Our [ESLint rules](.eslintrc) are based on `eslint:recommended` rules, with some custom options. To check linting errors run:

    yarn lint

## Coding style

File [.editorconfig](.editorconfig) defines basic code styling rules, like indent sizes. 

[Prettier](https://prettier.io) is the recommended code formatter. Atom and VSCode have extensions supporting Prettier-ESLint integration, which will help maintain style consistency while following linting rules.
