import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', () => {
  runSequence('clean', 'build-webpack', 'dist-browser');
});
