package movie;

import java.util.*;

public class SeatManager {

    public static List<Seat> getSeats(Theater theater, Movie movie, String day, String time, int hall) {
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

    public static void displaySeats(List<Seat> seats) {
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
}
