package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.ProgramacionEstado;
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
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.Programacion} entity. This class is used
 * in {@link com.creinfor.web.rest.ProgramacionResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /programacions?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class ProgramacionCriteria implements Serializable, Criteria {

    /**
     * Class for filtering ProgramacionEstado
     */
    public static class ProgramacionEstadoFilter extends Filter<ProgramacionEstado> {

        public ProgramacionEstadoFilter() {}

        public ProgramacionEstadoFilter(ProgramacionEstadoFilter filter) {
            super(filter);
        }

        @Override
        public ProgramacionEstadoFilter copy() {
            return new ProgramacionEstadoFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private ProgramacionEstadoFilter estado;

    private StringFilter codigo;

    private LocalDateFilter fechaInicio;

    private LocalDateFilter fechaFin;

    private IntegerFilter deshabilitaciones;

    private InstantFilter fecha;

    private StringFilter nombreUsuario;

    private LongFilter programacionDeshabilitacionId;

    private LongFilter horarioId;

    private LongFilter diaId;

    private LongFilter horarioCatalogoId;

    private LongFilter profesorId;

    private LongFilter automovilId;

    private Boolean distinct;

    public ProgramacionCriteria() {}

    public ProgramacionCriteria(ProgramacionCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.estado = other.estado == null ? null : other.estado.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.fechaInicio = other.fechaInicio == null ? null : other.fechaInicio.copy();
        this.fechaFin = other.fechaFin == null ? null : other.fechaFin.copy();
        this.deshabilitaciones = other.deshabilitaciones == null ? null : other.deshabilitaciones.copy();
        this.fecha = other.fecha == null ? null : other.fecha.copy();
        this.nombreUsuario = other.nombreUsuario == null ? null : other.nombreUsuario.copy();
        this.programacionDeshabilitacionId =
            other.programacionDeshabilitacionId == null ? null : other.programacionDeshabilitacionId.copy();
        this.horarioId = other.horarioId == null ? null : other.horarioId.copy();
        this.diaId = other.diaId == null ? null : other.diaId.copy();
        this.horarioCatalogoId = other.horarioCatalogoId == null ? null : other.horarioCatalogoId.copy();
        this.profesorId = other.profesorId == null ? null : other.profesorId.copy();
        this.automovilId = other.automovilId == null ? null : other.automovilId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public ProgramacionCriteria copy() {
        return new ProgramacionCriteria(this);
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

    public ProgramacionEstadoFilter getEstado() {
        return estado;
    }

    public ProgramacionEstadoFilter estado() {
        if (estado == null) {
            estado = new ProgramacionEstadoFilter();
        }
        return estado;
    }

    public void setEstado(ProgramacionEstadoFilter estado) {
        this.estado = estado;
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

    public LocalDateFilter getFechaFin() {
        return fechaFin;
    }

    public LocalDateFilter fechaFin() {
        if (fechaFin == null) {
            fechaFin = new LocalDateFilter();
        }
        return fechaFin;
    }

    public void setFechaFin(LocalDateFilter fechaFin) {
        this.fechaFin = fechaFin;
    }

    public IntegerFilter getDeshabilitaciones() {
        return deshabilitaciones;
    }

    public IntegerFilter deshabilitaciones() {
        if (deshabilitaciones == null) {
            deshabilitaciones = new IntegerFilter();
        }
        return deshabilitaciones;
    }

    public void setDeshabilitaciones(IntegerFilter deshabilitaciones) {
        this.deshabilitaciones = deshabilitaciones;
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

    public StringFilter getNombreUsuario() {
        return nombreUsuario;
    }

    public StringFilter nombreUsuario() {
        if (nombreUsuario == null) {
            nombreUsuario = new StringFilter();
        }
        return nombreUsuario;
    }

    public void setNombreUsuario(StringFilter nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
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

    public LongFilter getDiaId() {
        return diaId;
    }

    public LongFilter diaId() {
        if (diaId == null) {
            diaId = new LongFilter();
        }
        return diaId;
    }

    public void setDiaId(LongFilter diaId) {
        this.diaId = diaId;
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

    public LongFilter getProfesorId() {
        return profesorId;
    }

    public LongFilter profesorId() {
        if (profesorId == null) {
            profesorId = new LongFilter();
        }
        return profesorId;
    }

    public void setProfesorId(LongFilter profesorId) {
        this.profesorId = profesorId;
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
        final ProgramacionCriteria that = (ProgramacionCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(estado, that.estado) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(fechaInicio, that.fechaInicio) &&
            Objects.equals(fechaFin, that.fechaFin) &&
            Objects.equals(deshabilitaciones, that.deshabilitaciones) &&
            Objects.equals(fecha, that.fecha) &&
            Objects.equals(nombreUsuario, that.nombreUsuario) &&
            Objects.equals(programacionDeshabilitacionId, that.programacionDeshabilitacionId) &&
            Objects.equals(horarioId, that.horarioId) &&
            Objects.equals(diaId, that.diaId) &&
            Objects.equals(horarioCatalogoId, that.horarioCatalogoId) &&
            Objects.equals(profesorId, that.profesorId) &&
            Objects.equals(automovilId, that.automovilId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            estado,
            codigo,
            fechaInicio,
            fechaFin,
            deshabilitaciones,
            fecha,
            nombreUsuario,
            programacionDeshabilitacionId,
            horarioId,
            diaId,
            horarioCatalogoId,
            profesorId,
            automovilId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProgramacionCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (estado != null ? "estado=" + estado + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (fechaInicio != null ? "fechaInicio=" + fechaInicio + ", " : "") +
            (fechaFin != null ? "fechaFin=" + fechaFin + ", " : "") +
            (deshabilitaciones != null ? "deshabilitaciones=" + deshabilitaciones + ", " : "") +
            (fecha != null ? "fecha=" + fecha + ", " : "") +
            (nombreUsuario != null ? "nombreUsuario=" + nombreUsuario + ", " : "") +
            (programacionDeshabilitacionId != null ? "programacionDeshabilitacionId=" + programacionDeshabilitacionId + ", " : "") +
            (horarioId != null ? "horarioId=" + horarioId + ", " : "") +
            (diaId != null ? "diaId=" + diaId + ", " : "") +
            (horarioCatalogoId != null ? "horarioCatalogoId=" + horarioCatalogoId + ", " : "") +
            (profesorId != null ? "profesorId=" + profesorId + ", " : "") +
            (automovilId != null ? "automovilId=" + automovilId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
