import gulp from 'gulp';
import webpackSettings from '../webpack.settings';

gulp.task('dist-web', () => {
  gulp.src(`${webpackSettings.paths.build}/**/*`)
    .pipe(gulp.dest('../static/'));
});
