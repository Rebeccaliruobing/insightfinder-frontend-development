/* @flow */
/**
 * *****************************************************************************
 * copyright insightfinder inc., 2017
 * *****************************************************************************
 **/

import { Observable } from 'rxjs/Observable';
import R from 'ramda';
import { isObject, isEmpty, isBoolean } from 'lodash';
import { setLoadingComponents, showAppLoader, hideAppLoader } from '../app/actions';

/**
 * Get epic action for loader, the return object contains show & hide loader action.
 */
const getLoaderEpicAction = loader => {
  let showLoader = Observable.empty();
  let hideLoader = Observable.empty();

  if (isObject(loader) && !isEmpty(loader)) {
    // If loader is an object, which contains the name of the loader ui components.
    showLoader = Observable.of(setLoadingComponents(loader));
    hideLoader = Observable.of(setLoadingComponents(R.mapObjIndexed(() => false, loader)));
  } else if (isBoolean(loader) && loader) {
    // If loader is true, get the app loader.
    showLoader = Observable.of(showAppLoader());
    hideLoader = Observable.of(hideAppLoader());
  }

  return { showLoader, hideLoader };
};

export default getLoaderEpicAction;
