import axios from "axios";
const BASE_URL = "http://localhost:8080";

export async function fetchData(api: string, body?: any) {
  try {
    if (body) {
      const response = await axios.post(`${BASE_URL}/${api}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } else {
      const response = await axios.get(`${BASE_URL}/${api}`);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}