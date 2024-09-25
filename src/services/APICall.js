const backendUrl = process.env.REACT_APP_BACKEND_URL ||"http://localhost:3001/job/";

function createHeaders(token = null) {
    const headers = {
      "Content-Type": "application/json",
    };
  
    return headers;
  }

  async function makeRequest(url, data = null, method = "POST") {
    const headers = createHeaders();
    const payload = data;
  
    try {
      const response = await fetch(`${backendUrl}${url}`, {
        method,
        headers,
        body: method === "POST" ? payload : data,
      });
      const result = await response.json();
      return { response, result };
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }
  }
  
  export function postCall(url, data) {
    console.log('post')
    return makeRequest(url, data, "POST");
  }
  
  
  export function getCall(url,body) {
  
    return makeRequest(url, body, "GET");
  }

  export function deleteCall(url, body = null) {
    return makeRequest(url, body, "DELETE");
  }