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
 * Criteria class for the {@link com.creinfor.domain.Distrit} entity. This class is used
 * in {@link com.creinfor.web.rest.DistritResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /distrits?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class DistritCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter departamento;

    private StringFilter provincia;

    private StringFilter distrito;

    private StringFilter ubigeo;

    private LongFilter sucursalId;

    private LongFilter personaId;

    private Boolean distinct;

    public DistritCriteria() {}

    public DistritCriteria(DistritCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.departamento = other.departamento == null ? null : other.departamento.copy();
        this.provincia = other.provincia == null ? null : other.provincia.copy();
        this.distrito = other.distrito == null ? null : other.distrito.copy();
        this.ubigeo = other.ubigeo == null ? null : other.ubigeo.copy();
        this.sucursalId = other.sucursalId == null ? null : other.sucursalId.copy();
        this.personaId = other.personaId == null ? null : other.personaId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public DistritCriteria copy() {
        return new DistritCriteria(this);
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

    public StringFilter getDepartamento() {
        return departamento;
    }

    public StringFilter departamento() {
        if (departamento == null) {
            departamento = new StringFilter();
        }
        return departamento;
    }

    public void setDepartamento(StringFilter departamento) {
        this.departamento = departamento;
    }

    public StringFilter getProvincia() {
        return provincia;
    }

    public StringFilter provincia() {
        if (provincia == null) {
            provincia = new StringFilter();
        }
        return provincia;
    }

    public void setProvincia(StringFilter provincia) {
        this.provincia = provincia;
    }

    public StringFilter getDistrito() {
        return distrito;
    }

    public StringFilter distrito() {
        if (distrito == null) {
            distrito = new StringFilter();
        }
        return distrito;
    }

    public void setDistrito(StringFilter distrito) {
        this.distrito = distrito;
    }

    public StringFilter getUbigeo() {
        return ubigeo;
    }

    public StringFilter ubigeo() {
        if (ubigeo == null) {
            ubigeo = new StringFilter();
        }
        return ubigeo;
    }

    public void setUbigeo(StringFilter ubigeo) {
        this.ubigeo = ubigeo;
    }

    public LongFilter getSucursalId() {
        return sucursalId;
    }

    public LongFilter sucursalId() {
        if (sucursalId == null) {
            sucursalId = new LongFilter();
        }
        return sucursalId;
    }

    public void setSucursalId(LongFilter sucursalId) {
        this.sucursalId = sucursalId;
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
        final DistritCriteria that = (DistritCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(departamento, that.departamento) &&
            Objects.equals(provincia, that.provincia) &&
            Objects.equals(distrito, that.distrito) &&
            Objects.equals(ubigeo, that.ubigeo) &&
            Objects.equals(sucursalId, that.sucursalId) &&
            Objects.equals(personaId, that.personaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, departamento, provincia, distrito, ubigeo, sucursalId, personaId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DistritCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (departamento != null ? "departamento=" + departamento + ", " : "") +
            (provincia != null ? "provincia=" + provincia + ", " : "") +
            (distrito != null ? "distrito=" + distrito + ", " : "") +
            (ubigeo != null ? "ubigeo=" + ubigeo + ", " : "") +
            (sucursalId != null ? "sucursalId=" + sucursalId + ", " : "") +
            (personaId != null ? "personaId=" + personaId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
