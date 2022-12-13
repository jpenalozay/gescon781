package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A ProgramacionDeshabilitacion.
 */
@Entity
@Table(name = "programacion_deshabilitacion")
public class ProgramacionDeshabilitacion implements Serializable {

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
    @Size(min = 6, max = 100)
    @Column(name = "codigo", length = 100, nullable = false, unique = true)
    private String codigo;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "nombre_usuario")
    private String nombreUsuario;

    @OneToMany(mappedBy = "programacionDeshabilitacion")
    @JsonIgnoreProperties(value = { "programacionDeshabilitacion", "horario" }, allowSetters = true)
    private Set<HorarioDeshabilitacion> horarioDeshabilitaciones = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_programacion_deshabilitacion__fechas",
        joinColumns = @JoinColumn(name = "programacion_deshabilitacion_id"),
        inverseJoinColumns = @JoinColumn(name = "fechas_id")
    )
    @JsonIgnoreProperties(value = { "horarios", "programacionDeshabilitacions" }, allowSetters = true)
    private Set<Fecha> fechas = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_programacion_deshabilitacion__horario_catalogo",
        joinColumns = @JoinColumn(name = "programacion_deshabilitacion_id"),
        inverseJoinColumns = @JoinColumn(name = "horario_catalogo_id")
    )
    @JsonIgnoreProperties(value = { "horarios", "programacions", "programacionDeshabilitaciones" }, allowSetters = true)
    private Set<HorarioCatalogo> horarioCatalogos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(
        value = { "programacionDeshabilitacions", "horarios", "dias", "horarioCatalogos", "profesor", "automovil" },
        allowSetters = true
    )
    private Programacion programacion;

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "empleado", "programacionDeshabilitacions", "sucursals", "computadoras" }, allowSetters = true)
    private Usuario usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ProgramacionDeshabilitacion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public ProgramacionDeshabilitacion activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public ProgramacionDeshabilitacion codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public ProgramacionDeshabilitacion descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Instant getFecha() {
        return this.fecha;
    }

    public ProgramacionDeshabilitacion fecha(Instant fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getNombreUsuario() {
        return this.nombreUsuario;
    }

    public ProgramacionDeshabilitacion nombreUsuario(String nombreUsuario) {
        this.setNombreUsuario(nombreUsuario);
        return this;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public Set<HorarioDeshabilitacion> getHorarioDeshabilitaciones() {
        return this.horarioDeshabilitaciones;
    }

    public void setHorarioDeshabilitaciones(Set<HorarioDeshabilitacion> horarioDeshabilitacions) {
        if (this.horarioDeshabilitaciones != null) {
            this.horarioDeshabilitaciones.forEach(i -> i.setProgramacionDeshabilitacion(null));
        }
        if (horarioDeshabilitacions != null) {
            horarioDeshabilitacions.forEach(i -> i.setProgramacionDeshabilitacion(this));
        }
        this.horarioDeshabilitaciones = horarioDeshabilitacions;
    }

    public ProgramacionDeshabilitacion horarioDeshabilitaciones(Set<HorarioDeshabilitacion> horarioDeshabilitacions) {
        this.setHorarioDeshabilitaciones(horarioDeshabilitacions);
        return this;
    }

    public ProgramacionDeshabilitacion addHorarioDeshabilitaciones(HorarioDeshabilitacion horarioDeshabilitacion) {
        this.horarioDeshabilitaciones.add(horarioDeshabilitacion);
        horarioDeshabilitacion.setProgramacionDeshabilitacion(this);
        return this;
    }

    public ProgramacionDeshabilitacion removeHorarioDeshabilitaciones(HorarioDeshabilitacion horarioDeshabilitacion) {
        this.horarioDeshabilitaciones.remove(horarioDeshabilitacion);
        horarioDeshabilitacion.setProgramacionDeshabilitacion(null);
        return this;
    }

    public Set<Fecha> getFechas() {
        return this.fechas;
    }

    public void setFechas(Set<Fecha> fechas) {
        this.fechas = fechas;
    }

    public ProgramacionDeshabilitacion fechas(Set<Fecha> fechas) {
        this.setFechas(fechas);
        return this;
    }

    public ProgramacionDeshabilitacion addFechas(Fecha fecha) {
        this.fechas.add(fecha);
        fecha.getProgramacionDeshabilitacions().add(this);
        return this;
    }

    public ProgramacionDeshabilitacion removeFechas(Fecha fecha) {
        this.fechas.remove(fecha);
        fecha.getProgramacionDeshabilitacions().remove(this);
        return this;
    }

    public Set<HorarioCatalogo> getHorarioCatalogos() {
        return this.horarioCatalogos;
    }

    public void setHorarioCatalogos(Set<HorarioCatalogo> horarioCatalogos) {
        this.horarioCatalogos = horarioCatalogos;
    }

    public ProgramacionDeshabilitacion horarioCatalogos(Set<HorarioCatalogo> horarioCatalogos) {
        this.setHorarioCatalogos(horarioCatalogos);
        return this;
    }

    public ProgramacionDeshabilitacion addHorarioCatalogo(HorarioCatalogo horarioCatalogo) {
        this.horarioCatalogos.add(horarioCatalogo);
        horarioCatalogo.getProgramacionDeshabilitaciones().add(this);
        return this;
    }

    public ProgramacionDeshabilitacion removeHorarioCatalogo(HorarioCatalogo horarioCatalogo) {
        this.horarioCatalogos.remove(horarioCatalogo);
        horarioCatalogo.getProgramacionDeshabilitaciones().remove(this);
        return this;
    }

    public Programacion getProgramacion() {
        return this.programacion;
    }

    public void setProgramacion(Programacion programacion) {
        this.programacion = programacion;
    }

    public ProgramacionDeshabilitacion programacion(Programacion programacion) {
        this.setProgramacion(programacion);
        return this;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public ProgramacionDeshabilitacion usuario(Usuario usuario) {
        this.setUsuario(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProgramacionDeshabilitacion)) {
            return false;
        }
        return id != null && id.equals(((ProgramacionDeshabilitacion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProgramacionDeshabilitacion{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", nombreUsuario='" + getNombreUsuario() + "'" +
            "}";
    }
}
