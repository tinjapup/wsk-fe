import "../css/style.css";
import Chart from "chart.js/auto";
import { fetchData, postData } from "./fetch.js";
import { createElement, formatDate } from "./create.js";

// New entry variables
let entry = {};
let entries = [];

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

    console.log("fetchUserInfo parsed JSON:", response);

    return response;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}
const user = await fetchUserInfo();

// fetch activities
let activitiesArray = [];
async function fetchActivities() {
  const activitiesUrl = "http://localhost:3000/api/activities";
  let options = {
    headers: {
      "Content-Type": "application/json",
      id: 0,
    },
  };
  activitiesArray = await fetchData(activitiesUrl, options);
  console.log(activitiesArray);
}
await fetchActivities();

// timespan buttons for chart
const buttonsData = [
  { id: "weekButton", text: "Last 7 entries" },
  { id: "monthButton", text: "Last 30 entries" },
  { id: "threeMonthsButton", text: "Last 90 entries" },
];


// fetch entries
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
  }
  if (!token) {
    console.log("no token");
  }

  const fetchedData = await fetchData(entriesUrl, options);

  return fetchedData;
}






// function to generate content
function generateDynamicContent() {

  // header

  const justLoggedIn = localStorage.getItem('justLoggedIn');

  let headerHTML;

  // header is different if user just logged in
  if (justLoggedIn === 'true') {
    headerHTML = `
    <div class="header-page user-header-bg">
      <div class="header-content">
        <h1>Welcome back, ${user.first_name}!</h1>
      </div>
    </div>`;

    localStorage.removeItem('justLoggedIn');
  } else {
    headerHTML = `
    <div class="header-page user-header-bg second-header">
      <div class="header-content">
        <h1>Dashboard</h1>
      </div>
    </div>`;

  }

  // activity overview sectgion
  const buttonsHTML = buttonsData
    .map(
      (button) => `
    <button id="${button.id}">${button.text}</button>
  `
    )
    .join("");

  const activityHTML = `
    <div class="column chart-column">
      <h2>Activity overview</h2>
      <div class="chart-container">
        <canvas id="user-chart"></canvas>
      </div>
      <div class="chart-buttons">
        ${buttonsHTML}
      </div>
    </div>`;

  // recent entries section
  let entriesList = entries;

  fetchEntries()
    .then((result) => {
      console.log("dynamic content", result);
      entriesList = result;
      const recentEntriesHTML = entriesList
        .sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date))
        .slice(0, 4)
        .map(
          (entry) => `
        <div class="recent-entry">
          <p>${formatDate(entry.entry_date)}</p>
          <h5>${entry.activity} ${entry.duration}min</h5>
          <h3>${entry.name}</h3>
          <p>${entry.notes}</p>
        </div>
      `
        )
        .join("");

      const recentEntriesContainerHTML = `
    <div class="column">
      <h2>Recent entries</h2>
      <div class="entry-container">
        ${recentEntriesHTML}
      </div>
      <a href="entries.html" class="button-like dark-link">View all entries</a>
    </div>`;

      // new entry section
      const newEntryHTML = `
    <div class="column new-entry-column">
      <h2>New entry</h2>
      <form id="new-entry" class="new-entry"></form>
    </div>`;

      const pageContentHTML = `
  <div class="page-content">
    <div class="three-column landing-div">
      ${activityHTML}
      ${recentEntriesContainerHTML}
      ${newEntryHTML}
    </div>
    </div>
    `;

      // add content to container
      document.querySelector("#container").innerHTML +=
        headerHTML + pageContentHTML;
      createChart(7);
      newEntry();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// generate content
generateDynamicContent();

// function to generate entries
function generateEntries() {
  let entriesList = entries;


  const fetchedEntries = fetchEntries().then((result) => {
    console.log("dynamic content", result);
    entriesList = result;
    const recentEntriesHTML = entriesList
      .sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date))
      .slice(0, 4)
      .map(
        (entry) => `
      <div class="recent-entry">
        <p>${formatDate(entry.entry_date)}</p>
        <h5>${entry.activity} ${entry.duration}min</h5>
        <h3>${entry.name}</h3>
        <p>${entry.notes}</p>
      </div>
    `
      )
      .join("");

    const recentEntriesContainerHTML = `
      ${recentEntriesHTML}`;

    document.querySelector(".entry-container").innerHTML = "";
    document.querySelector(".entry-container").innerHTML =
      recentEntriesContainerHTML;
  });
}

// create chart

let chart = null;

async function createChart(number) {

  const ctx = document.getElementById("user-chart").getContext("2d");
  const canvas = document.getElementById("user-chart");

    // save measurements to prevent page content from stretching
    canvas.height
    const initialCanvasSize = {
      width: canvas.width,
      height: canvas.height,
    };

    canvas.width = initialCanvasSize.width;
    canvas.height = initialCanvasSize.height;

    if (chart) {
      chart.destroy();
    }

  try {
    // fetch entries
    const result = await fetchEntries();
    console.log("chart result", result);

    if (!result.length) {
      console.log("No activity data available");
      return;
    }

    number = Math.min(number, result.length);
    const slicedData = result.slice(-number);

    const durations = slicedData.map((entry) => entry.duration);
    const labels = slicedData.map((entry) => formatDate(entry.entry_date).slice(0, 6));

    console.log("durations, labels", durations, labels);


    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Activity Duration (min)",
            data: durations,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            borderWidth: 2,
          },
        ],
      },
      options: getChartOptions(slicedData, number),
    });
  } catch (error) {
    console.error("Error fetching activity data:", error);
  }
}

function getChartOptions(result, number) {
  const durations = result.map((d) => d.duration);
  const maxValue = Math.max(...durations) + 10;

  return {
    aspectRatio: 1.05,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            let dataPoint = result.length - number + tooltipItem.dataIndex;
            return ` Duration ${result[dataPoint].duration} mins`;
          },
          title: (tooltipItem) => {
            let dataPoint = result.length - number + tooltipItem[0].dataIndex;
            return `${result[dataPoint].name}`;
          },
        },
      },
    },
    scales: {
        y: {
          max: maxValue,
          min: 0,
          title: { display: true, text: "Duration (min)" },
      },
    },
  };
}

function clearForm(form) {
  form.innerHTML = "";
}

function renderFirstForm() {
  const form = document.getElementById("new-entry");
  form.classList.add("hidden-left");

  setTimeout(() => {
    clearForm(form); 
    form.classList.remove("hidden-left");
    form.classList.add("visible");
    form.appendChild(createElement("label", { for: "date" }, "Date"));
    const dateInput = createElement("input", {
      type: "date",
      id: "date",
      name: "date",
      required: "true",
    });

    if (entry.date) dateInput.value = entry.date;
    form.appendChild(dateInput);

    form.appendChild(createElement("label", { for: "activity" }, "Activity"));
    const select = createElement("select", {
      id: "activity",
      name: "activity",
      required: "true",
    });
    select.appendChild(
      createElement(
        "option",
        { value: "", selected: "true", disabled: "true" },
        "Select activity"
      )
    );

    console.log("metData", activitiesArray);
    console.log(Array.isArray(activitiesArray));

    activitiesArray.forEach((item) => {
      const activity = item.name;
      const option = document.createElement("option");
      option.value = activity;
      option.id = item.activity_id;
      option.textContent = activity.charAt(0).toUpperCase() + activity.slice(1);

      if (entry.activity === activity) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    form.appendChild(select);


    form.appendChild(
      createElement("label", { for: "duration" }, "Duration (minutes)")
    );
    const durationInput = createElement("input", {
      type: "number",
      id: "duration",
      name: "duration",
      required: "true",
    });
    if (entry.duration) durationInput.value = entry.duration;
    form.appendChild(durationInput);

    const nextButton = createElement(
      "button",
      { type: "submit", id: "next1" },
      "Next"
    );
    form.appendChild(nextButton);

    nextButton.addEventListener("click", function (e) {
      e.preventDefault();
      form.reportValidity();
      if (!form.date.value || !form.activity.value || !form.duration.value)
        return;

      entry.date = form.date.value;
      entry.activity = form.activity.value;
      entry.duration = form.duration.value;
      entry.cal = caloryCounter();
      console.log(entry);

      form.classList.remove("visible");
      form.classList.add("hidden-right");
      setTimeout(() => renderSecondForm(), 500);
    });

    console.log(entry);
    form.classList.replace("hidden-right", "visible");
  }, 50);
}

function caloryCounter() {
  console.log(entry);

  const metFactor = activitiesArray.find(
    (item) => item.name.toLowerCase() === entry.activity.toLowerCase()
  );
  const metNumber = metFactor.met;

  console.log(metNumber);
  const weight = user.weight;
  const duration = entry.duration / 60;

  const burned = metNumber * weight * duration;
  console.log(burned);
  return burned.toFixed(2);
}

function renderSecondForm() {
  const form = document.getElementById("new-entry");
  form.classList.add("hidden-right");
  form.classList.remove("visible");

  setTimeout(() => {
    clearForm(form);
    form.classList.remove("hidden-right");
    form.classList.add("visible");

    form.appendChild(
      createElement(
        "div",
        {
          id: "caloriesBurned",
        },
        "Calories burned:"
      )
    );

    document.getElementById("caloriesBurned").appendChild(
      createElement(
        "div",
        {
          id: "caloriesBurned-n",
        },
        `${entry.cal}`
      )
    );

    form.appendChild(
      createElement("label", { for: "name" }, "Name of the activity")
    );

    const nameInput = createElement("input", {
      type: "text",
      id: "name",
      name: "name",
    });

    if (entry.name) nameInput.value = entry.name;
    form.appendChild(nameInput);

    form.appendChild(createElement("label", { for: "comment" }, "Comments"));
    const commentTextarea = createElement("textarea", {
      id: "comment",
      name: "comment",
    });
    if (entry.comment) commentTextarea.value = entry.comment;
    form.appendChild(commentTextarea);

    const btnDiv = createElement("div", { class: "chart-buttons" });
    const previousButton = createElement(
      "button",
      { type: "button", id: "previous" },
      "Previous"
    );
    const submitButton = createElement(
      "button",
      { type: "submit", id: "submit" },
      "Submit"
    );
    btnDiv.appendChild(previousButton);
    btnDiv.appendChild(submitButton);
    form.appendChild(btnDiv);

    previousButton.addEventListener("click", function (e) {
      e.preventDefault();
      entry.name = form.name.value;
      entry.comment = form.comment.value;
      form.classList.replace("visible", "hidden-right");
      console.log("Current entry:", entry);
      setTimeout(() => renderFirstForm(), 500);
    });

    submitButton.addEventListener("click", function (e) {
      e.preventDefault();
      entry.name = form.name.value;
      entry.comment = form.comment.value;
      console.log("Final entry:", entry);
      entries.push(entry);
      console.log("All entries", entries);
      const entryForm = document.querySelector(".new-entry");
      sendData(entry);
      entry = {};
      renderFirstForm();
      generateEntries();
      createChart(7);
    });

    setTimeout(() => {
      form.classList.replace("hidden-left", "visible");
    }, 50);
  });
}

async function sendData(entry) {
  const entriesUrl = "http://localhost:3000/api/entries";
  let token = localStorage.getItem("token");

  let options = {};

  if (token) {

    options = {

      body: JSON.stringify(entry),
      method: "POST",
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

function newEntry() {
  renderFirstForm();
}

document
  .querySelector("#container")
  .addEventListener("click", function (event) {
    if (event.target.id === "weekButton") {
      createChart(7);
    } else if (event.target.id === "monthButton") {
      createChart(30);
    } else if (event.target.id === "threeMonthsButton") {
      createChart(90);
    }
  });
