import React from 'react';
import { StoreProvider } from '../provider/StoreProvider';
import { Form } from './Form';
import { List } from './List';
import Title from './Title';

const TodoComponent = ({ name, idTodoList }) => {
    return ( 
        <StoreProvider>
            <Title name={ name }/>
            <Form idTodoList={ idTodoList }/>
            <List idTodoList={ idTodoList }/>
        </StoreProvider>
    );
}

export default TodoComponent;