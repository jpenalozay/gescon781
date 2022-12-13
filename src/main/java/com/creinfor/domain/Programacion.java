package com.creinfor.domain;

import com.creinfor.domain.enumeration.ProgramacionEstado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Programacion.
 */
@Entity
@Table(name = "programacion")
public class Programacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private ProgramacionEstado estado;

    @NotNull
    @Size(min = 9)
    @Column(name = "codigo", nullable = false, unique = true)
    private String codigo;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;

    @Min(value = 0)
    @Max(value = 99)
    @Column(name = "deshabilitaciones")
    private Integer deshabilitaciones;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "nombre_usuario")
    private String nombreUsuario;

    @OneToMany(mappedBy = "programacion")
    @JsonIgnoreProperties(
        value = { "horarioDeshabilitaciones", "fechas", "horarioCatalogos", "programacion", "usuario" },
        allowSetters = true
    )
    private Set<ProgramacionDeshabilitacion> programacionDeshabilitacions = new HashSet<>();

    @OneToMany(mappedBy = "programacion")
    @JsonIgnoreProperties(
        value = {
            "horarioDeshabilitacions", "alumno", "instructor", "programacion", "fecha", "horarioCatalogo", "automovil", "lugarSalida",
        },
        allowSetters = true
    )
    private Set<Horario> horarios = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_programacion__dia",
        joinColumns = @JoinColumn(name = "programacion_id"),
        inverseJoinColumns = @JoinColumn(name = "dia_id")
    )
    @JsonIgnoreProperties(value = { "programacions" }, allowSetters = true)
    private Set<Dia> dias = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_programacion__horario_catalogo",
        joinColumns = @JoinColumn(name = "programacion_id"),
        inverseJoinColumns = @JoinColumn(name = "horario_catalogo_id")
    )
    @JsonIgnoreProperties(value = { "horarios", "programacions", "programacionDeshabilitaciones" }, allowSetters = true)
    private Set<HorarioCatalogo> horarioCatalogos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(
        value = { "empleado", "horarios", "programacions", "licenciasPermitidas", "licenciaCategoria" },
        allowSetters = true
    )
    private Profesor profesor;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "programacions", "horarios" }, allowSetters = true)
    private Automovil automovil;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Programacion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProgramacionEstado getEstado() {
        return this.estado;
    }

    public Programacion estado(ProgramacionEstado estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(ProgramacionEstado estado) {
        this.estado = estado;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Programacion codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalDate getFechaInicio() {
        return this.fechaInicio;
    }

    public Programacion fechaInicio(LocalDate fechaInicio) {
        this.setFechaInicio(fechaInicio);
        return this;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return this.fechaFin;
    }

    public Programacion fechaFin(LocalDate fechaFin) {
        this.setFechaFin(fechaFin);
        return this;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Integer getDeshabilitaciones() {
        return this.deshabilitaciones;
    }

    public Programacion deshabilitaciones(Integer deshabilitaciones) {
        this.setDeshabilitaciones(deshabilitaciones);
        return this;
    }

    public void setDeshabilitaciones(Integer deshabilitaciones) {
        this.deshabilitaciones = deshabilitaciones;
    }

    public Instant getFecha() {
        return this.fecha;
    }

    public Programacion fecha(Instant fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getNombreUsuario() {
        return this.nombreUsuario;
    }

    public Programacion nombreUsuario(String nombreUsuario) {
        this.setNombreUsuario(nombreUsuario);
        return this;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public Set<ProgramacionDeshabilitacion> getProgramacionDeshabilitacions() {
        return this.programacionDeshabilitacions;
    }

    public void setProgramacionDeshabilitacions(Set<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        if (this.programacionDeshabilitacions != null) {
            this.programacionDeshabilitacions.forEach(i -> i.setProgramacion(null));
        }
        if (programacionDeshabilitacions != null) {
            programacionDeshabilitacions.forEach(i -> i.setProgramacion(this));
        }
        this.programacionDeshabilitacions = programacionDeshabilitacions;
    }

    public Programacion programacionDeshabilitacions(Set<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        this.setProgramacionDeshabilitacions(programacionDeshabilitacions);
        return this;
    }

    public Programacion addProgramacionDeshabilitacion(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        this.programacionDeshabilitacions.add(programacionDeshabilitacion);
        programacionDeshabilitacion.setProgramacion(this);
        return this;
    }

    public Programacion removeProgramacionDeshabilitacion(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        this.programacionDeshabilitacions.remove(programacionDeshabilitacion);
        programacionDeshabilitacion.setProgramacion(null);
        return this;
    }

    public Set<Horario> getHorarios() {
        return this.horarios;
    }

    public void setHorarios(Set<Horario> horarios) {
        if (this.horarios != null) {
            this.horarios.forEach(i -> i.setProgramacion(null));
        }
        if (horarios != null) {
            horarios.forEach(i -> i.setProgramacion(this));
        }
        this.horarios = horarios;
    }

    public Programacion horarios(Set<Horario> horarios) {
        this.setHorarios(horarios);
        return this;
    }

    public Programacion addHorario(Horario horario) {
        this.horarios.add(horario);
        horario.setProgramacion(this);
        return this;
    }

    public Programacion removeHorario(Horario horario) {
        this.horarios.remove(horario);
        horario.setProgramacion(null);
        return this;
    }

    public Set<Dia> getDias() {
        return this.dias;
    }

    public void setDias(Set<Dia> dias) {
        this.dias = dias;
    }

    public Programacion dias(Set<Dia> dias) {
        this.setDias(dias);
        return this;
    }

    public Programacion addDia(Dia dia) {
        this.dias.add(dia);
        dia.getProgramacions().add(this);
        return this;
    }

    public Programacion removeDia(Dia dia) {
        this.dias.remove(dia);
        dia.getProgramacions().remove(this);
        return this;
    }

    public Set<HorarioCatalogo> getHorarioCatalogos() {
        return this.horarioCatalogos;
    }

    public void setHorarioCatalogos(Set<HorarioCatalogo> horarioCatalogos) {
        this.horarioCatalogos = horarioCatalogos;
    }

    public Programacion horarioCatalogos(Set<HorarioCatalogo> horarioCatalogos) {
        this.setHorarioCatalogos(horarioCatalogos);
        return this;
    }

    public Programacion addHorarioCatalogo(HorarioCatalogo horarioCatalogo) {
        this.horarioCatalogos.add(horarioCatalogo);
        horarioCatalogo.getProgramacions().add(this);
        return this;
    }

    public Programacion removeHorarioCatalogo(HorarioCatalogo horarioCatalogo) {
        this.horarioCatalogos.remove(horarioCatalogo);
        horarioCatalogo.getProgramacions().remove(this);
        return this;
    }

    public Profesor getProfesor() {
        return this.profesor;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }

    public Programacion profesor(Profesor profesor) {
        this.setProfesor(profesor);
        return this;
    }

    public Automovil getAutomovil() {
        return this.automovil;
    }

    public void setAutomovil(Automovil automovil) {
        this.automovil = automovil;
    }

    public Programacion automovil(Automovil automovil) {
        this.setAutomovil(automovil);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Programacion)) {
            return false;
        }
        return id != null && id.equals(((Programacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Programacion{" +
            "id=" + getId() +
            ", estado='" + getEstado() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFin='" + getFechaFin() + "'" +
            ", deshabilitaciones=" + getDeshabilitaciones() +
            ", fecha='" + getFecha() + "'" +
            ", nombreUsuario='" + getNombreUsuario() + "'" +
            "}";
    }
}
