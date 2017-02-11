/* eslint-disable no-console */
import gulp from 'gulp';
import loadLocaleMessages from '../src/common/loadLocaleMessages';
import { diff } from './support/messages';

gulp.task('messages-check', ['messages-extract'], () => {
  const messages = loadLocaleMessages();
  const messagesKeys = Object.keys(messages.en);

  Object.keys(messages)
    .filter(locale => locale !== 'en')
    .forEach((locale) => {
      const localeMessagesKeys = Object.keys(messages[locale]);
      const missingMessagesKeys = diff(messagesKeys, localeMessagesKeys);
      const unusedMessagesKeys = diff(localeMessagesKeys, messagesKeys);

      console.log(locale);
      console.log(`  missing messages: ${missingMessagesKeys.length}`);
      if (missingMessagesKeys.length > 0) {
        console.log(`    ${missingMessagesKeys.join(',')}`);
      }

      console.log(`  unused messages: ${unusedMessagesKeys.length}`);
      if (missingMessagesKeys.length > 0) {
        console.log(`    ${unusedMessagesKeys.join(',')}`);
      }
    });
});
