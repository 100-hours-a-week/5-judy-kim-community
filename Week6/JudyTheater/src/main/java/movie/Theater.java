package movie;

public class Theater extends ShowEntity {
    private String city;
    private Schedule[] schedule;

    public Theater(String name, String city, Schedule[] schedule, String createdBy, String updatedBy) {
        super(name, createdBy, updatedBy);
        this.city = city;
        this.schedule = schedule;
    }

    public String getCity() {
        return city;
    }

    public Schedule[] getSchedule() {
        return schedule;
    }
}
