package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.Estado;
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
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.Sucursal} entity. This class is used
 * in {@link com.creinfor.web.rest.SucursalResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /sucursals?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class SucursalCriteria implements Serializable, Criteria {

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

    private SiNoFilter central;

    private StringFilter nombre;

    private StringFilter nombreCorto;

    private StringFilter nombreAbreviado;

    private LocalDateFilter fechaInicio;

    private StringFilter telefono;

    private StringFilter telefono1;

    private StringFilter direccion;

    private LongFilter areaId;

    private LongFilter sucursalSerieId;

    private LongFilter distritoId;

    private LongFilter usuarioId;

    private Boolean distinct;

    public SucursalCriteria() {}

    public SucursalCriteria(SucursalCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.central = other.central == null ? null : other.central.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.nombreCorto = other.nombreCorto == null ? null : other.nombreCorto.copy();
        this.nombreAbreviado = other.nombreAbreviado == null ? null : other.nombreAbreviado.copy();
        this.fechaInicio = other.fechaInicio == null ? null : other.fechaInicio.copy();
        this.telefono = other.telefono == null ? null : other.telefono.copy();
        this.telefono1 = other.telefono1 == null ? null : other.telefono1.copy();
        this.direccion = other.direccion == null ? null : other.direccion.copy();
        this.areaId = other.areaId == null ? null : other.areaId.copy();
        this.sucursalSerieId = other.sucursalSerieId == null ? null : other.sucursalSerieId.copy();
        this.distritoId = other.distritoId == null ? null : other.distritoId.copy();
        this.usuarioId = other.usuarioId == null ? null : other.usuarioId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public SucursalCriteria copy() {
        return new SucursalCriteria(this);
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

    public SiNoFilter getCentral() {
        return central;
    }

    public SiNoFilter central() {
        if (central == null) {
            central = new SiNoFilter();
        }
        return central;
    }

    public void setCentral(SiNoFilter central) {
        this.central = central;
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

    public StringFilter getNombreAbreviado() {
        return nombreAbreviado;
    }

    public StringFilter nombreAbreviado() {
        if (nombreAbreviado == null) {
            nombreAbreviado = new StringFilter();
        }
        return nombreAbreviado;
    }

    public void setNombreAbreviado(StringFilter nombreAbreviado) {
        this.nombreAbreviado = nombreAbreviado;
    }

    public LocalDateFilter getFechaInicio() {
        return fechaInicio;
    }

    public LocalDateFilter fechaInicio() {
        if (fechaInicio == null) {
            fechaInicio = new LocalDateFilter();
        }
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateFilter fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public StringFilter getTelefono() {
        return telefono;
    }

    public StringFilter telefono() {
        if (telefono == null) {
            telefono = new StringFilter();
        }
        return telefono;
    }

    public void setTelefono(StringFilter telefono) {
        this.telefono = telefono;
    }

    public StringFilter getTelefono1() {
        return telefono1;
    }

    public StringFilter telefono1() {
        if (telefono1 == null) {
            telefono1 = new StringFilter();
        }
        return telefono1;
    }

    public void setTelefono1(StringFilter telefono1) {
        this.telefono1 = telefono1;
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

    public LongFilter getSucursalSerieId() {
        return sucursalSerieId;
    }

    public LongFilter sucursalSerieId() {
        if (sucursalSerieId == null) {
            sucursalSerieId = new LongFilter();
        }
        return sucursalSerieId;
    }

    public void setSucursalSerieId(LongFilter sucursalSerieId) {
        this.sucursalSerieId = sucursalSerieId;
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

    public LongFilter getUsuarioId() {
        return usuarioId;
    }

    public LongFilter usuarioId() {
        if (usuarioId == null) {
            usuarioId = new LongFilter();
        }
        return usuarioId;
    }

    public void setUsuarioId(LongFilter usuarioId) {
        this.usuarioId = usuarioId;
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
        final SucursalCriteria that = (SucursalCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(central, that.central) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(nombreCorto, that.nombreCorto) &&
            Objects.equals(nombreAbreviado, that.nombreAbreviado) &&
            Objects.equals(fechaInicio, that.fechaInicio) &&
            Objects.equals(telefono, that.telefono) &&
            Objects.equals(telefono1, that.telefono1) &&
            Objects.equals(direccion, that.direccion) &&
            Objects.equals(areaId, that.areaId) &&
            Objects.equals(sucursalSerieId, that.sucursalSerieId) &&
            Objects.equals(distritoId, that.distritoId) &&
            Objects.equals(usuarioId, that.usuarioId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            activo,
            codigo,
            central,
            nombre,
            nombreCorto,
            nombreAbreviado,
            fechaInicio,
            telefono,
            telefono1,
            direccion,
            areaId,
            sucursalSerieId,
            distritoId,
            usuarioId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SucursalCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (central != null ? "central=" + central + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (nombreCorto != null ? "nombreCorto=" + nombreCorto + ", " : "") +
            (nombreAbreviado != null ? "nombreAbreviado=" + nombreAbreviado + ", " : "") +
            (fechaInicio != null ? "fechaInicio=" + fechaInicio + ", " : "") +
            (telefono != null ? "telefono=" + telefono + ", " : "") +
            (telefono1 != null ? "telefono1=" + telefono1 + ", " : "") +
            (direccion != null ? "direccion=" + direccion + ", " : "") +
            (areaId != null ? "areaId=" + areaId + ", " : "") +
            (sucursalSerieId != null ? "sucursalSerieId=" + sucursalSerieId + ", " : "") +
            (distritoId != null ? "distritoId=" + distritoId + ", " : "") +
            (usuarioId != null ? "usuarioId=" + usuarioId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
