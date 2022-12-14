package com.creinfor.domain;

import com.creinfor.domain.enumeration.InscripcionFormaPago;
import com.creinfor.domain.enumeration.TipoDocumentoVenta;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A InscripcionPago.
 */
@Entity
@Table(name = "inscripcion_pago")
public class InscripcionPago implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "forma_pago", nullable = false)
    private InscripcionFormaPago formaPago;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "documento_pago", nullable = false)
    private TipoDocumentoVenta documentoPago;

    @NotNull
    @DecimalMin(value = "0")
    @DecimalMax(value = "10000")
    @Column(name = "monto", nullable = false)
    private Float monto;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Size(min = 2, max = 16)
    @Column(name = "codigo_op", length = 16)
    private String codigoOP;

    @NotNull
    @Column(name = "numero_documento", nullable = false)
    private Integer numeroDocumento;

    @Min(value = 0)
    @Max(value = 360)
    @Column(name = "plazo_pago")
    private Integer plazoPago;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(
        value = { "inscripcionPagos", "inscripcionAdicionals", "inscripcionDetalles", "insDescuento", "alumno" },
        allowSetters = true
    )
    private Inscripcion inscripcion;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "inscripcionPagos", "sucursal" }, allowSetters = true)
    private SucursalSerie serie;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public InscripcionPago id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public InscripcionFormaPago getFormaPago() {
        return this.formaPago;
    }

    public InscripcionPago formaPago(InscripcionFormaPago formaPago) {
        this.setFormaPago(formaPago);
        return this;
    }

    public void setFormaPago(InscripcionFormaPago formaPago) {
        this.formaPago = formaPago;
    }

    public TipoDocumentoVenta getDocumentoPago() {
        return this.documentoPago;
    }

    public InscripcionPago documentoPago(TipoDocumentoVenta documentoPago) {
        this.setDocumentoPago(documentoPago);
        return this;
    }

    public void setDocumentoPago(TipoDocumentoVenta documentoPago) {
        this.documentoPago = documentoPago;
    }

    public Float getMonto() {
        return this.monto;
    }

    public InscripcionPago monto(Float monto) {
        this.setMonto(monto);
        return this;
    }

    public void setMonto(Float monto) {
        this.monto = monto;
    }

    public LocalDate getFecha() {
        return this.fecha;
    }

    public InscripcionPago fecha(LocalDate fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getCodigoOP() {
        return this.codigoOP;
    }

    public InscripcionPago codigoOP(String codigoOP) {
        this.setCodigoOP(codigoOP);
        return this;
    }

    public void setCodigoOP(String codigoOP) {
        this.codigoOP = codigoOP;
    }

    public Integer getNumeroDocumento() {
        return this.numeroDocumento;
    }

    public InscripcionPago numeroDocumento(Integer numeroDocumento) {
        this.setNumeroDocumento(numeroDocumento);
        return this;
    }

    public void setNumeroDocumento(Integer numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public Integer getPlazoPago() {
        return this.plazoPago;
    }

    public InscripcionPago plazoPago(Integer plazoPago) {
        this.setPlazoPago(plazoPago);
        return this;
    }

    public void setPlazoPago(Integer plazoPago) {
        this.plazoPago = plazoPago;
    }

    public Inscripcion getInscripcion() {
        return this.inscripcion;
    }

    public void setInscripcion(Inscripcion inscripcion) {
        this.inscripcion = inscripcion;
    }

    public InscripcionPago inscripcion(Inscripcion inscripcion) {
        this.setInscripcion(inscripcion);
        return this;
    }

    public SucursalSerie getSerie() {
        return this.serie;
    }

    public void setSerie(SucursalSerie sucursalSerie) {
        this.serie = sucursalSerie;
    }

    public InscripcionPago serie(SucursalSerie sucursalSerie) {
        this.setSerie(sucursalSerie);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InscripcionPago)) {
            return false;
        }
        return id != null && id.equals(((InscripcionPago) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionPago{" +
            "id=" + getId() +
            ", formaPago='" + getFormaPago() + "'" +
            ", documentoPago='" + getDocumentoPago() + "'" +
            ", monto=" + getMonto() +
            ", fecha='" + getFecha() + "'" +
            ", codigoOP='" + getCodigoOP() + "'" +
            ", numeroDocumento=" + getNumeroDocumento() +
            ", plazoPago=" + getPlazoPago() +
            "}";
    }
}
