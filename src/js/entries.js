import "../css/style.css";
import { createElement, formatDate } from "./create.js";
import { fetchData, postData } from "./fetch.js";

// function to fetch entries
async function fetchEntries() {
  
  const entriesUrl = "http://localhost:3000/api/entries";

  let token = localStorage.getItem("token");
  let options = {};

  if (token) {
    options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        id: 0,
      },
    };
  } else if (!token) {
    console.log("no token");
  }

  const fetchedData = await fetchData(entriesUrl, options);

  return fetchedData;
}

// function to generate content
async function generateDynamicContent() {
  const page = createElement("div", { class: "page-content" }, null);
  page.appendChild(createElement("h1", { for: "date" }, "All entries"));

  const entriesContainer = page.appendChild(
    createElement("div", { class: "all-entries-container" }, null)
  );
  document.getElementById("container").appendChild(page);

  try {
    const entriesList = await fetchEntries();
    console.log("dynamic content", entriesList);

    entriesList
      .sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date))
      .forEach((entry) => {

        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry-all");
        entryDiv.id = `entry-all-${entry.entry_id}`;

        entryDiv.innerHTML = `
          <div>
            <p>${formatDate(entry.entry_date)}</p>
          </div>
          <div id="entry-info-${entry.entry_id}">
            <h3>${entry.name}</h3>
            <h5>${entry.activity} ${entry.duration} min</h5>
            <p>${entry.notes}</p>
          </div>
          <div>
            <button class="edit-btn">Edit</button>
          </div>
          <!-- Hidden Edit Form -->
          <div class="edit-form-container">
          <div id="edit-form-${entry.entry_id}" class="edit-form">
          <h3>Edit entry</h3>
          <form class="edit-form-box" id="edit-entry-form-${entry.entry_id}">
          <label for="name-${entry.entry_id}">Title</label>
            <input type="text" value="${entry.name}" id="name-${
          entry.entry_id
        }">
            <label for="activity-${entry.activity}">Activity</label>
            <input type="text" value="${entry.activity}" id="activity-${
          entry.entry_id
        }" disabled>
            <label for="duration-${entry.entry_id}">Duration</label>
            <input type="number" value="${entry.duration}" id="duration-${
          entry.entry_id
        }" disabled>
            <label for="notes-${entry.entry_id}">Notes</label>
            <textarea id="notes-${entry.entry_id}">${entry.notes}</textarea>
            <div class="edit-form-buttons">
            <div class="delete-div-buttons">
            <button class="save-btn" type="submit" id="save-btn-${
              entry.entry_id
            }">Save</button>
            <button class="delete-btn" type="submit" id="delete-btn-${
              entry.entry_id
            }">Delete</button>
            <button class="cancel-btn">Cancel</button>
            </div>
            </div>
            </form>
          </div>
          </div>
        `;

        const editButton = entryDiv.querySelector(".edit-btn");
        const saveButton = entryDiv.querySelector(".save-btn");
        const deleteButton = entryDiv.querySelector(".delete-btn");
        const cancelButton = entryDiv.querySelector(".cancel-btn");
        const editForm = entryDiv.querySelector(`#edit-form-${entry.entry_id}`);
        const editFormContainer =
          entryDiv.querySelector(`.edit-form-container`);

        editButton.addEventListener("click", () => {
          editFormContainer.classList.toggle("edit-visible");
        });

        entry = {};

        saveButton.addEventListener("click", (e) => {
          e.preventDefault(); 

          const entryDiv = e.target.closest(".entry-all");

          const entryId = e.target.id.replace("save-btn-", "");

          const nameInput = entryDiv.querySelector(`#name-${entryId}`);
          const notesInput = entryDiv.querySelector(`#notes-${entryId}`);

          const updatedEntry = {
            entry_id: entryId,
            name: nameInput.value,
            notes: notesInput.value,
          };

          console.log("Updated Entry:", updatedEntry, entryId);
          console.log("Updated EntryId:", entryId);
          sendData(updatedEntry, "PUT");

          showNotification("Update successful!", "success"); 

          const updatedDiv = document.querySelector(`#entry-all-${entryId}`);

          const infoDiv = document.querySelector(`#entry-info-${entryId}`);

          if (infoDiv) {
            const titleElement = infoDiv.querySelector("h3"); 
            const notesElement = infoDiv.querySelector("p"); 

            if (titleElement) titleElement.textContent = updatedEntry.name; 
            if (notesElement) notesElement.textContent = updatedEntry.notes; 



          } else {
            console.error(`Element #entry-info-${entryId} not found.`);
          }

          setTimeout(() => {
            editFormContainer.classList.toggle("edit-visible");
          }, 2000);

        });


        deleteButton.addEventListener("click", (e) => {

          e.preventDefault(); 

          let message = "Sure to delete entry?";
          
          const entryDiv = e.target.closest(".entry-all");

          const entryId = e.target.id.replace("delete-btn-", "");

          const editButtonsContainer = entryDiv.querySelector(".edit-form-buttons"); 
          const deleteDiv = createElement("div", { class: "delete-div" }, `${message}`);
          editButtonsContainer.appendChild(deleteDiv);
          const deleteDivButtons = deleteDiv.appendChild(createElement("div", { class: "delete-div-buttons" }, null));
          deleteDivButtons.appendChild(createElement("button", { class: `ensure-btn` }, "Yes, delete entry"));
          deleteDivButtons.appendChild(createElement("button", null, "Cancel"));


          deleteData(entryId, entryDiv);


          });

          





        cancelButton.addEventListener("click", () => {
          editForm.style.display = "none";
        });

        entriesContainer.appendChild(entryDiv);
      });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// function to delete entry
function deleteData(entryId, entryDiv) {
  const deleteButtonEnsure = document.querySelector(".ensure-btn");

          deleteButtonEnsure.addEventListener("click", (e) => {

            e.preventDefault(); 

            const deletingEntry = {
              entry_id: entryId,
            };
  
            sendData(deletingEntry, "DELETE");

            const editFormContainer =
          entryDiv.querySelector(`.edit-form-container`);

          const deletingDiv = document.getElementById(`entry-all-${entryId}`)  
            setTimeout(() => {
              editFormContainer.classList.toggle("edit-visible");
              
              deletingDiv.classList.add("disappearing-div");
            }, 2000);

            setTimeout(() => {
              deletingDiv.remove();
            }, 2500);

            });
}

async function sendData(entry, method) {
  const entriesUrl = "http://localhost:3000/api/entries";
  let token = localStorage.getItem("token");

  let options = {};

  console.log("Send data entry", entry);

  if (token) {
    options = {
      body: JSON.stringify(entry),
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

  postData(entriesUrl, options);
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

generateDynamicContent();
