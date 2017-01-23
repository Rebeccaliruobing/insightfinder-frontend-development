import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('server', ['env'], (done) => {
  runSequence('server-hot', done);
});
