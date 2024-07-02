package com.animal;

public class Animal {
    public String name;

    public Animal(String name) {
        this.name = name;
    }

    public void say() {
        System.out.println(this.name +": "+ " 왕왕");
    }
}
