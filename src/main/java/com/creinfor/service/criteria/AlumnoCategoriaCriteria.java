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
 * Criteria class for the {@link com.creinfor.domain.AlumnoCategoria} entity. This class is used
 * in {@link com.creinfor.web.rest.AlumnoCategoriaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /alumno-categorias?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class AlumnoCategoriaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter licenciaNumeroAlumno;

    private LongFilter alumnoId;

    private LongFilter categoriaId;

    private Boolean distinct;

    public AlumnoCategoriaCriteria() {}

    public AlumnoCategoriaCriteria(AlumnoCategoriaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.licenciaNumeroAlumno = other.licenciaNumeroAlumno == null ? null : other.licenciaNumeroAlumno.copy();
        this.alumnoId = other.alumnoId == null ? null : other.alumnoId.copy();
        this.categoriaId = other.categoriaId == null ? null : other.categoriaId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public AlumnoCategoriaCriteria copy() {
        return new AlumnoCategoriaCriteria(this);
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

    public StringFilter getLicenciaNumeroAlumno() {
        return licenciaNumeroAlumno;
    }

    public StringFilter licenciaNumeroAlumno() {
        if (licenciaNumeroAlumno == null) {
            licenciaNumeroAlumno = new StringFilter();
        }
        return licenciaNumeroAlumno;
    }

    public void setLicenciaNumeroAlumno(StringFilter licenciaNumeroAlumno) {
        this.licenciaNumeroAlumno = licenciaNumeroAlumno;
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

    public LongFilter getCategoriaId() {
        return categoriaId;
    }

    public LongFilter categoriaId() {
        if (categoriaId == null) {
            categoriaId = new LongFilter();
        }
        return categoriaId;
    }

    public void setCategoriaId(LongFilter categoriaId) {
        this.categoriaId = categoriaId;
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
        final AlumnoCategoriaCriteria that = (AlumnoCategoriaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(licenciaNumeroAlumno, that.licenciaNumeroAlumno) &&
            Objects.equals(alumnoId, that.alumnoId) &&
            Objects.equals(categoriaId, that.categoriaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, licenciaNumeroAlumno, alumnoId, categoriaId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlumnoCategoriaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (licenciaNumeroAlumno != null ? "licenciaNumeroAlumno=" + licenciaNumeroAlumno + ", " : "") +
            (alumnoId != null ? "alumnoId=" + alumnoId + ", " : "") +
            (categoriaId != null ? "categoriaId=" + categoriaId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
