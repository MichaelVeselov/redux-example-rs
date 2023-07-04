import httpService from './http.service';

const todoEndPoint = 'todos';

const todoService = {
  fetch: async () => {
    const { data } = await httpService.get(todoEndPoint, {
      params: { _page: 1, _limit: 10 },
    });
    return data;
  },
  add: async () => {
    const { data } = await httpService.post(todoEndPoint, {
      title: 'tempora porro et',
      completed: false,
    });
    return data;
  },
};

export default todoService;
