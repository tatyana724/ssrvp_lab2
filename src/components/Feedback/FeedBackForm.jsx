import { useForm } from "react-hook-form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container"
import { useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function FeedbackForm({ feedbacks, feedbackAdd }) {
    const username = useSelector((state) => state.username);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = useCallback((data) => {
        data["author"] = username;
        axios.post("http://localhost:3000/feedbacks", { ...data }).then(res => {
            alert("Добавлено")
            feedbackAdd([...feedbacks, data])
        }
        )

    }, [feedbackAdd, feedbacks, username])



    return (
        <Container className="form__container w-25 mt-3">
            <h3>Оставьте отзыв</h3>
            <Form onSubmit={handleSubmit(onSubmit)} className="border p-3 rounded">
                <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
                    <Form.Text {...register("answer", { required: true })} as="textarea" className="text-muted" placeholder="Напишите свой отзыв" />
                </Form.Group>
                {errors.answer && <p>This field is required</p>}

                <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
                    <Form.Label>Оставьте оценку данному сайту</Form.Label>
                    <Form.Select {...register("mark", { required: true })}
                        placeholder="Выберите значение от 1 до 5" aria-label="Default select example">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>
                </Form.Group>
                {errors.mark && <p>This field is required</p>}


                <Button variant="primary" type="submit" className="" onClick={() => onSubmit}>
                    Отправить отзыв
                </Button>

            </Form>
        </Container>

    )
}

export default FeedbackForm