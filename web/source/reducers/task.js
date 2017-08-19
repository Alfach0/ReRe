// @flow

import * as Model from './../model';
import * as Actions from './../actions/types';

export default (task: ?Model.Task = null, action: Model.Action): ?Model.Task => {
  switch(action.type) {
    case Actions.ACTION_INITIALIZE:
      return action.payload.task;

    case Actions.ACTION_OPTION_CHOSE:
      return action.payload.task;

    default:
      return task;
  }
}
