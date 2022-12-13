package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.SiNo;
import com.creinfor.domain.enumeration.SiNo;
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
 * Criteria class for the {@link com.creinfor.domain.Profesor} entity. This class is used
 * in {@link com.creinfor.web.rest.ProfesorResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /profesors?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class ProfesorCriteria implements Serializable, Criteria {

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
     * Class for filtering SiNo
     */
    public static class SiNoFilter extends Filter<SiNo> {

        public SiNoFilter() {}

        public SiNoFilter(SiNoFilter filter) {
            super(filter);
        }

        @Override
        public SiNoFilter copy() {
            return new SiNoFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private EstadoFilter activo;

    private StringFilter codigo;

    private SiNoFilter teoria;

    private SiNoFilter practica;

    private StringFilter licenciaNumero;

    private LongFilter empleadoId;

    private LongFilter horarioId;

    private LongFilter programacionId;

    private LongFilter licenciasPermitidasId;

    private LongFilter licenciaCategoriaId;

    private Boolean distinct;

    public ProfesorCriteria() {}

    public ProfesorCriteria(ProfesorCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.teoria = other.teoria == null ? null : other.teoria.copy();
        this.practica = other.practica == null ? null : other.practica.copy();
        this.licenciaNumero = other.licenciaNumero == null ? null : other.licenciaNumero.copy();
        this.empleadoId = other.empleadoId == null ? null : other.empleadoId.copy();
        this.horarioId = other.horarioId == null ? null : other.horarioId.copy();
        this.programacionId = other.programacionId == null ? null : other.programacionId.copy();
        this.licenciasPermitidasId = other.licenciasPermitidasId == null ? null : other.licenciasPermitidasId.copy();
        this.licenciaCategoriaId = other.licenciaCategoriaId == null ? null : other.licenciaCategoriaId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public ProfesorCriteria copy() {
        return new ProfesorCriteria(this);
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

    public SiNoFilter getTeoria() {
        return teoria;
    }

    public SiNoFilter teoria() {
        if (teoria == null) {
            teoria = new SiNoFilter();
        }
        return teoria;
    }

    public void setTeoria(SiNoFilter teoria) {
        this.teoria = teoria;
    }

    public SiNoFilter getPractica() {
        return practica;
    }

    public SiNoFilter practica() {
        if (practica == null) {
            practica = new SiNoFilter();
        }
        return practica;
    }

    public void setPractica(SiNoFilter practica) {
        this.practica = practica;
    }

    public StringFilter getLicenciaNumero() {
        return licenciaNumero;
    }

    public StringFilter licenciaNumero() {
        if (licenciaNumero == null) {
            licenciaNumero = new StringFilter();
        }
        return licenciaNumero;
    }

    public void setLicenciaNumero(StringFilter licenciaNumero) {
        this.licenciaNumero = licenciaNumero;
    }

    public LongFilter getEmpleadoId() {
        return empleadoId;
    }

    public LongFilter empleadoId() {
        if (empleadoId == null) {
            empleadoId = new LongFilter();
        }
        return empleadoId;
    }

    public void setEmpleadoId(LongFilter empleadoId) {
        this.empleadoId = empleadoId;
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

    public LongFilter getLicenciasPermitidasId() {
        return licenciasPermitidasId;
    }

    public LongFilter licenciasPermitidasId() {
        if (licenciasPermitidasId == null) {
            licenciasPermitidasId = new LongFilter();
        }
        return licenciasPermitidasId;
    }

    public void setLicenciasPermitidasId(LongFilter licenciasPermitidasId) {
        this.licenciasPermitidasId = licenciasPermitidasId;
    }

    public LongFilter getLicenciaCategoriaId() {
        return licenciaCategoriaId;
    }

    public LongFilter licenciaCategoriaId() {
        if (licenciaCategoriaId == null) {
            licenciaCategoriaId = new LongFilter();
        }
        return licenciaCategoriaId;
    }

    public void setLicenciaCategoriaId(LongFilter licenciaCategoriaId) {
        this.licenciaCategoriaId = licenciaCategoriaId;
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
        final ProfesorCriteria that = (ProfesorCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(teoria, that.teoria) &&
            Objects.equals(practica, that.practica) &&
            Objects.equals(licenciaNumero, that.licenciaNumero) &&
            Objects.equals(empleadoId, that.empleadoId) &&
            Objects.equals(horarioId, that.horarioId) &&
            Objects.equals(programacionId, that.programacionId) &&
            Objects.equals(licenciasPermitidasId, that.licenciasPermitidasId) &&
            Objects.equals(licenciaCategoriaId, that.licenciaCategoriaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            activo,
            codigo,
            teoria,
            practica,
            licenciaNumero,
            empleadoId,
            horarioId,
            programacionId,
            licenciasPermitidasId,
            licenciaCategoriaId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfesorCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (teoria != null ? "teoria=" + teoria + ", " : "") +
            (practica != null ? "practica=" + practica + ", " : "") +
            (licenciaNumero != null ? "licenciaNumero=" + licenciaNumero + ", " : "") +
            (empleadoId != null ? "empleadoId=" + empleadoId + ", " : "") +
            (horarioId != null ? "horarioId=" + horarioId + ", " : "") +
            (programacionId != null ? "programacionId=" + programacionId + ", " : "") +
            (licenciasPermitidasId != null ? "licenciasPermitidasId=" + licenciasPermitidasId + ", " : "") +
            (licenciaCategoriaId != null ? "licenciaCategoriaId=" + licenciaCategoriaId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
