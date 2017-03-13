import gulp from 'gulp';
import bg from 'gulp-bg';

gulp.task('ios', bg(
  'node', 'node_modules/react-native/local-cli/cli.js', 'run-ios',
));
