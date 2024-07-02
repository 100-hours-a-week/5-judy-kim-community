package movie;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

public class MovieManager {

    // 상영 중인 영화
    private List<Movie> movies = Arrays.asList(
        new Movie("영화A", new Date(), 80, "admin", "admin"),
        new Movie("영화B", new Date(), 70, "admin", "admin"),
        new Movie("영화C", new Date(), 90, "admin", "admin"),
        new Movie("영화D", new Date(), 85, "admin", "admin")
    );

    public void showMovies() {
        System.out.println("\n[영화]");
        movies.forEach(movie -> System.out.println(movie.getTitle()));
        Main.back();
    }

    public List<Movie> getMovies() {
        return movies;
    }
}
