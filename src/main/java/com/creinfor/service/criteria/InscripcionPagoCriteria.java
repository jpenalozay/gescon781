package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.InscripcionFormaPago;
import com.creinfor.domain.enumeration.TipoDocumentoVenta;
import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.InscripcionPago} entity. This class is used
 * in {@link com.creinfor.web.rest.InscripcionPagoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /inscripcion-pagos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class InscripcionPagoCriteria implements Serializable, Criteria {

    /**
     * Class for filtering InscripcionFormaPago
     */
    public static class InscripcionFormaPagoFilter extends Filter<InscripcionFormaPago> {

        public InscripcionFormaPagoFilter() {}

        public InscripcionFormaPagoFilter(InscripcionFormaPagoFilter filter) {
            super(filter);
        }

        @Override
        public InscripcionFormaPagoFilter copy() {
            return new InscripcionFormaPagoFilter(this);
        }
    }

    /**
     * Class for filtering TipoDocumentoVenta
     */
    public static class TipoDocumentoVentaFilter extends Filter<TipoDocumentoVenta> {

        public TipoDocumentoVentaFilter() {}

        public TipoDocumentoVentaFilter(TipoDocumentoVentaFilter filter) {
            super(filter);
        }

        @Override
        public TipoDocumentoVentaFilter copy() {
            return new TipoDocumentoVentaFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private InscripcionFormaPagoFilter formaPago;

    private TipoDocumentoVentaFilter documentoPago;

    private FloatFilter monto;

    private LocalDateFilter fecha;

    private StringFilter codigoOP;

    private IntegerFilter numeroDocumento;

    private IntegerFilter plazoPago;

    private LongFilter inscripcionId;

    private LongFilter serieId;

    private Boolean distinct;

    public InscripcionPagoCriteria() {}

    public InscripcionPagoCriteria(InscripcionPagoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.formaPago = other.formaPago == null ? null : other.formaPago.copy();
        this.documentoPago = other.documentoPago == null ? null : other.documentoPago.copy();
        this.monto = other.monto == null ? null : other.monto.copy();
        this.fecha = other.fecha == null ? null : other.fecha.copy();
        this.codigoOP = other.codigoOP == null ? null : other.codigoOP.copy();
        this.numeroDocumento = other.numeroDocumento == null ? null : other.numeroDocumento.copy();
        this.plazoPago = other.plazoPago == null ? null : other.plazoPago.copy();
        this.inscripcionId = other.inscripcionId == null ? null : other.inscripcionId.copy();
        this.serieId = other.serieId == null ? null : other.serieId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public InscripcionPagoCriteria copy() {
        return new InscripcionPagoCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public InscripcionFormaPagoFilter getFormaPago() {
        return formaPago;
    }

    public InscripcionFormaPagoFilter formaPago() {
        if (formaPago == null) {
            formaPago = new InscripcionFormaPagoFilter();
        }
        return formaPago;
    }

    public void setFormaPago(InscripcionFormaPagoFilter formaPago) {
        this.formaPago = formaPago;
    }

    public TipoDocumentoVentaFilter getDocumentoPago() {
        return documentoPago;
    }

    public TipoDocumentoVentaFilter documentoPago() {
        if (documentoPago == null) {
            documentoPago = new TipoDocumentoVentaFilter();
        }
        return documentoPago;
    }

    public void setDocumentoPago(TipoDocumentoVentaFilter documentoPago) {
        this.documentoPago = documentoPago;
    }

    public FloatFilter getMonto() {
        return monto;
    }

    public FloatFilter monto() {
        if (monto == null) {
            monto = new FloatFilter();
        }
        return monto;
    }

    public void setMonto(FloatFilter monto) {
        this.monto = monto;
    }

    public LocalDateFilter getFecha() {
        return fecha;
    }

    public LocalDateFilter fecha() {
        if (fecha == null) {
            fecha = new LocalDateFilter();
        }
        return fecha;
    }

    public void setFecha(LocalDateFilter fecha) {
        this.fecha = fecha;
    }

    public StringFilter getCodigoOP() {
        return codigoOP;
    }

    public StringFilter codigoOP() {
        if (codigoOP == null) {
            codigoOP = new StringFilter();
        }
        return codigoOP;
    }

    public void setCodigoOP(StringFilter codigoOP) {
        this.codigoOP = codigoOP;
    }

    public IntegerFilter getNumeroDocumento() {
        return numeroDocumento;
    }

    public IntegerFilter numeroDocumento() {
        if (numeroDocumento == null) {
            numeroDocumento = new IntegerFilter();
        }
        return numeroDocumento;
    }

    public void setNumeroDocumento(IntegerFilter numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public IntegerFilter getPlazoPago() {
        return plazoPago;
    }

    public IntegerFilter plazoPago() {
        if (plazoPago == null) {
            plazoPago = new IntegerFilter();
        }
        return plazoPago;
    }

    public void setPlazoPago(IntegerFilter plazoPago) {
        this.plazoPago = plazoPago;
    }

    public LongFilter getInscripcionId() {
        return inscripcionId;
    }

    public LongFilter inscripcionId() {
        if (inscripcionId == null) {
            inscripcionId = new LongFilter();
        }
        return inscripcionId;
    }

    public void setInscripcionId(LongFilter inscripcionId) {
        this.inscripcionId = inscripcionId;
    }

    public LongFilter getSerieId() {
        return serieId;
    }

    public LongFilter serieId() {
        if (serieId == null) {
            serieId = new LongFilter();
        }
        return serieId;
    }

    public void setSerieId(LongFilter serieId) {
        this.serieId = serieId;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final InscripcionPagoCriteria that = (InscripcionPagoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(formaPago, that.formaPago) &&
            Objects.equals(documentoPago, that.documentoPago) &&
            Objects.equals(monto, that.monto) &&
            Objects.equals(fecha, that.fecha) &&
            Objects.equals(codigoOP, that.codigoOP) &&
            Objects.equals(numeroDocumento, that.numeroDocumento) &&
            Objects.equals(plazoPago, that.plazoPago) &&
            Objects.equals(inscripcionId, that.inscripcionId) &&
            Objects.equals(serieId, that.serieId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            formaPago,
            documentoPago,
            monto,
            fecha,
            codigoOP,
            numeroDocumento,
            plazoPago,
            inscripcionId,
            serieId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionPagoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (formaPago != null ? "formaPago=" + formaPago + ", " : "") +
            (documentoPago != null ? "documentoPago=" + documentoPago + ", " : "") +
            (monto != null ? "monto=" + monto + ", " : "") +
            (fecha != null ? "fecha=" + fecha + ", " : "") +
            (codigoOP != null ? "codigoOP=" + codigoOP + ", " : "") +
            (numeroDocumento != null ? "numeroDocumento=" + numeroDocumento + ", " : "") +
            (plazoPago != null ? "plazoPago=" + plazoPago + ", " : "") +
            (inscripcionId != null ? "inscripcionId=" + inscripcionId + ", " : "") +
            (serieId != null ? "serieId=" + serieId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
