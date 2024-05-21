package movie;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

public class Theater extends ShowEntity {
    private String city;
    private List<Schedule> schedules;

    public Theater(String name, String city, List<Schedule> schedules, String createdBy, String updatedBy) {
        super(name, createdBy, updatedBy);
        this.city = city;
        this.schedules = new ArrayList<>(schedules);
    }

    public String getCity() {
        return city;
    }

    public List<Schedule> getSchedules() {
        return new ArrayList<>(schedules);
    }

    public void addSchedule(Schedule schedule) {
        if (schedule == null) {
            throw new IllegalArgumentException("Schedule cannot be null");
        }
        this.schedules.add(schedule);
    }

    public boolean removeSchedule(Schedule schedule) {
        return this.schedules.remove(schedule);
    }
}
