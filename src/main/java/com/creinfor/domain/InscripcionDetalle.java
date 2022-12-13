package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A InscripcionDetalle.
 */
@Entity
@Table(name = "inscripcion_detalle")
public class InscripcionDetalle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @OneToMany(mappedBy = "inscripcionDetalle")
    @JsonIgnoreProperties(value = { "inscripcionDetalle", "asignaturaRequisito" }, allowSetters = true)
    private Set<InscripcionAsignaturaRequisito> inscripcionAsignaturaRequisitos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(
        value = { "inscripcionPagos", "inscripcionAdicionals", "inscripcionDetalles", "insDescuento", "alumno" },
        allowSetters = true
    )
    private Inscripcion inscripcion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(
        value = { "inscripcionDetalles", "categorias", "adicionals", "horarios", "asignaturaRequisitos", "curso" },
        allowSetters = true
    )
    private Asignatura asignatura;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "inscripcionDetalles", "teorias", "asignaturas" }, allowSetters = true)
    private TeoriaHorarioCatalogo horario;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public InscripcionDetalle id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public InscripcionDetalle codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalDate getFechaInicio() {
        return this.fechaInicio;
    }

    public InscripcionDetalle fechaInicio(LocalDate fechaInicio) {
        this.setFechaInicio(fechaInicio);
        return this;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Set<InscripcionAsignaturaRequisito> getInscripcionAsignaturaRequisitos() {
        return this.inscripcionAsignaturaRequisitos;
    }

    public void setInscripcionAsignaturaRequisitos(Set<InscripcionAsignaturaRequisito> inscripcionAsignaturaRequisitos) {
        if (this.inscripcionAsignaturaRequisitos != null) {
            this.inscripcionAsignaturaRequisitos.forEach(i -> i.setInscripcionDetalle(null));
        }
        if (inscripcionAsignaturaRequisitos != null) {
            inscripcionAsignaturaRequisitos.forEach(i -> i.setInscripcionDetalle(this));
        }
        this.inscripcionAsignaturaRequisitos = inscripcionAsignaturaRequisitos;
    }

    public InscripcionDetalle inscripcionAsignaturaRequisitos(Set<InscripcionAsignaturaRequisito> inscripcionAsignaturaRequisitos) {
        this.setInscripcionAsignaturaRequisitos(inscripcionAsignaturaRequisitos);
        return this;
    }

    public InscripcionDetalle addInscripcionAsignaturaRequisito(InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito) {
        this.inscripcionAsignaturaRequisitos.add(inscripcionAsignaturaRequisito);
        inscripcionAsignaturaRequisito.setInscripcionDetalle(this);
        return this;
    }

    public InscripcionDetalle removeInscripcionAsignaturaRequisito(InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito) {
        this.inscripcionAsignaturaRequisitos.remove(inscripcionAsignaturaRequisito);
        inscripcionAsignaturaRequisito.setInscripcionDetalle(null);
        return this;
    }

    public Inscripcion getInscripcion() {
        return this.inscripcion;
    }

    public void setInscripcion(Inscripcion inscripcion) {
        this.inscripcion = inscripcion;
    }

    public InscripcionDetalle inscripcion(Inscripcion inscripcion) {
        this.setInscripcion(inscripcion);
        return this;
    }

    public Asignatura getAsignatura() {
        return this.asignatura;
    }

    public void setAsignatura(Asignatura asignatura) {
        this.asignatura = asignatura;
    }

    public InscripcionDetalle asignatura(Asignatura asignatura) {
        this.setAsignatura(asignatura);
        return this;
    }

    public TeoriaHorarioCatalogo getHorario() {
        return this.horario;
    }

    public void setHorario(TeoriaHorarioCatalogo teoriaHorarioCatalogo) {
        this.horario = teoriaHorarioCatalogo;
    }

    public InscripcionDetalle horario(TeoriaHorarioCatalogo teoriaHorarioCatalogo) {
        this.setHorario(teoriaHorarioCatalogo);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InscripcionDetalle)) {
            return false;
        }
        return id != null && id.equals(((InscripcionDetalle) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionDetalle{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", fechaInicio='" + getFechaInicio() + "'" +
            "}";
    }
}
