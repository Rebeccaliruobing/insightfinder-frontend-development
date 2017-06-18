import del from 'del';
import gulp from 'gulp';
import webpackSettings from '../webpack.settings';

gulp.task('clean', () => del(
  [
    `${webpackSettings.paths.root}/.happypack/**`,
    `${webpackSettings.paths.build}/**`,
    `${webpackSettings.paths.dist}/**`,
  ],
  { force: true }),
);
