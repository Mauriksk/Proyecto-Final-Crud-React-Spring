import { createContext } from 'react';


export const HOST_API = "http://localhost:8080/api";
export const initialState = {
    todoList: {
        list: [],
        item: {}
        }
};
export const StoreTODO = createContext(initialState)

