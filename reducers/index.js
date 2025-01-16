/*import { HYDRATE } from "next-redux-wrapper";
import user from './user';
import post from './post';
import product from './product';
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log('HYDRATE', action);
            return {
                ...state, // 기존 상태 유지
                ...action.payload, // 서버 상태 병합
            };
        default: {
            const combinedReducer = combineReducers({
                user,
                post,
                product,
            });
            return combinedReducer(state, action);
        }
    }
};

export default rootReducer;
*/


import { HYDRATE } from "next-redux-wrapper";
import user from './user';
import post from './post';
import { combineReducers } from "@reduxjs/toolkit";
import product from "./product";

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
    // 실제 user와 post 리듀서 연결
    user,
    post,
    product
});

export default rootReducer;



/*import { combineReducers } from 'redux';
import axios from 'axios';

import userSlice from './user';
import postSlice from './post';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

export default rootReducer;*/