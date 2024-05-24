package movie;

import java.util.*;

public class ScheduleGenerator {
    private static Random random = new Random();
    private static List<Movie> movies = Arrays.asList(
        new Movie("영화A", new Date(), 80, "admin", "admin"),
        new Movie("영화B", new Date(), 70, "admin", "admin"),
        new Movie("영화C", new Date(), 90, "admin", "admin"),
        new Movie("영화D", new Date(), 85, "admin", "admin")
    );

    public static List<Schedule> generateSchedules() {
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

    private static Seat[] generateSeats() {
        Seat[] seats = new Seat[80];
        for (int i = 0; i < seats.length; i++) {
            seats[i] = new Seat((char) ('A' + i / 10), (i % 10) + 1);
            if (random.nextDouble() < 0.5) {
                seats[i].book();
            }
        }
        return seats;
    }

    private static String getTimeByIndex(int index) {
        switch (index) {
            case 0: return "13:00";
            case 1: return "15:00";
            case 2: return "17:00";
            case 3: return "19:00";
            default: return "13:00";
        }
    }
}
