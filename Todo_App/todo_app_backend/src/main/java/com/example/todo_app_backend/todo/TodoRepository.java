package com.example.todo_app_backend.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    @Query("select t from Todo t where t.title = ?1 and t.targetDate = ?2")
    Optional<Todo> findTodoByTitle(String title, LocalDate targetDate);

    @Query("select t from Todo t where t.isCompleted = ?1")
    List<Todo> findTodoByCompleted(Boolean isCompleted);
}
