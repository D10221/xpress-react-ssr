let tokens: string[] = [];
export default {
  find(id: string) {
    return Promise.resolve(tokens.find(x => x === id));
  },
  exists(id: string) {
    return Promise.resolve(!!tokens.find(x => x === id));
  },
  add(id: string) {
    tokens = tokens.filter(x => x !== id);
    return Promise.resolve();
  }
};
