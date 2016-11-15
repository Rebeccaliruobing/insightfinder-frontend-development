import gulp from 'gulp';
import webpackSettings from '../webpack.settings';

gulp.task('dist-browser', () => {
  gulp.src(`${webpackSettings.paths.build}/**/*`)
    .pipe(gulp.dest('../static/'));
});
