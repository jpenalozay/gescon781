package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.EstadoCivilPersona;
import com.creinfor.domain.enumeration.Paises;
import com.creinfor.domain.enumeration.Sexo;
import com.creinfor.domain.enumeration.TipoDocumentoPersona;
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
 * Criteria class for the {@link com.creinfor.domain.Persona} entity. This class is used
 * in {@link com.creinfor.web.rest.PersonaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /personas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class PersonaCriteria implements Serializable, Criteria {

    /**
     * Class for filtering Paises
     */
    public static class PaisesFilter extends Filter<Paises> {

        public PaisesFilter() {}

        public PaisesFilter(PaisesFilter filter) {
            super(filter);
        }

        @Override
        public PaisesFilter copy() {
            return new PaisesFilter(this);
        }
    }

    /**
     * Class for filtering Sexo
     */
    public static class SexoFilter extends Filter<Sexo> {

        public SexoFilter() {}

        public SexoFilter(SexoFilter filter) {
            super(filter);
        }

        @Override
        public SexoFilter copy() {
            return new SexoFilter(this);
        }
    }

    /**
     * Class for filtering EstadoCivilPersona
     */
    public static class EstadoCivilPersonaFilter extends Filter<EstadoCivilPersona> {

        public EstadoCivilPersonaFilter() {}

        public EstadoCivilPersonaFilter(EstadoCivilPersonaFilter filter) {
            super(filter);
        }

        @Override
        public EstadoCivilPersonaFilter copy() {
            return new EstadoCivilPersonaFilter(this);
        }
    }

    /**
     * Class for filtering TipoDocumentoPersona
     */
    public static class TipoDocumentoPersonaFilter extends Filter<TipoDocumentoPersona> {

        public TipoDocumentoPersonaFilter() {}

        public TipoDocumentoPersonaFilter(TipoDocumentoPersonaFilter filter) {
            super(filter);
        }

        @Override
        public TipoDocumentoPersonaFilter copy() {
            return new TipoDocumentoPersonaFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private PaisesFilter nacionalidad;

    private StringFilter nombres;

    private StringFilter apellidoPaterno;

    private StringFilter apellidoMaterno;

    private LocalDateFilter fechaNacimiento;

    private SexoFilter genero;

    private EstadoCivilPersonaFilter estadoCivil;

    private TipoDocumentoPersonaFilter tipoDocumento;

    private StringFilter numeroDocumento;

    private StringFilter telefonoParticular;

    private StringFilter telefonoParticular1;

    private StringFilter emailPersonal;

    private StringFilter direccion;

    private LongFilter distritoId;

    private Boolean distinct;

    public PersonaCriteria() {}

    public PersonaCriteria(PersonaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nacionalidad = other.nacionalidad == null ? null : other.nacionalidad.copy();
        this.nombres = other.nombres == null ? null : other.nombres.copy();
        this.apellidoPaterno = other.apellidoPaterno == null ? null : other.apellidoPaterno.copy();
        this.apellidoMaterno = other.apellidoMaterno == null ? null : other.apellidoMaterno.copy();
        this.fechaNacimiento = other.fechaNacimiento == null ? null : other.fechaNacimiento.copy();
        this.genero = other.genero == null ? null : other.genero.copy();
        this.estadoCivil = other.estadoCivil == null ? null : other.estadoCivil.copy();
        this.tipoDocumento = other.tipoDocumento == null ? null : other.tipoDocumento.copy();
        this.numeroDocumento = other.numeroDocumento == null ? null : other.numeroDocumento.copy();
        this.telefonoParticular = other.telefonoParticular == null ? null : other.telefonoParticular.copy();
        this.telefonoParticular1 = other.telefonoParticular1 == null ? null : other.telefonoParticular1.copy();
        this.emailPersonal = other.emailPersonal == null ? null : other.emailPersonal.copy();
        this.direccion = other.direccion == null ? null : other.direccion.copy();
        this.distritoId = other.distritoId == null ? null : other.distritoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public PersonaCriteria copy() {
        return new PersonaCriteria(this);
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

    public PaisesFilter getNacionalidad() {
        return nacionalidad;
    }

    public PaisesFilter nacionalidad() {
        if (nacionalidad == null) {
            nacionalidad = new PaisesFilter();
        }
        return nacionalidad;
    }

    public void setNacionalidad(PaisesFilter nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public StringFilter getNombres() {
        return nombres;
    }

    public StringFilter nombres() {
        if (nombres == null) {
            nombres = new StringFilter();
        }
        return nombres;
    }

    public void setNombres(StringFilter nombres) {
        this.nombres = nombres;
    }

    public StringFilter getApellidoPaterno() {
        return apellidoPaterno;
    }

    public StringFilter apellidoPaterno() {
        if (apellidoPaterno == null) {
            apellidoPaterno = new StringFilter();
        }
        return apellidoPaterno;
    }

    public void setApellidoPaterno(StringFilter apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public StringFilter getApellidoMaterno() {
        return apellidoMaterno;
    }

    public StringFilter apellidoMaterno() {
        if (apellidoMaterno == null) {
            apellidoMaterno = new StringFilter();
        }
        return apellidoMaterno;
    }

    public void setApellidoMaterno(StringFilter apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public LocalDateFilter getFechaNacimiento() {
        return fechaNacimiento;
    }

    public LocalDateFilter fechaNacimiento() {
        if (fechaNacimiento == null) {
            fechaNacimiento = new LocalDateFilter();
        }
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDateFilter fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public SexoFilter getGenero() {
        return genero;
    }

    public SexoFilter genero() {
        if (genero == null) {
            genero = new SexoFilter();
        }
        return genero;
    }

    public void setGenero(SexoFilter genero) {
        this.genero = genero;
    }

    public EstadoCivilPersonaFilter getEstadoCivil() {
        return estadoCivil;
    }

    public EstadoCivilPersonaFilter estadoCivil() {
        if (estadoCivil == null) {
            estadoCivil = new EstadoCivilPersonaFilter();
        }
        return estadoCivil;
    }

    public void setEstadoCivil(EstadoCivilPersonaFilter estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public TipoDocumentoPersonaFilter getTipoDocumento() {
        return tipoDocumento;
    }

    public TipoDocumentoPersonaFilter tipoDocumento() {
        if (tipoDocumento == null) {
            tipoDocumento = new TipoDocumentoPersonaFilter();
        }
        return tipoDocumento;
    }

    public void setTipoDocumento(TipoDocumentoPersonaFilter tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public StringFilter getNumeroDocumento() {
        return numeroDocumento;
    }

    public StringFilter numeroDocumento() {
        if (numeroDocumento == null) {
            numeroDocumento = new StringFilter();
        }
        return numeroDocumento;
    }

    public void setNumeroDocumento(StringFilter numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public StringFilter getTelefonoParticular() {
        return telefonoParticular;
    }

    public StringFilter telefonoParticular() {
        if (telefonoParticular == null) {
            telefonoParticular = new StringFilter();
        }
        return telefonoParticular;
    }

    public void setTelefonoParticular(StringFilter telefonoParticular) {
        this.telefonoParticular = telefonoParticular;
    }

    public StringFilter getTelefonoParticular1() {
        return telefonoParticular1;
    }

    public StringFilter telefonoParticular1() {
        if (telefonoParticular1 == null) {
            telefonoParticular1 = new StringFilter();
        }
        return telefonoParticular1;
    }

    public void setTelefonoParticular1(StringFilter telefonoParticular1) {
        this.telefonoParticular1 = telefonoParticular1;
    }

    public StringFilter getEmailPersonal() {
        return emailPersonal;
    }

    public StringFilter emailPersonal() {
        if (emailPersonal == null) {
            emailPersonal = new StringFilter();
        }
        return emailPersonal;
    }

    public void setEmailPersonal(StringFilter emailPersonal) {
        this.emailPersonal = emailPersonal;
    }

    public StringFilter getDireccion() {
        return direccion;
    }

    public StringFilter direccion() {
        if (direccion == null) {
            direccion = new StringFilter();
        }
        return direccion;
    }

    public void setDireccion(StringFilter direccion) {
        this.direccion = direccion;
    }

    public LongFilter getDistritoId() {
        return distritoId;
    }

    public LongFilter distritoId() {
        if (distritoId == null) {
            distritoId = new LongFilter();
        }
        return distritoId;
    }

    public void setDistritoId(LongFilter distritoId) {
        this.distritoId = distritoId;
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
        final PersonaCriteria that = (PersonaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(nacionalidad, that.nacionalidad) &&
            Objects.equals(nombres, that.nombres) &&
            Objects.equals(apellidoPaterno, that.apellidoPaterno) &&
            Objects.equals(apellidoMaterno, that.apellidoMaterno) &&
            Objects.equals(fechaNacimiento, that.fechaNacimiento) &&
            Objects.equals(genero, that.genero) &&
            Objects.equals(estadoCivil, that.estadoCivil) &&
            Objects.equals(tipoDocumento, that.tipoDocumento) &&
            Objects.equals(numeroDocumento, that.numeroDocumento) &&
            Objects.equals(telefonoParticular, that.telefonoParticular) &&
            Objects.equals(telefonoParticular1, that.telefonoParticular1) &&
            Objects.equals(emailPersonal, that.emailPersonal) &&
            Objects.equals(direccion, that.direccion) &&
            Objects.equals(distritoId, that.distritoId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            nacionalidad,
            nombres,
            apellidoPaterno,
            apellidoMaterno,
            fechaNacimiento,
            genero,
            estadoCivil,
            tipoDocumento,
            numeroDocumento,
            telefonoParticular,
            telefonoParticular1,
            emailPersonal,
            direccion,
            distritoId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PersonaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (nacionalidad != null ? "nacionalidad=" + nacionalidad + ", " : "") +
            (nombres != null ? "nombres=" + nombres + ", " : "") +
            (apellidoPaterno != null ? "apellidoPaterno=" + apellidoPaterno + ", " : "") +
            (apellidoMaterno != null ? "apellidoMaterno=" + apellidoMaterno + ", " : "") +
            (fechaNacimiento != null ? "fechaNacimiento=" + fechaNacimiento + ", " : "") +
            (genero != null ? "genero=" + genero + ", " : "") +
            (estadoCivil != null ? "estadoCivil=" + estadoCivil + ", " : "") +
            (tipoDocumento != null ? "tipoDocumento=" + tipoDocumento + ", " : "") +
            (numeroDocumento != null ? "numeroDocumento=" + numeroDocumento + ", " : "") +
            (telefonoParticular != null ? "telefonoParticular=" + telefonoParticular + ", " : "") +
            (telefonoParticular1 != null ? "telefonoParticular1=" + telefonoParticular1 + ", " : "") +
            (emailPersonal != null ? "emailPersonal=" + emailPersonal + ", " : "") +
            (direccion != null ? "direccion=" + direccion + ", " : "") +
            (distritoId != null ? "distritoId=" + distritoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
