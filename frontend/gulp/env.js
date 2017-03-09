import gulp from 'gulp';
import args from './support/args';

gulp.task('env', () => {
  if (args.production) {
    process.env.NODE_ENV = 'production';
    process.env.UGLIFYJS = args.uglifyjs;
    process.env.BUILD_ENV = args.test ? 'test' : undefined;
  } else {
    process.env.NODE_ENV = 'development';
    process.env.UGLIFYJS = false;
  }
});
