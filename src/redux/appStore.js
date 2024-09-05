import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger"
import {appReducer} from "./appReducer"
import createSagaMiddleWare from "redux-saga"
import rootSaga from "./sagas/rootSaga"

const sagaMiddleWare=createSagaMiddleWare()
export const appStore=configureStore({
    reducer:{
        appReducer
    },
    middleware:()=>{
        return [logger,sagaMiddleWare]
    }
})
sagaMiddleWare.run(rootSaga)