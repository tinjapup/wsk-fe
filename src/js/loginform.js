import '../css/style.css';
import { fetchData } from './fetch.js';

/*
const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        const errorData = await response.json();
        return {error: errorData.message || 'An error occurred'};
      }
      return await response.json(); // Return successful response data
    } catch (error) {
      console.error('fetchData() error:', error.message);
      return {error: error.message};
    }
  };

console.log('Moi luodaan nyt tokeneita ja kirjaudutaan sisään');

// Esimerkin takia haut ovat nyt suoraan tässä tiedostossa, jotta harjoitus ei sekoita
// teidän omaa projektin rakennetta

const registerUser = async (event) => {
  event.preventDefault();

  // Haetaan oikea formi
  const registerForm = document.querySelector('.registerForm');

  // Haetaan formista arvot
  const username = registerForm.querySelector('#username').value.trim();
  const password = registerForm.querySelector('#password').value.trim();
  const email = registerForm.querySelector('#email').value.trim();

  // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  // Endpoint
  const url = 'http://localhost:3000/api/users';

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error adding a new user:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
  }

  console.log(response);
  registerForm.reset(); 
};

const registerForm = document.querySelector('.registerForm');
registerForm.addEventListener('submit', registerUser);
*/

const loginUser = async (event) =>{
    event.preventDefault();

    const loginUrl = 'http://localhost:3000/api/auth/login';
    const loginForm = document.querySelector('.loginForm');

    const username = loginForm.querySelector('#username-login').value.trim();
    const password = loginForm.querySelector('#password-login').value.trim();

    const bodyData = {
        username: username,
        password: password,
    };

    console.log(bodyData);

    const options = {
        body: JSON.stringify(bodyData),
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          
        },
      };
    console.log(options);

    const response = await fetchData(loginUrl, options);
    
    if (response.error) {
        console.error('Error logging in:', response.error)
    }

    if (response.message) {
        localStorage.setItem("token", response.token);
        console.log(response)
        console.log(response.message, 'Success logging in');
        localStorage.setItem('justLoggedIn', 'true');
        window.location.replace('userlandingpage.html');
    }

    console.log(response);
    loginForm.reset(); 
};

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('.loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', loginUser);
    }
  });

export {loginUser};