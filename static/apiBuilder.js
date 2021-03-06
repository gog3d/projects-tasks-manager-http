'use strict';

const buildApi = (methods) => {
  const api = {};
  for(const method of methods) {
    const url = `/api/${method}`
    api[method] = (...args) => new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        header: {'Content-Type' : 'aplication/json'},
        body: JSON.stringify(args),
      }).then((res) => {
        const { status } = res;
        if(status !== 200) {
          reject(new Error(`Server error, ststus: ${status}`));
        } else {
          resolve(res.json());
        }
      });
    });
  }
  return api;
};

export { buildApi };