// function to log out
function logOut() {
    localStorage.removeItem("token");
    console.log("Sign out clicked");
    window.location.replace("login.html");
}

// function to create navigation
function initializeNav() {
    console.log("initializeNav called");
  
    let token = localStorage.getItem("token");


    // if logged in

    if (token) {
    document.querySelector("#container").insertAdjacentHTML(
        "beforeend",
        `
        <nav>
            <div id="flex-container">
                <div class="flex-content page-title"><a href="/pages/userlandingpage.html" class="pagename">Tribe+</a></div>
                <div class="flex-content">
                    <ul id="nav-links">
                        <li><a href="/pages/userlandingpage.html">Home</a></li>
                        <li><a href="/pages/entries.html">My diary</a></li>
                        <!--
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Learn</a></li>
                        -->
                        <li><a href="/pages/profile.html">Profile</a></li>
                        <li><button id="signOut" class="button-like">Sign out</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    `
    );
  } else { // if not logged in
      document.querySelector("#container").insertAdjacentHTML(
          "beforeend",
          `
    <nav>
    <div id="flex-container">
    <div class="flex-content page-title"><a href="index.html" class="pagename">Tribe+</a></div>
    <div class="flex-content">
    <ul id="nav-links">
    <li><a href="index.html#about-us">About us</a></li>
    <li><a href="index.html#community">Community</a></li>
    <li><a href="index.html#features">Features</a></li>
    <li><a href="index.html#learn">Learn</a></li>
    <li><a href="/pages/login.html" class="button-like">Login</a></li>
    <li><a href="/pages/signup.html" class="button-like">Register</a></li>
    <li>
    </ul>
    </div>
    </div>
    </div>
    </nav>
      `
  );}
    console.log("HTML appended");

    
    const signOutButton = document.getElementById("signOut");
    if (signOutButton) {
        signOutButton.addEventListener("click", logOut);
        console.log("Button found and event listener added");
    } else {
        console.log("Button not found");
    }
}

initializeNav();

// add event listener to sign out button
document.querySelector("#container").addEventListener("click", (event) => {
    if (event.target.id === "signOut") {
        logOut();
    }
});