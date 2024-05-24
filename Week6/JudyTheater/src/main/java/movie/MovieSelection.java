package movie;

import java.util.List;

public class MovieSelection {
    public static Movie selectMovie(List<Movie> movies) {
        for (int i = 0; i < movies.size(); i++) {
            System.out.println("[" + (i + 1) + "] " + movies.get(i).getTitle());
        }
        System.out.println("예매할 영화를 선택하여 주십시오. [번호 입력]");
        int movieChoice = InputManager.getValidInput(1, movies.size());

        return movies.get(movieChoice - 1);
    }
}
