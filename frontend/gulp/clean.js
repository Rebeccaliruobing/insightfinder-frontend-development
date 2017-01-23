import del from 'del';
import gulp from 'gulp';
import webpackSettings from '../webpack.settings';

gulp.task('clean', () => {
  del(`${webpackSettings.paths.build}/**`, { force: true });
  del(`${webpackSettings.paths.dist}/**`, { force: true });
});
