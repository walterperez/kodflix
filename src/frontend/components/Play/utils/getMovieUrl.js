import axios from 'axios';

export default async function getMoviesUrl(id) {
  const response = await axios.get(`/rest/shows/${id}`);
  return response;
}
