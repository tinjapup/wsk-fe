(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();function a(){localStorage.removeItem("token"),console.log("Sign out clicked"),window.location.replace("login.html")}function r(){console.log("initializeNav called"),localStorage.getItem("token")?document.querySelector("#container").insertAdjacentHTML("beforeend",`
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
    `):document.querySelector("#container").insertAdjacentHTML("beforeend",`
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
      `),console.log("HTML appended");const t=document.getElementById("signOut");t?(t.addEventListener("click",a),console.log("Button found and event listener added")):console.log("Button not found")}r();document.querySelector("#container").addEventListener("click",l=>{l.target.id==="signOut"&&a()});document.addEventListener("DOMContentLoaded",()=>{document.querySelector("footer").innerHTML+=`
    
    <div class="subscribe">
    
          <div class="subscribe-content">
    
          <h1>Subscribe to our newsletter</h1>
          <h2>Hear the newest about Tribe+</h2>
    
          <div class="header-form">
          <input type="text" placeholder="Enter your email"></input>
          <button>Subscribe</button>
          </div>
    
          </div>
          </div>
          
    `});document.addEventListener("DOMContentLoaded",()=>{document.querySelector("footer").innerHTML+=`

      <div class="footer-container">
      <div class="flex-content">
      &copy; Tribe+
      </div>

      <!--
      <div class="flex-content">
            <ul>
                  <li class="title">Title</li>
                  <li><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
            </ul>
      </div>
      <div class="flex-content">
            <ul>  
                  <li class="title">Title</li>
                  <li><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
            </ul>
      </div>
      <div class="flex-content">
            <ul>
                  <li class="title">Title</li>
                  <li><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
                  <li><a href="#">Link</a></li>
            </ul>
      </div>
      -->
      </div>
`});document.querySelector("#container").innerHTML+=`
      

      <!-- HEADER IMG STARTS -->

      <div class="header-img" >
      <video autoplay muted loop id="myVideo">
            <source src="/img/header-video.mp4" type="video/mp4">
            </video>
      <div class="index-header-content">
      
      <h1>Tribe+</h1>
      <h2>One entry a time towards a healthier life</h2>
      <div class="header-form">
      <input type="text" placeholder="Enter your email">
      <button>Sign up</button>
      </div>
      </div>
      </div>
      </div>

      <!-- HEADER IMG ENDS -->

      <!-- PAGE CONTENT STARTS -->

      <div class="page-content">

      <!-- OUR PHILOSOPHY -->

      <div class="two-column box">
      <div class="column img-column">
      </div>
      <div class="column" id="about-us">
      <h2>About us</h2> 
      <h3>Subheading</h3>      
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
      </div>

      <!-- COMMUNITY -->

      <div class="two-column box">
      <div class="column" id="community"> 
      <h2>Community</h2> 
      <h3>Subheading</h3>      
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
      <div class="column img-column">
      </div>
      </div>

      <!-- FEATURES -->

      <div class="three-column box">
      <div class="one-column" id="features">
      <h2>Features</h2> 
      <h3>Subheading</h3>      
      </div>
      <div class="column"><h4>Title</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p></div>
      <div class="column"><h4>Title</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p></div>
      <div class="column"><h4>Title</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p></div>
      <div class="column"><h4>Title</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p></div>
      <div class="column"><h4>Title</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p></div>
      <div class="column"><h4>Title</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p></div>
      </div>

      <!-- LEARN -->

      <div class="box" id="learn">
      <h2>Learn</h2> 
      <h3>Subheading</h3>    

      <div class="learn-column">

      <div class="learn-column-content">
      <div class="learn-column-img"></div>
      <div class="learn-column-text">
      <h4>Title</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      <button>Read more</button>
      </div>
      </div>

      <div class="learn-column-content">
      <div class="learn-column-img"></div>
      <div class="learn-column-text">
      <h4>Title</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      <button>Read more</button>
      </div>
      </div>

      <div class="learn-column-content">
      <div class="learn-column-img"></div>
      <div class="learn-column-text">
      <h4>Title</h4>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      <button>Read more</button>
      </div>
      </div>

      </div>

      </div>



      <!-- PAGE CONTENT ENDS -->
`;
