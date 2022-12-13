package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.AlumnoDesarrolloEstado;
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
 * Criteria class for the {@link com.creinfor.domain.AlumnoDesarrollo} entity. This class is used
 * in {@link com.creinfor.web.rest.AlumnoDesarrolloResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /alumno-desarrollos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class AlumnoDesarrolloCriteria implements Serializable, Criteria {

    /**
     * Class for filtering AlumnoDesarrolloEstado
     */
    public static class AlumnoDesarrolloEstadoFilter extends Filter<AlumnoDesarrolloEstado> {

        public AlumnoDesarrolloEstadoFilter() {}

        public AlumnoDesarrolloEstadoFilter(AlumnoDesarrolloEstadoFilter filter) {
            super(filter);
        }

        @Override
        public AlumnoDesarrolloEstadoFilter copy() {
            return new AlumnoDesarrolloEstadoFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private IntegerFilter clasesTeoriaProgramadas;

    private IntegerFilter clasesPracticasProgramas;

    private IntegerFilter clasesInasistenciaTeoria;

    private IntegerFilter clasesInasistenciaPractica;

    private IntegerFilter clasesRealizadasTeoria;

    private IntegerFilter clasesRealizadasPractica;

    private AlumnoDesarrolloEstadoFilter alumnoDesarrolloEstado;

    private Boolean distinct;

    public AlumnoDesarrolloCriteria() {}

    public AlumnoDesarrolloCriteria(AlumnoDesarrolloCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.clasesTeoriaProgramadas = other.clasesTeoriaProgramadas == null ? null : other.clasesTeoriaProgramadas.copy();
        this.clasesPracticasProgramas = other.clasesPracticasProgramas == null ? null : other.clasesPracticasProgramas.copy();
        this.clasesInasistenciaTeoria = other.clasesInasistenciaTeoria == null ? null : other.clasesInasistenciaTeoria.copy();
        this.clasesInasistenciaPractica = other.clasesInasistenciaPractica == null ? null : other.clasesInasistenciaPractica.copy();
        this.clasesRealizadasTeoria = other.clasesRealizadasTeoria == null ? null : other.clasesRealizadasTeoria.copy();
        this.clasesRealizadasPractica = other.clasesRealizadasPractica == null ? null : other.clasesRealizadasPractica.copy();
        this.alumnoDesarrolloEstado = other.alumnoDesarrolloEstado == null ? null : other.alumnoDesarrolloEstado.copy();
        this.distinct = other.distinct;
    }

    @Override
    public AlumnoDesarrolloCriteria copy() {
        return new AlumnoDesarrolloCriteria(this);
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

    public IntegerFilter getClasesTeoriaProgramadas() {
        return clasesTeoriaProgramadas;
    }

    public IntegerFilter clasesTeoriaProgramadas() {
        if (clasesTeoriaProgramadas == null) {
            clasesTeoriaProgramadas = new IntegerFilter();
        }
        return clasesTeoriaProgramadas;
    }

    public void setClasesTeoriaProgramadas(IntegerFilter clasesTeoriaProgramadas) {
        this.clasesTeoriaProgramadas = clasesTeoriaProgramadas;
    }

    public IntegerFilter getClasesPracticasProgramas() {
        return clasesPracticasProgramas;
    }

    public IntegerFilter clasesPracticasProgramas() {
        if (clasesPracticasProgramas == null) {
            clasesPracticasProgramas = new IntegerFilter();
        }
        return clasesPracticasProgramas;
    }

    public void setClasesPracticasProgramas(IntegerFilter clasesPracticasProgramas) {
        this.clasesPracticasProgramas = clasesPracticasProgramas;
    }

    public IntegerFilter getClasesInasistenciaTeoria() {
        return clasesInasistenciaTeoria;
    }

    public IntegerFilter clasesInasistenciaTeoria() {
        if (clasesInasistenciaTeoria == null) {
            clasesInasistenciaTeoria = new IntegerFilter();
        }
        return clasesInasistenciaTeoria;
    }

    public void setClasesInasistenciaTeoria(IntegerFilter clasesInasistenciaTeoria) {
        this.clasesInasistenciaTeoria = clasesInasistenciaTeoria;
    }

    public IntegerFilter getClasesInasistenciaPractica() {
        return clasesInasistenciaPractica;
    }

    public IntegerFilter clasesInasistenciaPractica() {
        if (clasesInasistenciaPractica == null) {
            clasesInasistenciaPractica = new IntegerFilter();
        }
        return clasesInasistenciaPractica;
    }

    public void setClasesInasistenciaPractica(IntegerFilter clasesInasistenciaPractica) {
        this.clasesInasistenciaPractica = clasesInasistenciaPractica;
    }

    public IntegerFilter getClasesRealizadasTeoria() {
        return clasesRealizadasTeoria;
    }

    public IntegerFilter clasesRealizadasTeoria() {
        if (clasesRealizadasTeoria == null) {
            clasesRealizadasTeoria = new IntegerFilter();
        }
        return clasesRealizadasTeoria;
    }

    public void setClasesRealizadasTeoria(IntegerFilter clasesRealizadasTeoria) {
        this.clasesRealizadasTeoria = clasesRealizadasTeoria;
    }

    public IntegerFilter getClasesRealizadasPractica() {
        return clasesRealizadasPractica;
    }

    public IntegerFilter clasesRealizadasPractica() {
        if (clasesRealizadasPractica == null) {
            clasesRealizadasPractica = new IntegerFilter();
        }
        return clasesRealizadasPractica;
    }

    public void setClasesRealizadasPractica(IntegerFilter clasesRealizadasPractica) {
        this.clasesRealizadasPractica = clasesRealizadasPractica;
    }

    public AlumnoDesarrolloEstadoFilter getAlumnoDesarrolloEstado() {
        return alumnoDesarrolloEstado;
    }

    public AlumnoDesarrolloEstadoFilter alumnoDesarrolloEstado() {
        if (alumnoDesarrolloEstado == null) {
            alumnoDesarrolloEstado = new AlumnoDesarrolloEstadoFilter();
        }
        return alumnoDesarrolloEstado;
    }

    public void setAlumnoDesarrolloEstado(AlumnoDesarrolloEstadoFilter alumnoDesarrolloEstado) {
        this.alumnoDesarrolloEstado = alumnoDesarrolloEstado;
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
        final AlumnoDesarrolloCriteria that = (AlumnoDesarrolloCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(clasesTeoriaProgramadas, that.clasesTeoriaProgramadas) &&
            Objects.equals(clasesPracticasProgramas, that.clasesPracticasProgramas) &&
            Objects.equals(clasesInasistenciaTeoria, that.clasesInasistenciaTeoria) &&
            Objects.equals(clasesInasistenciaPractica, that.clasesInasistenciaPractica) &&
            Objects.equals(clasesRealizadasTeoria, that.clasesRealizadasTeoria) &&
            Objects.equals(clasesRealizadasPractica, that.clasesRealizadasPractica) &&
            Objects.equals(alumnoDesarrolloEstado, that.alumnoDesarrolloEstado) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            clasesTeoriaProgramadas,
            clasesPracticasProgramas,
            clasesInasistenciaTeoria,
            clasesInasistenciaPractica,
            clasesRealizadasTeoria,
            clasesRealizadasPractica,
            alumnoDesarrolloEstado,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlumnoDesarrolloCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (clasesTeoriaProgramadas != null ? "clasesTeoriaProgramadas=" + clasesTeoriaProgramadas + ", " : "") +
            (clasesPracticasProgramas != null ? "clasesPracticasProgramas=" + clasesPracticasProgramas + ", " : "") +
            (clasesInasistenciaTeoria != null ? "clasesInasistenciaTeoria=" + clasesInasistenciaTeoria + ", " : "") +
            (clasesInasistenciaPractica != null ? "clasesInasistenciaPractica=" + clasesInasistenciaPractica + ", " : "") +
            (clasesRealizadasTeoria != null ? "clasesRealizadasTeoria=" + clasesRealizadasTeoria + ", " : "") +
            (clasesRealizadasPractica != null ? "clasesRealizadasPractica=" + clasesRealizadasPractica + ", " : "") +
            (alumnoDesarrolloEstado != null ? "alumnoDesarrolloEstado=" + alumnoDesarrolloEstado + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
