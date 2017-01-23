import gulp from 'gulp';
import bg from 'gulp-bg';

gulp.task('ios', bg(
    'react-native', 'run-ios',
  ),
);
