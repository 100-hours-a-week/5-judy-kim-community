package movie;

import java.util.*;
import java.util.concurrent.*;

public class TicketBooking {
    private static Scanner scanner = new Scanner(System.in);

    public static void bookTicket(List<Theater> theaters, List<Movie> movies) {
        BlockingQueue<Movie> movieQueue = new ArrayBlockingQueue<>(1);
        BlockingQueue<Theater> theaterQueue = new ArrayBlockingQueue<>(1);

        // 영화 목록을 가져오는 스레드
        Thread movieThread = new Thread(() -> {
            try {
                for (int i = 0; i < movies.size(); i++) {
                    System.out.println("[" + (i + 1) + "] " + movies.get(i).getTitle());
                }
                System.out.println("예매할 영화를 선택하여 주십시오. [번호 입력]");
                int movieChoice = getValidInput(1, movies.size());
                Movie selectedMovie = movies.get(movieChoice - 1);
                movieQueue.put(selectedMovie); // 선택한 영화를 큐에 넣음
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // 극장 목록을 가져오는 스레드
        Thread theaterThread = new Thread(() -> {
            try {
                Movie selectedMovie = movieQueue.take(); // 영화 스레드에서 선택한 영화를 가져옴
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

                if (theaterMap.isEmpty()) {
                    System.out.println("선택한 영화를 상영하는 극장이 없습니다.");
                    return;
                }

                System.out.println("극장을 선택하여 주십시오. [번호 입력]");
                int theaterChoice = getValidInput(1, theaterMap.size());
                Theater selectedTheater = theaterMap.get(theaterChoice);
                theaterQueue.put(selectedTheater); // 선택한 극장을 큐에 넣음
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        movieThread.start();
        theaterThread.start();

        try {
            movieThread.join();
            theaterThread.join();

            Movie selectedMovie = movieQueue.take(); // 선택한 영화를 가져옴
            Theater selectedTheater = theaterQueue.take(); // 선택한 극장을 가져옴
            System.out.println("============================================");
            System.out.println("\n[주디 영화관 " + selectedTheater.getCity() + "] 상영 시간표\n\n | 상영시간 / 상영관 1 2 3 4 | \n | 상영 O : ■/ 상영 X : □ |\n");
            displayTimetable(selectedTheater, selectedMovie);

            // 추가 작업 수행
            // 예매 절차 계속...
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    // 아래 메서드들은 그대로 유지
    private static int getValidInput(int min, int max) {
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

    private static String getValidInput(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine();
    }

    private static String getValidInput(String prompt, List<String> validOptions) {
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

    private static void displayTimetable(Theater theater, Movie movie) {
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

    private static List<String> getAvailableTimes(Theater theater, Movie movie, String day) {
        Set<String> times = new TreeSet<>();
        for (Schedule schedule : theater.getSchedules()) {
            if (schedule.getMovie().getTitle().equals(movie.getTitle()) && schedule.getDate().equals(day)) {
                times.add(schedule.getTime());
            }
        }
        return new ArrayList<>(times);
    }

    private static List<Integer> getAvailableHalls(Theater theater, Movie movie, String day, String time) {
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

    private static boolean isMovieScheduled(Theater theater, String day, String time, int hall, Movie movie) {
        return theater.getSchedules().stream().anyMatch(schedule ->
            schedule.getDate().equals(day) &&
            schedule.getTime().equals(time) &&
            schedule.getMovie().getTitle().equals(movie.getTitle()) &&
            ((theater.getSchedules().indexOf(schedule) % 4) + 1) == hall
        );
    }

    private static int getValidNumber(String prompt) {
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

    private static List<Seat> chooseSeats(int totalPeople, List<Seat> seats) {
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

    private static boolean isSeatAvailable(String seatChoice, List<Seat> seats) {
        Seat seat = getSeat(seatChoice, seats);
        return seat != null && !seat.isBooked();
    }

    private static boolean isValidSeatChoice(String seatChoice) {
        if (seatChoice.length() == 2) {
            return "ABCDEFGH".indexOf(seatChoice.charAt(0)) != -1 && "123456789".indexOf(seatChoice.charAt(1)) != -1;
        } else if (seatChoice.length() == 3) {
            return "ABCDEFGH".indexOf(seatChoice.charAt(0)) != -1 && "10".equals(seatChoice.substring(1));
        }
        return false;
    }

    private static boolean isSeatAlreadyChosen(String seatChoice, List<Seat> chosenSeats) {
        return chosenSeats.stream().anyMatch(seat -> seat.toString().equals(seatChoice));
    }

    private static void displayChosenSeats(List<Seat> chosenSeats, List<Seat> seats) {
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

    private static Seat getSeat(String seatChoice, List<Seat> seats) {
        char row = seatChoice.charAt(0);
        int number = Integer.parseInt(seatChoice.substring(1));
        return seats.stream().filter(seat -> seat.getRow() == row && seat.getNumber() == number).findFirst().orElse(null);
    }

    private static void processPayment(Theater theater, Movie movie, String day, String time, String hall, int adults, int teens, int children, List<Seat> seats) {
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
