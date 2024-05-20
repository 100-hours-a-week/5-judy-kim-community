package movie;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    static Scanner scanner = new Scanner(System.in);

    // 영화 목록
    static String[] movies = {"영화A", "영화B", "영화C", "영화D"};

    // 극장 및 상영 스케줄
    static String C_A = "서울";
    static String C_B = "부산";
    static String C_C = "대전";

    static Schedule[][] A = new Schedule[4][4];
    static Schedule[][] B = new Schedule[4][4];
    static Schedule[][] C = new Schedule[4][4];

    static {
        // Schedule 객체 생성 및 초기화
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                A[i][j] = new Schedule("Schedule", "date", "time", new Movie(movies[j % movies.length], null, 0, "admin", "admin"), new Seat[10], "admin", "admin");
                B[i][j] = new Schedule("Schedule", "date", "time", new Movie(movies[j % movies.length], null, 0, "admin", "admin"), new Seat[10], "admin", "admin");
                C[i][j] = new Schedule("Schedule", "date", "time", new Movie(movies[j % movies.length], null, 0, "admin", "admin"), new Seat[10], "admin", "admin");
           }
        }
    }

    public static void main(String[] args) {
        String choice = chooseCategory();

        while (true) {
            switch (choice) {
                case "1":
                    showMovies();
                    choice = chooseCategory();
                    break;
                case "2":
                    showTheaters();
                    choice = chooseCategory();
                    break;
                case "3":
                    bookTicket();
                    return;
                case "4":
                    showEvents();
                    choice = chooseCategory();
                    break;
                default:
                    System.out.println("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.");
                    choice = scanner.nextLine();
                    break;
            }
        }
    }

    static String chooseCategory() {
        System.out.println("\n카테고리를 선택하여 주십시오. [번호 입력]");
        System.out.println("===================================================");
        System.out.println("[1]영화 검색/ [2]극장 검색/ [3]영화 예매/ [4]이벤트");
        System.out.print(">> ");
        return scanner.nextLine();
    }

    static void showMovies() {
        System.out.println("\n[영화]");
        for (String movie : movies) {
            System.out.println(movie);
        }
        back();
    }

    static void showTheaters() {
        System.out.println("\n[전국 CGV]");
        System.out.println("[지역] [상영관 개수]");
        System.out.println("====================");
        System.out.println("|서울 [4]          |");
        System.out.println("====================");
        System.out.println("|부산 [4]          |");
        System.out.println("====================");
        System.out.println("|대전 [4]          |");
        System.out.println("====================");
        back();
    }

    static void showEvents() {
        System.out.println("\n[EVENT]");
        System.out.println("=======================================");
        System.out.println("|커플 팝콘 증정 이벤트                |");
        System.out.println("=======================================");
        System.out.println("|신규 회원가입 고객 3000원 할인 이벤트|");
        System.out.println("=======================================");
        back();
    }

    static void back() {
        System.out.println("=======================================================");
        System.out.println("\n\n뒤로가기[B]");
        while (true) {
            System.out.print(">> ");
            String input = scanner.nextLine();
            if (input.equalsIgnoreCase("B")) {
                break;
            } else {
                System.out.println("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.");
            }
        }
    }

    static void bookTicket() {
        System.out.println("=======================================================");
        System.out.println("                      영화 예매    ");
        System.out.println("=======================================================");
        int count = 1;
        for (String movie : movies) {
            System.out.println(" [" + count + "] " + movie);
            count++;
        }
        System.out.println("\n예매할 영화를 선택하여 주십시오. [번호 입력]");
        System.out.print(">> ");
        String movieChoice = scanner.nextLine();

        while (!isValidChoice(movieChoice, 1, movies.length)) {
            System.out.println("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.");
            System.out.print(">> ");
            movieChoice = scanner.nextLine();
        }

        String selectedMovie = movies[Integer.parseInt(movieChoice) - 1];
        System.out.println("=======================================================");
        System.out.println("\n[ " + selectedMovie + " ]를 상영하는 극장입니다. \n| 상영 0 :■/ 상영 X :□ |\n");

        String theaterChoice = chooseTheater(selectedMovie);

        System.out.println("\n극장을 선택하여 주십시오. [번호 입력]");
        System.out.print(">> ");
        String theaterInput = scanner.nextLine();

        while (!isValidChoice(theaterInput, 1, 3)) {
            System.out.println("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.");
            System.out.print(">> ");
            theaterInput = scanner.nextLine();
        }

        int theaterIndex = Integer.parseInt(theaterInput) - 1;
        String selectedTheater = new String[]{C_A, C_B, C_C}[theaterIndex];

        System.out.println("=======================================================");
        System.out.println("\n[CGV " + selectedTheater + "] 상영 시간표\n\n | 상영시간 / 상영관 1 2 3 4 | \n | 상영 0 :■/ 상영 X :□ |\n");

        displayTimetable(theaterIndex);

        System.out.println("\n날짜,시간,상영관을 선택하여 주십시오.");
        System.out.print("   날짜 [ex) 월   ] >> ");
        String day = scanner.nextLine();
        System.out.print("   시간 [ex) 13:00] >> ");
        String time = scanner.nextLine();
        System.out.print(" 상영관 [ex) 1    ] >> ");
        String hall = scanner.nextLine();

        while (!isTimeValid(theaterIndex, day, time, hall, selectedMovie)) {
            System.out.println("\n\n입력방식이 잘못되었습니다. 다시 입력해 주십시오.\n");
            System.out.print("   날짜 [ex) 월   ] >> ");
            day = scanner.nextLine();
            System.out.print("   시간 [ex) 13:00] >> ");
            time = scanner.nextLine();
            System.out.print(" 상영관 [ex) 1    ] >> ");
            hall = scanner.nextLine();
        }

        System.out.println("\n\n=======================================================");
        System.out.println(day + "요일" + time + hall + "상영관의 좌석 배치도입니다.");

        // 좌석 만들기!
        displaySeats();

        // 관람 인원수 입력
        System.out.println("\n\n=======================================================");
        System.out.println("[요금]\n\n |성인(만 19세 이상)   10000\n |청소년(만 19세 미만) 7000\n |아동(36개월 이하)    3000\n\n관람 인원수를 입력해 주십시오.\n|성인/ 청소년/ 아동|\n");

        System.out.print("성인   :");
        int adults = getValidNumber(scanner.nextLine());

        System.out.print("청소년 :");
        int teens = getValidNumber(scanner.nextLine());

        System.out.print("아동   :");
        int children = getValidNumber(scanner.nextLine());

        int totalPeople = adults + teens + children;

        while (totalPeople == 0) {
            System.out.println("관람 인원수는 1 이상이어야 합니다. 다시 관람 인원수를 입력해 주십시오.\n");
            System.out.print("성인   :");
            adults = getValidNumber(scanner.nextLine());

            System.out.print("청소년 :");
            teens = getValidNumber(scanner.nextLine());

            System.out.print("아동   :");
            children = getValidNumber(scanner.nextLine());

            totalPeople = adults + teens + children;
        }

        // 좌석 선택
        List<String> chosenSeats = chooseSeats(totalPeople);

        // 결제
        processPayment(selectedTheater, selectedMovie, day, time, hall, adults, teens, children, chosenSeats);
    }

    static boolean isValidChoice(String input, int min, int max) {
        try {
            int choice = Integer.parseInt(input);
            return choice >= min && choice <= max;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    static String chooseTheater(String movie) {
        int count = 1;
        String[] theaters = {C_A, C_B, C_C};
        for (String theater : theaters) {
            System.out.print("[" + count + "] |CGV " + theater + "| ");
            if (isMovieAvailableInTheater(theater, movie)) {
                System.out.println("■");
            } else {
                System.out.println("□");
            }
            count++;
        }
        return scanner.nextLine();
    }

    static boolean isMovieAvailableInTheater(String theater, String movie) {
        Schedule[][] schedules = theater.equals(C_A) ? A : (theater.equals(C_B) ? B : C);
        for (Schedule[] scheduleDay : schedules) {
            for (Schedule schedule : scheduleDay) {
                if (schedule.getMovie().getTitle().equals(movie)) {
                    return true;
                }
            }
        }
        return false;
    }

    static void displayTimetable(int theaterIndex) {
        String[] days = {"월", "화", "수", "목"};
        String[] times = {"13:00", "15:00", "17:00", "19:00"};
        Schedule[][] theater = theaterIndex == 0 ? A : (theaterIndex == 1 ? B : C);

        for (int i = 0; i < 4; i++) {
            System.out.println("[" + days[i] + "]");
            for (int j = 0; j < 4; j++) {
                System.out.print(times[j] + " ");
                for (int k = 0; k < 4; k++) {
                    if (theater[i][j].getMovie().getTitle().equals(movies[k])) {
                        System.out.print("■ ");
                    } else {
                        System.out.print("□ ");
                    }
                }
                System.out.println();
            }
            System.out.println();
        }
    }

    static boolean isTimeValid(int theaterIndex, String day, String time, String hall, String movie) {
        int dayIndex = "월화수목".indexOf(day);
        int timeIndex = "13:0015:0017:0019:00".indexOf(time) / 5;
        int hallIndex = Integer.parseInt(hall) - 1;

        if (dayIndex == -1 || timeIndex == -1 || hallIndex < 0 || hallIndex >= 4) {
            return false;
        }

        Schedule[][] theater = theaterIndex == 0 ? A : (theaterIndex == 1 ? B : C);
        return theater[dayIndex][timeIndex].getMovie().getTitle().equals(movie);
    }

    static void displaySeats() {
        System.out.println(">> ⬜️: 예매 완료 좌석\n>> 🟨: 예매 가능 좌석");
        System.out.println("=================================");
        System.out.println("|           < screen >          |");
        System.out.println("=================================");
        System.out.println("|입                            출|");
        System.out.println("|구                            구|");

        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 10; j++) {
                System.out.print((char) ('A' + i) + String.valueOf(j + 1) + " ");
            }
            System.out.println();

            for (int j = 0; j < 10; j++) {
                if (Math.random() < 0.5) {
                    System.out.print("🟨 ");
                } else {
                    System.out.print("⬜️ ");
                }
            }
            System.out.println();
        }
        System.out.println();
    }

    static int getValidNumber(String input) {
        while (true) {
            try {
                return Integer.parseInt(input);
            } catch (NumberFormatException e) {
                System.out.println("\n입력방식이 잘못되었습니다. 다시 입력해 주십시오.\n");
                input = scanner.nextLine();
            }
        }
    }

    static List<String> chooseSeats(int totalPeople) {
        System.out.println("\n=======================================================");
        System.out.println("> 성인   : " + totalPeople + "\n> 청소년 : " + totalPeople + "\n> 아동   : " + totalPeople);
        System.out.println("총 " + totalPeople + "개의 좌석 선택을 진행합니다.");
        System.out.println("선택할 좌석을 하나씩 입력해 주십시오.");
        System.out.println("하나의 좌석 입력 후 [Enter]를 눌러주십시오. [ex) A1 + [Enter] ]\n");

        List<String> chosenSeats = new ArrayList<>();
        for (int i = 1; i <= totalPeople; i++) {
            System.out.print("[" + i + "] >> ");
            String seatChoice = scanner.nextLine();
            while (!isValidSeatChoice(seatChoice) || isSeatAlreadyChosen(seatChoice, chosenSeats)) {
                System.out.println("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.\n");
                System.out.print("[" + i + "] >> ");
                seatChoice = scanner.nextLine();
            }
            chosenSeats.add(seatChoice);
        }

        displayChosenSeats(chosenSeats);
        return chosenSeats;
    }

    static boolean isValidSeatChoice(String seatChoice) {
        if (seatChoice.length() == 2) {
            return "ABCDEFGH".indexOf(seatChoice.charAt(0)) != -1 && "123456789".indexOf(seatChoice.charAt(1)) != -1;
        } else if (seatChoice.length() == 3) {
            return "ABCDEFGH".indexOf(seatChoice.charAt(0)) != -1 && "10".equals(seatChoice.substring(1));
        }
        return false;
    }

    static boolean isSeatAlreadyChosen(String seatChoice, List<String> chosenSeats) {
        return chosenSeats.contains(seatChoice);
    }

    static void displayChosenSeats(List<String> chosenSeats) {
        System.out.println("\n\n>> ■ : 예매 완료 좌석\n>> □ : 예매 가능 좌석\n>> ▣ : 선택한 좌석");
        System.out.println("=======================================");
        System.out.println("|             < screen >              |");
        System.out.println("=======================================");
        System.out.println("|입                                 출|");
        System.out.println("|구                                 구|");

        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 10; j++) {
                System.out.print((char) ('A' + i) + String.valueOf(j + 1) + "  ");
            }
            System.out.println();

            for (int j = 0; j < 10; j++) {
                String seat = (char) ('A' + i) + String.valueOf(j + 1);
                if (chosenSeats.contains(seat)) {
                    System.out.print("▣ ");
                } else if (Math.random() < 0.5) {
                    System.out.print("□ ");
                } else {
                    System.out.print("■ ");
                }
            }
            System.out.println();
        }
        System.out.println();
    }

    static void processPayment(String theater, String movie, String day, String time, String hall, int adults, int teens, int children, List<String> seats) {
        int adultPrice = 10000;
        int teenPrice = 7000;
        int childPrice = 3000;
        int coupon = 0;

        int total = adults * adultPrice + teens * teenPrice + children * childPrice;
        int finalTotal = total - coupon;

        System.out.println("\n\n=======================================================");
        System.out.println("[결제]");
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
        System.out.println("     성인  [" + adults + "]   : " + (adults * adultPrice));
        System.out.println("     청소년[" + teens + "]   : " + (teens * teenPrice));
        System.out.println("     아동  [" + children + "]   : " + (children * childPrice));
        System.out.println("     합산 금액: " + total);
        System.out.println("     할인 금액: " + coupon);
        System.out.println("    ___________________________________");
        System.out.println("     총 결제 금액: " + finalTotal);
        System.out.println("     성공적으로 결제가 완료되었습니다.");
        System.out.println("     CGV를 이용해주셔서 감사합니다.");
        System.out.println("    ___________________________________");
        System.out.println("   =====================================");
    }
}
