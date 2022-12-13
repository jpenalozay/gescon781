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
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.InscripcionDetalle} entity. This class is used
 * in {@link com.creinfor.web.rest.InscripcionDetalleResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /inscripcion-detalles?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class InscripcionDetalleCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter codigo;

    private LocalDateFilter fechaInicio;

    private LongFilter inscripcionAsignaturaRequisitoId;

    private LongFilter inscripcionId;

    private LongFilter asignaturaId;

    private LongFilter horarioId;

    private Boolean distinct;

    public InscripcionDetalleCriteria() {}

    public InscripcionDetalleCriteria(InscripcionDetalleCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.fechaInicio = other.fechaInicio == null ? null : other.fechaInicio.copy();
        this.inscripcionAsignaturaRequisitoId =
            other.inscripcionAsignaturaRequisitoId == null ? null : other.inscripcionAsignaturaRequisitoId.copy();
        this.inscripcionId = other.inscripcionId == null ? null : other.inscripcionId.copy();
        this.asignaturaId = other.asignaturaId == null ? null : other.asignaturaId.copy();
        this.horarioId = other.horarioId == null ? null : other.horarioId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public InscripcionDetalleCriteria copy() {
        return new InscripcionDetalleCriteria(this);
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

    public LocalDateFilter getFechaInicio() {
        return fechaInicio;
    }

    public LocalDateFilter fechaInicio() {
        if (fechaInicio == null) {
            fechaInicio = new LocalDateFilter();
        }
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateFilter fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LongFilter getInscripcionAsignaturaRequisitoId() {
        return inscripcionAsignaturaRequisitoId;
    }

    public LongFilter inscripcionAsignaturaRequisitoId() {
        if (inscripcionAsignaturaRequisitoId == null) {
            inscripcionAsignaturaRequisitoId = new LongFilter();
        }
        return inscripcionAsignaturaRequisitoId;
    }

    public void setInscripcionAsignaturaRequisitoId(LongFilter inscripcionAsignaturaRequisitoId) {
        this.inscripcionAsignaturaRequisitoId = inscripcionAsignaturaRequisitoId;
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

    public LongFilter getAsignaturaId() {
        return asignaturaId;
    }

    public LongFilter asignaturaId() {
        if (asignaturaId == null) {
            asignaturaId = new LongFilter();
        }
        return asignaturaId;
    }

    public void setAsignaturaId(LongFilter asignaturaId) {
        this.asignaturaId = asignaturaId;
    }

    public LongFilter getHorarioId() {
        return horarioId;
    }

    public LongFilter horarioId() {
        if (horarioId == null) {
            horarioId = new LongFilter();
        }
        return horarioId;
    }

    public void setHorarioId(LongFilter horarioId) {
        this.horarioId = horarioId;
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
        final InscripcionDetalleCriteria that = (InscripcionDetalleCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(fechaInicio, that.fechaInicio) &&
            Objects.equals(inscripcionAsignaturaRequisitoId, that.inscripcionAsignaturaRequisitoId) &&
            Objects.equals(inscripcionId, that.inscripcionId) &&
            Objects.equals(asignaturaId, that.asignaturaId) &&
            Objects.equals(horarioId, that.horarioId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, codigo, fechaInicio, inscripcionAsignaturaRequisitoId, inscripcionId, asignaturaId, horarioId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscripcionDetalleCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (fechaInicio != null ? "fechaInicio=" + fechaInicio + ", " : "") +
            (inscripcionAsignaturaRequisitoId != null ? "inscripcionAsignaturaRequisitoId=" + inscripcionAsignaturaRequisitoId + ", " : "") +
            (inscripcionId != null ? "inscripcionId=" + inscripcionId + ", " : "") +
            (asignaturaId != null ? "asignaturaId=" + asignaturaId + ", " : "") +
            (horarioId != null ? "horarioId=" + horarioId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
