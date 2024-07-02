package movie;

import java.util.Date;

public class Schedule {
    private String theaterName;
    private Date date;
    private String time;
    private Movie movie;
    private Seat[] seats;
    private String hall;
    private String day;

    // 기존 생성자
    public Schedule(String theaterName, Date date, String time, Movie movie, Seat[] seats, String hall, String day) {
        this.theaterName = theaterName;
        this.date = date;
        this.time = time;
        this.movie = movie;
        this.seats = seats;
        this.hall = hall;
        this.day = day;
    }

    // 새로운 생성자
    public Schedule(Movie movie, String day, String time, int hall) {
        this.movie = movie;
        this.day = day;
        this.time = time;
        this.hall = String.valueOf(hall);
    }

    // Getter 메서드들
    public Movie getMovie() {
        return movie;
    }

    public String getDay() {
        return day;
    }

    public String getTime() {
        return time;
    }

    public int getHall() {
        try {
            return Integer.parseInt(hall);
        } catch (NumberFormatException e) {
            System.err.println("잘못된 홀 입력값: " + hall);
            // 기본값을 반환하거나 예외 처리 로직 추가
            return -1; // 또는 다른 에러 처리 로직
        }
    }

    // Date 타입을 String으로 변환하여 반환
    public String getDate() {
        return day;
    }

    public String getTheaterName() {
        return theaterName;
    }

    public Seat[] getSeats() {
        return seats;
    }
}
