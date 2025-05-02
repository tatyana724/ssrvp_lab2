import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux';
import { authUser } from "../../store/redux"
import { Link } from "react-router-dom";
import axios from "axios";


function isValidEmail(email) {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(email);
}

function RegisterForm() {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = useCallback((data) => {
        axios.post("http://localhost:3000/register", { ...data }).then(res => {
            dispatch(authUser(data.username))
        }
        ).catch(err => {
            alert("Пользователь с таким логином уже существует")
        }
        )
    }, [dispatch])

    return (
        <Container className="w-25 mt-3">
            <h3>Регистрация</h3>
            <Form onSubmit={handleSubmit(onSubmit)} className="border p-3 rounded">
                <Form.Group className="mb-3 d-flex flex-column" controlId="1">
                    <Form.Label className="fs-5">Логин</Form.Label>
                    <Form.Control type="username" {...register("username", { required: true })} className="text-muted" placeholder="Введите логин" />
                </Form.Group>
                {errors.username && <p>This field is required</p>}


                <Form.Group className="mb-3 d-flex flex-column" controlId="5">
                    <Form.Label className="fs-5">Email</Form.Label>
                    <Form.Control
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: (value) => isValidEmail(value) || "Invalid email format", // Добавляем кастомную валидацию
                        })}
                        className="text-muted"
                        placeholder="Введите email"
                    />
                </Form.Group>
                {errors.email && <p>This field is required</p>}

                <Form.Group className="mb-3 d-flex flex-column" controlId="3">
                    <Form.Label className="fs-5">Пароль</Form.Label>
                    <Form.Control
                        {...register("password", { required: true })}
                        type="password"
                        className="text-muted"
                        placeholder="Введите пароль"
                    />
                </Form.Group>
                {errors.password && <p>This field is required</p>}

                <p>
                    <Link to="/login">Войти</Link>
                </p>

                <Button variant="primary" type="submit" className="" onClick={() => onSubmit}>
                    Зарегистрироваться
                </Button>
            </Form>
        </Container>

    )
}

export default RegisterForm