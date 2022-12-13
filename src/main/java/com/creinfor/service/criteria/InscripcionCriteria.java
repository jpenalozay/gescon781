package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.InscripcionEstado;
import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.InstantFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.Inscripcion} entity. This class is used
 * in {@link com.creinfor.web.rest.InscripcionResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /inscripcions?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class InscripcionCriteria implements Serializable, Criteria {

    /**
     * Class for filtering InscripcionEstado
     */
    public static class InscripcionEstadoFilter extends Filter<InscripcionEstado> {

        public InscripcionEstadoFilter() {}

        public InscripcionEstadoFilter(InscripcionEstadoFilter filter) {
            super(filter);
        }

        @Override
        public InscripcionEstadoFilter copy() {
            return new InscripcionEstadoFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter codigo;

    private InscripcionEstadoFilter estado;

    private IntegerFilter numeroDocumento;

    private InstantFilter fecha;

    private FloatFilter costoTotal;

    private LongFilter inscripcionPagosId;

    private LongFilter inscripcionAdicionalId;

    private LongFilter inscripcionDetalleId;

    private LongFilter insDescuentoId;

    private LongFilter alumnoId;

    private Boolean distinct;

    public InscripcionCriteria() {}

    public InscripcionCriteria(InscripcionCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.estado = other.estado == null ? null : other.estado.copy();
        this.numeroDocumento = other.numeroDocumento == null ? null : other.numeroDocumento.copy();
        this.fecha = other.fecha == null ? null : other.fecha.copy();
        this.costoTotal = other.costoTotal == null ? null : other.costoTotal.copy();
        this.inscripcionPagosId = other.inscripcionPagosId == null ? null : other.inscripcionPagosId.copy();
        this.inscripcionAdicionalId = other.inscripcionAdicionalId == null ? null : other.inscripcionAdicionalId.copy();
        this.inscripcionDetalleId = other.inscripcionDetalleId == null ? null : other.inscripcionDetalleId.copy();
        this.insDescuentoId = other.insDescuentoId == null ? null : other.insDescuentoId.copy();
        this.alumnoId = other.alumnoId == null ? null : other.alumnoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public InscripcionCriteria copy() {
        return new InscripcionCriteria(this);
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

    public StringFilter getCodigo() {
        return codigo;
    }

    public StringFilter codigo() {
        if (codigo == null) {
            codigo = new StringFilter();
        }
        return codigo;
    }

    public void setCodigo(StringFilter codigo) {
        this.codigo = codigo;
    }

    public InscripcionEstadoFilter getEstado() {
        return estado;
    }

    public InscripcionEstadoFilter estado() {
        if (estado == null) {
            estado = new InscripcionEstadoFilter();
        }
        return estado;
    }

    public void setEstado(InscripcionEstadoFilter estado) {
        this.estado = estado;
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

    public InstantFilter getFecha() {
        return fecha;
    }

    public InstantFilter fecha() {
        if (fecha == null) {
            fecha = new InstantFilter();
        }
        return fecha;
    }

    public void setFecha(InstantFilter fecha) {
        this.fecha = fecha;
    }

    public FloatFilter getCostoTotal() {
        return costoTotal;
    }

    public FloatFilter costoTotal() {
        if (costoTotal == null) {
            costoTotal = new FloatFilter();
        }
        return costoTotal;
    }

    public void setCostoTotal(FloatFilter costoTotal) {
        this.costoTotal = costoTotal;
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

    public LongFilter getInscripcionAdicionalId() {
        return inscripcionAdicionalId;
    }

    public LongFilter inscripcionAdicionalId() {
        if (inscripcionAdicionalId == null) {
            inscripcionAdicionalId = new LongFilter();
        }
        return inscripcionAdicionalId;
    }

    public void setInscripcionAdicionalId(LongFilter inscripcionAdicionalId) {
        this.inscripcionAdicionalId = inscripcionAdicionalId;
    }

    public LongFilter getInscripcionDetalleId() {
        return inscripcionDetalleId;
    }

    public LongFilter inscripcionDetalleId() {
        if (inscripcionDetalleId == null) {
            inscripcionDetalleId = new LongFilter();
        }
        return inscripcionDetalleId;
    }

    public void setInscripcionDetalleId(LongFilter inscripcionDetalleId) {
        this.inscripcionDetalleId = inscripcionDetalleId;
    }

    public LongFilter getInsDescuentoId() {
        return insDescuentoId;
    }

    public LongFilter insDescuentoId() {
        if (insDescuentoId == null) {
            insDescuentoId = new LongFilter();
        }
        return insDescuentoId;
    }

    public void setInsDescuentoId(LongFilter insDescuentoId) {
        this.insDescuentoId = insDescuentoId;
    }

    public LongFilter getAlumnoId() {
        return alumnoId;
    }

    public LongFilter alumnoId() {
        if (alumnoId == null) {
            alumnoId = new LongFilter();
        }
        return alumnoId;
    }

    public void setAlumnoId(LongFilter alumnoId) {
        this.alumnoId = alumnoId;
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
        final InscripcionCriteria that = (InscripcionCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(estado, that.estado) &&
            Objects.equals(numeroDocumento, that.numeroDocumento) &&
            Objects.equals(fecha, that.fecha) &&
            Objects.equals(costoTotal, that.costoTotal) &&
            Objects.equals(inscripcionPagosId, that.inscripcionPagosId) &&
            Objects.equals(inscripcionAdicionalId, that.inscripcionAdicionalId) &&
            Objects.equals(inscripcionDetalleId, that.inscripcionDetalleId) &&
            Objects.equals(insDescuentoId, that.insDescuentoId) &&
            Objects.equals(alumnoId, that.alumnoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            codigo,
            estado,
            numeroDocumento,
            fecha,
            costoTotal,
            inscripcionPagosId,
            inscripcionAdicionalId,
            inscripcionDetalleId,
            insDescuentoId,
            alumnoId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (estado != null ? "estado=" + estado + ", " : "") +
            (numeroDocumento != null ? "numeroDocumento=" + numeroDocumento + ", " : "") +
            (fecha != null ? "fecha=" + fecha + ", " : "") +
            (costoTotal != null ? "costoTotal=" + costoTotal + ", " : "") +
            (inscripcionPagosId != null ? "inscripcionPagosId=" + inscripcionPagosId + ", " : "") +
            (inscripcionAdicionalId != null ? "inscripcionAdicionalId=" + inscripcionAdicionalId + ", " : "") +
            (inscripcionDetalleId != null ? "inscripcionDetalleId=" + inscripcionDetalleId + ", " : "") +
            (insDescuentoId != null ? "insDescuentoId=" + insDescuentoId + ", " : "") +
            (alumnoId != null ? "alumnoId=" + alumnoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
