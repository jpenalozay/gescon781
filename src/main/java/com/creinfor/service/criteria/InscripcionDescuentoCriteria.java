package com.creinfor.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.InscripcionDescuento} entity. This class is used
 * in {@link com.creinfor.web.rest.InscripcionDescuentoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /inscripcion-descuentos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class InscripcionDescuentoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descripcion;

    private IntegerFilter monto;

    private LongFilter inscripcionId;

    private Boolean distinct;

    public InscripcionDescuentoCriteria() {}

    public InscripcionDescuentoCriteria(InscripcionDescuentoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descripcion = other.descripcion == null ? null : other.descripcion.copy();
        this.monto = other.monto == null ? null : other.monto.copy();
        this.inscripcionId = other.inscripcionId == null ? null : other.inscripcionId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public InscripcionDescuentoCriteria copy() {
        return new InscripcionDescuentoCriteria(this);
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

    public StringFilter getDescripcion() {
        return descripcion;
    }

    public StringFilter descripcion() {
        if (descripcion == null) {
            descripcion = new StringFilter();
        }
        return descripcion;
    }

    public void setDescripcion(StringFilter descripcion) {
        this.descripcion = descripcion;
    }

    public IntegerFilter getMonto() {
        return monto;
    }

    public IntegerFilter monto() {
        if (monto == null) {
            monto = new IntegerFilter();
        }
        return monto;
    }

    public void setMonto(IntegerFilter monto) {
        this.monto = monto;
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
        final InscripcionDescuentoCriteria that = (InscripcionDescuentoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(monto, that.monto) &&
            Objects.equals(inscripcionId, that.inscripcionId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descripcion, monto, inscripcionId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionDescuentoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
            (monto != null ? "monto=" + monto + ", " : "") +
            (inscripcionId != null ? "inscripcionId=" + inscripcionId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
