import axios from 'axios';

const baseURL = 'https://newsapi.org/v2/top-headlines';

// 'https://newsapi.org/v2/top-headlines?country=tw&apiKey=c14ac1132c5b4fabac7ee0bb
// 1818ea79'

export const apiHelper = axios.create({
  baseURL
})