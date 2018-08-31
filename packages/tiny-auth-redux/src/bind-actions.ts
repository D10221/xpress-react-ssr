import { Dispatch } from "redux";
import actions, { Actions } from "./actions";
/** */
export default function bindActions(dispatch: Dispatch): Actions {
    return Object.keys(actions).reduce(
        (out, key) => {
            out[key] = (...args: any[]) => dispatch((actions as any)[key](...args));
            return out;
        },
        {} as { [key: string]: any }
    ) as Actions;
}