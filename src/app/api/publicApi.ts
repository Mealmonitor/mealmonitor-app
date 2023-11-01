import axios from 'axios';

const baseURL = 'http://192.168.100.26:8080';

export async function getMeals() {
  try {
    const response = await axios.get(baseURL + '/meals', {
      params: {
        day: '2023-10-31',
      },
    });
    return response.data; // assuming the meals are in the data property
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error so that it can be caught and handled in the component
  }
}
