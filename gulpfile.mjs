import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import gulp from 'gulp';
import { deleteAsync } from 'del';
import portscanner from 'portscanner';
import log from 'fancy-log';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// /////////////////////////////////////////////////////////////////////////////
// --------------------------- Variables -------------------------------------//
// ---------------------------------------------------------------------------//

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const readPackage = () => JSON.parse(fs.readFileSync('package.json'));

// Set the version in an env variable.
process.env.APP_VERSION = readPackage().version;
process.env.APP_BUILD_TIME = Date.now();

const parcelCli = path.join(__dirname, './node_modules/parcel/lib/cli.js');
const parcelConfig = path.join(__dirname, '.parcelrc');

// /////////////////////////////////////////////////////////////////////////////
// ----------------------- Watcher and custom tasks --------------------------//
// ---------------------------------------------------------------------------//

// Function to register file watching
function watcher() {
  // Custom watch processes.
  // -- Add watch listeners here.

  // ---
  // Watch static files. DO NOT REMOVE.
  gulp.watch(['static/**/*'], copyFiles);
}

// /////////////////////////////////////////////////////////////////////////////
// ---------------------------- Base tasks -----------------------------------//
// ---------------------------------------------------------------------------//

function cleanTask() {
  // Remove build cache and dist.
  return deleteAsync(['dist', '.parcel-cache']);
}

// Simple task to copy the static files to the dist directory. The static
// directory will be watched so that files are copied when anything changes.
function copyFiles() {
  return gulp.src('static/**/*').pipe(gulp.dest('dist'));
}

// Below are the parcel related tasks. One for the build process and other to
// start the development server.
const parcelTarget = './app/index.html';

function parcelServe(cb) {
  portscanner.findAPortNotInUse(9000, 9999, function (error, port) {
    if (port !== 9000) {
      log.warn(`  Port 9000 is busy.`);
    }

    const args = ['--config', parcelConfig, '--port', port];

    // Run parcel in serve mode using the same stdio that started gulp. This is
    // needed to ensure the output is colored and behaves correctly.
    spawn('node', [parcelCli, 'serve', parcelTarget, ...args], {
      stdio: 'inherit'
    });
    cb(error);
  });
}

function parcelBuild(cb) {
  // Build the app using parcel. Since the build task finishes, we have to
  // listen for it to mark the gulp task as finished.

  const args = [
    '--config',
    parcelConfig,
    '--public-url',
    process.env.PUBLIC_URL || '/'
  ];

  const pr = spawn('node', [parcelCli, 'build', ...args, parcelTarget], {
    stdio: 'inherit'
  });
  pr.on('close', (code) => {
    cb(code ? 'Build failed' : undefined);
  });
}

// //////////////////////////////////////////////////////////////////////////////
// ---------------------------- Task export -----------------------------------//
// ----------------------------------------------------------------------------//

export const clean = cleanTask;

// Task orchestration used during the development process.
export const serve = gulp.series(
  gulp.parallel(
    // Additional tasks:
    // -- Include additional tasks here

    // Task to copy the files.
    copyFiles
  ),
  gulp.parallel(watcher, parcelServe)
);

// Task orchestration used during the production process.
export default gulp.series(
  clean,
  gulp.parallel(
    // Additional tasks:
    // -- Include additional tasks here

    // Task to copy the files.
    copyFiles
  ),
  parcelBuild
);
