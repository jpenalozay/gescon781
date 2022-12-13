package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;

/**
 * A InscripcionDescuento.
 */
@Entity
@Table(name = "inscripcion_descuento")
public class InscripcionDescuento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "monto")
    private Integer monto;

    @JsonIgnoreProperties(
        value = { "inscripcionPagos", "inscripcionAdicionals", "inscripcionDetalles", "insDescuento", "alumno" },
        allowSetters = true
    )
    @OneToOne
    @JoinColumn(unique = true)
    private Inscripcion inscripcion;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public InscripcionDescuento id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public InscripcionDescuento descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getMonto() {
        return this.monto;
    }

    public InscripcionDescuento monto(Integer monto) {
        this.setMonto(monto);
        return this;
    }

    public void setMonto(Integer monto) {
        this.monto = monto;
    }

    public Inscripcion getInscripcion() {
        return this.inscripcion;
    }

    public void setInscripcion(Inscripcion inscripcion) {
        this.inscripcion = inscripcion;
    }

    public InscripcionDescuento inscripcion(Inscripcion inscripcion) {
        this.setInscripcion(inscripcion);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InscripcionDescuento)) {
            return false;
        }
        return id != null && id.equals(((InscripcionDescuento) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionDescuento{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", monto=" + getMonto() +
            "}";
    }
}
