package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.HorarioTipo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Horario.
 */
@Entity
@Table(name = "horario")
public class Horario implements Serializable {

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

    @Column(name = "fecha_dia")
    private LocalDate fechaDia;

    @Min(value = 1)
    @Max(value = 7)
    @Column(name = "fecha_dia_sem")
    private Integer fechaDiaSem;

    @OneToMany(mappedBy = "horario")
    @JsonIgnoreProperties(value = { "programacionDeshabilitacion", "horario" }, allowSetters = true)
    private Set<HorarioDeshabilitacion> horarioDeshabilitacions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "persona", "alumnoClases", "alumnoUsuarios", "alumnoCategorias", "inscripcions", "horarios" },
        allowSetters = true
    )
    private Alumno alumno;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "empleado", "horarios", "programacions", "licenciasPermitidas", "licenciaCategoria" },
        allowSetters = true
    )
    private Profesor instructor;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(
        value = { "programacionDeshabilitacions", "horarios", "dias", "horarioCatalogos", "profesor", "automovil" },
        allowSetters = true
    )
    private Programacion programacion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "horarios", "programacionDeshabilitacions" }, allowSetters = true)
    private Fecha fecha;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "horarios", "programacions", "programacionDeshabilitaciones" }, allowSetters = true)
    private HorarioCatalogo horarioCatalogo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "programacions", "horarios" }, allowSetters = true)
    private Automovil automovil;

    @ManyToOne
    @JsonIgnoreProperties(value = { "horarios" }, allowSetters = true)
    private LugarSalida lugarSalida;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Horario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public Horario activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public HorarioTipo getTipo() {
        return this.tipo;
    }

    public Horario tipo(HorarioTipo tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(HorarioTipo tipo) {
        this.tipo = tipo;
    }

    public LocalDate getFechaDia() {
        return this.fechaDia;
    }

    public Horario fechaDia(LocalDate fechaDia) {
        this.setFechaDia(fechaDia);
        return this;
    }

    public void setFechaDia(LocalDate fechaDia) {
        this.fechaDia = fechaDia;
    }

    public Integer getFechaDiaSem() {
        return this.fechaDiaSem;
    }

    public Horario fechaDiaSem(Integer fechaDiaSem) {
        this.setFechaDiaSem(fechaDiaSem);
        return this;
    }

    public void setFechaDiaSem(Integer fechaDiaSem) {
        this.fechaDiaSem = fechaDiaSem;
    }

    public Set<HorarioDeshabilitacion> getHorarioDeshabilitacions() {
        return this.horarioDeshabilitacions;
    }

    public void setHorarioDeshabilitacions(Set<HorarioDeshabilitacion> horarioDeshabilitacions) {
        if (this.horarioDeshabilitacions != null) {
            this.horarioDeshabilitacions.forEach(i -> i.setHorario(null));
        }
        if (horarioDeshabilitacions != null) {
            horarioDeshabilitacions.forEach(i -> i.setHorario(this));
        }
        this.horarioDeshabilitacions = horarioDeshabilitacions;
    }

    public Horario horarioDeshabilitacions(Set<HorarioDeshabilitacion> horarioDeshabilitacions) {
        this.setHorarioDeshabilitacions(horarioDeshabilitacions);
        return this;
    }

    public Horario addHorarioDeshabilitacion(HorarioDeshabilitacion horarioDeshabilitacion) {
        this.horarioDeshabilitacions.add(horarioDeshabilitacion);
        horarioDeshabilitacion.setHorario(this);
        return this;
    }

    public Horario removeHorarioDeshabilitacion(HorarioDeshabilitacion horarioDeshabilitacion) {
        this.horarioDeshabilitacions.remove(horarioDeshabilitacion);
        horarioDeshabilitacion.setHorario(null);
        return this;
    }

    public Alumno getAlumno() {
        return this.alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Horario alumno(Alumno alumno) {
        this.setAlumno(alumno);
        return this;
    }

    public Profesor getInstructor() {
        return this.instructor;
    }

    public void setInstructor(Profesor profesor) {
        this.instructor = profesor;
    }

    public Horario instructor(Profesor profesor) {
        this.setInstructor(profesor);
        return this;
    }

    public Programacion getProgramacion() {
        return this.programacion;
    }

    public void setProgramacion(Programacion programacion) {
        this.programacion = programacion;
    }

    public Horario programacion(Programacion programacion) {
        this.setProgramacion(programacion);
        return this;
    }

    public Fecha getFecha() {
        return this.fecha;
    }

    public void setFecha(Fecha fecha) {
        this.fecha = fecha;
    }

    public Horario fecha(Fecha fecha) {
        this.setFecha(fecha);
        return this;
    }

    public HorarioCatalogo getHorarioCatalogo() {
        return this.horarioCatalogo;
    }

    public void setHorarioCatalogo(HorarioCatalogo horarioCatalogo) {
        this.horarioCatalogo = horarioCatalogo;
    }

    public Horario horarioCatalogo(HorarioCatalogo horarioCatalogo) {
        this.setHorarioCatalogo(horarioCatalogo);
        return this;
    }

    public Automovil getAutomovil() {
        return this.automovil;
    }

    public void setAutomovil(Automovil automovil) {
        this.automovil = automovil;
    }

    public Horario automovil(Automovil automovil) {
        this.setAutomovil(automovil);
        return this;
    }

    public LugarSalida getLugarSalida() {
        return this.lugarSalida;
    }

    public void setLugarSalida(LugarSalida lugarSalida) {
        this.lugarSalida = lugarSalida;
    }

    public Horario lugarSalida(LugarSalida lugarSalida) {
        this.setLugarSalida(lugarSalida);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Horario)) {
            return false;
        }
        return id != null && id.equals(((Horario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Horario{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", fechaDia='" + getFechaDia() + "'" +
            ", fechaDiaSem=" + getFechaDiaSem() +
            "}";
    }
}
