package co.com.sofka.crud.Controller;

import co.com.sofka.crud.Models.TodoListModel;
import co.com.sofka.crud.Models.TodoModel;
import co.com.sofka.crud.Services.TodoListService;
import co.com.sofka.crud.Services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import co.com.sofka.crud.Models.Todo;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListController {
    @Autowired
    private TodoListService service;

    /*
    public TodoListController(TodoListService todoListService) {
        this.service = todoListService;
    }*/

    @GetMapping(value = "api/list")
    public Iterable<TodoListModel> getAllListTodo(){
        return service.getAllListTodo();
    }

    @GetMapping(value = "api/{listId}/todos")
    public Iterable<TodoModel> getTodosByListId(@PathVariable("listId") Long listId){
        return service.getTodosByListId(listId);
    }

    @PostMapping(value = "api/todolist")
    public TodoListModel newTodoList(@RequestBody TodoListModel todoList){
        return service.newListTodo(todoList);
    }

    @DeleteMapping(value = "api/{id}/todoList")
    public void deleteListById(@PathVariable("id") Long id){
        service.deleteListById(id);
    }

    @PutMapping(value = "api/{listId}/todoList")
    public TodoModel updateTodoByListId(@PathVariable("listId") Long listId, @RequestBody TodoModel todoModel){
        if(todoModel.getId() !=null){
            return service.updateTodoByListId(listId, todoModel);
        }
        throw new RuntimeException("Id nulo");
    }

    @PostMapping(value = "api/{listId}/todoList")
    public TodoModel addNewTodoByListId(@PathVariable("listId") Long listId, @RequestBody TodoModel todoModel){
        return service.addNewTodoByListId(listId, todoModel);
    }

    @DeleteMapping(value = "api/{listId}/todoList")
    public void deleteTodoById(@PathVariable("listId") Long id){
        service.deleteTodoById(id);
    }

}
