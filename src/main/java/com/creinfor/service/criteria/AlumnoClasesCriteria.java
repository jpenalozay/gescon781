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
 * Criteria class for the {@link com.creinfor.domain.AlumnoClases} entity. This class is used
 * in {@link com.creinfor.web.rest.AlumnoClasesResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /alumno-clases?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class AlumnoClasesCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private IntegerFilter clasesTotales;

    private IntegerFilter clasesProgramadas;

    private IntegerFilter clasesRealizadas;

    private LongFilter alumnoId;

    private Boolean distinct;

    public AlumnoClasesCriteria() {}

    public AlumnoClasesCriteria(AlumnoClasesCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.clasesTotales = other.clasesTotales == null ? null : other.clasesTotales.copy();
        this.clasesProgramadas = other.clasesProgramadas == null ? null : other.clasesProgramadas.copy();
        this.clasesRealizadas = other.clasesRealizadas == null ? null : other.clasesRealizadas.copy();
        this.alumnoId = other.alumnoId == null ? null : other.alumnoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public AlumnoClasesCriteria copy() {
        return new AlumnoClasesCriteria(this);
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

    public IntegerFilter getClasesTotales() {
        return clasesTotales;
    }

    public IntegerFilter clasesTotales() {
        if (clasesTotales == null) {
            clasesTotales = new IntegerFilter();
        }
        return clasesTotales;
    }

    public void setClasesTotales(IntegerFilter clasesTotales) {
        this.clasesTotales = clasesTotales;
    }

    public IntegerFilter getClasesProgramadas() {
        return clasesProgramadas;
    }

    public IntegerFilter clasesProgramadas() {
        if (clasesProgramadas == null) {
            clasesProgramadas = new IntegerFilter();
        }
        return clasesProgramadas;
    }

    public void setClasesProgramadas(IntegerFilter clasesProgramadas) {
        this.clasesProgramadas = clasesProgramadas;
    }

    public IntegerFilter getClasesRealizadas() {
        return clasesRealizadas;
    }

    public IntegerFilter clasesRealizadas() {
        if (clasesRealizadas == null) {
            clasesRealizadas = new IntegerFilter();
        }
        return clasesRealizadas;
    }

    public void setClasesRealizadas(IntegerFilter clasesRealizadas) {
        this.clasesRealizadas = clasesRealizadas;
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
        final AlumnoClasesCriteria that = (AlumnoClasesCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(clasesTotales, that.clasesTotales) &&
            Objects.equals(clasesProgramadas, that.clasesProgramadas) &&
            Objects.equals(clasesRealizadas, that.clasesRealizadas) &&
            Objects.equals(alumnoId, that.alumnoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, clasesTotales, clasesProgramadas, clasesRealizadas, alumnoId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlumnoClasesCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (clasesTotales != null ? "clasesTotales=" + clasesTotales + ", " : "") +
            (clasesProgramadas != null ? "clasesProgramadas=" + clasesProgramadas + ", " : "") +
            (clasesRealizadas != null ? "clasesRealizadas=" + clasesRealizadas + ", " : "") +
            (alumnoId != null ? "alumnoId=" + alumnoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
