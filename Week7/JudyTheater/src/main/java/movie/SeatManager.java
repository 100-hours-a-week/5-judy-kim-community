package movie;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class SeatManager {

    public static List<Seat> getSeats(Theater theater, Movie movie, String day, String time, int hall) {
        List<Seat> seats = new ArrayList<>();
        // 좌석 정보를 생성하고 반환
        // 예제에서는 간단하게 고정된 좌석 정보를 사용
        for (char row = 'A'; row <= 'H'; row++) {
            for (int number = 1; number <= 10; number++) {
                seats.add(new Seat(row, number));
            }
        }
        return seats;
    }

    public static void displaySeats(List<Seat> seats) {
        // 좌석 배치도를 출력
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
                if (seat.isBooked()) {
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

    public static List<Seat> chooseSeats(int totalPeople, List<Seat> seats, Scanner scanner) {
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
}
