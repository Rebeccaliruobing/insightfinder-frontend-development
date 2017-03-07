import gulp from 'gulp';
import args from './support/args';

gulp.task('env', () => {
  if (args.production) {
    process.env.NODE_ENV = 'production';
    process.env.UGLIFYJS = args.uglifyjs;
  } else {
    process.env.NODE_ENV = 'development';
    process.env.UGLIFYJS = false;
  }
});
