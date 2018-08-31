import { STORE_KEY } from "./defaults";
import { ViewState } from "./types";
const selector = (state: { [key: string]: any }) => {
    return state[STORE_KEY] as ViewState;
};
export default selector;