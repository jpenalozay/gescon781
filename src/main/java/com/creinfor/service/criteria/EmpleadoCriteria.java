package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.EmpleadoTipo;
import com.creinfor.domain.enumeration.EstadoEmpleado;
import com.creinfor.domain.enumeration.GradoInstruccion;
import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.Empleado} entity. This class is used
 * in {@link com.creinfor.web.rest.EmpleadoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /empleados?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class EmpleadoCriteria implements Serializable, Criteria {

    /**
     * Class for filtering EstadoEmpleado
     */
    public static class EstadoEmpleadoFilter extends Filter<EstadoEmpleado> {

        public EstadoEmpleadoFilter() {}

        public EstadoEmpleadoFilter(EstadoEmpleadoFilter filter) {
            super(filter);
        }

        @Override
        public EstadoEmpleadoFilter copy() {
            return new EstadoEmpleadoFilter(this);
        }
    }

    /**
     * Class for filtering EmpleadoTipo
     */
    public static class EmpleadoTipoFilter extends Filter<EmpleadoTipo> {

        public EmpleadoTipoFilter() {}

        public EmpleadoTipoFilter(EmpleadoTipoFilter filter) {
            super(filter);
        }

        @Override
        public EmpleadoTipoFilter copy() {
            return new EmpleadoTipoFilter(this);
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

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private EstadoEmpleadoFilter estado;

    private EmpleadoTipoFilter tipo;

    private StringFilter codigo;

    private StringFilter codigoAcceso;

    private StringFilter telefonoTrabajo;

    private StringFilter telefonoTrabajo1;

    private GradoInstruccionFilter gradoInstrucion;

    private StringFilter emailCoorporativo;

    private LocalDateFilter fechaIngreso;

    private FloatFilter inasistencias;

    private FloatFilter tardanzas;

    private FloatFilter sueldo;

    private LongFilter personaId;

    private LongFilter cargoId;

    private Boolean distinct;

    public EmpleadoCriteria() {}

    public EmpleadoCriteria(EmpleadoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.estado = other.estado == null ? null : other.estado.copy();
        this.tipo = other.tipo == null ? null : other.tipo.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.codigoAcceso = other.codigoAcceso == null ? null : other.codigoAcceso.copy();
        this.telefonoTrabajo = other.telefonoTrabajo == null ? null : other.telefonoTrabajo.copy();
        this.telefonoTrabajo1 = other.telefonoTrabajo1 == null ? null : other.telefonoTrabajo1.copy();
        this.gradoInstrucion = other.gradoInstrucion == null ? null : other.gradoInstrucion.copy();
        this.emailCoorporativo = other.emailCoorporativo == null ? null : other.emailCoorporativo.copy();
        this.fechaIngreso = other.fechaIngreso == null ? null : other.fechaIngreso.copy();
        this.inasistencias = other.inasistencias == null ? null : other.inasistencias.copy();
        this.tardanzas = other.tardanzas == null ? null : other.tardanzas.copy();
        this.sueldo = other.sueldo == null ? null : other.sueldo.copy();
        this.personaId = other.personaId == null ? null : other.personaId.copy();
        this.cargoId = other.cargoId == null ? null : other.cargoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public EmpleadoCriteria copy() {
        return new EmpleadoCriteria(this);
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

    public EstadoEmpleadoFilter getEstado() {
        return estado;
    }

    public EstadoEmpleadoFilter estado() {
        if (estado == null) {
            estado = new EstadoEmpleadoFilter();
        }
        return estado;
    }

    public void setEstado(EstadoEmpleadoFilter estado) {
        this.estado = estado;
    }

    public EmpleadoTipoFilter getTipo() {
        return tipo;
    }

    public EmpleadoTipoFilter tipo() {
        if (tipo == null) {
            tipo = new EmpleadoTipoFilter();
        }
        return tipo;
    }

    public void setTipo(EmpleadoTipoFilter tipo) {
        this.tipo = tipo;
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

    public StringFilter getCodigoAcceso() {
        return codigoAcceso;
    }

    public StringFilter codigoAcceso() {
        if (codigoAcceso == null) {
            codigoAcceso = new StringFilter();
        }
        return codigoAcceso;
    }

    public void setCodigoAcceso(StringFilter codigoAcceso) {
        this.codigoAcceso = codigoAcceso;
    }

    public StringFilter getTelefonoTrabajo() {
        return telefonoTrabajo;
    }

    public StringFilter telefonoTrabajo() {
        if (telefonoTrabajo == null) {
            telefonoTrabajo = new StringFilter();
        }
        return telefonoTrabajo;
    }

    public void setTelefonoTrabajo(StringFilter telefonoTrabajo) {
        this.telefonoTrabajo = telefonoTrabajo;
    }

    public StringFilter getTelefonoTrabajo1() {
        return telefonoTrabajo1;
    }

    public StringFilter telefonoTrabajo1() {
        if (telefonoTrabajo1 == null) {
            telefonoTrabajo1 = new StringFilter();
        }
        return telefonoTrabajo1;
    }

    public void setTelefonoTrabajo1(StringFilter telefonoTrabajo1) {
        this.telefonoTrabajo1 = telefonoTrabajo1;
    }

    public GradoInstruccionFilter getGradoInstrucion() {
        return gradoInstrucion;
    }

    public GradoInstruccionFilter gradoInstrucion() {
        if (gradoInstrucion == null) {
            gradoInstrucion = new GradoInstruccionFilter();
        }
        return gradoInstrucion;
    }

    public void setGradoInstrucion(GradoInstruccionFilter gradoInstrucion) {
        this.gradoInstrucion = gradoInstrucion;
    }

    public StringFilter getEmailCoorporativo() {
        return emailCoorporativo;
    }

    public StringFilter emailCoorporativo() {
        if (emailCoorporativo == null) {
            emailCoorporativo = new StringFilter();
        }
        return emailCoorporativo;
    }

    public void setEmailCoorporativo(StringFilter emailCoorporativo) {
        this.emailCoorporativo = emailCoorporativo;
    }

    public LocalDateFilter getFechaIngreso() {
        return fechaIngreso;
    }

    public LocalDateFilter fechaIngreso() {
        if (fechaIngreso == null) {
            fechaIngreso = new LocalDateFilter();
        }
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDateFilter fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public FloatFilter getInasistencias() {
        return inasistencias;
    }

    public FloatFilter inasistencias() {
        if (inasistencias == null) {
            inasistencias = new FloatFilter();
        }
        return inasistencias;
    }

    public void setInasistencias(FloatFilter inasistencias) {
        this.inasistencias = inasistencias;
    }

    public FloatFilter getTardanzas() {
        return tardanzas;
    }

    public FloatFilter tardanzas() {
        if (tardanzas == null) {
            tardanzas = new FloatFilter();
        }
        return tardanzas;
    }

    public void setTardanzas(FloatFilter tardanzas) {
        this.tardanzas = tardanzas;
    }

    public FloatFilter getSueldo() {
        return sueldo;
    }

    public FloatFilter sueldo() {
        if (sueldo == null) {
            sueldo = new FloatFilter();
        }
        return sueldo;
    }

    public void setSueldo(FloatFilter sueldo) {
        this.sueldo = sueldo;
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

    public LongFilter getCargoId() {
        return cargoId;
    }

    public LongFilter cargoId() {
        if (cargoId == null) {
            cargoId = new LongFilter();
        }
        return cargoId;
    }

    public void setCargoId(LongFilter cargoId) {
        this.cargoId = cargoId;
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
        final EmpleadoCriteria that = (EmpleadoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(estado, that.estado) &&
            Objects.equals(tipo, that.tipo) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(codigoAcceso, that.codigoAcceso) &&
            Objects.equals(telefonoTrabajo, that.telefonoTrabajo) &&
            Objects.equals(telefonoTrabajo1, that.telefonoTrabajo1) &&
            Objects.equals(gradoInstrucion, that.gradoInstrucion) &&
            Objects.equals(emailCoorporativo, that.emailCoorporativo) &&
            Objects.equals(fechaIngreso, that.fechaIngreso) &&
            Objects.equals(inasistencias, that.inasistencias) &&
            Objects.equals(tardanzas, that.tardanzas) &&
            Objects.equals(sueldo, that.sueldo) &&
            Objects.equals(personaId, that.personaId) &&
            Objects.equals(cargoId, that.cargoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            estado,
            tipo,
            codigo,
            codigoAcceso,
            telefonoTrabajo,
            telefonoTrabajo1,
            gradoInstrucion,
            emailCoorporativo,
            fechaIngreso,
            inasistencias,
            tardanzas,
            sueldo,
            personaId,
            cargoId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmpleadoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (estado != null ? "estado=" + estado + ", " : "") +
            (tipo != null ? "tipo=" + tipo + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (codigoAcceso != null ? "codigoAcceso=" + codigoAcceso + ", " : "") +
            (telefonoTrabajo != null ? "telefonoTrabajo=" + telefonoTrabajo + ", " : "") +
            (telefonoTrabajo1 != null ? "telefonoTrabajo1=" + telefonoTrabajo1 + ", " : "") +
            (gradoInstrucion != null ? "gradoInstrucion=" + gradoInstrucion + ", " : "") +
            (emailCoorporativo != null ? "emailCoorporativo=" + emailCoorporativo + ", " : "") +
            (fechaIngreso != null ? "fechaIngreso=" + fechaIngreso + ", " : "") +
            (inasistencias != null ? "inasistencias=" + inasistencias + ", " : "") +
            (tardanzas != null ? "tardanzas=" + tardanzas + ", " : "") +
            (sueldo != null ? "sueldo=" + sueldo + ", " : "") +
            (personaId != null ? "personaId=" + personaId + ", " : "") +
            (cargoId != null ? "cargoId=" + cargoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
