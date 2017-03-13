const getBrowserLocale = () => {
  let lang;

  // github.com/maxogden/browser-locale
  if (navigator.languages) {
    // Chrome
    lang = navigator.languages[0];
  } else if (navigator.userLanguage) {
    // IE only
    lang = navigator.userLanguage;
  } else {
    // Firefox and Safari
    lang = navigator.language;
  }

  // There is no good way to convert locale to BCP47 format used by react-intl.
  // so we should convert it manually for specific locales.
  lang = lang.toLowerCase();
  if (lang === 'zh-cn') {
    return 'zh';
  }

  return lang.split('-')[0];
};

export default getBrowserLocale;
