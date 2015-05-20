# project-seed

A basic starting point for web projects

## Overview

## Gulp for building
The gulpfile is 80% from the [gulp-webapp](https://github.com/yeoman/generator-gulp-webapp) yeoman generator. The build system currently supports:

- Image optimization
- Sass compilation
- Watchify for JS bundling
- Minification/uglification where appropriate
- Serving and live reloading of pages

There are two commands, both run via npm.

- `npm run build` - clean & build everything and put it into dist folder
- `npm run serve` - serve the pages and utilize live reload on changes to styles, fonts, images, scripts and HTML.

## Travis for testing and deployment
The .travis.yml file enables the usage of [Travis](http://travis.org) as a test and deployment system. In this particular case, Travis will be looking for any changes to the repo and when a change is made to the `master` branch, Travis will build the project and deploy it to the `gh-pages` branch.

## semistandard for linting
We're using [semistandard](https://github.com/Flet/semistandard) for linting. 

- `npm run lint` - will run linter and warn of any errors.

Travis will run the linter but will not fail a build if errros exist, it will just be present in the logs (we all look at Travis logs, right?).

There are linting plugins for popular editors listed in the semistandard repo.