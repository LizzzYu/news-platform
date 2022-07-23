import { apiHelper } from '../utils/helper';

const API_KEY = 'c14ac1132c5b4fabac7ee0bb1818ea79'

const fetchNews = (paramStr) => {
  let params = `?${paramStr}&apiKey=${API_KEY}`
  return apiHelper.get(params)
}

export default fetchNews
