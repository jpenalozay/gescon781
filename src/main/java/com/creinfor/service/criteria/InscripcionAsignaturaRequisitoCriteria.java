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
 * Criteria class for the {@link com.creinfor.domain.InscripcionAsignaturaRequisito} entity. This class is used
 * in {@link com.creinfor.web.rest.InscripcionAsignaturaRequisitoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /inscripcion-asignatura-requisitos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class InscripcionAsignaturaRequisitoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter descripcion;

    private LongFilter inscripcionDetalleId;

    private LongFilter asignaturaRequisitoId;

    private Boolean distinct;

    public InscripcionAsignaturaRequisitoCriteria() {}

    public InscripcionAsignaturaRequisitoCriteria(InscripcionAsignaturaRequisitoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.descripcion = other.descripcion == null ? null : other.descripcion.copy();
        this.inscripcionDetalleId = other.inscripcionDetalleId == null ? null : other.inscripcionDetalleId.copy();
        this.asignaturaRequisitoId = other.asignaturaRequisitoId == null ? null : other.asignaturaRequisitoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public InscripcionAsignaturaRequisitoCriteria copy() {
        return new InscripcionAsignaturaRequisitoCriteria(this);
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

    public LongFilter getAsignaturaRequisitoId() {
        return asignaturaRequisitoId;
    }

    public LongFilter asignaturaRequisitoId() {
        if (asignaturaRequisitoId == null) {
            asignaturaRequisitoId = new LongFilter();
        }
        return asignaturaRequisitoId;
    }

    public void setAsignaturaRequisitoId(LongFilter asignaturaRequisitoId) {
        this.asignaturaRequisitoId = asignaturaRequisitoId;
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
        final InscripcionAsignaturaRequisitoCriteria that = (InscripcionAsignaturaRequisitoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(inscripcionDetalleId, that.inscripcionDetalleId) &&
            Objects.equals(asignaturaRequisitoId, that.asignaturaRequisitoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descripcion, inscripcionDetalleId, asignaturaRequisitoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionAsignaturaRequisitoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
            (inscripcionDetalleId != null ? "inscripcionDetalleId=" + inscripcionDetalleId + ", " : "") +
            (asignaturaRequisitoId != null ? "asignaturaRequisitoId=" + asignaturaRequisitoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
