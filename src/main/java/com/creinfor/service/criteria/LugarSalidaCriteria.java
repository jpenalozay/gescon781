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
 * Criteria class for the {@link com.creinfor.domain.LugarSalida} entity. This class is used
 * in {@link com.creinfor.web.rest.LugarSalidaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /lugar-salidas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class LugarSalidaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nombre;

    private LongFilter horarioId;

    private Boolean distinct;

    public LugarSalidaCriteria() {}

    public LugarSalidaCriteria(LugarSalidaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.horarioId = other.horarioId == null ? null : other.horarioId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public LugarSalidaCriteria copy() {
        return new LugarSalidaCriteria(this);
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

    public StringFilter getNombre() {
        return nombre;
    }

    public StringFilter nombre() {
        if (nombre == null) {
            nombre = new StringFilter();
        }
        return nombre;
    }

    public void setNombre(StringFilter nombre) {
        this.nombre = nombre;
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
        final LugarSalidaCriteria that = (LugarSalidaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(horarioId, that.horarioId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, horarioId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LugarSalidaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (horarioId != null ? "horarioId=" + horarioId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
