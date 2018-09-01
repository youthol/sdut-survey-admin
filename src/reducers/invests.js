const initialState = {};

const Invests = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SURVEY_LIST':
      return action.data;
    case 'CLEAR_SURVEY_LIST':
      return [];
    default:
      return state;
  }
};

export default Invests;
