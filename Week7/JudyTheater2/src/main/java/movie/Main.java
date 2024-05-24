package movie;

import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Movie> movies = Arrays.asList(
            new Movie("영화A", new Date(), 80, "admin", "admin"),
            new Movie("영화B", new Date(), 70, "admin", "admin"),
            new Movie("영화C", new Date(), 90, "admin", "admin"),
            new Movie("영화D", new Date(), 85, "admin", "admin")
        );

        List<Theater> theaters = Arrays.asList(
            new Theater("CGV 서울", "서울", ScheduleGenerator.generateSchedules(), "admin", "admin"),
            new Theater("CGV 부산", "부산", ScheduleGenerator.generateSchedules(), "admin", "admin"),
            new Theater("CGV 대전", "대전", ScheduleGenerator.generateSchedules(), "admin", "admin")
        );

        Scanner scanner = new Scanner(System.in);
        String choice = chooseCategory(scanner);
        while (true) {
            switch (choice) {
                case "1":
                    showMovies(movies);
                    break;
                case "2":
                    showTheaters(theaters);
                    break;
                case "3":
                    TicketBooking.bookTicket(theaters, movies);
                    break;
                case "4":
                    showEvents();
                    break;
                default:
                    System.out.println("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.");
                    break;
            }
            choice = chooseCategory(scanner);
        }
    }

    static String chooseCategory(Scanner scanner) {
        System.out.println("=============[주디의 영화 예매 사이트]============");
        System.out.println("\n카테고리를 선택하여 주십시오. [번호 입력]");
        System.out.println("=============================================");
        System.out.println("[1] 영화 검색 / [2] 극장 검색 / [3] 영화 예매 / [4] 이벤트");
        System.out.print(">> ");
        return scanner.nextLine();
    }

    static void showMovies(List<Movie> movies) {
        System.out.println("\n[영화]");
        movies.forEach(movie -> System.out.println(movie.getTitle()));
        back();
    }

    static void showTheaters(List<Theater> theaters) {
        System.out.println("\n[전국 CGV]");
        System.out.println("[지역] [상영관 개수]");
        theaters.forEach(theater -> System.out.println("|" + theater.getCity() + " [" + (theater.getSchedules().size() / 28) + "]          |"));
        back();
    }

    static void showEvents() {
        System.out.println("\n[EVENT]");
        System.out.println("=======================================");
        System.out.println("| 커플 팝콘 증정 이벤트                |");
        System.out.println("=======================================");
        System.out.println("| 신규 회원가입 고객 3000원 할인 이벤트 |");
        System.out.println("=======================================");
        back();
    }

    static void back() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("뒤로가기[B]");
        while (!"B".equalsIgnoreCase(scanner.nextLine())) {
            System.out.println("입력방식이 잘못되었습니다. 다시 입력해주십시오.");
        }
    }
}
