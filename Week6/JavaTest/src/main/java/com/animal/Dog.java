package com.animal;

public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public void say() {
        System.out.println(super.name +": "+ " 멍멍");
    }
}
