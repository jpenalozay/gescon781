package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A TeoriaHorarioCatalogo.
 */
@Entity
@Table(name = "teoria_horario_catalogo")
public class TeoriaHorarioCatalogo implements Serializable {

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
    @Size(min = 2, max = 512)
    @Column(name = "nombre", length = 512, nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Size(min = 2, max = 64)
    @Column(name = "nombre_corto", length = 64, nullable = false, unique = true)
    private String nombreCorto;

    @Column(name = "descripcion")
    private String descripcion;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @Column(name = "periodo")
    private String periodo;

    @Column(name = "anio")
    private String anio;

    @Column(name = "mes")
    private String mes;

    @Column(name = "dia")
    private String dia;

    @Column(name = "hora_inicio")
    private Integer horaInicio;

    @Column(name = "hora_fin")
    private Integer horaFin;

    @OneToMany(mappedBy = "horario")
    @JsonIgnoreProperties(value = { "inscripcionAsignaturaRequisitos", "inscripcion", "asignatura", "horario" }, allowSetters = true)
    private Set<InscripcionDetalle> inscripcionDetalles = new HashSet<>();

    @ManyToMany(mappedBy = "horarios")
    @JsonIgnoreProperties(value = { "horarios" }, allowSetters = true)
    private Set<Teoria> teorias = new HashSet<>();

    @ManyToMany(mappedBy = "horarios")
    @JsonIgnoreProperties(
        value = { "inscripcionDetalles", "categorias", "adicionals", "horarios", "asignaturaRequisitos", "curso" },
        allowSetters = true
    )
    private Set<Asignatura> asignaturas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public TeoriaHorarioCatalogo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public TeoriaHorarioCatalogo activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public TeoriaHorarioCatalogo nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public TeoriaHorarioCatalogo nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public TeoriaHorarioCatalogo descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public TeoriaHorarioCatalogo imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public TeoriaHorarioCatalogo imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public String getPeriodo() {
        return this.periodo;
    }

    public TeoriaHorarioCatalogo periodo(String periodo) {
        this.setPeriodo(periodo);
        return this;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public String getAnio() {
        return this.anio;
    }

    public TeoriaHorarioCatalogo anio(String anio) {
        this.setAnio(anio);
        return this;
    }

    public void setAnio(String anio) {
        this.anio = anio;
    }

    public String getMes() {
        return this.mes;
    }

    public TeoriaHorarioCatalogo mes(String mes) {
        this.setMes(mes);
        return this;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public String getDia() {
        return this.dia;
    }

    public TeoriaHorarioCatalogo dia(String dia) {
        this.setDia(dia);
        return this;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public Integer getHoraInicio() {
        return this.horaInicio;
    }

    public TeoriaHorarioCatalogo horaInicio(Integer horaInicio) {
        this.setHoraInicio(horaInicio);
        return this;
    }

    public void setHoraInicio(Integer horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Integer getHoraFin() {
        return this.horaFin;
    }

    public TeoriaHorarioCatalogo horaFin(Integer horaFin) {
        this.setHoraFin(horaFin);
        return this;
    }

    public void setHoraFin(Integer horaFin) {
        this.horaFin = horaFin;
    }

    public Set<InscripcionDetalle> getInscripcionDetalles() {
        return this.inscripcionDetalles;
    }

    public void setInscripcionDetalles(Set<InscripcionDetalle> inscripcionDetalles) {
        if (this.inscripcionDetalles != null) {
            this.inscripcionDetalles.forEach(i -> i.setHorario(null));
        }
        if (inscripcionDetalles != null) {
            inscripcionDetalles.forEach(i -> i.setHorario(this));
        }
        this.inscripcionDetalles = inscripcionDetalles;
    }

    public TeoriaHorarioCatalogo inscripcionDetalles(Set<InscripcionDetalle> inscripcionDetalles) {
        this.setInscripcionDetalles(inscripcionDetalles);
        return this;
    }

    public TeoriaHorarioCatalogo addInscripcionDetalle(InscripcionDetalle inscripcionDetalle) {
        this.inscripcionDetalles.add(inscripcionDetalle);
        inscripcionDetalle.setHorario(this);
        return this;
    }

    public TeoriaHorarioCatalogo removeInscripcionDetalle(InscripcionDetalle inscripcionDetalle) {
        this.inscripcionDetalles.remove(inscripcionDetalle);
        inscripcionDetalle.setHorario(null);
        return this;
    }

    public Set<Teoria> getTeorias() {
        return this.teorias;
    }

    public void setTeorias(Set<Teoria> teorias) {
        if (this.teorias != null) {
            this.teorias.forEach(i -> i.removeHorarios(this));
        }
        if (teorias != null) {
            teorias.forEach(i -> i.addHorarios(this));
        }
        this.teorias = teorias;
    }

    public TeoriaHorarioCatalogo teorias(Set<Teoria> teorias) {
        this.setTeorias(teorias);
        return this;
    }

    public TeoriaHorarioCatalogo addTeoria(Teoria teoria) {
        this.teorias.add(teoria);
        teoria.getHorarios().add(this);
        return this;
    }

    public TeoriaHorarioCatalogo removeTeoria(Teoria teoria) {
        this.teorias.remove(teoria);
        teoria.getHorarios().remove(this);
        return this;
    }

    public Set<Asignatura> getAsignaturas() {
        return this.asignaturas;
    }

    public void setAsignaturas(Set<Asignatura> asignaturas) {
        if (this.asignaturas != null) {
            this.asignaturas.forEach(i -> i.removeHorario(this));
        }
        if (asignaturas != null) {
            asignaturas.forEach(i -> i.addHorario(this));
        }
        this.asignaturas = asignaturas;
    }

    public TeoriaHorarioCatalogo asignaturas(Set<Asignatura> asignaturas) {
        this.setAsignaturas(asignaturas);
        return this;
    }

    public TeoriaHorarioCatalogo addAsignatura(Asignatura asignatura) {
        this.asignaturas.add(asignatura);
        asignatura.getHorarios().add(this);
        return this;
    }

    public TeoriaHorarioCatalogo removeAsignatura(Asignatura asignatura) {
        this.asignaturas.remove(asignatura);
        asignatura.getHorarios().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TeoriaHorarioCatalogo)) {
            return false;
        }
        return id != null && id.equals(((TeoriaHorarioCatalogo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TeoriaHorarioCatalogo{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", nombreCorto='" + getNombreCorto() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", periodo='" + getPeriodo() + "'" +
            ", anio='" + getAnio() + "'" +
            ", mes='" + getMes() + "'" +
            ", dia='" + getDia() + "'" +
            ", horaInicio=" + getHoraInicio() +
            ", horaFin=" + getHoraFin() +
            "}";
    }
}
