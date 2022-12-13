package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A InscripcionAdicional.
 */
@Entity
@Table(name = "inscripcion_adicional")
public class InscripcionAdicional implements Serializable {

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

    @Column(name = "cantidad")
    private String cantidad;

    @Column(name = "costo")
    private Float costo;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(
        value = { "inscripcionPagos", "inscripcionAdicionals", "inscripcionDetalles", "insDescuento", "alumno" },
        allowSetters = true
    )
    private Inscripcion inscripcion;

    @ManyToOne
    @JsonIgnoreProperties(value = { "inscripcionAdicionals" }, allowSetters = true)
    private RequisitosInscripcion inscripcionRequisito;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public InscripcionAdicional id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public InscripcionAdicional descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public InscripcionAdicional imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public InscripcionAdicional imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public String getDocumento() {
        return this.documento;
    }

    public InscripcionAdicional documento(String documento) {
        this.setDocumento(documento);
        return this;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getCantidad() {
        return this.cantidad;
    }

    public InscripcionAdicional cantidad(String cantidad) {
        this.setCantidad(cantidad);
        return this;
    }

    public void setCantidad(String cantidad) {
        this.cantidad = cantidad;
    }

    public Float getCosto() {
        return this.costo;
    }

    public InscripcionAdicional costo(Float costo) {
        this.setCosto(costo);
        return this;
    }

    public void setCosto(Float costo) {
        this.costo = costo;
    }

    public Inscripcion getInscripcion() {
        return this.inscripcion;
    }

    public void setInscripcion(Inscripcion inscripcion) {
        this.inscripcion = inscripcion;
    }

    public InscripcionAdicional inscripcion(Inscripcion inscripcion) {
        this.setInscripcion(inscripcion);
        return this;
    }

    public RequisitosInscripcion getInscripcionRequisito() {
        return this.inscripcionRequisito;
    }

    public void setInscripcionRequisito(RequisitosInscripcion requisitosInscripcion) {
        this.inscripcionRequisito = requisitosInscripcion;
    }

    public InscripcionAdicional inscripcionRequisito(RequisitosInscripcion requisitosInscripcion) {
        this.setInscripcionRequisito(requisitosInscripcion);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InscripcionAdicional)) {
            return false;
        }
        return id != null && id.equals(((InscripcionAdicional) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionAdicional{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", documento='" + getDocumento() + "'" +
            ", cantidad='" + getCantidad() + "'" +
            ", costo=" + getCosto() +
            "}";
    }
}
