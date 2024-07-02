package movie;

import java.util.List;

public class PaymentProcessing {
    public static void processPayment(Theater selectedTheater, Movie selectedMovie, Schedule selectedSchedule, List<Seat> chosenSeats) {
        int adults = InputManager.getValidNumber("성인: ");
        int teens = InputManager.getValidNumber("청소년: ");
        int children = InputManager.getValidNumber("아동: ");

        PaymentManager.processPayment(
                selectedTheater,
                selectedMovie,
                selectedSchedule.getDay(),
                selectedSchedule.getTime(),
                String.valueOf(selectedSchedule.getHall()),
                adults,
                teens,
                children,
                chosenSeats
        );
    }
}
