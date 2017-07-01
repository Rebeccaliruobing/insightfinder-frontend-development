import fs from 'fs';
import gulp from 'gulp';
import { messagesToCode } from './support/messages';

gulp.task('messages-extract', () => {
  const through = require('through2');
  const babel = require('babel-core');

  const messages = [];
  const getReactIntlMessages = code =>
    babel.transform(code, {
      plugins: ['react-intl', 'transform-decorators-legacy'],
      presets: ['env', 'react', 'stage-1'],
    }).metadata['react-intl'].messages;

  return gulp
    .src(['src/**/*.js'])
    .pipe(
      through.obj((file, enc, cb) => {
        if (file.contents) {
          const code = file.contents.toString();
          messages.push(...getReactIntlMessages(code));
          cb(null, file);
        } else {
          console.warn(`${file.path} is empty`);
        }
      }),
    )
    .on('end', () => {
      const code = messagesToCode(messages);
      fs.writeFileSync('messages/en.js', code);
    });
});
