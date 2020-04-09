import axios from 'axios';

const API_ROOT = 'https://api.github.com';

const instance = axios.create({
   baseURL: API_ROOT,
});

const limitOffset = (limit, p) => `per_page=${limit}&page=${p}`;
const responseBody = (res) => res.data;

const users = {
   getAll: ({ page, limit = 12, query = '' }) =>
      instance.get(`/search/users?${limitOffset(limit, page)}&q=${encodeURIComponent(query)}`).then(responseBody),
   get: (userName) => instance.get(`/users/${userName}`).then(responseBody),
};

export default {
   users,
};
