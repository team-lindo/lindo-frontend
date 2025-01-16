const mockedAxios = {
    get: jest.fn((url) => {
      if (url.startsWith('/posts')) {
        return Promise.resolve({ data: [
          { id: 1, content: 'Mocked post 1' },
          { id: 2, content: 'Mocked post 2' },
        ] });
      }
      if (url.startsWith('/hashtag')) {
        return Promise.resolve({ data: [{ id: 3, content: 'Mocked hashtag post' }] });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    }),
    post: jest.fn((url, data) => {
      if (url === '/post') {
        return Promise.resolve({ data: { id: 3, ...data } });
      }
      if (url.endsWith('/comment')) {
        return Promise.resolve({ data: { id: 4, content: data.content, postId: data.postId } });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    }),
    patch: jest.fn((url, data) => {
      if (url.endsWith('/like')) {
        return Promise.resolve({ data: { PostId: data.PostId, UserId: data.UserId } });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    }),
    delete: jest.fn((url) => {
      if (url.endsWith('/like')) {
        return Promise.resolve({ data: { PostId: 1 } });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    }),
  };
  
  export default mockedAxios;
  