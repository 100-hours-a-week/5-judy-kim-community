package movie;

import java.util.Date;

public class Movie extends ShowEntity {
    private Date releaseDate;
    private int popularity;

    public Movie(String title, Date releaseDate, int popularity, String createdBy, String updatedBy) {
        super(title, createdBy, updatedBy);
        this.releaseDate = releaseDate;
        this.popularity = popularity;
    }

    public String getTitle() {
        return getName();
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public int getPopularity() {
        return popularity;
    }
}
