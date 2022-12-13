package com.creinfor.domain;

import com.creinfor.domain.enumeration.CursoTipo;
import com.creinfor.domain.enumeration.Estado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Curso.
 */
@Entity
@Table(name = "curso")
public class Curso implements Serializable {

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
    private CursoTipo tipo;

    @NotNull
    @Size(min = 2, max = 512)
    @Column(name = "nombre", length = 512, nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Size(min = 2, max = 64)
    @Column(name = "nombre_corto", length = 64, nullable = false, unique = true)
    private String nombreCorto;

    @Size(min = 2, max = 512)
    @Column(name = "descripcion", length = 512)
    private String descripcion;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @OneToMany(mappedBy = "curso")
    @JsonIgnoreProperties(
        value = { "inscripcionDetalles", "categorias", "adicionals", "horarios", "asignaturaRequisitos", "curso" },
        allowSetters = true
    )
    private Set<Asignatura> asignaturas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Curso id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public Curso activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public CursoTipo getTipo() {
        return this.tipo;
    }

    public Curso tipo(CursoTipo tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(CursoTipo tipo) {
        this.tipo = tipo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Curso nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public Curso nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Curso descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public Curso imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public Curso imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Set<Asignatura> getAsignaturas() {
        return this.asignaturas;
    }

    public void setAsignaturas(Set<Asignatura> asignaturas) {
        if (this.asignaturas != null) {
            this.asignaturas.forEach(i -> i.setCurso(null));
        }
        if (asignaturas != null) {
            asignaturas.forEach(i -> i.setCurso(this));
        }
        this.asignaturas = asignaturas;
    }

    public Curso asignaturas(Set<Asignatura> asignaturas) {
        this.setAsignaturas(asignaturas);
        return this;
    }

    public Curso addAsignatura(Asignatura asignatura) {
        this.asignaturas.add(asignatura);
        asignatura.setCurso(this);
        return this;
    }

    public Curso removeAsignatura(Asignatura asignatura) {
        this.asignaturas.remove(asignatura);
        asignatura.setCurso(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Curso)) {
            return false;
        }
        return id != null && id.equals(((Curso) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Curso{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", nombreCorto='" + getNombreCorto() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
