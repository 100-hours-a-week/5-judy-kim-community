package movie;

public class Seat implements Bookable {
    private char row;
    private int number;
    private boolean isBooked;

    public Seat(char row, int number) {
        this.row = row;
        this.number = number;
        this.isBooked = false;
    }

    public void book() {
        isBooked = true;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public char getRow() {
        return row;
    }

    public int getNumber() {
        return number;
    }
}
