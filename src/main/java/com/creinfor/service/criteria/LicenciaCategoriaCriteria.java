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
 * Criteria class for the {@link com.creinfor.domain.LicenciaCategoria} entity. This class is used
 * in {@link com.creinfor.web.rest.LicenciaCategoriaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /licencia-categorias?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class LicenciaCategoriaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter categoria;

    private LongFilter alumnoCategoriaId;

    private LongFilter profesorId;

    private LongFilter asignaturaId;

    private LongFilter intructoresId;

    private Boolean distinct;

    public LicenciaCategoriaCriteria() {}

    public LicenciaCategoriaCriteria(LicenciaCategoriaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.categoria = other.categoria == null ? null : other.categoria.copy();
        this.alumnoCategoriaId = other.alumnoCategoriaId == null ? null : other.alumnoCategoriaId.copy();
        this.profesorId = other.profesorId == null ? null : other.profesorId.copy();
        this.asignaturaId = other.asignaturaId == null ? null : other.asignaturaId.copy();
        this.intructoresId = other.intructoresId == null ? null : other.intructoresId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LicenciaCategoriaCriteria copy() {
        return new LicenciaCategoriaCriteria(this);
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

    public StringFilter getCategoria() {
        return categoria;
    }

    public StringFilter categoria() {
        if (categoria == null) {
            categoria = new StringFilter();
        }
        return categoria;
    }

    public void setCategoria(StringFilter categoria) {
        this.categoria = categoria;
    }

    public LongFilter getAlumnoCategoriaId() {
        return alumnoCategoriaId;
    }

    public LongFilter alumnoCategoriaId() {
        if (alumnoCategoriaId == null) {
            alumnoCategoriaId = new LongFilter();
        }
        return alumnoCategoriaId;
    }

    public void setAlumnoCategoriaId(LongFilter alumnoCategoriaId) {
        this.alumnoCategoriaId = alumnoCategoriaId;
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

    public LongFilter getIntructoresId() {
        return intructoresId;
    }

    public LongFilter intructoresId() {
        if (intructoresId == null) {
            intructoresId = new LongFilter();
        }
        return intructoresId;
    }

    public void setIntructoresId(LongFilter intructoresId) {
        this.intructoresId = intructoresId;
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
        final LicenciaCategoriaCriteria that = (LicenciaCategoriaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(categoria, that.categoria) &&
            Objects.equals(alumnoCategoriaId, that.alumnoCategoriaId) &&
            Objects.equals(profesorId, that.profesorId) &&
            Objects.equals(asignaturaId, that.asignaturaId) &&
            Objects.equals(intructoresId, that.intructoresId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, categoria, alumnoCategoriaId, profesorId, asignaturaId, intructoresId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LicenciaCategoriaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (categoria != null ? "categoria=" + categoria + ", " : "") +
            (alumnoCategoriaId != null ? "alumnoCategoriaId=" + alumnoCategoriaId + ", " : "") +
            (profesorId != null ? "profesorId=" + profesorId + ", " : "") +
            (asignaturaId != null ? "asignaturaId=" + asignaturaId + ", " : "") +
            (intructoresId != null ? "intructoresId=" + intructoresId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
