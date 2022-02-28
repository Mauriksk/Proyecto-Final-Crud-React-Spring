import React,{useReducer} from 'react';
import { StoreTODO , initialState} from '../store/storeTodoList';


export const ProviderTodoList = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return ( 
        <StoreTODO.Provider value={{ state, dispatch }}>
            {children}
        </StoreTODO.Provider>
    );
}

export default ProviderTodoList;

function reducer(state, action) {
    switch (action.type) {
      case 'update-item':
        const todoUpItem = state.todoList;
        const listUpdateEdit = todoUpItem.list.map((item) => {
          if (item.id === action.item.id) {
            return action.item;
          }
          return item;
        });
        todoUpItem.list = listUpdateEdit;
        todoUpItem.item = {};
        return { ...state, item: todoUpItem }
      case 'delete-item':
        const todoUpDelete = state.todoList;
        const listUpdate = todoUpDelete.list.filter((item) => {
          return item.id !== action.id;
        });
        todoUpDelete.list = listUpdate;
        return { ...state, item: todoUpDelete }
      case 'update-list':
        const todoUpList = state.todoList;
        todoUpList.list = action.list;
        return { ...state, item: todoUpList }
      case 'edit-item':
        const todoUpEdit = state.todoList;
        todoUpEdit.item = action.item;
        return { ...state, item: todoUpEdit }
      case 'add-item':
        const todoUp = state.todoList.list;
        todoUp.push(action.item);
        return { ...state, todoList: {listTodo: todoUp, item: {}} }
      default:
        return state;
    }
  }

  /* 
  export const initialState = {
    todoList: {
        list: [],
        item: {}
        }
};
*/