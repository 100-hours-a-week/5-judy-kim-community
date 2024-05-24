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

    @Override
    public void book() {
        isBooked = true;
    }

    @Override
    public boolean isBooked() {
        return isBooked;
    }

    public char getRow() {
        return row;
    }

    public int getNumber() {
        return number;
    }

    @Override
    public String toString() {
        return "" + row + number;
    }
}
