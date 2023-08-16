package com.example.todo_app_backend.todo;

import org.mapstruct.Mapper;

@Mapper
public interface TodoDTOMapper{

    Todo todoDTOToTodo(TodoDTO todoDTO);
    TodoDTO todoToTodoDTO(Todo todo);
}
