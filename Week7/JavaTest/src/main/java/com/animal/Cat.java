package com.animal;

public class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }

    @Override
    public void say() {
        System.out.println(super.name +": "+ " 냥냥");
    }
}
