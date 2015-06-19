# project-seed

A basic starting point for web projects

## Overview

## Gulp for building
The gulpfile is based on the [gulp-webapp](https://github.com/yeoman/generator-gulp-webapp) yeoman generator. The build system currently supports:

- Image optimization
- Sass compilation
- Watchify for JS bundling
- Minification/uglification where appropriate
- Serving and live reloading of pages

There are two commands, both run via npm.

- `npm run build` or `gulp build` or `gulp` - clean & build everything and put it into dist folder
- `npm run serve` or `gulp serve` - serve the pages and utilize live reload on changes to styles, fonts, images, scripts and HTML.


## Assets Structure

```
app/assets/
|
+- scripts/: The user scripts
|
+- styles/: The sass styles
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

### How scripts are built

The script build, which uses `browserify`, outputs two js files: `bundle.js` and
`vendor.js`:
 - `bundle.js`, created by the `javascript` task in deployment and by
   `watchify` during development, contains all the app-specific code:
   `app/scripts/main.js` and all the scripts it `require`s that are local to
   this app.
 - `vendor.js`, created by the `vendorBundle` task, contains all the external
   dependencies of the app: namely, all the packages you install using `npm
   install --save ...`.

## Travis for testing and deployment
The .travis.yml file enables the usage of [Travis](http://travis.org) as a test and deployment system. In this particular case, Travis will be looking for any changes to the repo and when a change is made to the `master` branch, Travis will build the project and deploy it to the `gh-pages` branch.

## semistandard for linting
We're using [semistandard](https://github.com/Flet/semistandard) for linting. 

- `npm run lint` - will run linter and warn of any errors.

There are linting plugins for popular editors listed in the semistandard repo.
