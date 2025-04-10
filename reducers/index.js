
import { HYDRATE } from "next-redux-wrapper";
import user from './user';
import post from './post';
import { combineReducers } from "@reduxjs/toolkit";
import product from "./product";
import search from "./search";

const rootReducer = combineReducers({
    // index 리듀서를 정의
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                console.log('HYDRATE', action);
                return { ...state, ...action.payload };
            default:
                return state;
        }
    },
    // 실제 리듀서 연결
    user,
    post,
    product,
    search,
});

export default rootReducer;



