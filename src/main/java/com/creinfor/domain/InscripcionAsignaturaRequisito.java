package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A InscripcionAsignaturaRequisito.
 */
@Entity
@Table(name = "inscripcion_asignatura_req")
public class InscripcionAsignaturaRequisito implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @Lob
    @Column(name = "documento")
    private String documento;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "inscripcionAsignaturaRequisitos", "inscripcion", "asignatura", "horario" }, allowSetters = true)
    private InscripcionDetalle inscripcionDetalle;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "inscripcionAsignaturaRequisitos", "asignaturas" }, allowSetters = true)
    private AsignaturaRequisito asignaturaRequisito;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public InscripcionAsignaturaRequisito id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public InscripcionAsignaturaRequisito descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public InscripcionAsignaturaRequisito imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public InscripcionAsignaturaRequisito imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public String getDocumento() {
        return this.documento;
    }

    public InscripcionAsignaturaRequisito documento(String documento) {
        this.setDocumento(documento);
        return this;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public InscripcionDetalle getInscripcionDetalle() {
        return this.inscripcionDetalle;
    }

    public void setInscripcionDetalle(InscripcionDetalle inscripcionDetalle) {
        this.inscripcionDetalle = inscripcionDetalle;
    }

    public InscripcionAsignaturaRequisito inscripcionDetalle(InscripcionDetalle inscripcionDetalle) {
        this.setInscripcionDetalle(inscripcionDetalle);
        return this;
    }

    public AsignaturaRequisito getAsignaturaRequisito() {
        return this.asignaturaRequisito;
    }

    public void setAsignaturaRequisito(AsignaturaRequisito asignaturaRequisito) {
        this.asignaturaRequisito = asignaturaRequisito;
    }

    public InscripcionAsignaturaRequisito asignaturaRequisito(AsignaturaRequisito asignaturaRequisito) {
        this.setAsignaturaRequisito(asignaturaRequisito);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InscripcionAsignaturaRequisito)) {
            return false;
        }
        return id != null && id.equals(((InscripcionAsignaturaRequisito) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionAsignaturaRequisito{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", documento='" + getDocumento() + "'" +
            "}";
    }
}
