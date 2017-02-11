import gulp from 'gulp';
import runSequence from 'run-sequence';
import args from './support/args';

gulp.task('test', (done) => {
  if (args.watch) {
    runSequence('jest-watch', done);
  } else {
    runSequence('jest', done);
  }
});
