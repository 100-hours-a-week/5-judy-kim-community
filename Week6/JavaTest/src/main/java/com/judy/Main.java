package com.judy;
import com.bye.Cat;
// 모두 불러오기 import com.bye.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("안녕하새오주디");
        Dog dog = new Dog("주디멍");
        Dog dog2 = new Dog(1);
        System.out.println("주디이름" + dog.name); // name public
        dog.bark();
        dog2.bark();
        dog.run();
        dog.bark();
        dog2.setName("푸라닥");
        System.out.println(dog.getName());
        System.out.println(dog2.getName());

        Cat cat = new Cat();
        cat.eat();

        Puppy puppy = new Puppy("주디");
        puppy.name = puppy.getName();
    }
}
