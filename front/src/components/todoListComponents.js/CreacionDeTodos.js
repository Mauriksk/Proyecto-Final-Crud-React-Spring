import React from 'react';
import ProviderTodoList from '../../provider/providerTodoList';
import { FormList } from './FormList';
import { ListTodo } from './ListTodo';


const CreacionDeTodos = () => {
    return ( 
        <ProviderTodoList>
            <FormList />
            <ListTodo />
        </ProviderTodoList>
    );
}

export default CreacionDeTodos;