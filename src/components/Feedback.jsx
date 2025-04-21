import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchFeedback, addFeedback, deleteFeedback } from '../store/actions/feedbackActions';

function Feedback() {
  const dispatch = useDispatch();
  
  // Безопасная деструктуризация с значениями по умолчанию
  const { 
    items = [], 
    loading = false, 
    error = null 
  } = useSelector(state => state.feedback || {});

  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated || false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const onSubmit = data => {
    dispatch(addFeedback(data.text));
    reset();
  };

  const handleDelete = id => {
    dispatch(deleteFeedback(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Feedback</h2>
      {!isAuthenticated && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            {...register('text', { required: 'Feedback text required' })} 
            placeholder="Your feedback" 
          />
          <button type="submit">Submit Feedback</button>
        </form>
      )}
      
      <div>
        <h3>Feedback List</h3>
        {items.map(item => (
          <div key={item.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
            <p>{item.text}</p>
            {isAuthenticated && (
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feedback;