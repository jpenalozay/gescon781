package com.creinfor.domain;

import com.creinfor.domain.enumeration.AlumnoEstado;
import com.creinfor.domain.enumeration.AlumnoTipo;
import com.creinfor.domain.enumeration.GradoInstruccion;
import com.creinfor.domain.enumeration.Ocupacion;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Alumno.
 */
@Entity
@Table(name = "alumno")
public class Alumno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 7, max = 7)
    @Column(name = "codigo", length = 7, nullable = false, unique = true)
    private String codigo;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private AlumnoEstado estado;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private AlumnoTipo tipo;

    @Enumerated(EnumType.STRING)
    @Column(name = "alumno_grado_instruccion")
    private GradoInstruccion alumnoGradoInstruccion;

    @Enumerated(EnumType.STRING)
    @Column(name = "ocupacion")
    private Ocupacion ocupacion;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @JsonIgnoreProperties(value = { "distrito" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Persona persona;

    @JsonIgnoreProperties(value = { "alumno" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private AlumnoClases alumnoClases;

    @OneToMany(mappedBy = "alumno")
    @JsonIgnoreProperties(value = { "alumno" }, allowSetters = true)
    private Set<AlumnoUsuario> alumnoUsuarios = new HashSet<>();

    @OneToMany(mappedBy = "alumno")
    @JsonIgnoreProperties(value = { "alumno", "categoria" }, allowSetters = true)
    private Set<AlumnoCategoria> alumnoCategorias = new HashSet<>();

    @OneToMany(mappedBy = "alumno")
    @JsonIgnoreProperties(
        value = { "inscripcionPagos", "inscripcionAdicionals", "inscripcionDetalles", "insDescuento", "alumno" },
        allowSetters = true
    )
    private Set<Inscripcion> inscripcions = new HashSet<>();

    @OneToMany(mappedBy = "alumno")
    @JsonIgnoreProperties(
        value = {
            "horarioDeshabilitacions", "alumno", "instructor", "programacion", "fecha", "horarioCatalogo", "automovil", "lugarSalida",
        },
        allowSetters = true
    )
    private Set<Horario> horarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Alumno id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Alumno codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public AlumnoEstado getEstado() {
        return this.estado;
    }

    public Alumno estado(AlumnoEstado estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(AlumnoEstado estado) {
        this.estado = estado;
    }

    public AlumnoTipo getTipo() {
        return this.tipo;
    }

    public Alumno tipo(AlumnoTipo tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(AlumnoTipo tipo) {
        this.tipo = tipo;
    }

    public GradoInstruccion getAlumnoGradoInstruccion() {
        return this.alumnoGradoInstruccion;
    }

    public Alumno alumnoGradoInstruccion(GradoInstruccion alumnoGradoInstruccion) {
        this.setAlumnoGradoInstruccion(alumnoGradoInstruccion);
        return this;
    }

    public void setAlumnoGradoInstruccion(GradoInstruccion alumnoGradoInstruccion) {
        this.alumnoGradoInstruccion = alumnoGradoInstruccion;
    }

    public Ocupacion getOcupacion() {
        return this.ocupacion;
    }

    public Alumno ocupacion(Ocupacion ocupacion) {
        this.setOcupacion(ocupacion);
        return this;
    }

    public void setOcupacion(Ocupacion ocupacion) {
        this.ocupacion = ocupacion;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public Alumno imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public Alumno imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Persona getPersona() {
        return this.persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Alumno persona(Persona persona) {
        this.setPersona(persona);
        return this;
    }

    public AlumnoClases getAlumnoClases() {
        return this.alumnoClases;
    }

    public void setAlumnoClases(AlumnoClases alumnoClases) {
        this.alumnoClases = alumnoClases;
    }

    public Alumno alumnoClases(AlumnoClases alumnoClases) {
        this.setAlumnoClases(alumnoClases);
        return this;
    }

    public Set<AlumnoUsuario> getAlumnoUsuarios() {
        return this.alumnoUsuarios;
    }

    public void setAlumnoUsuarios(Set<AlumnoUsuario> alumnoUsuarios) {
        if (this.alumnoUsuarios != null) {
            this.alumnoUsuarios.forEach(i -> i.setAlumno(null));
        }
        if (alumnoUsuarios != null) {
            alumnoUsuarios.forEach(i -> i.setAlumno(this));
        }
        this.alumnoUsuarios = alumnoUsuarios;
    }

    public Alumno alumnoUsuarios(Set<AlumnoUsuario> alumnoUsuarios) {
        this.setAlumnoUsuarios(alumnoUsuarios);
        return this;
    }

    public Alumno addAlumnoUsuario(AlumnoUsuario alumnoUsuario) {
        this.alumnoUsuarios.add(alumnoUsuario);
        alumnoUsuario.setAlumno(this);
        return this;
    }

    public Alumno removeAlumnoUsuario(AlumnoUsuario alumnoUsuario) {
        this.alumnoUsuarios.remove(alumnoUsuario);
        alumnoUsuario.setAlumno(null);
        return this;
    }

    public Set<AlumnoCategoria> getAlumnoCategorias() {
        return this.alumnoCategorias;
    }

    public void setAlumnoCategorias(Set<AlumnoCategoria> alumnoCategorias) {
        if (this.alumnoCategorias != null) {
            this.alumnoCategorias.forEach(i -> i.setAlumno(null));
        }
        if (alumnoCategorias != null) {
            alumnoCategorias.forEach(i -> i.setAlumno(this));
        }
        this.alumnoCategorias = alumnoCategorias;
    }

    public Alumno alumnoCategorias(Set<AlumnoCategoria> alumnoCategorias) {
        this.setAlumnoCategorias(alumnoCategorias);
        return this;
    }

    public Alumno addAlumnoCategoria(AlumnoCategoria alumnoCategoria) {
        this.alumnoCategorias.add(alumnoCategoria);
        alumnoCategoria.setAlumno(this);
        return this;
    }

    public Alumno removeAlumnoCategoria(AlumnoCategoria alumnoCategoria) {
        this.alumnoCategorias.remove(alumnoCategoria);
        alumnoCategoria.setAlumno(null);
        return this;
    }

    public Set<Inscripcion> getInscripcions() {
        return this.inscripcions;
    }

    public void setInscripcions(Set<Inscripcion> inscripcions) {
        if (this.inscripcions != null) {
            this.inscripcions.forEach(i -> i.setAlumno(null));
        }
        if (inscripcions != null) {
            inscripcions.forEach(i -> i.setAlumno(this));
        }
        this.inscripcions = inscripcions;
    }

    public Alumno inscripcions(Set<Inscripcion> inscripcions) {
        this.setInscripcions(inscripcions);
        return this;
    }

    public Alumno addInscripcion(Inscripcion inscripcion) {
        this.inscripcions.add(inscripcion);
        inscripcion.setAlumno(this);
        return this;
    }

    public Alumno removeInscripcion(Inscripcion inscripcion) {
        this.inscripcions.remove(inscripcion);
        inscripcion.setAlumno(null);
        return this;
    }

    public Set<Horario> getHorarios() {
        return this.horarios;
    }

    public void setHorarios(Set<Horario> horarios) {
        if (this.horarios != null) {
            this.horarios.forEach(i -> i.setAlumno(null));
        }
        if (horarios != null) {
            horarios.forEach(i -> i.setAlumno(this));
        }
        this.horarios = horarios;
    }

    public Alumno horarios(Set<Horario> horarios) {
        this.setHorarios(horarios);
        return this;
    }

    public Alumno addHorario(Horario horario) {
        this.horarios.add(horario);
        horario.setAlumno(this);
        return this;
    }

    public Alumno removeHorario(Horario horario) {
        this.horarios.remove(horario);
        horario.setAlumno(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Alumno)) {
            return false;
        }
        return id != null && id.equals(((Alumno) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Alumno{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", estado='" + getEstado() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", alumnoGradoInstruccion='" + getAlumnoGradoInstruccion() + "'" +
            ", ocupacion='" + getOcupacion() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
