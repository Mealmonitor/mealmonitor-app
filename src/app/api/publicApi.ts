import axios from 'axios';

const baseURL = 'http://192.168.100.12:8080';

export const parseDate = (date: Date) => {
  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0')
  );
};

export async function getMeals(date) {
  try {
    const response = await axios.get(baseURL + '/meals', {
      params: {
        day: parseDate(date),
      },
    });
    return response.data; // assuming the meals are in the data property
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error so that it can be caught and handled in the component
  }
}
