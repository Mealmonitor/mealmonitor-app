import axios from 'axios';

const baseURL = 'http://192.168.100.26:8080';

export async function getMeals(date) {
  try {
    const response = await axios.get(baseURL + '/meals', {
      params: {
        day: date,
      },
    });
    return response.data; // assuming the meals are in the data property
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error so that it can be caught and handled in the component
  }
}
