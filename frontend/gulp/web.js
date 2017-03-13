import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('web', ['env'], (done) => {
  runSequence('web-hot', done);
});
