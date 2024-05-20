package movie;

public class Event {
    private String description;
    private Coupon coupon;

    public Event(String description, Coupon coupon) {
        this.description = description;
        this.coupon = coupon;
    }

    public String getDescription() {
        return description;
    }

    public Coupon getCoupon() {
        return coupon;
    }
}
