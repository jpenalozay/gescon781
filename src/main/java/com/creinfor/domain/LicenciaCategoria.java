package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A LicenciaCategoria.
 */
@Entity
@Table(name = "licencia_categoria")
public class LicenciaCategoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 2, max = 64)
    @Column(name = "categoria", length = 64, nullable = false, unique = true)
    private String categoria;

    @OneToMany(mappedBy = "categoria")
    @JsonIgnoreProperties(value = { "alumno", "categoria" }, allowSetters = true)
    private Set<AlumnoCategoria> alumnoCategorias = new HashSet<>();

    @OneToMany(mappedBy = "licenciaCategoria")
    @JsonIgnoreProperties(
        value = { "empleado", "horarios", "programacions", "licenciasPermitidas", "licenciaCategoria" },
        allowSetters = true
    )
    private Set<Profesor> profesors = new HashSet<>();

    @ManyToMany(mappedBy = "categorias")
    @JsonIgnoreProperties(
        value = { "inscripcionDetalles", "categorias", "adicionals", "horarios", "asignaturaRequisitos", "curso" },
        allowSetters = true
    )
    private Set<Asignatura> asignaturas = new HashSet<>();

    @ManyToMany(mappedBy = "licenciasPermitidas")
    @JsonIgnoreProperties(
        value = { "empleado", "horarios", "programacions", "licenciasPermitidas", "licenciaCategoria" },
        allowSetters = true
    )
    private Set<Profesor> intructores = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LicenciaCategoria id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoria() {
        return this.categoria;
    }

    public LicenciaCategoria categoria(String categoria) {
        this.setCategoria(categoria);
        return this;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Set<AlumnoCategoria> getAlumnoCategorias() {
        return this.alumnoCategorias;
    }

    public void setAlumnoCategorias(Set<AlumnoCategoria> alumnoCategorias) {
        if (this.alumnoCategorias != null) {
            this.alumnoCategorias.forEach(i -> i.setCategoria(null));
        }
        if (alumnoCategorias != null) {
            alumnoCategorias.forEach(i -> i.setCategoria(this));
        }
        this.alumnoCategorias = alumnoCategorias;
    }

    public LicenciaCategoria alumnoCategorias(Set<AlumnoCategoria> alumnoCategorias) {
        this.setAlumnoCategorias(alumnoCategorias);
        return this;
    }

    public LicenciaCategoria addAlumnoCategoria(AlumnoCategoria alumnoCategoria) {
        this.alumnoCategorias.add(alumnoCategoria);
        alumnoCategoria.setCategoria(this);
        return this;
    }

    public LicenciaCategoria removeAlumnoCategoria(AlumnoCategoria alumnoCategoria) {
        this.alumnoCategorias.remove(alumnoCategoria);
        alumnoCategoria.setCategoria(null);
        return this;
    }

    public Set<Profesor> getProfesors() {
        return this.profesors;
    }

    public void setProfesors(Set<Profesor> profesors) {
        if (this.profesors != null) {
            this.profesors.forEach(i -> i.setLicenciaCategoria(null));
        }
        if (profesors != null) {
            profesors.forEach(i -> i.setLicenciaCategoria(this));
        }
        this.profesors = profesors;
    }

    public LicenciaCategoria profesors(Set<Profesor> profesors) {
        this.setProfesors(profesors);
        return this;
    }

    public LicenciaCategoria addProfesor(Profesor profesor) {
        this.profesors.add(profesor);
        profesor.setLicenciaCategoria(this);
        return this;
    }

    public LicenciaCategoria removeProfesor(Profesor profesor) {
        this.profesors.remove(profesor);
        profesor.setLicenciaCategoria(null);
        return this;
    }

    public Set<Asignatura> getAsignaturas() {
        return this.asignaturas;
    }

    public void setAsignaturas(Set<Asignatura> asignaturas) {
        if (this.asignaturas != null) {
            this.asignaturas.forEach(i -> i.removeCategoria(this));
        }
        if (asignaturas != null) {
            asignaturas.forEach(i -> i.addCategoria(this));
        }
        this.asignaturas = asignaturas;
    }

    public LicenciaCategoria asignaturas(Set<Asignatura> asignaturas) {
        this.setAsignaturas(asignaturas);
        return this;
    }

    public LicenciaCategoria addAsignatura(Asignatura asignatura) {
        this.asignaturas.add(asignatura);
        asignatura.getCategorias().add(this);
        return this;
    }

    public LicenciaCategoria removeAsignatura(Asignatura asignatura) {
        this.asignaturas.remove(asignatura);
        asignatura.getCategorias().remove(this);
        return this;
    }

    public Set<Profesor> getIntructores() {
        return this.intructores;
    }

    public void setIntructores(Set<Profesor> profesors) {
        if (this.intructores != null) {
            this.intructores.forEach(i -> i.removeLicenciasPermitidas(this));
        }
        if (profesors != null) {
            profesors.forEach(i -> i.addLicenciasPermitidas(this));
        }
        this.intructores = profesors;
    }

    public LicenciaCategoria intructores(Set<Profesor> profesors) {
        this.setIntructores(profesors);
        return this;
    }

    public LicenciaCategoria addIntructores(Profesor profesor) {
        this.intructores.add(profesor);
        profesor.getLicenciasPermitidas().add(this);
        return this;
    }

    public LicenciaCategoria removeIntructores(Profesor profesor) {
        this.intructores.remove(profesor);
        profesor.getLicenciasPermitidas().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LicenciaCategoria)) {
            return false;
        }
        return id != null && id.equals(((LicenciaCategoria) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LicenciaCategoria{" +
            "id=" + getId() +
            ", categoria='" + getCategoria() + "'" +
            "}";
    }
}
