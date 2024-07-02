package com.animal;

public class LazyCat extends Cat {
    public LazyCat(String name) {
        super(name);
    }

    @Override
    public void say() {
        System.out.println(super.name +": "+ " 냥...냥");
    }
}
