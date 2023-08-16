package com.example.todo_app_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ToDoApplication {

	public static void main(String[] args) {

		SpringApplication.run(ToDoApplication.class, args);
	}

}
