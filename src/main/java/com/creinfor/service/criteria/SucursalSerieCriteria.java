package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.Estado;
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
 * Criteria class for the {@link com.creinfor.domain.SucursalSerie} entity. This class is used
 * in {@link com.creinfor.web.rest.SucursalSerieResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /sucursal-series?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class SucursalSerieCriteria implements Serializable, Criteria {

    /**
     * Class for filtering Estado
     */
    public static class EstadoFilter extends Filter<Estado> {

        public EstadoFilter() {}

        public EstadoFilter(EstadoFilter filter) {
            super(filter);
        }

        @Override
        public EstadoFilter copy() {
            return new EstadoFilter(this);
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

    private EstadoFilter activo;

    private TipoDocumentoVentaFilter tipoDocumento;

    private StringFilter serie;

    private LocalDateFilter fechaEmision;

    private IntegerFilter numeroMaximo;

    private IntegerFilter numeroUltimo;

    private LongFilter inscripcionPagosId;

    private LongFilter sucursalId;

    private Boolean distinct;

    public SucursalSerieCriteria() {}

    public SucursalSerieCriteria(SucursalSerieCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.tipoDocumento = other.tipoDocumento == null ? null : other.tipoDocumento.copy();
        this.serie = other.serie == null ? null : other.serie.copy();
        this.fechaEmision = other.fechaEmision == null ? null : other.fechaEmision.copy();
        this.numeroMaximo = other.numeroMaximo == null ? null : other.numeroMaximo.copy();
        this.numeroUltimo = other.numeroUltimo == null ? null : other.numeroUltimo.copy();
        this.inscripcionPagosId = other.inscripcionPagosId == null ? null : other.inscripcionPagosId.copy();
        this.sucursalId = other.sucursalId == null ? null : other.sucursalId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public SucursalSerieCriteria copy() {
        return new SucursalSerieCriteria(this);
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

    public EstadoFilter getActivo() {
        return activo;
    }

    public EstadoFilter activo() {
        if (activo == null) {
            activo = new EstadoFilter();
        }
        return activo;
    }

    public void setActivo(EstadoFilter activo) {
        this.activo = activo;
    }

    public TipoDocumentoVentaFilter getTipoDocumento() {
        return tipoDocumento;
    }

    public TipoDocumentoVentaFilter tipoDocumento() {
        if (tipoDocumento == null) {
            tipoDocumento = new TipoDocumentoVentaFilter();
        }
        return tipoDocumento;
    }

    public void setTipoDocumento(TipoDocumentoVentaFilter tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public StringFilter getSerie() {
        return serie;
    }

    public StringFilter serie() {
        if (serie == null) {
            serie = new StringFilter();
        }
        return serie;
    }

    public void setSerie(StringFilter serie) {
        this.serie = serie;
    }

    public LocalDateFilter getFechaEmision() {
        return fechaEmision;
    }

    public LocalDateFilter fechaEmision() {
        if (fechaEmision == null) {
            fechaEmision = new LocalDateFilter();
        }
        return fechaEmision;
    }

    public void setFechaEmision(LocalDateFilter fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public IntegerFilter getNumeroMaximo() {
        return numeroMaximo;
    }

    public IntegerFilter numeroMaximo() {
        if (numeroMaximo == null) {
            numeroMaximo = new IntegerFilter();
        }
        return numeroMaximo;
    }

    public void setNumeroMaximo(IntegerFilter numeroMaximo) {
        this.numeroMaximo = numeroMaximo;
    }

    public IntegerFilter getNumeroUltimo() {
        return numeroUltimo;
    }

    public IntegerFilter numeroUltimo() {
        if (numeroUltimo == null) {
            numeroUltimo = new IntegerFilter();
        }
        return numeroUltimo;
    }

    public void setNumeroUltimo(IntegerFilter numeroUltimo) {
        this.numeroUltimo = numeroUltimo;
    }

    public LongFilter getInscripcionPagosId() {
        return inscripcionPagosId;
    }

    public LongFilter inscripcionPagosId() {
        if (inscripcionPagosId == null) {
            inscripcionPagosId = new LongFilter();
        }
        return inscripcionPagosId;
    }

    public void setInscripcionPagosId(LongFilter inscripcionPagosId) {
        this.inscripcionPagosId = inscripcionPagosId;
    }

    public LongFilter getSucursalId() {
        return sucursalId;
    }

    public LongFilter sucursalId() {
        if (sucursalId == null) {
            sucursalId = new LongFilter();
        }
        return sucursalId;
    }

    public void setSucursalId(LongFilter sucursalId) {
        this.sucursalId = sucursalId;
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
        final SucursalSerieCriteria that = (SucursalSerieCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(tipoDocumento, that.tipoDocumento) &&
            Objects.equals(serie, that.serie) &&
            Objects.equals(fechaEmision, that.fechaEmision) &&
            Objects.equals(numeroMaximo, that.numeroMaximo) &&
            Objects.equals(numeroUltimo, that.numeroUltimo) &&
            Objects.equals(inscripcionPagosId, that.inscripcionPagosId) &&
            Objects.equals(sucursalId, that.sucursalId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            activo,
            tipoDocumento,
            serie,
            fechaEmision,
            numeroMaximo,
            numeroUltimo,
            inscripcionPagosId,
            sucursalId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SucursalSerieCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (tipoDocumento != null ? "tipoDocumento=" + tipoDocumento + ", " : "") +
            (serie != null ? "serie=" + serie + ", " : "") +
            (fechaEmision != null ? "fechaEmision=" + fechaEmision + ", " : "") +
            (numeroMaximo != null ? "numeroMaximo=" + numeroMaximo + ", " : "") +
            (numeroUltimo != null ? "numeroUltimo=" + numeroUltimo + ", " : "") +
            (inscripcionPagosId != null ? "inscripcionPagosId=" + inscripcionPagosId + ", " : "") +
            (sucursalId != null ? "sucursalId=" + sucursalId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
