import create from "./create";

const isWindow = typeof window !== "undefined";
const store = create(isWindow && (window as any).REDUX_DATA);

export default store;
