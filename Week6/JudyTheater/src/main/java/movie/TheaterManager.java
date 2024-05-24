package movie;

import java.util.*;

public class TheaterManager {

    // 상영 극장
    private List<Theater> theaters = Arrays.asList(
        new Theater("CGV 서울", "서울", ScheduleGenerator.generateSchedules(), "admin", "admin"),
        new Theater("CGV 부산", "부산", ScheduleGenerator.generateSchedules(), "admin", "admin"),
        new Theater("CGV 대전", "대전", ScheduleGenerator.generateSchedules(), "admin", "admin")
    );

    public void showTheaters() {
        System.out.println("\n[전국 CGV]");
        System.out.println("[지역] [상영관 개수]");
        theaters.forEach(theater -> System.out.println("|" + theater.getCity() + " [" + (theater.getSchedules().size() / 28) + "]          |"));
        Main.back();
    }

    public List<Theater> getTheaters() {
        return theaters;
    }

    // 상영 시간표 출력
    public void displayTimetable(Theater theater, Movie movie) {
        Map<String, Map<String, Set<Integer>>> timetable = new TreeMap<>();
        for (Schedule schedule : theater.getSchedules()) {
            if (schedule.getMovie().getTitle().equals(movie.getTitle())) {
                try {
                    int hall = schedule.getHall();
                    timetable
                        .computeIfAbsent(schedule.getDate(), k -> new TreeMap<>())
                        .computeIfAbsent(schedule.getTime(), k -> new TreeSet<>())
                        .add(hall);
                } catch (NumberFormatException e) {
                    System.err.println("잘못된 홀 정보: " + schedule.getHall() + " - " + e.getMessage());
                }
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

    public List<String> getAvailableTimes(Theater theater, Movie movie, String day) {
        Set<String> times = new TreeSet<>();
        for (Schedule schedule : theater.getSchedules()) {
            if (schedule.getMovie().getTitle().equals(movie.getTitle()) && schedule.getDate().equals(day)) {
                times.add(schedule.getTime());
            }
        }
        return new ArrayList<>(times);
    }

    public List<Integer> getAvailableHalls(Theater theater, Movie movie, String day, String time) {
        Set<Integer> halls = new TreeSet<>();
        for (Schedule schedule : theater.getSchedules()) {
            if (schedule.getMovie().getTitle().equals(movie.getTitle()) &&
                schedule.getDate().equals(day) &&
                schedule.getTime().equals(time)) {
                try {
                    halls.add(schedule.getHall());
                } catch (NumberFormatException e) {
                    System.err.println("잘못된 홀 정보: " + schedule.getHall() + " - " + e.getMessage());
                }
            }
        }
        return new ArrayList<>(halls);
    }

    public boolean isMovieScheduled(Theater theater, String day, String time, int hall, Movie movie) {
        return theater.getSchedules().stream().anyMatch(schedule -> {
            try {
                return schedule.getDate().equals(day) &&
                       schedule.getTime().equals(time) &&
                       schedule.getMovie().getTitle().equals(movie.getTitle()) &&
                       schedule.getHall() == hall;
            } catch (NumberFormatException e) {
                System.err.println("잘못된 홀 정보: " + schedule.getHall() + " - " + e.getMessage());
                return false;
            }
        });
    }

}
