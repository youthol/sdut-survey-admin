export const updateSurveyList = data => ({
  type: 'UPDATE_SURVEY_LIST',
  data,
});

export const clearSurveyList = () => ({
  type: 'CLEAR_SURVEY_LIST',
  data: [],
});
