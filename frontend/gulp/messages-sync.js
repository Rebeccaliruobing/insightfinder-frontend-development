/* eslint-disable no-console */
import fs from 'fs';
import gulp from 'gulp';
import loadLocaleMessages from '../src/common/loadLocaleMessages';
import { diff, messagesToCode } from './support/messages';

gulp.task('messages-sync', ['messages-extract'], () => {
  const locales = loadLocaleMessages();
  const defaultMessages = require('../messages/en').default;
  const defaultMessagesKeys = Object.keys(locales.en.messages);

  Object.keys(locales).filter(locale => locale !== 'en').forEach((locale) => {
    const localeMessagesKeys = Object.keys(locales[locale].messages);
    const missingMessagesKeys = diff(defaultMessagesKeys, localeMessagesKeys);
    const unusedMessagesKeys = diff(localeMessagesKeys, defaultMessagesKeys);
    const clearedMessages = require(`../messages/${locale}`).default.filter(
      // eslint-disable-line import/no-dynamic-require
      translation => unusedMessagesKeys.indexOf(translation.id) === -1,
    );
    const addedMessages = defaultMessages.filter(
      translation => missingMessagesKeys.indexOf(translation.id) === 0,
    );
    const syncedMessage = clearedMessages.concat(addedMessages);
    const code = messagesToCode(syncedMessage);
    console.log(locale);
    fs.writeFileSync(`messages/${locale}.js`, code);
    console.log(`  added messages: ${missingMessagesKeys.length}`);
    if (missingMessagesKeys.length > 0) {
      console.log(`    ${missingMessagesKeys.join(',')}`);
    }
    console.log(`  removed messages: ${unusedMessagesKeys.length}`);
    if (unusedMessagesKeys.length > 0) {
      console.log(`    ${unusedMessagesKeys.join(',')}`);
    }
  });
});
