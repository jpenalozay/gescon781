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
import tech.jhipster.service.filter.InstantFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.ProgramacionDeshabilitacion} entity. This class is used
 * in {@link com.creinfor.web.rest.ProgramacionDeshabilitacionResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /programacion-deshabilitacions?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class ProgramacionDeshabilitacionCriteria implements Serializable, Criteria {

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

    private StringFilter codigo;

    private StringFilter descripcion;

    private InstantFilter fecha;

    private StringFilter nombreUsuario;

    private LongFilter horarioDeshabilitacionesId;

    private LongFilter fechasId;

    private LongFilter horarioCatalogoId;

    private LongFilter programacionId;

    private LongFilter usuarioId;

    private Boolean distinct;

    public ProgramacionDeshabilitacionCriteria() {}

    public ProgramacionDeshabilitacionCriteria(ProgramacionDeshabilitacionCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.descripcion = other.descripcion == null ? null : other.descripcion.copy();
        this.fecha = other.fecha == null ? null : other.fecha.copy();
        this.nombreUsuario = other.nombreUsuario == null ? null : other.nombreUsuario.copy();
        this.horarioDeshabilitacionesId = other.horarioDeshabilitacionesId == null ? null : other.horarioDeshabilitacionesId.copy();
        this.fechasId = other.fechasId == null ? null : other.fechasId.copy();
        this.horarioCatalogoId = other.horarioCatalogoId == null ? null : other.horarioCatalogoId.copy();
        this.programacionId = other.programacionId == null ? null : other.programacionId.copy();
        this.usuarioId = other.usuarioId == null ? null : other.usuarioId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public ProgramacionDeshabilitacionCriteria copy() {
        return new ProgramacionDeshabilitacionCriteria(this);
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

    public LongFilter getHorarioDeshabilitacionesId() {
        return horarioDeshabilitacionesId;
    }

    public LongFilter horarioDeshabilitacionesId() {
        if (horarioDeshabilitacionesId == null) {
            horarioDeshabilitacionesId = new LongFilter();
        }
        return horarioDeshabilitacionesId;
    }

    public void setHorarioDeshabilitacionesId(LongFilter horarioDeshabilitacionesId) {
        this.horarioDeshabilitacionesId = horarioDeshabilitacionesId;
    }

    public LongFilter getFechasId() {
        return fechasId;
    }

    public LongFilter fechasId() {
        if (fechasId == null) {
            fechasId = new LongFilter();
        }
        return fechasId;
    }

    public void setFechasId(LongFilter fechasId) {
        this.fechasId = fechasId;
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

    public LongFilter getUsuarioId() {
        return usuarioId;
    }

    public LongFilter usuarioId() {
        if (usuarioId == null) {
            usuarioId = new LongFilter();
        }
        return usuarioId;
    }

    public void setUsuarioId(LongFilter usuarioId) {
        this.usuarioId = usuarioId;
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
        final ProgramacionDeshabilitacionCriteria that = (ProgramacionDeshabilitacionCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(fecha, that.fecha) &&
            Objects.equals(nombreUsuario, that.nombreUsuario) &&
            Objects.equals(horarioDeshabilitacionesId, that.horarioDeshabilitacionesId) &&
            Objects.equals(fechasId, that.fechasId) &&
            Objects.equals(horarioCatalogoId, that.horarioCatalogoId) &&
            Objects.equals(programacionId, that.programacionId) &&
            Objects.equals(usuarioId, that.usuarioId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            activo,
            codigo,
            descripcion,
            fecha,
            nombreUsuario,
            horarioDeshabilitacionesId,
            fechasId,
            horarioCatalogoId,
            programacionId,
            usuarioId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProgramacionDeshabilitacionCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
            (fecha != null ? "fecha=" + fecha + ", " : "") +
            (nombreUsuario != null ? "nombreUsuario=" + nombreUsuario + ", " : "") +
            (horarioDeshabilitacionesId != null ? "horarioDeshabilitacionesId=" + horarioDeshabilitacionesId + ", " : "") +
            (fechasId != null ? "fechasId=" + fechasId + ", " : "") +
            (horarioCatalogoId != null ? "horarioCatalogoId=" + horarioCatalogoId + ", " : "") +
            (programacionId != null ? "programacionId=" + programacionId + ", " : "") +
            (usuarioId != null ? "usuarioId=" + usuarioId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
