package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.AlumnoEstado;
import com.creinfor.domain.enumeration.AlumnoTipo;
import com.creinfor.domain.enumeration.GradoInstruccion;
import com.creinfor.domain.enumeration.Ocupacion;
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
 * Criteria class for the {@link com.creinfor.domain.Alumno} entity. This class is used
 * in {@link com.creinfor.web.rest.AlumnoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /alumnos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class AlumnoCriteria implements Serializable, Criteria {

    /**
     * Class for filtering AlumnoEstado
     */
    public static class AlumnoEstadoFilter extends Filter<AlumnoEstado> {

        public AlumnoEstadoFilter() {}

        public AlumnoEstadoFilter(AlumnoEstadoFilter filter) {
            super(filter);
        }

        @Override
        public AlumnoEstadoFilter copy() {
            return new AlumnoEstadoFilter(this);
        }
    }

    /**
     * Class for filtering AlumnoTipo
     */
    public static class AlumnoTipoFilter extends Filter<AlumnoTipo> {

        public AlumnoTipoFilter() {}

        public AlumnoTipoFilter(AlumnoTipoFilter filter) {
            super(filter);
        }

        @Override
        public AlumnoTipoFilter copy() {
            return new AlumnoTipoFilter(this);
        }
    }

    /**
     * Class for filtering GradoInstruccion
     */
    public static class GradoInstruccionFilter extends Filter<GradoInstruccion> {

        public GradoInstruccionFilter() {}

        public GradoInstruccionFilter(GradoInstruccionFilter filter) {
            super(filter);
        }

        @Override
        public GradoInstruccionFilter copy() {
            return new GradoInstruccionFilter(this);
        }
    }

    /**
     * Class for filtering Ocupacion
     */
    public static class OcupacionFilter extends Filter<Ocupacion> {

        public OcupacionFilter() {}

        public OcupacionFilter(OcupacionFilter filter) {
            super(filter);
        }

        @Override
        public OcupacionFilter copy() {
            return new OcupacionFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter codigo;

    private AlumnoEstadoFilter estado;

    private AlumnoTipoFilter tipo;

    private GradoInstruccionFilter alumnoGradoInstruccion;

    private OcupacionFilter ocupacion;

    private LongFilter personaId;

    private LongFilter alumnoClasesId;

    private LongFilter alumnoUsuarioId;

    private LongFilter alumnoCategoriaId;

    private LongFilter inscripcionId;

    private LongFilter horarioId;

    private Boolean distinct;

    public AlumnoCriteria() {}

    public AlumnoCriteria(AlumnoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.estado = other.estado == null ? null : other.estado.copy();
        this.tipo = other.tipo == null ? null : other.tipo.copy();
        this.alumnoGradoInstruccion = other.alumnoGradoInstruccion == null ? null : other.alumnoGradoInstruccion.copy();
        this.ocupacion = other.ocupacion == null ? null : other.ocupacion.copy();
        this.personaId = other.personaId == null ? null : other.personaId.copy();
        this.alumnoClasesId = other.alumnoClasesId == null ? null : other.alumnoClasesId.copy();
        this.alumnoUsuarioId = other.alumnoUsuarioId == null ? null : other.alumnoUsuarioId.copy();
        this.alumnoCategoriaId = other.alumnoCategoriaId == null ? null : other.alumnoCategoriaId.copy();
        this.inscripcionId = other.inscripcionId == null ? null : other.inscripcionId.copy();
        this.horarioId = other.horarioId == null ? null : other.horarioId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public AlumnoCriteria copy() {
        return new AlumnoCriteria(this);
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

    public AlumnoEstadoFilter getEstado() {
        return estado;
    }

    public AlumnoEstadoFilter estado() {
        if (estado == null) {
            estado = new AlumnoEstadoFilter();
        }
        return estado;
    }

    public void setEstado(AlumnoEstadoFilter estado) {
        this.estado = estado;
    }

    public AlumnoTipoFilter getTipo() {
        return tipo;
    }

    public AlumnoTipoFilter tipo() {
        if (tipo == null) {
            tipo = new AlumnoTipoFilter();
        }
        return tipo;
    }

    public void setTipo(AlumnoTipoFilter tipo) {
        this.tipo = tipo;
    }

    public GradoInstruccionFilter getAlumnoGradoInstruccion() {
        return alumnoGradoInstruccion;
    }

    public GradoInstruccionFilter alumnoGradoInstruccion() {
        if (alumnoGradoInstruccion == null) {
            alumnoGradoInstruccion = new GradoInstruccionFilter();
        }
        return alumnoGradoInstruccion;
    }

    public void setAlumnoGradoInstruccion(GradoInstruccionFilter alumnoGradoInstruccion) {
        this.alumnoGradoInstruccion = alumnoGradoInstruccion;
    }

    public OcupacionFilter getOcupacion() {
        return ocupacion;
    }

    public OcupacionFilter ocupacion() {
        if (ocupacion == null) {
            ocupacion = new OcupacionFilter();
        }
        return ocupacion;
    }

    public void setOcupacion(OcupacionFilter ocupacion) {
        this.ocupacion = ocupacion;
    }

    public LongFilter getPersonaId() {
        return personaId;
    }

    public LongFilter personaId() {
        if (personaId == null) {
            personaId = new LongFilter();
        }
        return personaId;
    }

    public void setPersonaId(LongFilter personaId) {
        this.personaId = personaId;
    }

    public LongFilter getAlumnoClasesId() {
        return alumnoClasesId;
    }

    public LongFilter alumnoClasesId() {
        if (alumnoClasesId == null) {
            alumnoClasesId = new LongFilter();
        }
        return alumnoClasesId;
    }

    public void setAlumnoClasesId(LongFilter alumnoClasesId) {
        this.alumnoClasesId = alumnoClasesId;
    }

    public LongFilter getAlumnoUsuarioId() {
        return alumnoUsuarioId;
    }

    public LongFilter alumnoUsuarioId() {
        if (alumnoUsuarioId == null) {
            alumnoUsuarioId = new LongFilter();
        }
        return alumnoUsuarioId;
    }

    public void setAlumnoUsuarioId(LongFilter alumnoUsuarioId) {
        this.alumnoUsuarioId = alumnoUsuarioId;
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

    public LongFilter getInscripcionId() {
        return inscripcionId;
    }

    public LongFilter inscripcionId() {
        if (inscripcionId == null) {
            inscripcionId = new LongFilter();
        }
        return inscripcionId;
    }

    public void setInscripcionId(LongFilter inscripcionId) {
        this.inscripcionId = inscripcionId;
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
        final AlumnoCriteria that = (AlumnoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(estado, that.estado) &&
            Objects.equals(tipo, that.tipo) &&
            Objects.equals(alumnoGradoInstruccion, that.alumnoGradoInstruccion) &&
            Objects.equals(ocupacion, that.ocupacion) &&
            Objects.equals(personaId, that.personaId) &&
            Objects.equals(alumnoClasesId, that.alumnoClasesId) &&
            Objects.equals(alumnoUsuarioId, that.alumnoUsuarioId) &&
            Objects.equals(alumnoCategoriaId, that.alumnoCategoriaId) &&
            Objects.equals(inscripcionId, that.inscripcionId) &&
            Objects.equals(horarioId, that.horarioId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            codigo,
            estado,
            tipo,
            alumnoGradoInstruccion,
            ocupacion,
            personaId,
            alumnoClasesId,
            alumnoUsuarioId,
            alumnoCategoriaId,
            inscripcionId,
            horarioId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlumnoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (estado != null ? "estado=" + estado + ", " : "") +
            (tipo != null ? "tipo=" + tipo + ", " : "") +
            (alumnoGradoInstruccion != null ? "alumnoGradoInstruccion=" + alumnoGradoInstruccion + ", " : "") +
            (ocupacion != null ? "ocupacion=" + ocupacion + ", " : "") +
            (personaId != null ? "personaId=" + personaId + ", " : "") +
            (alumnoClasesId != null ? "alumnoClasesId=" + alumnoClasesId + ", " : "") +
            (alumnoUsuarioId != null ? "alumnoUsuarioId=" + alumnoUsuarioId + ", " : "") +
            (alumnoCategoriaId != null ? "alumnoCategoriaId=" + alumnoCategoriaId + ", " : "") +
            (inscripcionId != null ? "inscripcionId=" + inscripcionId + ", " : "") +
            (horarioId != null ? "horarioId=" + horarioId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
