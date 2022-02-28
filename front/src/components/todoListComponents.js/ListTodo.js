import React,{ useContext, useEffect } from 'react';

import { StoreTODO, HOST_API } from '../../store/storeTodoList';
import TodoComponent from '../TodoComponent';


export const ListTodo = () => {
    const { dispatch, state: { todoList } } = useContext(StoreTODO);
    const currentList = todoList.list;
    console.log("Esto es el current antes"+currentList)
    

    useEffect(() => {
        fetch(HOST_API + "/list")
            .then(response => response.json())
            .then((list) => {
            dispatch({ type: "update-list", list })
            
        })
    }, [dispatch]);

    return (
        <>
        {
            currentList?.map((todoList) => {
                console.log(todoList)
                return <TodoComponent idTodoList={ todoList.id } key={todoList.id} name={ todoList.name } />
            })
        }
        </>   
    )
}