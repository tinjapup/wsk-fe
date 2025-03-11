import '../css/style.css';
import { fetchData } from './fetch.js';

const registerUser = async (event) =>{
    event.preventDefault();

    const signupUrl = 'http://localhost:3000/api/users/';
    const signupForm = document.querySelector('.signupForm');

    const username = signupForm.querySelector('#username').value.trim();
    const password = signupForm.querySelector('#password').value.trim();
    const email = signupForm.querySelector('#email').value.trim();
    const firstname = signupForm.querySelector('#firstname').value.trim();
    const lastname = signupForm.querySelector('#lastname').value.trim();
    const height = signupForm.querySelector('#height').value.trim();
    const weight = signupForm.querySelector('#weight').value.trim();

    const bodyData = {
        username: username,
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname,
        height: height,
        weight: weight,
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

    const response = await fetchData(signupUrl, options);

    if (response.error) {
        console.error('Error adding a new user:', response.error);
        return;
    }
    
    if (response.message) {
        console.log(response, 'success');
        showNotification("Registration successful!", "success"); 
    }

    console.log(response);
    signupForm.reset(); 
};

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector('.signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', registerUser);
    }
  });

  // function to show notification
function showNotification(message, type = "success") {
  let notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.textContent = message;

  document.body.prepend(notification); 

  setTimeout(() => {
      notification.classList.add("fade-out"); 
      setTimeout(() => notification.remove(), 500); 
  }, 2000); 
}


export {registerUser};