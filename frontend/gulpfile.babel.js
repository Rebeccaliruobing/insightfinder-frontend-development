import gulp from 'gulp';
import requireDir from 'require-dir';

// Import all tasks under the first level of gulp folder
requireDir('./gulp', { recursive: false });

gulp.task('default', ['server']);