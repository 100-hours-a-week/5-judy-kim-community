package com.animal;

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog("강쥐");
        dog.say();

        Cat cat = new Cat("고영이");
        cat.say();

        Human human = new Human("나");
        human.say();

        LazyCat cat2 = new LazyCat("고..양..이");
        cat2.say();
    }
}
