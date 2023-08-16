package com.example.todo_app_backend.todo;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService{

    private final TodoRepository todoRepository;
    private TodoDTOMapper todoDTOMapper = Mappers.getMapper(TodoDTOMapper.class);


    public List<TodoDTO> getTodo(){

        return todoRepository.findAll()
                .stream()
                .map(todo -> todoDTOMapper.todoToTodoDTO(todo))
                .collect(Collectors.toList());
    }

    public Todo addNewTodo(Todo todo) {

        Optional<Todo> todoOptional = todoRepository.findTodoByTitle(todo.getTitle(), todo.getTargetDate());
        if(todoOptional.isPresent()){
            throw new IllegalStateException(" This title is already exist with the same target date");
        }
        else{
            if(todo.getTitle() != null && todo.getTitle().length() > 0 &&
            todo.getTargetDate() != null ){
                todoRepository.save(todo);
            }
        }
        return todo;
    }

    public void deleteTodo(Long todoId) {

        boolean exists = todoRepository.existsById(todoId);
        if (!exists){
            throw new IllegalStateException(" This todo does not exist");
        }
        todoRepository.deleteById(todoId);
    }

    @Transactional
    public Todo updateTodo(Long todoId, String title, LocalDate targetDate) {

        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalStateException(
                        " Todo with id " + todoId + "does not exist"
                ));

        if(title != null && title.length() > 0 &&
        !Objects.equals(todo.getTitle(),title)){
            todo.setTitle(title);
        }

        if(targetDate != null &&
        !Objects.equals(todo.getTargetDate(), targetDate)){
            todo.setTargetDate(targetDate);
        }

        return todo;
    }

    @Transactional
    public Todo updateTodoState(Long todoId, Boolean isCompleted) {

        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new IllegalStateException(
                        " Todo with id " + todoId + "does not exist"
                ));

        todo.setCompleted(!isCompleted);
        return todo;
    }

    public List<TodoDTO> filterTodos(Boolean isCompleted){

        return todoRepository.findTodoByCompleted(isCompleted)
                .stream()
                .map(todo -> todoDTOMapper.todoToTodoDTO(todo))
                .collect(Collectors.toList());
    }
}
