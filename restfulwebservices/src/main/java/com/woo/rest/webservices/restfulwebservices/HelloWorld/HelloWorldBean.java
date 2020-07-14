package com.woo.rest.webservices.restfulwebservices.HelloWorld;

public class HelloWorldBean {
    private String message;
    private String test = "hi";
    public HelloWorldBean(String message)
    {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
    public String getTest() {
        return test;
    }
    public void setMessage(String message)
    {
        this.message = message;
    }
//    @Override
//    public String toString() {
//        // TODO Auto-generated method stub
//        return String.format("HelloWorldBean [message=%s]", message);
//    }
}