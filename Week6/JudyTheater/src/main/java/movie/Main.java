package movie;

import java.util.*;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        // 인스턴스
        MovieManager movieManager = new MovieManager();
        TheaterManager theaterManager = new TheaterManager();
        Scanner scanner = new Scanner(System.in);

        // 카테고리 선택
        String choice = chooseCategory(scanner);
        while (true) {
            switch (choice) {
                case "1":
                    movieManager.showMovies();
                    break;
                case "2":
                    theaterManager.showTheaters();
                    break;
                case "3":
                    TicketBooking.bookTicket(theaterManager.getTheaters(), movieManager.getMovies());
                    break;
                case "4":
                    Event.showEvents();
                    break;
                default:
                    System.out.println("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.");
                    break;
            }
            choice = chooseCategory(scanner);
        }

    }

    public static String chooseCategory(Scanner scanner) {
        System.out.println("=============[주디의 영화 예매 사이트]============");
        System.out.println("\n카테고리를 선택하여 주십시오. [번호 입력]");
        System.out.println("=============================================");
        System.out.println("[1] 영화 검색 / [2] 극장 검색 / [3] 영화 예매 / [4] 이벤트");
        System.out.print(">> ");
        return scanner.nextLine();
    }

    public static void back() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("뒤로가기[B]");
        while (!"B".equalsIgnoreCase(scanner.nextLine())) {
            System.out.println("입력방식이 잘못되었습니다. 다시 입력해주십시오.");
        }
    }
}
