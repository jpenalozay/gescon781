package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.HorarioTipo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A HorarioDeshabilitacion.
 */
@Entity
@Table(name = "horario_deshabilitacion")
public class HorarioDeshabilitacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "activo", nullable = false)
    private Estado activo;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private HorarioTipo tipo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(
        value = { "horarioDeshabilitaciones", "fechas", "horarioCatalogos", "programacion", "usuario" },
        allowSetters = true
    )
    private ProgramacionDeshabilitacion programacionDeshabilitacion;

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "horarioDeshabilitacions", "alumno", "instructor", "programacion", "fecha", "horarioCatalogo", "automovil", "lugarSalida",
        },
        allowSetters = true
    )
    private Horario horario;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public HorarioDeshabilitacion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public HorarioDeshabilitacion activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public HorarioTipo getTipo() {
        return this.tipo;
    }

    public HorarioDeshabilitacion tipo(HorarioTipo tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(HorarioTipo tipo) {
        this.tipo = tipo;
    }

    public ProgramacionDeshabilitacion getProgramacionDeshabilitacion() {
        return this.programacionDeshabilitacion;
    }

    public void setProgramacionDeshabilitacion(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        this.programacionDeshabilitacion = programacionDeshabilitacion;
    }

    public HorarioDeshabilitacion programacionDeshabilitacion(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        this.setProgramacionDeshabilitacion(programacionDeshabilitacion);
        return this;
    }

    public Horario getHorario() {
        return this.horario;
    }

    public void setHorario(Horario horario) {
        this.horario = horario;
    }

    public HorarioDeshabilitacion horario(Horario horario) {
        this.setHorario(horario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HorarioDeshabilitacion)) {
            return false;
        }
        return id != null && id.equals(((HorarioDeshabilitacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HorarioDeshabilitacion{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
