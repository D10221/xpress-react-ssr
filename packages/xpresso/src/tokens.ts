let tokens: string[] = [];
export default {
  find(id: string) {
    return Promise.resolve(tokens.find(x => id === id));
  },
  add(id: string) {
    tokens = tokens.filter(x => x !== id);
    return Promise.resolve();
  }
};
