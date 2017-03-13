import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', (done) => {
  runSequence('clean', 'build-web', 'dist-web', done);
});
