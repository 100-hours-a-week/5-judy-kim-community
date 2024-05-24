package movie;

import java.util.*;
import java.util.Scanner;

public class TicketBooking {

    // 영화 예매 과정
    public static void bookTicket(List<Theater> theaters, List<Movie> movies) {
        System.out.println("\n[영화 예매]");

        // 인스턴스
        Movie selectedMovie = MovieSelection.selectMovie(movies);
        Theater selectedTheater = TheaterSelection.selectTheater(theaters, selectedMovie);

        // 영화 일정 선택
        ScheduleSelection scheduleSelection = new ScheduleSelection();
        Schedule selectedSchedule = scheduleSelection.selectSchedule(selectedTheater, selectedMovie);

        // 영화 좌석 선택
        SeatSelection seatSelection = new SeatSelection();
        List<Seat> chosenSeats = seatSelection.selectSeats(selectedTheater, selectedMovie, selectedSchedule);

        // 결제 진행
        PaymentProcessing.processPayment(selectedTheater, selectedMovie, selectedSchedule, chosenSeats);
    }
}
