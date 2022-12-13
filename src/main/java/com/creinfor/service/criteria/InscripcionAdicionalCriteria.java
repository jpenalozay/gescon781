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
 * Criteria class for the {@link com.creinfor.domain.InscripcionAdicional} entity. This class is used
 * in {@link com.creinfor.web.rest.InscripcionAdicionalResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /inscripcion-adicionals?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class InscripcionAdicionalCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descripcion;

    private StringFilter cantidad;

    private FloatFilter costo;

    private LongFilter inscripcionId;

    private LongFilter inscripcionRequisitoId;

    private Boolean distinct;

    public InscripcionAdicionalCriteria() {}

    public InscripcionAdicionalCriteria(InscripcionAdicionalCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descripcion = other.descripcion == null ? null : other.descripcion.copy();
        this.cantidad = other.cantidad == null ? null : other.cantidad.copy();
        this.costo = other.costo == null ? null : other.costo.copy();
        this.inscripcionId = other.inscripcionId == null ? null : other.inscripcionId.copy();
        this.inscripcionRequisitoId = other.inscripcionRequisitoId == null ? null : other.inscripcionRequisitoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public InscripcionAdicionalCriteria copy() {
        return new InscripcionAdicionalCriteria(this);
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

    public StringFilter getCantidad() {
        return cantidad;
    }

    public StringFilter cantidad() {
        if (cantidad == null) {
            cantidad = new StringFilter();
        }
        return cantidad;
    }

    public void setCantidad(StringFilter cantidad) {
        this.cantidad = cantidad;
    }

    public FloatFilter getCosto() {
        return costo;
    }

    public FloatFilter costo() {
        if (costo == null) {
            costo = new FloatFilter();
        }
        return costo;
    }

    public void setCosto(FloatFilter costo) {
        this.costo = costo;
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

    public LongFilter getInscripcionRequisitoId() {
        return inscripcionRequisitoId;
    }

    public LongFilter inscripcionRequisitoId() {
        if (inscripcionRequisitoId == null) {
            inscripcionRequisitoId = new LongFilter();
        }
        return inscripcionRequisitoId;
    }

    public void setInscripcionRequisitoId(LongFilter inscripcionRequisitoId) {
        this.inscripcionRequisitoId = inscripcionRequisitoId;
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
        final InscripcionAdicionalCriteria that = (InscripcionAdicionalCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(cantidad, that.cantidad) &&
            Objects.equals(costo, that.costo) &&
            Objects.equals(inscripcionId, that.inscripcionId) &&
            Objects.equals(inscripcionRequisitoId, that.inscripcionRequisitoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descripcion, cantidad, costo, inscripcionId, inscripcionRequisitoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionAdicionalCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
            (cantidad != null ? "cantidad=" + cantidad + ", " : "") +
            (costo != null ? "costo=" + costo + ", " : "") +
            (inscripcionId != null ? "inscripcionId=" + inscripcionId + ", " : "") +
            (inscripcionRequisitoId != null ? "inscripcionRequisitoId=" + inscripcionRequisitoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
