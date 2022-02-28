import React, { useContext, useEffect } from 'react';
import { Store, HOST_API } from '../store/store';

export const List = ({idTodoList}) => {
    const { dispatch, state: { todo } } = useContext(Store);
    const currentList = todo.list;

    useEffect(() => {
        fetch(HOST_API + "/todos")
            .then(response => response.json())
            .then((list) => {
            dispatch({ type: "update-list", list })
        })
    }, [dispatch]);

    const onDelete = (id) => {
        fetch(HOST_API + "/" + id + "/todo", {
            method: "DELETE"
        }).then((list) => {
            dispatch({ type: "delete-item", id })
        })
    };

    const onEdit = (todo) => {
        dispatch({ type: "edit-item", item: todo })
    };

    const onChange = (event, todo) => {
        const request = {
            name: todo.name,
            id: todo.id,
            completed: event.target.checked,
            groupListId: idTodoList
        };
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
        });
    };

    const decorationDone = {
        textDecoration: 'line-through'
    };
    return <div>
        <table className='border-dark mt-5 table  table-hover table-dark table-striped'>
            <thead>
            <tr className=''>
                <td>ID</td>
                <td>Tarea</td>
                <td>¿Completado?</td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            {currentList.map((todo) => {
                if( todo.groupListId === idTodoList )
                return <tr className='border-dark table-striped' key={todo.id} style={todo.completed ? decorationDone : {}}>
                <td>{currentList.indexOf(todo)+1 }</td>
                <td>{todo.name}</td>
                <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
                <td><button className='btn btn-danger' onClick={() => onDelete(todo.id)}>Eliminar</button></td>
                <td><button className='btn btn-primary' onClick={() => onEdit(todo)}>Editar</button></td>
            </tr>
        })}
        </tbody>
        </table>
    </div>
}