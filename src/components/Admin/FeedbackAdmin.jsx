import { useState, useCallback, useEffect } from "react";
import FeedbackForm from "../Feedback/FeedBackForm";
import { Container, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

function FeedbackAdmin() {
    const [feedbacks, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeedbacks = useCallback(async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/feedbacks");
            setFeedback(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    const deleteItem = useCallback(async (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить этот отзыв?")) return;
        
        try {
            await axios.delete(`http://localhost:3000/feedbacks/${id}`);
            setFeedback(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Delete error:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            alert(`Ошибка удаления: ${error.response?.data?.message || error.message}`);
        }
    }, []);

    if (loading) return <Container className="w-50"><Spinner animation="border" /></Container>;
    if (error) return <Container className="w-50"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <>
            <Container className="list__container w-50">
                <h2>Отзывы</h2>
                {feedbacks.length === 0 ? (
                    <p>Нет отзывов для отображения</p>
                ) : (
                    feedbacks.map(el => (
                        <div key={el.id} className="px-3 border rounded mb-2 d-flex align-items-center">
                            <div className="me-auto">
                                <p>{el.answer}</p>
                                <p>{el.mark} / 5</p>
                            </div>
                            <button 
                                onClick={() => deleteItem(el.id)}
                                className="btn btn-danger btn-sm"
                            >
                                Удалить
                            </button>
                        </div>
                    ))
                )}
            </Container>
            <FeedbackForm onAdd={() => fetchFeedbacks()} />
        </>
    );
}

export default FeedbackAdmin;