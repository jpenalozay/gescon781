package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.CursoTipo;
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
 * Criteria class for the {@link com.creinfor.domain.Curso} entity. This class is used
 * in {@link com.creinfor.web.rest.CursoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /cursos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class CursoCriteria implements Serializable, Criteria {

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
     * Class for filtering CursoTipo
     */
    public static class CursoTipoFilter extends Filter<CursoTipo> {

        public CursoTipoFilter() {}

        public CursoTipoFilter(CursoTipoFilter filter) {
            super(filter);
        }

        @Override
        public CursoTipoFilter copy() {
            return new CursoTipoFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private EstadoFilter activo;

    private CursoTipoFilter tipo;

    private StringFilter nombre;

    private StringFilter nombreCorto;

    private StringFilter descripcion;

    private LongFilter asignaturaId;

    private Boolean distinct;

    public CursoCriteria() {}

    public CursoCriteria(CursoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.tipo = other.tipo == null ? null : other.tipo.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.nombreCorto = other.nombreCorto == null ? null : other.nombreCorto.copy();
        this.descripcion = other.descripcion == null ? null : other.descripcion.copy();
        this.asignaturaId = other.asignaturaId == null ? null : other.asignaturaId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public CursoCriteria copy() {
        return new CursoCriteria(this);
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

    public CursoTipoFilter getTipo() {
        return tipo;
    }

    public CursoTipoFilter tipo() {
        if (tipo == null) {
            tipo = new CursoTipoFilter();
        }
        return tipo;
    }

    public void setTipo(CursoTipoFilter tipo) {
        this.tipo = tipo;
    }

    public StringFilter getNombre() {
        return nombre;
    }

    public StringFilter nombre() {
        if (nombre == null) {
            nombre = new StringFilter();
        }
        return nombre;
    }

    public void setNombre(StringFilter nombre) {
        this.nombre = nombre;
    }

    public StringFilter getNombreCorto() {
        return nombreCorto;
    }

    public StringFilter nombreCorto() {
        if (nombreCorto == null) {
            nombreCorto = new StringFilter();
        }
        return nombreCorto;
    }

    public void setNombreCorto(StringFilter nombreCorto) {
        this.nombreCorto = nombreCorto;
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
        final CursoCriteria that = (CursoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(tipo, that.tipo) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(nombreCorto, that.nombreCorto) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(asignaturaId, that.asignaturaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, activo, tipo, nombre, nombreCorto, descripcion, asignaturaId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CursoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (tipo != null ? "tipo=" + tipo + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (nombreCorto != null ? "nombreCorto=" + nombreCorto + ", " : "") +
            (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
            (asignaturaId != null ? "asignaturaId=" + asignaturaId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
