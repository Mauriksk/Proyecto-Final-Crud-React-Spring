import React, { useContext, useRef, useState } from 'react';

import { Store, HOST_API } from '../store/store';
import Alert from './Alert';

export const Form = ({idTodoList}) => {
    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(Store);
    const item = todo.item;
    const [state, setState] = useState(item);

    const [ alertNombre, setAlertNombre ] = useState(false)
    const [ alertActualizar, setAlertActualizar ] = useState(false)

    const onAdd = (event) => {
        event.preventDefault();
        

    const request = {
        name: state.name,
        id: null,
        completed: false,
        groupListId: idTodoList
    };

    console.log(state.groupListId)
    console.log(state.name)

    if( state.name !== "" &&  state.name !== undefined ){
        fetch(HOST_API + "/todo", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "add-item", item: todo });
                setState({ name: "" });
                formRef.current.reset();
            });
            setAlertNombre(false)
    }else{
        console.log("no se envio nombre")
        setAlertNombre(true)
    }
    }

    const onEdit = (event) => {
        event.preventDefault();

        const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted,
        groupListId: idTodoList
    };

    if( state.name.length > 2 ){
        fetch(HOST_API + "/todo", {
            method: "PUT",
            body: JSON.stringify(request),
            headers: {
            'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todo) => {
                dispatch({ type: "update-item", item: todo });
                setState({ name: "" });
                formRef.current.reset();
            });
            setAlertActualizar(false)
    }else{
        setAlertActualizar(true)
    }

    
    }

    return <form className='' ref={formRef}>
        <div className='d-flex justify-content-center'>
            <input
            className='input-group-text'
                type="text"
                name="name"
                placeholder="¿Qué piensas hacer hoy?"
                defaultValue={item.name}
                onChange={(event) => {
                setState({ ...state, name: event.target.value })
            }}  ></input>
            {item.id && <button className='btn btn-primary' onClick={onEdit}>Actualizar</button>}
            {!item.id && <button className='btn btn-primary' onClick={onAdd}>Crear</button>}
        </div>
        {
            alertNombre && <Alert texto={ "Ingrese un nombre correcto" }/>
        }
        {
            alertActualizar && <Alert texto={ "Actualice a un nombre correcto" }/>
        }
    </form>
}