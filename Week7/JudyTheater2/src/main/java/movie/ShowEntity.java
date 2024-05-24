package movie;

public abstract class ShowEntity extends AuditableEntity {
    private String name;

    public ShowEntity(String name, String createdBy, String updatedBy) {
        super(createdBy, updatedBy);
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
