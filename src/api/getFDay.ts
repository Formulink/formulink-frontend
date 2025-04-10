import axios from 'axios';
import * as url from 'node:url'

export const GetFday = async () => {
  fetch('http://localhost:8082/formulas/fday')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();  // Читаем тело как JSON
    })
    .then(data => {
      console.log(data);  // Ваши данные из API
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

}
