const BASE_URL = 'http://localhost:4000';
const getTodoUri = '/todos';
const createTodoUri = '/todos';

const makeRequest = (url, method = 'GET') => (body) => {
  const requestObject = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  if ((method === 'POST' || method === 'PUT') && typeof body === 'object') {
    requestObject.body = JSON.stringify(body);
  }
  return new Promise((resolve, reject) => {
    fetch(url, requestObject)
      .then(res => res.json())
      .then((jsonResponse) => {
        if (jsonResponse.status === 'OK') {
          resolve(jsonResponse);
        } else {
          reject(jsonResponse);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getTodosRequest = makeRequest(BASE_URL + getTodoUri);
const createTodoRequest = makeRequest(BASE_URL + createTodoUri, 'POST');


export {
  getTodosRequest,
  createTodoRequest,
  makeRequest,
  BASE_URL,
};
