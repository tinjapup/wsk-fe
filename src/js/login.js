import "../css/style.css";
import { fetchData } from "./fetch.js";
import { loginUser } from "./loginform.js";
import { createElement } from "./create.js";

document.querySelector("#container").innerHTML += `

      <!-- HEADER IMG STARTS -->

      <div class="header-page login-header">

      <video autoplay muted loop id="myVideo">
           <source src="/img/header-video.mp4" type="video/mp4">
      </video>

      <div class="index-header-content">
      <h1>Login</h1>
     
      <div class="index-header-form login-form">
      <form class="loginForm">
      <input id="username-login" type="text" placeholder="Email or username" required></input>
      <input id="password-login" type="password" placeholder="Password" required></input>
      <button type="submit">Login</button>
      </form>
      </div>
       </div>


      </div>

      <!-- HEADER IMG ENDS -->

`;

document.addEventListener("DOMContentLoaded", () => {
const loginForm = document.querySelector('.loginForm');
if (loginForm) {
      loginForm.addEventListener('submit', loginUser);
}
});


