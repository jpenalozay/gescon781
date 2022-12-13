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
 * Criteria class for the {@link com.creinfor.domain.AlumnoUsuario} entity. This class is used
 * in {@link com.creinfor.web.rest.AlumnoUsuarioResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /alumno-usuarios?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class AlumnoUsuarioCriteria implements Serializable, Criteria {

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

    private StringFilter usuario;

    private StringFilter clave;

    private LongFilter alumnoId;

    private Boolean distinct;

    public AlumnoUsuarioCriteria() {}

    public AlumnoUsuarioCriteria(AlumnoUsuarioCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.usuario = other.usuario == null ? null : other.usuario.copy();
        this.clave = other.clave == null ? null : other.clave.copy();
        this.alumnoId = other.alumnoId == null ? null : other.alumnoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public AlumnoUsuarioCriteria copy() {
        return new AlumnoUsuarioCriteria(this);
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

    public StringFilter getUsuario() {
        return usuario;
    }

    public StringFilter usuario() {
        if (usuario == null) {
            usuario = new StringFilter();
        }
        return usuario;
    }

    public void setUsuario(StringFilter usuario) {
        this.usuario = usuario;
    }

    public StringFilter getClave() {
        return clave;
    }

    public StringFilter clave() {
        if (clave == null) {
            clave = new StringFilter();
        }
        return clave;
    }

    public void setClave(StringFilter clave) {
        this.clave = clave;
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
        final AlumnoUsuarioCriteria that = (AlumnoUsuarioCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(usuario, that.usuario) &&
            Objects.equals(clave, that.clave) &&
            Objects.equals(alumnoId, that.alumnoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, activo, usuario, clave, alumnoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlumnoUsuarioCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (usuario != null ? "usuario=" + usuario + ", " : "") +
            (clave != null ? "clave=" + clave + ", " : "") +
            (alumnoId != null ? "alumnoId=" + alumnoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
