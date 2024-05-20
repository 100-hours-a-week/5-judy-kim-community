package movie;

import java.util.List;

public class Payment {
    private String theater;
    private String movie;
    private String day;
    private String time;
    private String hall;
    private int adults;
    private int teens;
    private int children;
    private List<String> seats;
    private int totalAmount;

    public Payment(String theater, String movie, String day, String time, String hall, int adults, int teens, int children, List<String> seats, int totalAmount) {
        this.theater = theater;
        this.movie = movie;
        this.day = day;
        this.time = time;
        this.hall = hall;
        this.adults = adults;
        this.teens = teens;
        this.children = children;
        this.seats = seats;
        this.totalAmount = totalAmount;
    }

    public String getTheater() {
        return theater;
    }

    public String getMovie() {
        return movie;
    }

    public String getDay() {
        return day;
    }

    public String getTime() {
        return time;
    }

    public String getHall() {
        return hall;
    }

    public int getAdults() {
        return adults;
    }

    public int getTeens() {
        return teens;
    }

    public int getChildren() {
        return children;
    }

    public List<String> getSeats() {
        return seats;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void printReceipt() {
        System.out.println("   =====================================");
        System.out.println("    --------------영수증---------------");
        System.out.println("     극장 [CGV " + theater + "]");
        System.out.println("     [ " + movie + " ]");
        System.out.println("     상영 날짜: " + day);
        System.out.println("     상영 시간: " + time);
        System.out.println("     " + hall + " 상영관");
        System.out.println("     [좌석]");
        for (String seat : seats) {
            System.out.print(seat + " ");
        }
        System.out.println("\n    ___________________________________");
        System.out.println("     영화 티켓 가격");
        System.out.println("     성인   10000");
        System.out.println("     청소년  7000");
        System.out.println("     아동    3000");
        System.out.println("    [결제 내역]");
        System.out.println("    -----------------------------------");
        System.out.println("     성인  [" + adults + "]   : " + (adults * 10000));
        System.out.println("     청소년[" + teens + "]   : " + (teens * 7000));
        System.out.println("     아동  [" + children + "]   : " + (children * 3000));
        System.out.println("     합산 금액: " + (adults * 10000 + teens * 7000 + children * 3000));
        System.out.println("     할인 금액: 0");
        System.out.println("    ___________________________________");
        System.out.println("     총 결제 금액: " + totalAmount);
        System.out.println("     성공적으로 결제가 완료되었습니다.");
        System.out.println("     CGV를 이용해주셔서 감사합니다.");
        System.out.println("    ___________________________________");
        System.out.println("   =====================================");
    }
}
