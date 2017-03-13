import gulp from 'gulp';
import bg from 'gulp-bg';

// Use gulp-bg to start webpack in background process, and restart the pcoess
// if webpack related files changed.
gulp.task('web-hot-bg', bg('node', './webpack/web'));

gulp.task('web-hot', ['web-hot-bg'], () => {
  gulp.watch(['./webpack/**/*.*', './webpack.settings.js'], ['web-hot-bg']);
});
