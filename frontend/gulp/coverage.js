import childProcess from 'child_process';
import gulp from 'gulp';

// TODO: yarn or istanbul-reports version issue, remove dev-deps after fixed.
gulp.task('coverage', (done) => {
  childProcess
    .spawn('npm', ['run', 'jest:coverage'], { stdio: 'inherit' })
    .on('close', done);
});
