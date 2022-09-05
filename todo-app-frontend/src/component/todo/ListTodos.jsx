import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import TodoDataService from "../TodoDataService";
import AuthenticationService from "./AuthenticationService";
import moment from "moment";

const ListTodos = () =>  {
  const navigate = useNavigate();
  const [todos, settodos] = useState([]);
  const [deleteAlertMessage, setDeleteAlertMessage] = useState(null);

  useEffect(() => {
    refreshTodos();
  }, [])

  function refreshTodos() {
      let username = AuthenticationService.getLoggedInUserName();
      TodoDataService.retrieveAllTodos(username).then((response) => {
        settodos(response.data);
      });
  }


  function deleteTodoClicked(id) {
    let username = AuthenticationService.getLoggedInUserName();
    TodoDataService.deleteTodo(username, id).then(()=>{
      setDeleteAlertMessage(`Delete of Todo ${id} Successful`)
      refreshTodos();
    });
  }

  function updateTodoClicked(id) {
    navigate(`/todos/${id}`);
  }

  function addTodoClicked() {
    navigate(`/todos/-1`);
  }

  return (
    <div className="container mt-5">
      {deleteAlertMessage && (
        <div className="alert alert-success">{deleteAlertMessage}</div>
      )}
      <h2 className="d-flex justify-content-center m-4">Your Todos</h2>
      <button className="btn btn-success d-flex mb-2" onClick={addTodoClicked}>
        Add
      </button>
      <table className="table table-light border">
        <thead>
          <tr>
            <th>Description</th>
            <th>Target Date</th>
            <th>Is Completed?</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td>{moment(todo.targetDate).format("dddd DD/MM/YYYY")}</td>
              <td>{todo.done.toString()}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => updateTodoClicked(todo.id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => deleteTodoClicked(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListTodos