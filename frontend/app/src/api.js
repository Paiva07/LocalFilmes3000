export const API_URL = 'http://localhost:3000';

export function GET_USER() {
  return {
    url: API_URL + '/usuarios',
    options: {
      method: 'GET',
    },
  };
}

export function POST_USER(body) {
  return {
    url: API_URL + '/usuarios',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function LOGIN_USER(body) {
  return {
    url: API_URL + '/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_FILMS() {
  return {
    url: API_URL + '/filmes',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}
export function GET_FILM(id) {
  return {
    url: API_URL + `/filmes/${id}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}
export function POST_FILM(body) {
  return {
    url: API_URL + '/filmes',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    },
  };
}

export function DELETE_FILM(id) {
  return {
    url: API_URL + `/filmes/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    },
  };
}
export function EDIT_FILMS(id, body) {
  return {
    url: API_URL + `/filmes/${id}`,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    },
  };
}
