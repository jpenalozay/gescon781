package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A HorarioCatalogo.
 */
@Entity
@Table(name = "horario_catalogo")
public class HorarioCatalogo implements Serializable {

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
    @Min(value = 1)
    @Max(value = 99)
    @Column(name = "codigo", nullable = false, unique = true)
    private Integer codigo;

    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "hora_inicio", length = 8, nullable = false)
    private String horaInicio;

    @NotNull
    @Size(min = 1, max = 8)
    @Column(name = "hora_fin", length = 8, nullable = false)
    private String horaFin;

    @NotNull
    @Size(min = 1, max = 16)
    @Column(name = "descripcion", length = 16, nullable = false)
    private String descripcion;

    @OneToMany(mappedBy = "horarioCatalogo")
    @JsonIgnoreProperties(
        value = {
            "horarioDeshabilitacions", "alumno", "instructor", "programacion", "fecha", "horarioCatalogo", "automovil", "lugarSalida",
        },
        allowSetters = true
    )
    private Set<Horario> horarios = new HashSet<>();

    @ManyToMany(mappedBy = "horarioCatalogos")
    @JsonIgnoreProperties(
        value = { "programacionDeshabilitacions", "horarios", "dias", "horarioCatalogos", "profesor", "automovil" },
        allowSetters = true
    )
    private Set<Programacion> programacions = new HashSet<>();

    @ManyToMany(mappedBy = "horarioCatalogos")
    @JsonIgnoreProperties(
        value = { "horarioDeshabilitaciones", "fechas", "horarioCatalogos", "programacion", "usuario" },
        allowSetters = true
    )
    private Set<ProgramacionDeshabilitacion> programacionDeshabilitaciones = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public HorarioCatalogo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public HorarioCatalogo activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public Integer getCodigo() {
        return this.codigo;
    }

    public HorarioCatalogo codigo(Integer codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getHoraInicio() {
        return this.horaInicio;
    }

    public HorarioCatalogo horaInicio(String horaInicio) {
        this.setHoraInicio(horaInicio);
        return this;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFin() {
        return this.horaFin;
    }

    public HorarioCatalogo horaFin(String horaFin) {
        this.setHoraFin(horaFin);
        return this;
    }

    public void setHoraFin(String horaFin) {
        this.horaFin = horaFin;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public HorarioCatalogo descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Horario> getHorarios() {
        return this.horarios;
    }

    public void setHorarios(Set<Horario> horarios) {
        if (this.horarios != null) {
            this.horarios.forEach(i -> i.setHorarioCatalogo(null));
        }
        if (horarios != null) {
            horarios.forEach(i -> i.setHorarioCatalogo(this));
        }
        this.horarios = horarios;
    }

    public HorarioCatalogo horarios(Set<Horario> horarios) {
        this.setHorarios(horarios);
        return this;
    }

    public HorarioCatalogo addHorario(Horario horario) {
        this.horarios.add(horario);
        horario.setHorarioCatalogo(this);
        return this;
    }

    public HorarioCatalogo removeHorario(Horario horario) {
        this.horarios.remove(horario);
        horario.setHorarioCatalogo(null);
        return this;
    }

    public Set<Programacion> getProgramacions() {
        return this.programacions;
    }

    public void setProgramacions(Set<Programacion> programacions) {
        if (this.programacions != null) {
            this.programacions.forEach(i -> i.removeHorarioCatalogo(this));
        }
        if (programacions != null) {
            programacions.forEach(i -> i.addHorarioCatalogo(this));
        }
        this.programacions = programacions;
    }

    public HorarioCatalogo programacions(Set<Programacion> programacions) {
        this.setProgramacions(programacions);
        return this;
    }

    public HorarioCatalogo addProgramacion(Programacion programacion) {
        this.programacions.add(programacion);
        programacion.getHorarioCatalogos().add(this);
        return this;
    }

    public HorarioCatalogo removeProgramacion(Programacion programacion) {
        this.programacions.remove(programacion);
        programacion.getHorarioCatalogos().remove(this);
        return this;
    }

    public Set<ProgramacionDeshabilitacion> getProgramacionDeshabilitaciones() {
        return this.programacionDeshabilitaciones;
    }

    public void setProgramacionDeshabilitaciones(Set<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        if (this.programacionDeshabilitaciones != null) {
            this.programacionDeshabilitaciones.forEach(i -> i.removeHorarioCatalogo(this));
        }
        if (programacionDeshabilitacions != null) {
            programacionDeshabilitacions.forEach(i -> i.addHorarioCatalogo(this));
        }
        this.programacionDeshabilitaciones = programacionDeshabilitacions;
    }

    public HorarioCatalogo programacionDeshabilitaciones(Set<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        this.setProgramacionDeshabilitaciones(programacionDeshabilitacions);
        return this;
    }

    public HorarioCatalogo addProgramacionDeshabilitaciones(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        this.programacionDeshabilitaciones.add(programacionDeshabilitacion);
        programacionDeshabilitacion.getHorarioCatalogos().add(this);
        return this;
    }

    public HorarioCatalogo removeProgramacionDeshabilitaciones(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        this.programacionDeshabilitaciones.remove(programacionDeshabilitacion);
        programacionDeshabilitacion.getHorarioCatalogos().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HorarioCatalogo)) {
            return false;
        }
        return id != null && id.equals(((HorarioCatalogo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HorarioCatalogo{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", codigo=" + getCodigo() +
            ", horaInicio='" + getHoraInicio() + "'" +
            ", horaFin='" + getHoraFin() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
