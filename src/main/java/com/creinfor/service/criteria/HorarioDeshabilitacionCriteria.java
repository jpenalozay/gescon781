package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.HorarioTipo;
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
 * Criteria class for the {@link com.creinfor.domain.HorarioDeshabilitacion} entity. This class is used
 * in {@link com.creinfor.web.rest.HorarioDeshabilitacionResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /horario-deshabilitacions?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class HorarioDeshabilitacionCriteria implements Serializable, Criteria {

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
     * Class for filtering HorarioTipo
     */
    public static class HorarioTipoFilter extends Filter<HorarioTipo> {

        public HorarioTipoFilter() {}

        public HorarioTipoFilter(HorarioTipoFilter filter) {
            super(filter);
        }

        @Override
        public HorarioTipoFilter copy() {
            return new HorarioTipoFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private EstadoFilter activo;

    private HorarioTipoFilter tipo;

    private LongFilter programacionDeshabilitacionId;

    private LongFilter horarioId;

    private Boolean distinct;

    public HorarioDeshabilitacionCriteria() {}

    public HorarioDeshabilitacionCriteria(HorarioDeshabilitacionCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.tipo = other.tipo == null ? null : other.tipo.copy();
        this.programacionDeshabilitacionId =
            other.programacionDeshabilitacionId == null ? null : other.programacionDeshabilitacionId.copy();
        this.horarioId = other.horarioId == null ? null : other.horarioId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public HorarioDeshabilitacionCriteria copy() {
        return new HorarioDeshabilitacionCriteria(this);
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

    public HorarioTipoFilter getTipo() {
        return tipo;
    }

    public HorarioTipoFilter tipo() {
        if (tipo == null) {
            tipo = new HorarioTipoFilter();
        }
        return tipo;
    }

    public void setTipo(HorarioTipoFilter tipo) {
        this.tipo = tipo;
    }

    public LongFilter getProgramacionDeshabilitacionId() {
        return programacionDeshabilitacionId;
    }

    public LongFilter programacionDeshabilitacionId() {
        if (programacionDeshabilitacionId == null) {
            programacionDeshabilitacionId = new LongFilter();
        }
        return programacionDeshabilitacionId;
    }

    public void setProgramacionDeshabilitacionId(LongFilter programacionDeshabilitacionId) {
        this.programacionDeshabilitacionId = programacionDeshabilitacionId;
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
        final HorarioDeshabilitacionCriteria that = (HorarioDeshabilitacionCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(tipo, that.tipo) &&
            Objects.equals(programacionDeshabilitacionId, that.programacionDeshabilitacionId) &&
            Objects.equals(horarioId, that.horarioId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, activo, tipo, programacionDeshabilitacionId, horarioId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HorarioDeshabilitacionCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (tipo != null ? "tipo=" + tipo + ", " : "") +
            (programacionDeshabilitacionId != null ? "programacionDeshabilitacionId=" + programacionDeshabilitacionId + ", " : "") +
            (horarioId != null ? "horarioId=" + horarioId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
