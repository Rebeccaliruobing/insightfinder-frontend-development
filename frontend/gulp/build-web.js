import gulp from 'gulp';
import webpackBuild from '../webpack/build';

gulp.task('build-web', ['env'], (done) => {
  webpackBuild(done);
});
