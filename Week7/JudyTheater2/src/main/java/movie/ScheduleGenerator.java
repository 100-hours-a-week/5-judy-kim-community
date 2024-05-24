package movie;

import java.util.*;

public class ScheduleGenerator {
    private static final Random RANDOM = new Random();
    private static final List<Movie> MOVIES = Arrays.asList(
        new Movie("영화A", new Date(), 80, "admin", "admin"),
        new Movie("영화B", new Date(), 70, "admin", "admin"),
        new Movie("영화C", new Date(), 90, "admin", "admin"),
        new Movie("영화D", new Date(), 85, "admin", "admin")
    );
    private static final int MAX_DAYS = 7;
    private static final int MAX_TIME_SLOTS = 4;
    private static final int MAX_HALLS = 4;
    private static final int MAX_SEATS = 80;
    private static final int ROWS = 8;
    private static final int COLUMNS = 10;
    private static final String[] TIMES = {"13:00", "15:00", "17:00", "19:00"};
    private static final double BOOKING_PROBABILITY = 0.5;

    public static List<Schedule> generateSchedules() {
        List<Schedule> schedules = new ArrayList<>();
        for (int day = 0; day < MAX_DAYS; day++) {
            for (int timeSlot = 0; timeSlot < MAX_TIME_SLOTS; timeSlot++) {
                for (int hall = 0; hall < MAX_HALLS; hall++) {
                    Movie movie = MOVIES.get(RANDOM.nextInt(MOVIES.size()));
                    schedules.add(new Schedule("상영일정", new Date(2024 - 1900, 4, day + 1), TIMES[timeSlot], movie, generateSeats(), "admin", "admin"));
                }
            }
        }
        return schedules;
    }

    private static Seat[] generateSeats() {
        Seat[] seats = new Seat[MAX_SEATS];
        for (int i = 0; i < seats.length; i++) {
            seats[i] = new Seat((char) ('A' + i / COLUMNS), (i % COLUMNS) + 1);
            if (RANDOM.nextDouble() < BOOKING_PROBABILITY) {
                seats[i].book();
            }
        }
        return seats;
    }
}
