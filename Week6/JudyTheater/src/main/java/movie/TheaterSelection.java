package movie;

import java.util.*;

public class TheaterSelection {
    public static Theater selectTheater(List<Theater> theaters, Movie selectedMovie) {
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
        int theaterChoice = InputManager.getValidInput(1, theaterCount - 1);

        return theaterMap.get(theaterChoice);
    }
}
