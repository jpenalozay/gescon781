package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.Estado;
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
 * Criteria class for the {@link com.creinfor.domain.HorarioCatalogo} entity. This class is used
 * in {@link com.creinfor.web.rest.HorarioCatalogoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /horario-catalogos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class HorarioCatalogoCriteria implements Serializable, Criteria {

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

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private EstadoFilter activo;

    private IntegerFilter codigo;

    private StringFilter horaInicio;

    private StringFilter horaFin;

    private StringFilter descripcion;

    private LongFilter horarioId;

    private LongFilter programacionId;

    private LongFilter programacionDeshabilitacionesId;

    private Boolean distinct;

    public HorarioCatalogoCriteria() {}

    public HorarioCatalogoCriteria(HorarioCatalogoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.horaInicio = other.horaInicio == null ? null : other.horaInicio.copy();
        this.horaFin = other.horaFin == null ? null : other.horaFin.copy();
        this.descripcion = other.descripcion == null ? null : other.descripcion.copy();
        this.horarioId = other.horarioId == null ? null : other.horarioId.copy();
        this.programacionId = other.programacionId == null ? null : other.programacionId.copy();
        this.programacionDeshabilitacionesId =
            other.programacionDeshabilitacionesId == null ? null : other.programacionDeshabilitacionesId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public HorarioCatalogoCriteria copy() {
        return new HorarioCatalogoCriteria(this);
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

    public IntegerFilter getCodigo() {
        return codigo;
    }

    public IntegerFilter codigo() {
        if (codigo == null) {
            codigo = new IntegerFilter();
        }
        return codigo;
    }

    public void setCodigo(IntegerFilter codigo) {
        this.codigo = codigo;
    }

    public StringFilter getHoraInicio() {
        return horaInicio;
    }

    public StringFilter horaInicio() {
        if (horaInicio == null) {
            horaInicio = new StringFilter();
        }
        return horaInicio;
    }

    public void setHoraInicio(StringFilter horaInicio) {
        this.horaInicio = horaInicio;
    }

    public StringFilter getHoraFin() {
        return horaFin;
    }

    public StringFilter horaFin() {
        if (horaFin == null) {
            horaFin = new StringFilter();
        }
        return horaFin;
    }

    public void setHoraFin(StringFilter horaFin) {
        this.horaFin = horaFin;
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

    public LongFilter getProgramacionId() {
        return programacionId;
    }

    public LongFilter programacionId() {
        if (programacionId == null) {
            programacionId = new LongFilter();
        }
        return programacionId;
    }

    public void setProgramacionId(LongFilter programacionId) {
        this.programacionId = programacionId;
    }

    public LongFilter getProgramacionDeshabilitacionesId() {
        return programacionDeshabilitacionesId;
    }

    public LongFilter programacionDeshabilitacionesId() {
        if (programacionDeshabilitacionesId == null) {
            programacionDeshabilitacionesId = new LongFilter();
        }
        return programacionDeshabilitacionesId;
    }

    public void setProgramacionDeshabilitacionesId(LongFilter programacionDeshabilitacionesId) {
        this.programacionDeshabilitacionesId = programacionDeshabilitacionesId;
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
        final HorarioCatalogoCriteria that = (HorarioCatalogoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(horaInicio, that.horaInicio) &&
            Objects.equals(horaFin, that.horaFin) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(horarioId, that.horarioId) &&
            Objects.equals(programacionId, that.programacionId) &&
            Objects.equals(programacionDeshabilitacionesId, that.programacionDeshabilitacionesId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            activo,
            codigo,
            horaInicio,
            horaFin,
            descripcion,
            horarioId,
            programacionId,
            programacionDeshabilitacionesId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HorarioCatalogoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (horaInicio != null ? "horaInicio=" + horaInicio + ", " : "") +
            (horaFin != null ? "horaFin=" + horaFin + ", " : "") +
            (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
            (horarioId != null ? "horarioId=" + horarioId + ", " : "") +
            (programacionId != null ? "programacionId=" + programacionId + ", " : "") +
            (programacionDeshabilitacionesId != null ? "programacionDeshabilitacionesId=" + programacionDeshabilitacionesId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
