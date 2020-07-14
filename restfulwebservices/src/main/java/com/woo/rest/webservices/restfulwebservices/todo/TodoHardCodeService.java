package com.woo.rest.webservices.restfulwebservices.todo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;



@Service    //define this class as a bean
public class TodoHardCodeService {
    private static List<Todo> todos = new ArrayList<>();
    private static long idCounter = 0;
    
    static{
        todos.add(new Todo(++idCounter, "woo", "Learn to code.", new Date(), false));
        todos.add(new Todo(++idCounter, "woo", "Learn about React.", new Date(), false));
        todos.add(new Todo(++idCounter, "woo", "Learn about JS.", new Date(), false));
    }

    public List<Todo> findAdd(){
        return todos;
    }
    public Todo deleteById(long id){
        Todo todo = findById(id);
        if(todo == null)
            return null;
        if(todos.remove(todo))
            return todo;
        return null;
    }

    public Todo findById(long id) {
        for(Todo todo:todos){
            if(todo.getId() == id)
                return todo;
        }
        return null;
    }
    public Todo save(Todo todo){
        //means this is a new todo, should post, we give it an id
        if(todo.getId() == -1 || todo.getId() == 0){
            todo.setId(++idCounter);
            todos.add(todo);
        }else   //means this is an update operation
        {
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }
}
