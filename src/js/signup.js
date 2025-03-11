import "../css/style.css";
import { registerUser } from "./signupform.js";

document.querySelector("#container").innerHTML += `
      

      <!-- HEADER IMG STARTS -->

      <div class="header-page second-header">
      <div class="header-content">
      <h1>Register</h1>
      </div>
      </div>
      </div>

      <!-- HEADER IMG ENDS -->

      <!-- PAGE CONTENT STARTS -->

      <div class="page-content">


      <div>
      <div class="column img-column">
      </div>
      <div class="column">   

      <form class="signupForm">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <span class="error" id="emailError"></span>
        </div>
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
            <span class="error" id="usernameError"></span>
        </div>
        <div class="form-group">
            <label for="firstname">First name</label>
            <input type="text" id="firstname" name="firstname" required>
            <span class="error" id="firstnameError"></span>
        </div>
        <div class="form-group">
            <label for="lastname">Last name</label>
            <input type="text" id="lastname" name="lastname" required>
            <span class="error" id="lastnameError"></span>
        </div>
        <div class="form-group">
            <label for="birthdate">Birthdate</label>
            <input type="date" id="birthdate" name="birthdate" required>
            <span class="error" id="birthdateError"></span>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
            <span class="error" id="passwordError"></span>
        </div>
        <div class="form-group">
            <label for="passwordConfirm">Confirm Password</label>
            <input type="password" id="passwordConfirm" name="passwordConfirm" required>
            <span class="error" id="passwordConfirmError"></span>
        </div>
        <div class="form-group">
            <label for="height">Height (cm)</label>
            <input type="number" id="height" name="height" required>
            <span class="error" id="heightError"></span>
        </div>
        <div class="form-group">
            <label for="weight">Weight (kg)</label>
            <input type="number" id="weight" name="weight" required>
            <span class="error" id="weightError"></span>
        </div>
        <button type="submit">Sign Up</button>
    </form>
      
      </div>
      </div>



      <!-- PAGE CONTENT ENDS -->
`;

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector('.signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', registerUser);
    }
    });


