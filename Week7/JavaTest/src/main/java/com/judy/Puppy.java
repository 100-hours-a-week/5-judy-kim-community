package com.judy;

public class Puppy extends Dog {

    // 부모가 생성자가 있으면 자식도 생성자가 있어야한다.
    // 상속받은 자식은 그 기능을 그대로 사용할 수 있다.

    public Puppy(String name) {
        super(name); // 부모에서 변수 가져오기
    } // 접근 제한자

    public Puppy(int age) {
        super(age);
    }

    // 메서드 오버라이딩 (오버로딩 아님(확장), 덮어쓰기)

    // 자바는 무조건 단일상속이다.
}
