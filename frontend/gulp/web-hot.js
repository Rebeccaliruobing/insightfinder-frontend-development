import gulp from 'gulp';
import bg from 'gulp-bg';

// Use gulp-bg to start the background process, and restart it if webpack files
// changed.
gulp.task('web-hot-bg', bg('node', './webpack/web'));

gulp.task('web-hot', ['web-hot-bg'], () => {
  gulp.watch(['./webpack/**/*.*', './webpack.settings.js'], ['web-hot-bg']);
});
