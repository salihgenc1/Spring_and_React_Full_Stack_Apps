package com.example.todo_app_backend.todo;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/v1/todo")
@AllArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<List<TodoDTO>> getTodo(){
        return ResponseEntity.ok(todoService.getTodo());
    }

    @PostMapping(path = "/filter")
    public ResponseEntity<List<TodoDTO>> filterTodos(@RequestParam("isCompleted") Boolean isCompleted){
        return ResponseEntity.ok(todoService.filterTodos(isCompleted));
    }

    @PostMapping
    public ResponseEntity<Todo> registerNewTodo(@RequestBody Todo todo){
        return ResponseEntity.ok(todoService.addNewTodo(todo));
    }

    @DeleteMapping(path = "/{todoId}")
    public void deleteTodo(@PathVariable("todoId") Long todoId){

        todoService.deleteTodo(todoId);
        ResponseEntity.ok();
    }

    @PutMapping(path = "/{todoId}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable("todoId") Long todoId,
            @RequestBody Todo todo){
        return ResponseEntity.ok(todoService.updateTodo(todoId, todo.getTitle(), todo.getTargetDate()));
    }

    @PostMapping(path = "/{todoId}")
    public ResponseEntity<Todo> updateTodoState(
            @PathVariable("todoId") Long todoId,
            @RequestParam("isCompleted") Boolean isCompleted){

        return ResponseEntity.ok(todoService.updateTodoState(todoId, isCompleted));
    }


}
