import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoDataService from "./TodoDataService";
import AuthenticationService from "./todo/AuthenticationService";

const TodoComponent = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    id: id,
    description: "",
    targetDate: moment(new Date()).format("YYYY-MM-DD"),
  });

  let { description, targetDate } = state;

  const onSubmit=(values)=> {
    let username = AuthenticationService.getLoggedInUserName();
    let todo = {
      id: id,
      description: values.description,
      targetDate: values.targetDate,
    };

    if (id === -1) {
      TodoDataService.createTodo(username, todo).then(() => navigate("/todos"));
    } else {
      TodoDataService.updateTodo(username, id, todo).then(() =>
        navigate("/todos")
      );
    }
  }

  const validate=(values)=> {
    let error = {};
    if (!values.description) {
      error.description = "Enter a Description";
    } else if (values.description.length < 5) {
      error.description = "Enter atleast 5 Characters in Description";
    }

    if (!moment(values.targetDate).isValid()) {
      error.targetDate = "Enter a valid target date";
    }
    return error;
  }

  useEffect(() => {
    if (id === -1) {
      return;
    }
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.retrieveTodo(username, id).then((response) =>
      setState({
        description: response.data.description,
        targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
      })
    );
  }, [id]);

  return (
    <div className="m-auto shadow rounded p-md-5 p-sm-5 p-5">
      <div className="h1 m-4 fw-normal">Todo</div>
      <div className="container">
        <Formik
          initialValues={{
            description: description || "",
            targetDate,
          }}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group mb-3">
                <label className="h5 m-1 fw-normal d-flex">Description</label>
                <Field
                  className="form-control"
                  type="text"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group mb-3">
                <label className="h5 m-1 fw-normal d-flex ">Target Date</label>
                <Field className="form-control" type="date" name="targetDate" />
              </fieldset>
              <button className="btn btn-success" type="submit">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TodoComponent;
