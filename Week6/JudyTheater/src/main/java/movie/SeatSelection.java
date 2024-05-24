package movie;

import java.util.List;
import java.util.Scanner;

public class SeatSelection {
    private static Scanner scanner = new Scanner(System.in);

    public List<Seat> selectSeats(Theater selectedTheater, Movie selectedMovie, Schedule selectedSchedule) {
        System.out.println("\n\n============================================");
        System.out.println(selectedSchedule.getDay() + " " + selectedSchedule.getTime() + " " + selectedSchedule.getHall() + "상영관의 좌석 배치도입니다.");

        // 좌석 배치도 출력
        List<Seat> availableSeats = SeatManager.getSeats(selectedTheater, selectedMovie, selectedSchedule.getDay(), selectedSchedule.getTime(), selectedSchedule.getHall());
        SeatManager.displaySeats(availableSeats);

        // 인원수 입력
        System.out.println("\n\n============================================");
        System.out.println("[요금]\n| 성인(만 19세 이상) 10000원 |\n| 청소년(만 19세 미만) 7000원 |\n| 아동(36개월 이하) 3000원 |\n\n관람 인원수를 입력해 주십시오.");
        int adults = InputManager.getValidNumber("성인: ");
        int teens = InputManager.getValidNumber("청소년: ");
        int children = InputManager.getValidNumber("아동: ");
        int totalPeople = adults + teens + children;

        while (totalPeople == 0) {
            System.out.println("관람 인원수는 1 이상이어야 합니다. 다시 입력해 주십시오.");
            adults = InputManager.getValidNumber("성인: ");
            teens = InputManager.getValidNumber("청소년: ");
            children = InputManager.getValidNumber("아동: ");
            totalPeople = adults + teens + children;
        }

        // 좌석 선택
        return SeatManager.chooseSeats(totalPeople, availableSeats, scanner);
    }
}
