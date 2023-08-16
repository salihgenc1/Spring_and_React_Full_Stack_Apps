package com.example.todo_app_backend.todo;

import lombok.Data;

import java.time.LocalDate;


public record TodoDTO (
        Long id,
        String title,
        LocalDate targetDate,
        boolean completed
){

}
