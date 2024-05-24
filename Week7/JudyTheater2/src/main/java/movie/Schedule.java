package movie;

import java.util.Date;

public class Schedule extends ShowEntity {
    private String date;
    private String time;
    private Movie movie;
    private Seat[] seats;

    public Schedule(String name, Date date, String time, Movie movie, Seat[] seats, String createdBy, String updatedBy) {
        super(name, createdBy, updatedBy);
        this.date = String.format("%1$tY-%1$tm-%1$td", date);
        this.time = time;
        this.movie = movie;
        this.seats = seats;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public Movie getMovie() {
        return movie;
    }

    public Seat[] getSeats() {
        return seats;
    }
}
