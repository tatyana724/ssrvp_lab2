import { Container, Spinner, Alert, Card, Badge } from "react-bootstrap";
import { postsApi } from "../../store/api";

function FeedbackList() {
  const { data, isLoading, isError, isFetching } = 
    postsApi.useFetchAllFeedbacksQuery();

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Произошла ошибка при загрузке отзывов</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Отзывы наших клиентов</h2>
      
      {data.length === 0 ? (
        <Alert variant="info">Пока нет отзывов. Будьте первым!</Alert>
      ) : (
        <div className="feedback-list">
          {data.map((feedback) => (
            <Card key={feedback.id} className="mb-3 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <Card.Text className="mb-2">{feedback.answer}</Card.Text>
                  <Badge bg={feedback.mark > 3 ? "success" : "warning"} pill>
                    {feedback.mark}/5
                  </Badge>
                </div>
                <Card.Footer className="text-muted small">
                  {new Date(feedback.createdAt).toLocaleDateString()}
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default FeedbackList;