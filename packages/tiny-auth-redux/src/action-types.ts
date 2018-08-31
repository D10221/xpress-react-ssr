import { STORE_KEY } from "./defaults";
const SET_TOKEN = `${STORE_KEY}/set-token`;
const SET_ERROR = `${STORE_KEY}/set-error`;
const SET_BUSY = `${STORE_KEY}/set-busy`;
const SET_SUCCESS = `${STORE_KEY}/set-success`;
/** midleware-actio-types */
const FETCHING = `${STORE_KEY}/fetching`;
const ON_SUCCESS = `${STORE_KEY}/success`;
const FAIL = `${STORE_KEY}/fail`;
const LOGIN = `${STORE_KEY}/login`;
export default {
    SET_TOKEN,
    SET_ERROR,
    SET_BUSY,
    SET_SUCCESS,
    FETCHING,
    ON_SUCCESS,
    FAIL,
    LOGIN,
}