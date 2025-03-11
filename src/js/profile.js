import "../css/style.css";
import { fetchData, getData, postData } from "./fetch.js";
import { createElement } from "./create.js";

// fetch user info
async function fetchUserInfo() {
  const meUrl = "http://localhost:3000/api/auth/me";

  let token = localStorage.getItem("token");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetchData(meUrl, options);

    return response;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}
const userInfo = await fetchUserInfo();

// function to create form for updating user information
async function userForm() {
  const user = await fetchUserInfo();

  const page = document.getElementById("profile");

  page.appendChild(createElement("h1", null, "Profile"));
  page.appendChild(createElement("h2", null, "User settings"));

  const form = createElement("form", null, null);

  page.appendChild(form);

  form.appendChild(createElement("label", { for: "username" }, "Username"));
  form.appendChild(
    createElement(
      "input",
      {
        id: "username",
        disabled: "true",
        value: user.username !== undefined ? `${user.username}` : "",
      },
      null
    )
  );

  form.appendChild(createElement("label", { for: "first-name" }, "First name"));
  form.appendChild(
    createElement(
      "input",
      {
        id: "first-name",
        value: user.first_name !== undefined ? `${user.first_name}` : "",
      },
      null
    )
  );

  form.appendChild(createElement("label", { for: "last-name" }, "Last name"));
  form.appendChild(
    createElement(
      "input",
      {
        id: "last-name",
        value: user.last_name !== undefined ? `${user.last_name}` : "",
      },
      null
    )
  );

  form.appendChild(createElement("label", { for: "email" }, "Email"));
  form.appendChild(
    createElement(
      "input",
      { id: "email", value: user.email !== undefined ? `${user.email}` : "" },
      null
    )
  );

  form.appendChild(createElement("label", { for: "weight" }, "Weight (kg)"));
  form.appendChild(
    createElement(
      "input",
      {
        id: "weight",
        value: user.weight !== (undefined || null) ? `${user.weight}` : "",
        placeholder: "kg",
        type: "number",
      },
      null
    )
  );

  form.appendChild(createElement("label", { for: "height" }, "Height (cm)"));
  form.appendChild(
    createElement(
      "input",
      {
        id: "height",
        value: user.height !== (undefined || null) ? `${user.height}` : "",
        placeholder: "cm",
        type: "number",
      },
      null
    )
  );

  form.appendChild(createElement("button", { class: "save-btn" }, "Save"));

  const saveButton = form.querySelector(".save-btn");

  // save and submit user infomation
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();

    const firstnameInput = form.querySelector("#first-name");
    const lastnameInput = form.querySelector("#last-name");
    const emailInput = form.querySelector("#email");
    const weightInput = form.querySelector("#weight");
    const heightInput = form.querySelector("#height");

    const updatedInfo = {
      first_name: firstnameInput.value,
      last_name: lastnameInput.value,
      email: emailInput.value,
      weight: weightInput.value,
      height: heightInput.value,
    };

    // combine updates with old information
    const infoCombined = { ...userInfo, ...updatedInfo };

    try {
      sendData(infoCombined, "PUT", "http://localhost:3000/api/users");
    } catch (e) {
      console.log(e);
    }
  });
}

// function to create form for changing password
async function passwordForm() {
  page.appendChild(
    createElement("div", { class: "profile-btn-container" }, null)
  );

  const btnContainer = document.querySelector(".profile-btn-container");
  page.appendChild(createElement("h2", null, "Change password"));

  const form = createElement("form", null, null);
  page.appendChild(form);

  form.appendChild(
    createElement("label", { for: "old-password" }, "Old password")
  );
  form.appendChild(
    createElement("input", { id: "old-password", type: "password" })
  );

  form.appendChild(
    createElement("label", { for: "new-password" }, "New password")
  );
  form.appendChild(
    createElement("input", { id: "new-password", type: "password" })
  );

  form.appendChild(
    createElement("label", { for: "confirm-password" }, "Confirm password")
  );
  form.appendChild(
    createElement("input", { id: "confirm-password", type: "password" })
  );

  form.appendChild(
    createElement("button", { class: "change-btn" }, "Change password")
  );

  const changeButton = form.querySelector(".change-btn");

  changeButton.before(
    createElement(
      "div",
      { id: "password-warning", class: "form-warning" },
      null
    )
  );

  changeButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const oldPassword = form.querySelector("#old-password").value;
    const newPassword = form.querySelector("#new-password").value;
    const confirmPassword = form.querySelector("#confirm-password").value;

    if (newPassword !== confirmPassword && newPassword != null) {
      document.getElementById("password-warning").innerText =
        "Passwords have to match";
    } else {
      // check password
      const checkInfo = {
        username: userInfo.username,
        password: oldPassword,
      };

      const options = {
        body: JSON.stringify(checkInfo),
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      };
      const passwordUrl = "http://localhost:3000/api/auth/check";
      const response = await fetchData(passwordUrl, options);

      if (response.status == 200) {
        const infoCombined = { ...userInfo, ...checkInfo };
        sendData(
          infoCombined,
          "PUT",
          "http://localhost:3000/api/users/password"
        );

        showNotification("Update successful!", "success");
      }

      if (!response.ok) {
        console.log(response);
      }
    }
  });
}

const page = createElement(
  "div",
  { class: "page-content", id: "profile" },
  null
);
document.getElementById("container").appendChild(page);

async function deleteForm() {
    page.appendChild(
        createElement("div", { class: "profile-btn-container" }, null)
      );
    
      const btnContainer = document.querySelector(".profile-btn-container");
      page.appendChild(createElement("h2", null, "Delete account"));
    
      const form = createElement("form", null, null);
      page.appendChild(form);
    
      form.appendChild(
        createElement("label", { for: "current-password" }, "Enter password")
      );
      form.appendChild(
        createElement("input", { id: "current-password", type: "password" })
      );
    
      form.appendChild(
        createElement("button", { class: "change-btn" }, "Delete account")
      );
    
      const changeButton = form.querySelector(".change-btn");
    
      changeButton.before(
        createElement(
          "div",
          { id: "password-warning", class: "form-warning" },
          null
        )
      );
    
      changeButton.addEventListener("click", async (e) => {
        e.preventDefault();
    
        const oldPassword = form.querySelector("#current-password").value;
    
        
          // check password
          const checkInfo = {
            username: userInfo.username,
            password: oldPassword,
          };
    
          const options = {
            body: JSON.stringify(checkInfo),
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
          };
          const passwordUrl = "http://localhost:3000/api/auth/check";
          const response = await fetchData(passwordUrl, options);
          console.log("delete response", response);
    
          if (response.status = 200) {

            

            // Delete account
            let token = localStorage.getItem("token");
            const deleteUrl = "http://localhost:3000/api/users";
            const deleteOptions = {
                body: JSON.stringify(checkInfo),
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }

            console.log("deleteOptions", deleteOptions);

            const deleteResponse = await fetchData(deleteUrl, deleteOptions);
            console.log(deleteResponse);

            // Show notification
            showNotification("Account deleted!", "success");

            localStorage.removeItem("token");
            window.location.replace("login.html");
          
    
          if (!response.ok) {
            console.log(response);
          }
        }
      });
}

// generate page content
async function generateDynamicContent() {
  await userForm();
  await passwordForm();
  await deleteForm();
}
await generateDynamicContent();

// function to send data
async function sendData(user, method, url) {
  let token = localStorage.getItem("token");

  let options = {};

  if (token) {
    options = {
      body: JSON.stringify(user),
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
  if (!token) {
    console.log("no token");
  }

  try {
    await postData(url, options);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

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
