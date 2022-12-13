package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.ComputadoraTipo;
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
 * Criteria class for the {@link com.creinfor.domain.Computadora} entity. This class is used
 * in {@link com.creinfor.web.rest.ComputadoraResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /computadoras?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class ComputadoraCriteria implements Serializable, Criteria {

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
     * Class for filtering ComputadoraTipo
     */
    public static class ComputadoraTipoFilter extends Filter<ComputadoraTipo> {

        public ComputadoraTipoFilter() {}

        public ComputadoraTipoFilter(ComputadoraTipoFilter filter) {
            super(filter);
        }

        @Override
        public ComputadoraTipoFilter copy() {
            return new ComputadoraTipoFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nombre;

    private StringFilter nombreCorto;

    private StringFilter descripcion;

    private EstadoFilter estadoComputadora;

    private StringFilter mac;

    private ComputadoraTipoFilter tipo;

    private LongFilter usuarioId;

    private Boolean distinct;

    public ComputadoraCriteria() {}

    public ComputadoraCriteria(ComputadoraCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.nombreCorto = other.nombreCorto == null ? null : other.nombreCorto.copy();
        this.descripcion = other.descripcion == null ? null : other.descripcion.copy();
        this.estadoComputadora = other.estadoComputadora == null ? null : other.estadoComputadora.copy();
        this.mac = other.mac == null ? null : other.mac.copy();
        this.tipo = other.tipo == null ? null : other.tipo.copy();
        this.usuarioId = other.usuarioId == null ? null : other.usuarioId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public ComputadoraCriteria copy() {
        return new ComputadoraCriteria(this);
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

    public StringFilter getDescripcion() {
        return descripcion;
    }

    public StringFilter descripcion() {
        if (descripcion == null) {
            descripcion = new StringFilter();
        }
        return descripcion;
    }

    public void setDescripcion(StringFilter descripcion) {
        this.descripcion = descripcion;
    }

    public EstadoFilter getEstadoComputadora() {
        return estadoComputadora;
    }

    public EstadoFilter estadoComputadora() {
        if (estadoComputadora == null) {
            estadoComputadora = new EstadoFilter();
        }
        return estadoComputadora;
    }

    public void setEstadoComputadora(EstadoFilter estadoComputadora) {
        this.estadoComputadora = estadoComputadora;
    }

    public StringFilter getMac() {
        return mac;
    }

    public StringFilter mac() {
        if (mac == null) {
            mac = new StringFilter();
        }
        return mac;
    }

    public void setMac(StringFilter mac) {
        this.mac = mac;
    }

    public ComputadoraTipoFilter getTipo() {
        return tipo;
    }

    public ComputadoraTipoFilter tipo() {
        if (tipo == null) {
            tipo = new ComputadoraTipoFilter();
        }
        return tipo;
    }

    public void setTipo(ComputadoraTipoFilter tipo) {
        this.tipo = tipo;
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
        final ComputadoraCriteria that = (ComputadoraCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(nombreCorto, that.nombreCorto) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(estadoComputadora, that.estadoComputadora) &&
            Objects.equals(mac, that.mac) &&
            Objects.equals(tipo, that.tipo) &&
            Objects.equals(usuarioId, that.usuarioId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, nombreCorto, descripcion, estadoComputadora, mac, tipo, usuarioId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ComputadoraCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (nombreCorto != null ? "nombreCorto=" + nombreCorto + ", " : "") +
            (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
            (estadoComputadora != null ? "estadoComputadora=" + estadoComputadora + ", " : "") +
            (mac != null ? "mac=" + mac + ", " : "") +
            (tipo != null ? "tipo=" + tipo + ", " : "") +
            (usuarioId != null ? "usuarioId=" + usuarioId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
