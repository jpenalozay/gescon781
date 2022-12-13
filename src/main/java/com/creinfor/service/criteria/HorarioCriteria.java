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
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.Horario} entity. This class is used
 * in {@link com.creinfor.web.rest.HorarioResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /horarios?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class HorarioCriteria implements Serializable, Criteria {

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

    private LocalDateFilter fechaDia;

    private IntegerFilter fechaDiaSem;

    private LongFilter horarioDeshabilitacionId;

    private LongFilter alumnoId;

    private LongFilter instructorId;

    private LongFilter programacionId;

    private LongFilter fechaId;

    private LongFilter horarioCatalogoId;

    private LongFilter automovilId;

    private LongFilter lugarSalidaId;

    private Boolean distinct;

    public HorarioCriteria() {}

    public HorarioCriteria(HorarioCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.tipo = other.tipo == null ? null : other.tipo.copy();
        this.fechaDia = other.fechaDia == null ? null : other.fechaDia.copy();
        this.fechaDiaSem = other.fechaDiaSem == null ? null : other.fechaDiaSem.copy();
        this.horarioDeshabilitacionId = other.horarioDeshabilitacionId == null ? null : other.horarioDeshabilitacionId.copy();
        this.alumnoId = other.alumnoId == null ? null : other.alumnoId.copy();
        this.instructorId = other.instructorId == null ? null : other.instructorId.copy();
        this.programacionId = other.programacionId == null ? null : other.programacionId.copy();
        this.fechaId = other.fechaId == null ? null : other.fechaId.copy();
        this.horarioCatalogoId = other.horarioCatalogoId == null ? null : other.horarioCatalogoId.copy();
        this.automovilId = other.automovilId == null ? null : other.automovilId.copy();
        this.lugarSalidaId = other.lugarSalidaId == null ? null : other.lugarSalidaId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public HorarioCriteria copy() {
        return new HorarioCriteria(this);
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

    public LocalDateFilter getFechaDia() {
        return fechaDia;
    }

    public LocalDateFilter fechaDia() {
        if (fechaDia == null) {
            fechaDia = new LocalDateFilter();
        }
        return fechaDia;
    }

    public void setFechaDia(LocalDateFilter fechaDia) {
        this.fechaDia = fechaDia;
    }

    public IntegerFilter getFechaDiaSem() {
        return fechaDiaSem;
    }

    public IntegerFilter fechaDiaSem() {
        if (fechaDiaSem == null) {
            fechaDiaSem = new IntegerFilter();
        }
        return fechaDiaSem;
    }

    public void setFechaDiaSem(IntegerFilter fechaDiaSem) {
        this.fechaDiaSem = fechaDiaSem;
    }

    public LongFilter getHorarioDeshabilitacionId() {
        return horarioDeshabilitacionId;
    }

    public LongFilter horarioDeshabilitacionId() {
        if (horarioDeshabilitacionId == null) {
            horarioDeshabilitacionId = new LongFilter();
        }
        return horarioDeshabilitacionId;
    }

    public void setHorarioDeshabilitacionId(LongFilter horarioDeshabilitacionId) {
        this.horarioDeshabilitacionId = horarioDeshabilitacionId;
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

    public LongFilter getInstructorId() {
        return instructorId;
    }

    public LongFilter instructorId() {
        if (instructorId == null) {
            instructorId = new LongFilter();
        }
        return instructorId;
    }

    public void setInstructorId(LongFilter instructorId) {
        this.instructorId = instructorId;
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

    public LongFilter getFechaId() {
        return fechaId;
    }

    public LongFilter fechaId() {
        if (fechaId == null) {
            fechaId = new LongFilter();
        }
        return fechaId;
    }

    public void setFechaId(LongFilter fechaId) {
        this.fechaId = fechaId;
    }

    public LongFilter getHorarioCatalogoId() {
        return horarioCatalogoId;
    }

    public LongFilter horarioCatalogoId() {
        if (horarioCatalogoId == null) {
            horarioCatalogoId = new LongFilter();
        }
        return horarioCatalogoId;
    }

    public void setHorarioCatalogoId(LongFilter horarioCatalogoId) {
        this.horarioCatalogoId = horarioCatalogoId;
    }

    public LongFilter getAutomovilId() {
        return automovilId;
    }

    public LongFilter automovilId() {
        if (automovilId == null) {
            automovilId = new LongFilter();
        }
        return automovilId;
    }

    public void setAutomovilId(LongFilter automovilId) {
        this.automovilId = automovilId;
    }

    public LongFilter getLugarSalidaId() {
        return lugarSalidaId;
    }

    public LongFilter lugarSalidaId() {
        if (lugarSalidaId == null) {
            lugarSalidaId = new LongFilter();
        }
        return lugarSalidaId;
    }

    public void setLugarSalidaId(LongFilter lugarSalidaId) {
        this.lugarSalidaId = lugarSalidaId;
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
        final HorarioCriteria that = (HorarioCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(tipo, that.tipo) &&
            Objects.equals(fechaDia, that.fechaDia) &&
            Objects.equals(fechaDiaSem, that.fechaDiaSem) &&
            Objects.equals(horarioDeshabilitacionId, that.horarioDeshabilitacionId) &&
            Objects.equals(alumnoId, that.alumnoId) &&
            Objects.equals(instructorId, that.instructorId) &&
            Objects.equals(programacionId, that.programacionId) &&
            Objects.equals(fechaId, that.fechaId) &&
            Objects.equals(horarioCatalogoId, that.horarioCatalogoId) &&
            Objects.equals(automovilId, that.automovilId) &&
            Objects.equals(lugarSalidaId, that.lugarSalidaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            activo,
            tipo,
            fechaDia,
            fechaDiaSem,
            horarioDeshabilitacionId,
            alumnoId,
            instructorId,
            programacionId,
            fechaId,
            horarioCatalogoId,
            automovilId,
            lugarSalidaId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HorarioCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (tipo != null ? "tipo=" + tipo + ", " : "") +
            (fechaDia != null ? "fechaDia=" + fechaDia + ", " : "") +
            (fechaDiaSem != null ? "fechaDiaSem=" + fechaDiaSem + ", " : "") +
            (horarioDeshabilitacionId != null ? "horarioDeshabilitacionId=" + horarioDeshabilitacionId + ", " : "") +
            (alumnoId != null ? "alumnoId=" + alumnoId + ", " : "") +
            (instructorId != null ? "instructorId=" + instructorId + ", " : "") +
            (programacionId != null ? "programacionId=" + programacionId + ", " : "") +
            (fechaId != null ? "fechaId=" + fechaId + ", " : "") +
            (horarioCatalogoId != null ? "horarioCatalogoId=" + horarioCatalogoId + ", " : "") +
            (automovilId != null ? "automovilId=" + automovilId + ", " : "") +
            (lugarSalidaId != null ? "lugarSalidaId=" + lugarSalidaId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
