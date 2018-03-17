import Redux from 'redux';

let initialState = {
  username: '',
  userprofile: {},
  repos: []
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case 'UPDATE_USERNAME':
      return {
      ...state,
      username: action.username
      }
    case 'UPDATE_USERPROFILE':
      return {
        ...state,
        userprofile: action.userprofile
      }
    break;
    case 'UPDATE_REPO':
    return {
      ...state,
      repos: action.repos
    }
    default:
      return state;
  }
};

export default reducer;
