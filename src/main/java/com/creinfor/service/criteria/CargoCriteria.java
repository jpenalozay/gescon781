package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.Estado;
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
 * Criteria class for the {@link com.creinfor.domain.Cargo} entity. This class is used
 * in {@link com.creinfor.web.rest.CargoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /cargos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class CargoCriteria implements Serializable, Criteria {

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

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private EstadoFilter activo;

    private StringFilter codigo;

    private StringFilter nombre;

    private StringFilter nombreCorto;

    private LongFilter cargoId;

    private LongFilter empleadoId;

    private LongFilter areaPertenecienteId;

    private LongFilter cargoSuperiorId;

    private Boolean distinct;

    public CargoCriteria() {}

    public CargoCriteria(CargoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.nombreCorto = other.nombreCorto == null ? null : other.nombreCorto.copy();
        this.cargoId = other.cargoId == null ? null : other.cargoId.copy();
        this.empleadoId = other.empleadoId == null ? null : other.empleadoId.copy();
        this.areaPertenecienteId = other.areaPertenecienteId == null ? null : other.areaPertenecienteId.copy();
        this.cargoSuperiorId = other.cargoSuperiorId == null ? null : other.cargoSuperiorId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public CargoCriteria copy() {
        return new CargoCriteria(this);
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

    public StringFilter getNombreCorto() {
        return nombreCorto;
    }

    public StringFilter nombreCorto() {
        if (nombreCorto == null) {
            nombreCorto = new StringFilter();
        }
        return nombreCorto;
    }

    public void setNombreCorto(StringFilter nombreCorto) {
        this.nombreCorto = nombreCorto;
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

    public LongFilter getAreaPertenecienteId() {
        return areaPertenecienteId;
    }

    public LongFilter areaPertenecienteId() {
        if (areaPertenecienteId == null) {
            areaPertenecienteId = new LongFilter();
        }
        return areaPertenecienteId;
    }

    public void setAreaPertenecienteId(LongFilter areaPertenecienteId) {
        this.areaPertenecienteId = areaPertenecienteId;
    }

    public LongFilter getCargoSuperiorId() {
        return cargoSuperiorId;
    }

    public LongFilter cargoSuperiorId() {
        if (cargoSuperiorId == null) {
            cargoSuperiorId = new LongFilter();
        }
        return cargoSuperiorId;
    }

    public void setCargoSuperiorId(LongFilter cargoSuperiorId) {
        this.cargoSuperiorId = cargoSuperiorId;
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
        final CargoCriteria that = (CargoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(nombreCorto, that.nombreCorto) &&
            Objects.equals(cargoId, that.cargoId) &&
            Objects.equals(empleadoId, that.empleadoId) &&
            Objects.equals(areaPertenecienteId, that.areaPertenecienteId) &&
            Objects.equals(cargoSuperiorId, that.cargoSuperiorId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, activo, codigo, nombre, nombreCorto, cargoId, empleadoId, areaPertenecienteId, cargoSuperiorId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CargoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (nombreCorto != null ? "nombreCorto=" + nombreCorto + ", " : "") +
            (cargoId != null ? "cargoId=" + cargoId + ", " : "") +
            (empleadoId != null ? "empleadoId=" + empleadoId + ", " : "") +
            (areaPertenecienteId != null ? "areaPertenecienteId=" + areaPertenecienteId + ", " : "") +
            (cargoSuperiorId != null ? "cargoSuperiorId=" + cargoSuperiorId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
