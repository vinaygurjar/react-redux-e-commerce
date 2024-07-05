import {createStore} from "redux";
import rootreducer from "./redux/reducers/Main";

const store = createStore(
    rootreducer
);

export default store;