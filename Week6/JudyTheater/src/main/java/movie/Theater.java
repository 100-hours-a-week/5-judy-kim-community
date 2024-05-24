package movie;

import java.util.List;

public class Theater extends ShowEntity {
    private String city;
    private List<Schedule> schedules;

    public Theater(String name, String city, List<Schedule> schedules, String createdBy, String updatedBy) {
        super(name, createdBy, updatedBy);
        this.city = city;
        this.schedules = schedules;
    }

    public String getCity() {
        return city;
    }

    public List<Schedule> getSchedules() {
        return schedules;
    }
}
