package movie;

public abstract class AuditableEntity {
    private String createdBy;
    private String updatedBy;

    public AuditableEntity(String createdBy, String updatedBy) {
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
}
