package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A AlumnoClases.
 */
@Entity
@Table(name = "alumno_clases")
public class AlumnoClases implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "clases_totales")
    private Integer clasesTotales;

    @Column(name = "clases_programadas")
    private Integer clasesProgramadas;

    @Column(name = "clases_realizadas")
    private Integer clasesRealizadas;

    @JsonIgnoreProperties(
        value = { "persona", "alumnoClases", "alumnoUsuarios", "alumnoCategorias", "inscripcions", "horarios" },
        allowSetters = true
    )
    @OneToOne(mappedBy = "alumnoClases")
    private Alumno alumno;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AlumnoClases id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getClasesTotales() {
        return this.clasesTotales;
    }

    public AlumnoClases clasesTotales(Integer clasesTotales) {
        this.setClasesTotales(clasesTotales);
        return this;
    }

    public void setClasesTotales(Integer clasesTotales) {
        this.clasesTotales = clasesTotales;
    }

    public Integer getClasesProgramadas() {
        return this.clasesProgramadas;
    }

    public AlumnoClases clasesProgramadas(Integer clasesProgramadas) {
        this.setClasesProgramadas(clasesProgramadas);
        return this;
    }

    public void setClasesProgramadas(Integer clasesProgramadas) {
        this.clasesProgramadas = clasesProgramadas;
    }

    public Integer getClasesRealizadas() {
        return this.clasesRealizadas;
    }

    public AlumnoClases clasesRealizadas(Integer clasesRealizadas) {
        this.setClasesRealizadas(clasesRealizadas);
        return this;
    }

    public void setClasesRealizadas(Integer clasesRealizadas) {
        this.clasesRealizadas = clasesRealizadas;
    }

    public Alumno getAlumno() {
        return this.alumno;
    }

    public void setAlumno(Alumno alumno) {
        if (this.alumno != null) {
            this.alumno.setAlumnoClases(null);
        }
        if (alumno != null) {
            alumno.setAlumnoClases(this);
        }
        this.alumno = alumno;
    }

    public AlumnoClases alumno(Alumno alumno) {
        this.setAlumno(alumno);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AlumnoClases)) {
            return false;
        }
        return id != null && id.equals(((AlumnoClases) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlumnoClases{" +
            "id=" + getId() +
            ", clasesTotales=" + getClasesTotales() +
            ", clasesProgramadas=" + getClasesProgramadas() +
            ", clasesRealizadas=" + getClasesRealizadas() +
            "}";
    }
}
