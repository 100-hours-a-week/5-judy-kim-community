package movie;

public class Event {
    private String description;
    private Coupon coupon;

    public Event(String description, Coupon coupon) {
        this.description = description;
        this.coupon = coupon;
    }

    public static void showEvents() {
        System.out.println("\n[EVENT]");
        System.out.println("=======================================");
        System.out.println("| 커플 팝콘 증정 이벤트                |");
        System.out.println("=======================================");
        System.out.println("| 신규 회원가입 고객 3000원 할인 이벤트 |");
        System.out.println("=======================================");
        Main.back();
    }

    public String getDescription() {
        return description;
    }

    public Coupon getCoupon() {
        return coupon;
    }
}
