
// function to fetch data
const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        const errorData = await response.json();
        return {error: errorData.message || 'An error occurred'};
      }

      console.log(response);
      return await response.json(); 
    } catch (error) {
      console.error('fetchData() error:', error.message);
      return {error: error.message};
    }
  };

  // function to post data
const postData = async (url, options = {}) => {
    console.log("Sending entry:", options);

    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      return await response.json();
    } catch (error) {
      console.error("Error posting data:", error);
      return null;
    }

  };

  // function to get data

const getData = async (url, options = {}) => {
    console.log("Getting data:", options);
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      return await response.json();
    } catch (error) {
      console.error("Error posting data:", error);
      return null;
    }
  };

  export {fetchData, postData, getData};