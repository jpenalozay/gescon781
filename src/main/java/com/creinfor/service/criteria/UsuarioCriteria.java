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
 * Criteria class for the {@link com.creinfor.domain.Usuario} entity. This class is used
 * in {@link com.creinfor.web.rest.UsuarioResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /usuarios?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class UsuarioCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter codigo;

    private StringFilter codigoSecreto;

    private LongFilter userId;

    private LongFilter empleadoId;

    private LongFilter programacionDeshabilitacionId;

    private LongFilter sucursalId;

    private LongFilter computadoraId;

    private Boolean distinct;

    public UsuarioCriteria() {}

    public UsuarioCriteria(UsuarioCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.codigoSecreto = other.codigoSecreto == null ? null : other.codigoSecreto.copy();
        this.userId = other.userId == null ? null : other.userId.copy();
        this.empleadoId = other.empleadoId == null ? null : other.empleadoId.copy();
        this.programacionDeshabilitacionId =
            other.programacionDeshabilitacionId == null ? null : other.programacionDeshabilitacionId.copy();
        this.sucursalId = other.sucursalId == null ? null : other.sucursalId.copy();
        this.computadoraId = other.computadoraId == null ? null : other.computadoraId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public UsuarioCriteria copy() {
        return new UsuarioCriteria(this);
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

    public StringFilter getCodigoSecreto() {
        return codigoSecreto;
    }

    public StringFilter codigoSecreto() {
        if (codigoSecreto == null) {
            codigoSecreto = new StringFilter();
        }
        return codigoSecreto;
    }

    public void setCodigoSecreto(StringFilter codigoSecreto) {
        this.codigoSecreto = codigoSecreto;
    }

    public LongFilter getUserId() {
        return userId;
    }

    public LongFilter userId() {
        if (userId == null) {
            userId = new LongFilter();
        }
        return userId;
    }

    public void setUserId(LongFilter userId) {
        this.userId = userId;
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

    public LongFilter getProgramacionDeshabilitacionId() {
        return programacionDeshabilitacionId;
    }

    public LongFilter programacionDeshabilitacionId() {
        if (programacionDeshabilitacionId == null) {
            programacionDeshabilitacionId = new LongFilter();
        }
        return programacionDeshabilitacionId;
    }

    public void setProgramacionDeshabilitacionId(LongFilter programacionDeshabilitacionId) {
        this.programacionDeshabilitacionId = programacionDeshabilitacionId;
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

    public LongFilter getComputadoraId() {
        return computadoraId;
    }

    public LongFilter computadoraId() {
        if (computadoraId == null) {
            computadoraId = new LongFilter();
        }
        return computadoraId;
    }

    public void setComputadoraId(LongFilter computadoraId) {
        this.computadoraId = computadoraId;
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
        final UsuarioCriteria that = (UsuarioCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(codigoSecreto, that.codigoSecreto) &&
            Objects.equals(userId, that.userId) &&
            Objects.equals(empleadoId, that.empleadoId) &&
            Objects.equals(programacionDeshabilitacionId, that.programacionDeshabilitacionId) &&
            Objects.equals(sucursalId, that.sucursalId) &&
            Objects.equals(computadoraId, that.computadoraId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            codigo,
            codigoSecreto,
            userId,
            empleadoId,
            programacionDeshabilitacionId,
            sucursalId,
            computadoraId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UsuarioCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (codigoSecreto != null ? "codigoSecreto=" + codigoSecreto + ", " : "") +
            (userId != null ? "userId=" + userId + ", " : "") +
            (empleadoId != null ? "empleadoId=" + empleadoId + ", " : "") +
            (programacionDeshabilitacionId != null ? "programacionDeshabilitacionId=" + programacionDeshabilitacionId + ", " : "") +
            (sucursalId != null ? "sucursalId=" + sucursalId + ", " : "") +
            (computadoraId != null ? "computadoraId=" + computadoraId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
