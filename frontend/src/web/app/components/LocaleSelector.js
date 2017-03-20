import React from 'react';
import { connect } from 'react-redux';
import { toPairs, map } from 'ramda';
import { Select } from '../../../lib/fui/react';
import type { State } from '../../../common/types';
import { setCurrentLocale } from '../../../common/app/actions';

type Props = {
  currentLocale: string,
  setCurrentLocale: Function,
  localeOptions: Array,
};

const LocaleSelector = ({
      currentLocale, setCurrentLocale, localeOptions, ...rest
}: Props) =>
  (
    <div className="locale-selector" {...rest}>
      <i className="world icon" />
      <Select
        name="locales" style={{ width: 100 }}
        autosize={false} clearable={false}
        value={currentLocale} options={localeOptions}
        onChange={(l) => { if (l) setCurrentLocale(l.value); }}
      />
    </div>
  );

export default connect(
  (state: State) => ({
    currentLocale: state.app.currentLocale,
    localeOptions: map(l => ({ value: l[0], label: l[1] }), toPairs(state.app.locales)),
  }),
  { setCurrentLocale },
)(LocaleSelector);
