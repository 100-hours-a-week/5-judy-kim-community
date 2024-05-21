package movie;

import java.util.*;

public class Main {
    static Scanner scanner = new Scanner(System.in);
    static Random random = new Random();

    static List<Movie> movies = Arrays.asList(
        new Movie("영화A", new Date(), 80, "admin", "admin"),
        new Movie("영화B", new Date(), 70, "admin", "admin"),
        new Movie("영화C", new Date(), 90, "admin", "admin"),
        new Movie("영화D", new Date(), 85, "admin", "admin")
    );

    public static void main(String[] args) {
        List<Theater> theaters = Arrays.asList(
            new Theater("CGV 서울", "서울", generateSchedules(), "admin", "admin"),
            new Theater("CGV 부산", "부산", generateSchedules(), "admin", "admin"),
            new Theater("CGV 대전", "대전", generateSchedules(), "admin", "admin")
        );

        String choice = chooseCategory();
        while (true) {
            switch (choice) {
                case "1":
                    showMovies();
                    break;
                case "2":
                    showTheaters(theaters);
                    break;
                case "3":
                    bookTicket(theaters);
                    break;
                case "4":
                    showEvents();
                    break;
                default:
                    System.out.println("\n입력방식이 잘못되었습니다. 다시 입력해주십시오.");
                    break;
            }
            choice = chooseCategory();
        }
    }

    static List<Schedule> generateSchedules() {
        List<Schedule> schedules = new ArrayList<>();
        for (int day = 0; day < 7; day++) {
            for (int timeSlot = 0; timeSlot < 4; timeSlot++) {
                for (int hall = 0; hall < 4; hall++) {
                    Movie movie = movies.get(random.nextInt(movies.size()));
                    schedules.add(new Schedule("상영일정", new Date(2024 - 1900, 4, day + 1), getTimeByIndex(timeSlot), movie, generateSeats(), "admin", "admin"));
                }
            }
        }
        return schedules;
    }

    static Seat[] generateSeats() {
        Seat[] seats = new Seat[80];
        for (int i = 0; i < seats.length; i++) {
            seats[i] = new Seat((char) ('A' + i / 10), (i % 10) + 1);
            if (random.nextDouble() < 0.5) {
                seats[i].book();
            }
        }
        return seats;
    }

    static String getTimeByIndex(int index) {
        switch (index) {
            case 0: return "13:00";
            case 1: return "15:00";
            case 2: return "17:00";
            case 3: return "19:00";
            default: return "13:00";
        }
    }

    static String chooseCategory() {

        System.out.println("=============[주디의 영화 예매 사이트]============");
        System.out.println("\n카테고리를 선택하여 주십시오. [번호 입력]");
        System.out.println("=============================================");
        System.out.println("[1] 영화 검색 / [2] 극장 검색 / [3] 영화 예매 / [4] 이벤트");
        System.out.print(">> ");
        return scanner.nextLine();
    }

    static void showMovies() {
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

    static void bookTicket(List<Theater> theaters) {
        System.out.println("\n[영화 예매]");
        for (int i = 0; i < movies.size(); i++) {
            System.out.println("[" + (i + 1) + "] " + movies.get(i).getTitle());
        }
        System.out.println("예매할 영화를 선택하여 주십시오. [번호 입력]");
        int movieChoice = getValidInput(1, movies.size());

        Movie selectedMovie = movies.get(movieChoice - 1);
        System.out.println("============================================");
        System.out.println("\n[ " + selectedMovie.getTitle() + " ]를 상영하는 극장입니다. \n| 상영 O : ■/ 상영 X : □ |\n");

        Map<Integer, Theater> theaterMap = new HashMap<>();
        int theaterCount = 1;
        for (Theater theater : theaters) {
            boolean hasMovie = false;
            for (Schedule schedule : theater.getSchedules()) {
                if (schedule.getMovie().getTitle().equals(selectedMovie.getTitle())) {
                    hasMovie = true;
                    break;
                }
            }
            if (hasMovie) {
                theaterMap.put(theaterCount, theater);
                System.out.println("[" + theaterCount + "] |CGV " + theater.getCity() + "| ■");
                theaterCount++;
            }
        }

        System.out.println("극장을 선택하여 주십시오. [번호 입력]");
        int theaterChoice = getValidInput(1, theaterCount - 1);

        Theater selectedTheater = theaterMap.get(theaterChoice);
        System.out.println("============================================");
        System.out.println("\n[주디 영화관 " + selectedTheater.getCity() + "] 상영 시간표\n\n | 상영시간 / 상영관 1 2 3 4 | \n | 상영 O : ■/ 상영 X : □ |\n");

        displayTimetable(selectedTheater, selectedMovie);

        System.out.println("날짜를 선택하여 주십시오.");
        String day = getValidInput("날짜 [ex) 2024-05-01] >> ");

        List<String> availableTimes = getAvailableTimes(selectedTheater, selectedMovie, day);
        System.out.println("\n선택 가능한 시간:");
        availableTimes.forEach(time -> System.out.print(time + " "));
        System.out.println();

        System.out.println("시간을 선택하여 주십시오.");
        String time = getValidInput("시간 [ex) 13:00] >> ", availableTimes);

        List<Integer> availableHalls = getAvailableHalls(selectedTheater, selectedMovie, day, time);
        System.out.println("\n선택 가능한 상영관:");
        availableHalls.forEach(hall -> System.out.print(hall + " "));
        System.out.println();

        System.out.println("상영관을 선택하여 주십시오.");
        String hall = getValidInput("상영관 [1-4] >> ", availableHalls.stream().map(String::valueOf).toList());

        while (!isMovieScheduled(selectedTheater, day, time, Integer.parseInt(hall), selectedMovie)) {
            System.out.println("선택한 시간에는 " + selectedMovie.getTitle() + "를 상영하지 않습니다. 다시 입력해 주십시오.");
            day = getValidInput("날짜 [ex) 2024-05-01] >> ");
            time = getValidInput("시간 [ex) 13:00] >> ", availableTimes);
            hall = getValidInput("상영관 [1-4] >> ", availableHalls.stream().map(String::valueOf).toList());
        }

        System.out.println("\n\n============================================");
        System.out.println(day + " " + time + " " + hall + "상영관의 좌석 배치도입니다.");

        // 좌석 배치도 출력
        List<Seat> availableSeats = getSeats(selectedTheater, selectedMovie, day, time, Integer.parseInt(hall));
        displaySeats(availableSeats);

        // 인원수 입력
        System.out.println("\n\n============================================");
        System.out.println("[요금]\n| 성인(만 19세 이상) 10000원 |\n| 청소년(만 19세 미만) 7000원 |\n| 아동(36개월 이하) 3000원 |\n\n관람 인원수를 입력해 주십시오.");
        int adults = getValidNumber("성인: ");
        int teens = getValidNumber("청소년: ");
        int children = getValidNumber("아동: ");
        int totalPeople = adults + teens + children;

        while (totalPeople == 0) {
            System.out.println("관람 인원수는 1 이상이어야 합니다. 다시 입력해 주십시오.");
            adults = getValidNumber("성인: ");
            teens = getValidNumber("청소년: ");
            children = getValidNumber("아동: ");
            totalPeople = adults + teens + children;
        }

        // 좌석 선택
        List<Seat> chosenSeats = chooseSeats(totalPeople, availableSeats);

        // 결제
        processPayment(selectedTheater, selectedMovie, day, time, hall, adults, teens, children, chosenSeats);
    }

    static List<String> getAvailableTimes(Theater theater, Movie movie, String day) {
        Set<String> times = new TreeSet<>();
        for (Schedule schedule : theater.getSchedules()) {
            if (schedule.getMovie().getTitle().equals(movie.getTitle()) && schedule.getDate().equals(day)) {
                times.add(schedule.getTime());
            }
        }
        return new ArrayList<>(times);
    }

    static List<Integer> getAvailableHalls(Theater theater, Movie movie, String day, String time) {
        List<Integer> halls = new ArrayList<>();
        for (Schedule schedule : theater.getSchedules()) {
            if (schedule.getMovie().getTitle().equals(movie.getTitle()) &&
                schedule.getDate().equals(day) &&
                schedule.getTime().equals(time)) {
                halls.add((theater.getSchedules().indexOf(schedule) % 4) + 1);
            }
        }
        return halls;
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
        System.out.println("뒤로가기[B]");
        while (!"B".equalsIgnoreCase(scanner.nextLine())) {
            System.out.println("입력방식이 잘못되었습니다. 다시 입력해주십시오.");
        }
    }

    static int getValidInput(int min, int max) {
        int choice = -1;
        while (choice < min || choice > max) {
            try {
                choice = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                // Ignore exception and prompt again
            }
            if (choice < min || choice > max) {
                System.out.println("입력방식이 잘못되었습니다. 다시 입력해주십시오.");
            }
        }
        return choice;
    }

    static String getValidInput(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine();
    }

    static String getValidInput(String prompt, List<String> validOptions) {
        String input;
        while (true) {
            System.out.print(prompt);
            input = scanner.nextLine();
            if (validOptions.contains(input)) {
                break;
            }
            System.out.println("입력방식이 잘못되었습니다. 다시 입력해주십시오.");
        }
        return input;
    }

    static void displayTimetable(Theater theater, Movie movie) {
        Map<String, Map<String, List<Integer>>> timetable = new TreeMap<>();
        for (Schedule schedule : theater.getSchedules()) {
            if (schedule.getMovie().getTitle().equals(movie.getTitle())) {
                timetable
                    .computeIfAbsent(schedule.getDate(), k -> new TreeMap<>())
                    .computeIfAbsent(schedule.getTime(), k -> new ArrayList<>())
                    .add((theater.getSchedules().indexOf(schedule) % 4) + 1);
            }
        }
        timetable.forEach((date, times) -> {
            System.out.println("[" + date + "]");
            times.forEach((time, halls) -> {
                System.out.print(time + " 상영관 ");
                halls.forEach(hall -> System.out.print(hall + " "));
                System.out.println();
            });
            System.out.println();
        });
    }

    static void displaySeats(List<Seat> seats) {
        System.out.println(">> ⬜️: 예매 완료 좌석 | 🟨: 예매 가능 좌석");
        System.out.println("==================================");
        System.out.println("|           < screen >           |");
        System.out.println("==================================");
        System.out.println("|입                             출|");
        System.out.println("|구                             구|");


        for (int i = 0; i < 8; i++) {
            System.out.print("|");
            for (int j = 0; j < 10; j++) {
                System.out.print((char) ('A' + i) + String.valueOf(j + 1) + " ");
            }
            System.out.print(" |\n|");

            for (int j = 0; j < 10; j++) {
                Seat seat = seats.get(i * 10 + j);
                if (seat.isBooked()) {
                    System.out.print("⬜️ ");
                } else {
                    System.out.print("🟨 ");
                }
            }
            System.out.println("|");
        }
        System.out.println();
    }

    static int getValidNumber(String prompt) {
        System.out.print(prompt);
        while (true) {
            try {
                return Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("입력방식이 잘못되었습니다. 다시 입력해 주십시오.");
                System.out.print(prompt);
            }
        }
    }

    static List<Seat> chooseSeats(int totalPeople, List<Seat> seats) {
        System.out.println("\n\n총 " + totalPeople + "개의 좌석 선택을 진행합니다.");
        System.out.println("선택할 좌석을 하나씩 입력해 주십시오.");
        System.out.println("하나의 좌석 입력 후 [Enter]를 눌러주십시오. \n[ex) A1 + [Enter] ]");

        List<Seat> chosenSeats = new ArrayList<>();
        for (int i = 1; i <= totalPeople; i++) {
            System.out.print("[" + i + "] >> ");
            String seatChoice = scanner.nextLine();
            while (!isValidSeatChoice(seatChoice) || isSeatAlreadyChosen(seatChoice, chosenSeats) || !isSeatAvailable(seatChoice, seats)) {
                System.out.println("입력방식이 잘못되었거나 선택 불가능한 좌석입니다. 다시 입력해주십시오.");
                System.out.print("[" + i + "] >> ");
                seatChoice = scanner.nextLine();
            }
            chosenSeats.add(getSeat(seatChoice, seats));
        }

        displayChosenSeats(chosenSeats, seats);
        return chosenSeats;
    }

    static boolean isSeatAvailable(String seatChoice, List<Seat> seats) {
        Seat seat = getSeat(seatChoice, seats);
        return seat != null && !seat.isBooked();
    }

    static boolean isValidSeatChoice(String seatChoice) {
        if (seatChoice.length() == 2) {
            return "ABCDEFGH".indexOf(seatChoice.charAt(0)) != -1 && "123456789".indexOf(seatChoice.charAt(1)) != -1;
        } else if (seatChoice.length() == 3) {
            return "ABCDEFGH".indexOf(seatChoice.charAt(0)) != -1 && "10".equals(seatChoice.substring(1));
        }
        return false;
    }

    static boolean isSeatAlreadyChosen(String seatChoice, List<Seat> chosenSeats) {
        return chosenSeats.stream().anyMatch(seat -> seat.toString().equals(seatChoice));
    }

    static void displayChosenSeats(List<Seat> chosenSeats, List<Seat> seats) {
        System.out.println("\n\n>> ⬜️: 예매 완료 좌석 | 🟨: 예매 가능 좌석 | 🟩: 선택한 좌석");
        System.out.println("==================================");
        System.out.println("|           < screen >           |");
        System.out.println("==================================");
        System.out.println("|입                             출|");
        System.out.println("|구                             구|");

        char row = 'A';
        for (int i = 0; i < 8; i++) {
            System.out.print("|");
            for (int j = 0; j < 10; j++) {
                System.out.print(row + String.valueOf(j + 1) + " ");
            }
            System.out.print(" |\n|");

            for (int j = 0; j < 10; j++) {
                Seat seat = seats.get(i * 10 + j);
                if (chosenSeats.contains(seat)) {
                    System.out.print("🟩 ");
                } else if (seat.isBooked()) {
                    System.out.print("⬜️ ");
                } else {
                    System.out.print("🟨 ");
                }
            }
            System.out.println("|");
            row++;
        }
        System.out.println();
    }

    static Seat getSeat(String seatChoice, List<Seat> seats) {
        char row = seatChoice.charAt(0);
        int number = Integer.parseInt(seatChoice.substring(1));
        return seats.stream().filter(seat -> seat.getRow() == row && seat.getNumber() == number).findFirst().orElse(null);
    }

    static boolean isMovieScheduled(Theater theater, String day, String time, int hall, Movie movie) {
        return theater.getSchedules().stream().anyMatch(schedule ->
            schedule.getDate().equals(day) &&
            schedule.getTime().equals(time) &&
            schedule.getMovie().getTitle().equals(movie.getTitle()) &&
            ((theater.getSchedules().indexOf(schedule) % 4) + 1) == hall
        );
    }

    static List<Seat> getSeats(Theater theater, Movie movie, String day, String time, int hall) {
        for (Schedule schedule : theater.getSchedules()) {
            if (schedule.getDate().equals(day) &&
                schedule.getTime().equals(time) &&
                schedule.getMovie().getTitle().equals(movie.getTitle()) &&
                ((theater.getSchedules().indexOf(schedule) % 4) + 1) == hall) {
                return Arrays.asList(schedule.getSeats());
            }
        }
        return Collections.emptyList();
    }

    static void processPayment(Theater theater, Movie movie, String day, String time, String hall, int adults, int teens, int children, List<Seat> seats) {
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
        System.out.println("     극장 [주디 영화관" + theater.getCity() + "]");
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
