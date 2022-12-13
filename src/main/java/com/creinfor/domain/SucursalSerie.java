package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.TipoDocumentoVenta;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A SucursalSerie.
 */
@Entity
@Table(name = "sucursal_serie")
public class SucursalSerie implements Serializable {

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
    @Column(name = "tipo_documento", nullable = false)
    private TipoDocumentoVenta tipoDocumento;

    @NotNull
    @Size(min = 2, max = 8)
    @Column(name = "serie", length = 8, nullable = false)
    private String serie;

    @Column(name = "fecha_emision")
    private LocalDate fechaEmision;

    @Column(name = "numero_maximo")
    private Integer numeroMaximo;

    @NotNull
    @Column(name = "numero_ultimo", nullable = false)
    private Integer numeroUltimo;

    @OneToMany(mappedBy = "serie")
    @JsonIgnoreProperties(value = { "inscripcion", "serie" }, allowSetters = true)
    private Set<InscripcionPago> inscripcionPagos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "areas", "sucursalSeries", "distrito", "usuarios" }, allowSetters = true)
    private Sucursal sucursal;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SucursalSerie id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public SucursalSerie activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public TipoDocumentoVenta getTipoDocumento() {
        return this.tipoDocumento;
    }

    public SucursalSerie tipoDocumento(TipoDocumentoVenta tipoDocumento) {
        this.setTipoDocumento(tipoDocumento);
        return this;
    }

    public void setTipoDocumento(TipoDocumentoVenta tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getSerie() {
        return this.serie;
    }

    public SucursalSerie serie(String serie) {
        this.setSerie(serie);
        return this;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public LocalDate getFechaEmision() {
        return this.fechaEmision;
    }

    public SucursalSerie fechaEmision(LocalDate fechaEmision) {
        this.setFechaEmision(fechaEmision);
        return this;
    }

    public void setFechaEmision(LocalDate fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public Integer getNumeroMaximo() {
        return this.numeroMaximo;
    }

    public SucursalSerie numeroMaximo(Integer numeroMaximo) {
        this.setNumeroMaximo(numeroMaximo);
        return this;
    }

    public void setNumeroMaximo(Integer numeroMaximo) {
        this.numeroMaximo = numeroMaximo;
    }

    public Integer getNumeroUltimo() {
        return this.numeroUltimo;
    }

    public SucursalSerie numeroUltimo(Integer numeroUltimo) {
        this.setNumeroUltimo(numeroUltimo);
        return this;
    }

    public void setNumeroUltimo(Integer numeroUltimo) {
        this.numeroUltimo = numeroUltimo;
    }

    public Set<InscripcionPago> getInscripcionPagos() {
        return this.inscripcionPagos;
    }

    public void setInscripcionPagos(Set<InscripcionPago> inscripcionPagos) {
        if (this.inscripcionPagos != null) {
            this.inscripcionPagos.forEach(i -> i.setSerie(null));
        }
        if (inscripcionPagos != null) {
            inscripcionPagos.forEach(i -> i.setSerie(this));
        }
        this.inscripcionPagos = inscripcionPagos;
    }

    public SucursalSerie inscripcionPagos(Set<InscripcionPago> inscripcionPagos) {
        this.setInscripcionPagos(inscripcionPagos);
        return this;
    }

    public SucursalSerie addInscripcionPagos(InscripcionPago inscripcionPago) {
        this.inscripcionPagos.add(inscripcionPago);
        inscripcionPago.setSerie(this);
        return this;
    }

    public SucursalSerie removeInscripcionPagos(InscripcionPago inscripcionPago) {
        this.inscripcionPagos.remove(inscripcionPago);
        inscripcionPago.setSerie(null);
        return this;
    }

    public Sucursal getSucursal() {
        return this.sucursal;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    public SucursalSerie sucursal(Sucursal sucursal) {
        this.setSucursal(sucursal);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SucursalSerie)) {
            return false;
        }
        return id != null && id.equals(((SucursalSerie) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SucursalSerie{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", tipoDocumento='" + getTipoDocumento() + "'" +
            ", serie='" + getSerie() + "'" +
            ", fechaEmision='" + getFechaEmision() + "'" +
            ", numeroMaximo=" + getNumeroMaximo() +
            ", numeroUltimo=" + getNumeroUltimo() +
            "}";
    }
}
