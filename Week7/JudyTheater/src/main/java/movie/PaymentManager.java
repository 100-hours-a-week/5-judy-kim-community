package movie;

import java.util.List;

public class PaymentManager {

    public static void processPayment(Theater theater, Movie movie, String day, String time, String hall, int adults, int teens, int children, List<Seat> seats) {
        int adultPrice = 10000;
        int teenPrice = 7000;
        int childPrice = 3000;
        int coupon = 0;

        int total = adults * adultPrice + teens * teenPrice + children * childPrice;
        int finalTotal = total - coupon;

        System.out.println("\n\n============================================");
        System.out.println("[결제]");
        System.out.println("   =====================================");
        System.out.println("    --------------영수증---------------");
        System.out.println("     극장 [주디 영화관 " + theater.getCity() + "]");
        System.out.println("     [ " + movie.getTitle() + " ]");
        System.out.println("     상영 날짜: " + day);
        System.out.println("     상영 시간: " + time);
        System.out.println("     " + hall + " 상영관");
        System.out.print("     [좌석] ");
        for (Seat seat : seats) {
            System.out.print(seat + " ");
        }
        System.out.println("\n    ___________________________________");
        System.out.println("     영화 티켓 가격");
        System.out.println("     성인   10000원");
        System.out.println("     청소년  7000원");
        System.out.println("     아동    3000원");
        System.out.println("     [결제 내역]");
        System.out.println("    -----------------------------------");
        System.out.println("     성인 [" + adults + "]   : " + (adults * adultPrice) + "원");
        System.out.println("     청소년[" + teens + "]   : " + (teens * teenPrice) + "원");
        System.out.println("     아동 [" + children + "]   : " + (children * childPrice) + "원");
        System.out.println("     합산 금액: " + total + "원");
        System.out.println("     할인 금액: " + coupon + "원");
        System.out.println("    ___________________________________");
        System.out.println("     총 결제 금액: " + finalTotal + "원");
        System.out.println("     성공적으로 결제가 완료되었습니다.");
        System.out.println("     주디 영화관을 이용해주셔서 감사합니다.");
        System.out.println("    ___________________________________");
        System.out.println("   =====================================\n\n\n\n\n\n\n");
    }
}
