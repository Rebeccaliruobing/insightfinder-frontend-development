import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', (done) => {
  runSequence('clean', 'build-webpack', 'dist-browser', done);
});
