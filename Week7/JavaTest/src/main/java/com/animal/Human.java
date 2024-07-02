package com.animal;

public class Human extends Animal {
    public Human(String name) {
        super(name);
    }

    @Override
    public void say() {
        System.out.println(super.name +": "+ " 잠온다,,");
    }
}
