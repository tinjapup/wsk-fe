const usersUrl = "http://localhost:3000/api/users";
const entriesUrl = "http://localhost:3000/api/entries";

let headers = {};

let token = localStorage.getItem("token");

if (token) {
  headers = {
    Authorization: `Bearer ${localStorage.token}`,
    "Content-Type": "application/json",
  };
}
const options = {
  headers: headers,
};

console.log("headers", headers);

async function fetchData(usersUrl, options) {
  try {
    const response = await fetch(usersUrl, options, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null or handle the error appropriately
  }
}

async function postData(url, entry) {
    console.log("Sending entry:", JSON.stringify(entry));
    console.log("Headers:", headers);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers, // FIX: Use the correct headers with Authorization
        body: JSON.stringify(entry),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error posting data:", error);
      return null;
    }
  }
  
  let entry = {
    "entry_date": "2025-02-12",
    "mood": "Good vibes",
    "weight": 60,
    "sleep_hours": 6,
    "notes": "Such a good day"
   };
  
  // Fetch users (GET request)
  //const users = await fetchData(usersUrl, options);
  //console.log(users);
  
  // Post new entry (POST request)
  await postData(entriesUrl, entry); // FIX: Pass entry instead of options