package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.RequitisoTipo;
import com.creinfor.domain.enumeration.SiNo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A RequisitosInscripcion.
 */
@Entity
@Table(name = "requisitos_inscripcion")
public class RequisitosInscripcion implements Serializable {

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
    @Column(name = "obligatorio", nullable = false)
    private SiNo obligatorio;

    @NotNull
    @Size(min = 2, max = 512)
    @Column(name = "nombre", length = 512, nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Size(min = 2, max = 512)
    @Column(name = "nombre_corto", length = 512, nullable = false, unique = true)
    private String nombreCorto;

    @Column(name = "costo")
    private Float costo;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_requisito")
    private RequitisoTipo tipoRequisito;

    @Column(name = "valores")
    private String valores;

    @OneToMany(mappedBy = "inscripcionRequisito")
    @JsonIgnoreProperties(value = { "inscripcion", "inscripcionRequisito" }, allowSetters = true)
    private Set<InscripcionAdicional> inscripcionAdicionals = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RequisitosInscripcion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public RequisitosInscripcion activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public SiNo getObligatorio() {
        return this.obligatorio;
    }

    public RequisitosInscripcion obligatorio(SiNo obligatorio) {
        this.setObligatorio(obligatorio);
        return this;
    }

    public void setObligatorio(SiNo obligatorio) {
        this.obligatorio = obligatorio;
    }

    public String getNombre() {
        return this.nombre;
    }

    public RequisitosInscripcion nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public RequisitosInscripcion nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public Float getCosto() {
        return this.costo;
    }

    public RequisitosInscripcion costo(Float costo) {
        this.setCosto(costo);
        return this;
    }

    public void setCosto(Float costo) {
        this.costo = costo;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public RequisitosInscripcion imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public RequisitosInscripcion imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public RequitisoTipo getTipoRequisito() {
        return this.tipoRequisito;
    }

    public RequisitosInscripcion tipoRequisito(RequitisoTipo tipoRequisito) {
        this.setTipoRequisito(tipoRequisito);
        return this;
    }

    public void setTipoRequisito(RequitisoTipo tipoRequisito) {
        this.tipoRequisito = tipoRequisito;
    }

    public String getValores() {
        return this.valores;
    }

    public RequisitosInscripcion valores(String valores) {
        this.setValores(valores);
        return this;
    }

    public void setValores(String valores) {
        this.valores = valores;
    }

    public Set<InscripcionAdicional> getInscripcionAdicionals() {
        return this.inscripcionAdicionals;
    }

    public void setInscripcionAdicionals(Set<InscripcionAdicional> inscripcionAdicionals) {
        if (this.inscripcionAdicionals != null) {
            this.inscripcionAdicionals.forEach(i -> i.setInscripcionRequisito(null));
        }
        if (inscripcionAdicionals != null) {
            inscripcionAdicionals.forEach(i -> i.setInscripcionRequisito(this));
        }
        this.inscripcionAdicionals = inscripcionAdicionals;
    }

    public RequisitosInscripcion inscripcionAdicionals(Set<InscripcionAdicional> inscripcionAdicionals) {
        this.setInscripcionAdicionals(inscripcionAdicionals);
        return this;
    }

    public RequisitosInscripcion addInscripcionAdicional(InscripcionAdicional inscripcionAdicional) {
        this.inscripcionAdicionals.add(inscripcionAdicional);
        inscripcionAdicional.setInscripcionRequisito(this);
        return this;
    }

    public RequisitosInscripcion removeInscripcionAdicional(InscripcionAdicional inscripcionAdicional) {
        this.inscripcionAdicionals.remove(inscripcionAdicional);
        inscripcionAdicional.setInscripcionRequisito(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RequisitosInscripcion)) {
            return false;
        }
        return id != null && id.equals(((RequisitosInscripcion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RequisitosInscripcion{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", obligatorio='" + getObligatorio() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", nombreCorto='" + getNombreCorto() + "'" +
            ", costo=" + getCosto() +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", tipoRequisito='" + getTipoRequisito() + "'" +
            ", valores='" + getValores() + "'" +
            "}";
    }
}
