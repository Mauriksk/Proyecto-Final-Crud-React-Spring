import React, { useContext, useRef, useState } from 'react';
import { StoreTODO, HOST_API } from '../../store/storeTodoList';
import Alert from '../Alert';

// list = listTodo y item = item

export const FormList = () => {
    const formRef = useRef(null);
    const { dispatch, state: { todoList } } = useContext(StoreTODO);
    const item = todoList.item;
    const [state, setState] = useState(item);

    const [ alertNombre, setAlertNombre ] = useState(false)

    const onAdd = (event) => {
        event.preventDefault();
        

    const request = {
        name: state.name,
        id: null,
    };

    if( state.name !== "" &&  state.name !== undefined ){
        console.log("Entro al if ")
        fetch(HOST_API + "/todolist", {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((todolist) => {
                dispatch({ type: "add-item", item: todolist });
                setState({ name: "" });
                formRef.current.reset();
            });
            setAlertNombre(false)
    }else{
        console.log("no se envio nombre")
        setAlertNombre(true)
    }
    }

    return <form className='' ref={formRef}>
        <div className='d-flex justify-content-center mb-5'>
            <div>

            </div>
            <input
            className='input-group-text'
                type="text"
                name="name"
                placeholder="¿Eligue una categoria?"
                defaultValue={item.name}
                onChange={(event) => {
                setState({ ...state, name: event.target.value })
            }}  ></input>
            {!item.id && <button className='btn btn-primary' onClick={onAdd}>Crear</button>}
            
        </div>
        {
            alertNombre && <Alert texto={ "Ingrese un nombre correcto" }/>
        }
    </form>
}