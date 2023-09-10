import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Reemplaza con la URL de tu servidor Node.js

export async function fetchData() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/data`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos desde la API:", error);
    throw error;
  }
}
