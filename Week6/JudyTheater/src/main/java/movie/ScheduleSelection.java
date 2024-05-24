package movie;

import java.util.*;

public class ScheduleSelection {

    private TheaterManager theaterManager = new TheaterManager();

    // 스케줄 선택
    public Schedule selectSchedule(Theater selectedTheater, Movie selectedMovie) {
        System.out.println("\n[주디 영화관 " + selectedTheater.getCity() + "] 상영 시간표\n\n | 상영시간 / 상영관 1 2 3 4 | \n | 상영 O : ■/ 상영 X : □ |\n");

        theaterManager.displayTimetable(selectedTheater, selectedMovie);

        System.out.println("날짜를 선택하여 주십시오.");
        String day = InputManager.getValidInput("날짜 [ex) 2024-05-01] >> ");

        List<String> availableTimes = theaterManager.getAvailableTimes(selectedTheater, selectedMovie, day);
        System.out.println("\n선택 가능한 시간:");
        availableTimes.forEach(time -> System.out.print(time + " "));
        System.out.println();

        System.out.println("시간을 선택하여 주십시오.");
        String time = InputManager.getValidInput("시간 [ex) 13:00] >> ", availableTimes);

        List<Integer> availableHalls = theaterManager.getAvailableHalls(selectedTheater, selectedMovie, day, time);
        System.out.println("\n선택 가능한 상영관:");
        availableHalls.forEach(hall -> System.out.print(hall + " "));
        System.out.println();

        System.out.println("상영관을 선택하여 주십시오.");
        String hall = InputManager.getValidInput("상영관 [1-4] >> ", availableHalls.stream().map(String::valueOf).toList());

        while (!theaterManager.isMovieScheduled(selectedTheater, day, time, Integer.parseInt(hall), selectedMovie)) {
            System.out.println("선택한 시간에는 " + selectedMovie.getTitle() + "를 상영하지 않습니다. 다시 입력해 주십시오.");
            day = InputManager.getValidInput("날짜 [ex) 2024-05-01] >> ");
            time = InputManager.getValidInput("시간 [ex) 13:00] >> ", availableTimes);
            hall = InputManager.getValidInput("상영관 [1-4] >> ", availableHalls.stream().map(String::valueOf).toList());
        }

        return new Schedule(selectedMovie, day, time, Integer.parseInt(hall));
    }
}
