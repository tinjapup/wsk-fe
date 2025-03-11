
// function to  create elements
function createElement(type, attributes = {}, text = "") {
    const element = document.createElement(type);
    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    if (text) element.textContent = text;
    return element;
  }

  // function to format dates to usable format
  function formatDate(dateString) {
    const date = new Date(dateString); 
  
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
  
    return `${day}.${month}.${year}`; 
  }

  export {createElement, formatDate};

