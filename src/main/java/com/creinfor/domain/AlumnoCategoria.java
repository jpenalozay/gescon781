package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A AlumnoCategoria.
 */
@Entity
@Table(name = "alumno_categoria")
public class AlumnoCategoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 2, max = 16)
    @Column(name = "licencia_numero_alumno", length = 16, nullable = false)
    private String licenciaNumeroAlumno;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(
        value = { "persona", "alumnoClases", "alumnoUsuarios", "alumnoCategorias", "inscripcions", "horarios" },
        allowSetters = true
    )
    private Alumno alumno;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "alumnoCategorias", "profesors", "asignaturas", "intructores" }, allowSetters = true)
    private LicenciaCategoria categoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AlumnoCategoria id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLicenciaNumeroAlumno() {
        return this.licenciaNumeroAlumno;
    }

    public AlumnoCategoria licenciaNumeroAlumno(String licenciaNumeroAlumno) {
        this.setLicenciaNumeroAlumno(licenciaNumeroAlumno);
        return this;
    }

    public void setLicenciaNumeroAlumno(String licenciaNumeroAlumno) {
        this.licenciaNumeroAlumno = licenciaNumeroAlumno;
    }

    public Alumno getAlumno() {
        return this.alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public AlumnoCategoria alumno(Alumno alumno) {
        this.setAlumno(alumno);
        return this;
    }

    public LicenciaCategoria getCategoria() {
        return this.categoria;
    }

    public void setCategoria(LicenciaCategoria licenciaCategoria) {
        this.categoria = licenciaCategoria;
    }

    public AlumnoCategoria categoria(LicenciaCategoria licenciaCategoria) {
        this.setCategoria(licenciaCategoria);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AlumnoCategoria)) {
            return false;
        }
        return id != null && id.equals(((AlumnoCategoria) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlumnoCategoria{" +
            "id=" + getId() +
            ", licenciaNumeroAlumno='" + getLicenciaNumeroAlumno() + "'" +
            "}";
    }
}
