package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.TipoRequisito;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A AsignaturaRequisito.
 */
@Entity
@Table(name = "asignatura_requisito")
public class AsignaturaRequisito implements Serializable {

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
    private TipoRequisito tipo;

    @NotNull
    @Size(min = 2, max = 64)
    @Column(name = "nombre", length = 64, nullable = false, unique = true)
    private String nombre;

    @Size(min = 2, max = 512)
    @Column(name = "descripcion", length = 512)
    private String descripcion;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @OneToMany(mappedBy = "asignaturaRequisito")
    @JsonIgnoreProperties(value = { "inscripcionDetalle", "asignaturaRequisito" }, allowSetters = true)
    private Set<InscripcionAsignaturaRequisito> inscripcionAsignaturaRequisitos = new HashSet<>();

    @ManyToMany(mappedBy = "asignaturaRequisitos")
    @JsonIgnoreProperties(
        value = { "inscripcionDetalles", "categorias", "adicionals", "horarios", "asignaturaRequisitos", "curso" },
        allowSetters = true
    )
    private Set<Asignatura> asignaturas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AsignaturaRequisito id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public AsignaturaRequisito activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public TipoRequisito getTipo() {
        return this.tipo;
    }

    public AsignaturaRequisito tipo(TipoRequisito tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(TipoRequisito tipo) {
        this.tipo = tipo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public AsignaturaRequisito nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public AsignaturaRequisito descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public AsignaturaRequisito imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public AsignaturaRequisito imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Set<InscripcionAsignaturaRequisito> getInscripcionAsignaturaRequisitos() {
        return this.inscripcionAsignaturaRequisitos;
    }

    public void setInscripcionAsignaturaRequisitos(Set<InscripcionAsignaturaRequisito> inscripcionAsignaturaRequisitos) {
        if (this.inscripcionAsignaturaRequisitos != null) {
            this.inscripcionAsignaturaRequisitos.forEach(i -> i.setAsignaturaRequisito(null));
        }
        if (inscripcionAsignaturaRequisitos != null) {
            inscripcionAsignaturaRequisitos.forEach(i -> i.setAsignaturaRequisito(this));
        }
        this.inscripcionAsignaturaRequisitos = inscripcionAsignaturaRequisitos;
    }

    public AsignaturaRequisito inscripcionAsignaturaRequisitos(Set<InscripcionAsignaturaRequisito> inscripcionAsignaturaRequisitos) {
        this.setInscripcionAsignaturaRequisitos(inscripcionAsignaturaRequisitos);
        return this;
    }

    public AsignaturaRequisito addInscripcionAsignaturaRequisito(InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito) {
        this.inscripcionAsignaturaRequisitos.add(inscripcionAsignaturaRequisito);
        inscripcionAsignaturaRequisito.setAsignaturaRequisito(this);
        return this;
    }

    public AsignaturaRequisito removeInscripcionAsignaturaRequisito(InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito) {
        this.inscripcionAsignaturaRequisitos.remove(inscripcionAsignaturaRequisito);
        inscripcionAsignaturaRequisito.setAsignaturaRequisito(null);
        return this;
    }

    public Set<Asignatura> getAsignaturas() {
        return this.asignaturas;
    }

    public void setAsignaturas(Set<Asignatura> asignaturas) {
        if (this.asignaturas != null) {
            this.asignaturas.forEach(i -> i.removeAsignaturaRequisito(this));
        }
        if (asignaturas != null) {
            asignaturas.forEach(i -> i.addAsignaturaRequisito(this));
        }
        this.asignaturas = asignaturas;
    }

    public AsignaturaRequisito asignaturas(Set<Asignatura> asignaturas) {
        this.setAsignaturas(asignaturas);
        return this;
    }

    public AsignaturaRequisito addAsignatura(Asignatura asignatura) {
        this.asignaturas.add(asignatura);
        asignatura.getAsignaturaRequisitos().add(this);
        return this;
    }

    public AsignaturaRequisito removeAsignatura(Asignatura asignatura) {
        this.asignaturas.remove(asignatura);
        asignatura.getAsignaturaRequisitos().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AsignaturaRequisito)) {
            return false;
        }
        return id != null && id.equals(((AsignaturaRequisito) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AsignaturaRequisito{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
