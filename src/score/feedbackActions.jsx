import axios from 'axios';

export const fetchFeedback = () => async (dispatch) => {
  dispatch({ type: 'FETCH_FEEDBACK_REQUEST' });
  try {
    const response = await axios.get('http://localhost:3000/api/feedback');
    dispatch({ type: 'FETCH_FEEDBACK_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_FEEDBACK_FAILURE', payload: error.message });
  }
};

export const addFeedback = (text) => async (dispatch, getState) => {
  const { auth } = getState();
  try {
    await axios.post('http://localhost:3000/api/feedback', {
      text,
      userId: auth.user?.id
    });
    dispatch(fetchFeedback());
  } catch (error) {
    console.error('Add feedback error:', error);
  }
};

export const deleteFeedback = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3000/api/feedback/${id}`);
    dispatch({ type: 'DELETE_FEEDBACK_SUCCESS', payload: id });
  } catch (error) {
    console.error('Delete feedback error:', error);
  }
};