import axios from 'axios';
import {Meal, ProductDto} from './domain';

const baseURL = 'http://192.168.1.103:8088';

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

export async function deleteMeal(meal: Meal) {
  try {
    const response = await axios.delete(baseURL + '/meals/' + meal.id);
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error so that it can be caught and handled in the component
  }
}

export async function getProductByBarcode(barCode: string) {
  try {
    const response = await axios.get(baseURL + '/products/' + barCode);
    console.log(response.data);
    return response.data as ProductDto;
  } catch (error) {
    console.error(error);
    throw error; // re-throw the error so that it can be caught and handled in the component
  }
}
