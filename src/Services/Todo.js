import config from "../Config";
import { authHeader } from "../Helper";

export const todoService = {
  create,
  getAll,
  getById,
  update,
  completed,
  delete: _delete,
};



function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/todos`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/todos/${id}`, requestOptions).then(
    handleResponse
  );
}

function create(todo) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  };

  return fetch(`${config.apiUrl}/todos/create`, requestOptions).then(
    handleResponse
  );
}

function update(todo) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  };

  return fetch(`${config.apiUrl}/todos/update/${todo.id}`, requestOptions).then(
    handleResponse
  );
}

function completed(id, completed) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ "completed": completed }),

  };

  return fetch(`${config.apiUrl}/todos/completed/${id}`, requestOptions).then(
    handleResponse
  );
}



// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/todos/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        //logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
