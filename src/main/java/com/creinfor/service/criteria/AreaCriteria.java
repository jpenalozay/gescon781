package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.TipoUnidadOrganizativa;
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
 * Criteria class for the {@link com.creinfor.domain.Area} entity. This class is used
 * in {@link com.creinfor.web.rest.AreaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /areas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class AreaCriteria implements Serializable, Criteria {

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
     * Class for filtering TipoUnidadOrganizativa
     */
    public static class TipoUnidadOrganizativaFilter extends Filter<TipoUnidadOrganizativa> {

        public TipoUnidadOrganizativaFilter() {}

        public TipoUnidadOrganizativaFilter(TipoUnidadOrganizativaFilter filter) {
            super(filter);
        }

        @Override
        public TipoUnidadOrganizativaFilter copy() {
            return new TipoUnidadOrganizativaFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private EstadoFilter activo;

    private StringFilter codigo;

    private TipoUnidadOrganizativaFilter tipo;

    private StringFilter nombre;

    private StringFilter nombreCorto;

    private LongFilter areaId;

    private LongFilter cargoId;

    private LongFilter sucursalId;

    private LongFilter areaSuperiorId;

    private Boolean distinct;

    public AreaCriteria() {}

    public AreaCriteria(AreaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.tipo = other.tipo == null ? null : other.tipo.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.nombreCorto = other.nombreCorto == null ? null : other.nombreCorto.copy();
        this.areaId = other.areaId == null ? null : other.areaId.copy();
        this.cargoId = other.cargoId == null ? null : other.cargoId.copy();
        this.sucursalId = other.sucursalId == null ? null : other.sucursalId.copy();
        this.areaSuperiorId = other.areaSuperiorId == null ? null : other.areaSuperiorId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public AreaCriteria copy() {
        return new AreaCriteria(this);
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

    public TipoUnidadOrganizativaFilter getTipo() {
        return tipo;
    }

    public TipoUnidadOrganizativaFilter tipo() {
        if (tipo == null) {
            tipo = new TipoUnidadOrganizativaFilter();
        }
        return tipo;
    }

    public void setTipo(TipoUnidadOrganizativaFilter tipo) {
        this.tipo = tipo;
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

    public LongFilter getAreaId() {
        return areaId;
    }

    public LongFilter areaId() {
        if (areaId == null) {
            areaId = new LongFilter();
        }
        return areaId;
    }

    public void setAreaId(LongFilter areaId) {
        this.areaId = areaId;
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

    public LongFilter getAreaSuperiorId() {
        return areaSuperiorId;
    }

    public LongFilter areaSuperiorId() {
        if (areaSuperiorId == null) {
            areaSuperiorId = new LongFilter();
        }
        return areaSuperiorId;
    }

    public void setAreaSuperiorId(LongFilter areaSuperiorId) {
        this.areaSuperiorId = areaSuperiorId;
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
        final AreaCriteria that = (AreaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(tipo, that.tipo) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(nombreCorto, that.nombreCorto) &&
            Objects.equals(areaId, that.areaId) &&
            Objects.equals(cargoId, that.cargoId) &&
            Objects.equals(sucursalId, that.sucursalId) &&
            Objects.equals(areaSuperiorId, that.areaSuperiorId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, activo, codigo, tipo, nombre, nombreCorto, areaId, cargoId, sucursalId, areaSuperiorId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AreaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (tipo != null ? "tipo=" + tipo + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (nombreCorto != null ? "nombreCorto=" + nombreCorto + ", " : "") +
            (areaId != null ? "areaId=" + areaId + ", " : "") +
            (cargoId != null ? "cargoId=" + cargoId + ", " : "") +
            (sucursalId != null ? "sucursalId=" + sucursalId + ", " : "") +
            (areaSuperiorId != null ? "areaSuperiorId=" + areaSuperiorId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
