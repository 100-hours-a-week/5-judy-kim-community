package movie;

import java.util.List;
import java.util.Scanner;

public class InputManager {
    private static Scanner scanner = new Scanner(System.in);

    public static int getValidInput(int min, int max) {
        int choice = -1;
        while (choice < min || choice > max) {
            try {
                choice = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
            }
            if (choice < min || choice > max) {
                System.out.println("입력방식이 잘못되었습니다. 다시 입력해주십시오.");
            }
        }
        return choice;
    }

    public static String getValidInput(String prompt) {
        System.out.print(prompt);
        return scanner.nextLine();
    }

    public static String getValidInput(String prompt, List<String> validOptions) {
        String input;
        while (true) {
            System.out.print(prompt);
            input = scanner.nextLine();
            if (validOptions.contains(input)) {
                break;
            }
            System.out.println("입력방식이 잘못되었습니다. 다시 입력해주십시오.");
        }
        return input;
    }

    public static int getValidNumber(String prompt) {
        System.out.print(prompt);
        while (true) {
            try {
                return Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("입력방식이 잘못되었습니다. 다시 입력해 주십시오.");
                System.out.print(prompt);
            }
        }
    }
}
