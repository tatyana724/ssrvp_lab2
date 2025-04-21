// src/store/reducers/feedbackReducer.js
const initialState = {
  items: [],
  loading: false,
  error: null
};

export const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FEEDBACK_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_FEEDBACK_SUCCESS':
      return { ...state, items: action.payload, loading: false };
    case 'FETCH_FEEDBACK_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_FEEDBACK_SUCCESS':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};