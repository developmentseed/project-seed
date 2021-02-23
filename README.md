# project-seed

A basic starting point for web projects that use [styled-components](https://www.styled-components.com/).

Since style components need react, it is already included.  
It also includes collecticons. See the section below for more info.

## Overview

Steps to follow as soon as you download this structure to start a project:
- [ ] Update `package.js` with data about the project (name, repo, license...)
- [ ] If the license is known update `LICENSE`
- [ ] Check `index.html` for bootstrap information that can be changed or removed.
- [ ] Update the application title and description in `/app/assets/scripts/config/production.js`
- [ ] Remove unneeded images from the `graphics` folder and replace the favicon with a project related one.
- [ ] Update the modules to the most recent version.
- [ ] **Delete this `README.md` and rename `_README.md`. Fill in the needed data. This is the most important task.** Others need to be able to know what the project is about and how to work with it. This can't be stressed enough.

It's better to do this straight away so no traces of project-seed are ever pushed to github and just looks more professional.
The values that are not immediately know should be left blank and filled ASAP.

## Gulp for building
The build system currently supports:

- Image optimization
- Watchify for JS bundling
- Minification/uglification where appropriate
- Serving and live reloading of pages

There are two commands, both run via [`yarn`](https://yarnpkg.com/en/).

- `yarn build` - clean & build everything and put it into dist folder
- `yarn serve` - serve the pages and utilize live reload on changes to fonts, images, scripts and HTML.


## Assets Structure

```
app/assets/
|
+- scripts/: The user scripts
|  |
|  +- config/: configuration files (see configuration section)
|  |
|  +- styles/: the styled components
|
+- vendor/: Any third-party script that can't be required()
|
+- graphics/: Images for the site divided in:
|  |
|  +- layout/: Images for layout elements (Ex: background images)
|  +- meta/: Images for the meta tags (Mostly icons and facebook images)
|  +- content/: Content image
|
```

## Collecticons
Collecticons comes bundles with `project-seed`. SVG icons go inside `app/assets/icons/collecticons` and they're compiled into a webfont.  

To use them with styled components:
```js
import collecticon from './styles/collecticons'; // Import the font from app/assets/scripts/styles/collecticons/index

// The icon name will be the icon's file name
const CloseBtn = styled.button`
  &::before {
    ${collecticon('xmark--small')}
  }
`
```

#### Remove collecticons
If you don't need collecticons, it is easy to remove:  
1) From `app/assets/scripts/styles/global.js` remove the inclusion of `collecticonsFont`  

2)  
```
rm -rf app/assets/icons/collecticons
rm -rf app/assets/scripts/styles/collecticons
yarn remove collecticons-processor
```

3) You also need to manually remove the build task from `gulpfile.js`

### Configurations and environment variables

At times, it may be necessary to include options/variables specific to `production`, `staging` or `local` in the code. To handle this, there is a master config.js file. This file should not be modified.  Instead, modify one of:

- config/production.js - production settings
- config/staging.js - overrides the production settings for staging server (basically Travis not on the DEPLOY branch)
- config/local.js - local (development) overrides. This file is gitignored, so you can safely change it without polluting the repo.

When developing locally with `yarn run serve`, the default will be to use `production.js` (with overrides from `local.js`).  However, if you need to run with the staging settings, use: `yarn run stage` (this will not start a server)

### How scripts are built

The script build, which uses `browserify`, outputs two js files: `bundle.js` and
`vendor.js`:
 - `bundle.js`, created by the `javascript` task in deployment and by
   `watchify` during development, contains all the app-specific code:
   `app/scripts/main.js` and all the scripts it `require`s that are local to
   this app.
 - `vendor.js`, created by the `vendorBundle` task, contains all the external
   dependencies of the app: namely, all the packages you install using `yarn
   add ...`.

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
