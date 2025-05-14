import _ from 'lodash';

export const createLoadingSelector = (actions: any) => (state: any) => {
  return _(actions).some(action => _.get(state, `loadingReducer.${action}`));
};
