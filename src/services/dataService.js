import api from "../../app/api";

export const fetchData = async (endpoint, method = "get", body) => {
  try {
    let response;
    if (method == "get") {
      response = await api.get(endpoint);
    } else if (method == "put") {
      response = await api.put(endpoint, body);
    } else if (method == "delete") {
      response = await api.delete(endpoint, { data: body });
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error?.response?.data?.error; // handle error appropriately
    // return error;
  }
};
