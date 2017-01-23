import gulp from 'gulp';
import bg from 'gulp-bg';

gulp.task('server-hot-bg', bg('node', './webpack/server'));

gulp.task('server-hot', ['server-hot-bg'], () => {
  gulp.watch(['./webpack/**/*.*', './webpack.settings.js'], ['server-hot-bg']);
});
