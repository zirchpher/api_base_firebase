import { fetchData } from "./src/api.js";
import axios from "axios";

const getData = async () => {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.log("Error en la aplicación:", error);
  }
};

const addStudent = () => {
  const nombre = document.querySelector("#name").value;
  const dni = document.querySelector("#dni").value;

  const datos = {
    nombre: nombre,
    dni: dni,
  };

  axios.post("http://localhost:3000/api/add-student", datos)
    .then((response) => {
      if (response.status === 201) {
        // Los datos se han agregado correctamente
        console.log("Datos agregados correctamente");
      } else {
        // Maneja el caso en que la inserción de datos falle
        console.error("Error al agregar datos:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
};

document.querySelector("#add-student").addEventListener("click", addStudent);

getData();
