import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { authUser } from "../../store/redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = useCallback((data) => {
    axios
      .get("http://localhost:3000/login/" + data.username)
      .then((res) => {
        dispatch(authUser(data.username));
        navigate("/");
      })
      .catch((err) => {
        alert("Неправильный логин или пароль");
      });
  }, []);

  return (
    <Container className="form__container w-25 mt-3">
      <h3>Вход</h3>
      <Form onSubmit={handleSubmit(onSubmit)} className="border p-3 rounded">
        <Form.Group className="mb-3 d-flex flex-column" controlId="1">
          <Form.Label className="fs-5">Логин</Form.Label>
          <Form.Control
            type="username"
            {...register("username", { required: true })}
            className="text-muted"
            placeholder="Введите логин"
          />
        </Form.Group>
        {errors.username && <p>This field is required</p>}

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
          <Link to="/">Зарегистрироваться</Link>
        </p>

        <Button
          variant="primary"
          type="submit"
          className=""
          onClick={() => onSubmit}
        >
          Войти
        </Button>
      </Form>
    </Container>
  );
}

export default LoginForm;
