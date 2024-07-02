package com.judy;

public class Dog {
    public String name;
    private int age;
    private double weight;
    private double height;

    // 생성자
    public Dog(String name) {
        this.name = name;
    } // 접근 제한자

    // 생성자 여러개 constructor
    public Dog(int age) {
        this.age = age;
    } // 접근 제한자

    // 메소드
    public void bark(){
        System.out.println(this.name + "왈왈!");
        System.out.println(this.age + "나이");
    }
    public void run(){
        System.out.println("뛰엉!");
    }

    public String getName() {
        if(this.name == null){
            return "이름 없음";
        }
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
