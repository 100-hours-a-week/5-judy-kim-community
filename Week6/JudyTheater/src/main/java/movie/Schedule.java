package movie;

import java.util.Random;

public class Schedule extends ShowEntity {
    private String date;
    private String time;
    private Movie movie;
    private Seat[] seats;
    private boolean available;

    public Schedule(String name, String date, String time, Movie movie, Seat[] seats, String createdBy, String updatedBy) {
        super(name, createdBy, updatedBy);
        this.date = date;
        this.time = time;
        this.movie = movie;
        this.seats = seats;
        this.available = new Random().nextBoolean();

        // Initialize seats with random booking status
        Random random = new Random();
        for (int i = 0; i < seats.length; i++) {
            seats[i] = new Seat((char) ('A' + i / 10), (i % 10) + 1);
            if (random.nextBoolean()) {
                seats[i].book();
            }
        }
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

    public boolean isAvailable() {
        return available;
    }
}
