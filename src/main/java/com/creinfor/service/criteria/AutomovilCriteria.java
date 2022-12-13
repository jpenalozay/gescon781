package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.AutomovilCaja;
import com.creinfor.domain.enumeration.AutomovilTipo;
import com.creinfor.domain.enumeration.Estado;
import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.InstantFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.Automovil} entity. This class is used
 * in {@link com.creinfor.web.rest.AutomovilResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /automovils?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class AutomovilCriteria implements Serializable, Criteria {

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
     * Class for filtering AutomovilTipo
     */
    public static class AutomovilTipoFilter extends Filter<AutomovilTipo> {

        public AutomovilTipoFilter() {}

        public AutomovilTipoFilter(AutomovilTipoFilter filter) {
            super(filter);
        }

        @Override
        public AutomovilTipoFilter copy() {
            return new AutomovilTipoFilter(this);
        }
    }

    /**
     * Class for filtering AutomovilCaja
     */
    public static class AutomovilCajaFilter extends Filter<AutomovilCaja> {

        public AutomovilCajaFilter() {}

        public AutomovilCajaFilter(AutomovilCajaFilter filter) {
            super(filter);
        }

        @Override
        public AutomovilCajaFilter copy() {
            return new AutomovilCajaFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private EstadoFilter activo;

    private StringFilter codigo;

    private StringFilter nombre;

    private AutomovilTipoFilter tipo;

    private StringFilter placa;

    private StringFilter marca;

    private StringFilter modelo;

    private StringFilter anio;

    private InstantFilter soatVencimiento;

    private InstantFilter revisionTecnicaVencimiento;

    private AutomovilCajaFilter caja;

    private LongFilter programacionId;

    private LongFilter horarioId;

    private Boolean distinct;

    public AutomovilCriteria() {}

    public AutomovilCriteria(AutomovilCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.codigo = other.codigo == null ? null : other.codigo.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.tipo = other.tipo == null ? null : other.tipo.copy();
        this.placa = other.placa == null ? null : other.placa.copy();
        this.marca = other.marca == null ? null : other.marca.copy();
        this.modelo = other.modelo == null ? null : other.modelo.copy();
        this.anio = other.anio == null ? null : other.anio.copy();
        this.soatVencimiento = other.soatVencimiento == null ? null : other.soatVencimiento.copy();
        this.revisionTecnicaVencimiento = other.revisionTecnicaVencimiento == null ? null : other.revisionTecnicaVencimiento.copy();
        this.caja = other.caja == null ? null : other.caja.copy();
        this.programacionId = other.programacionId == null ? null : other.programacionId.copy();
        this.horarioId = other.horarioId == null ? null : other.horarioId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public AutomovilCriteria copy() {
        return new AutomovilCriteria(this);
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

    public AutomovilTipoFilter getTipo() {
        return tipo;
    }

    public AutomovilTipoFilter tipo() {
        if (tipo == null) {
            tipo = new AutomovilTipoFilter();
        }
        return tipo;
    }

    public void setTipo(AutomovilTipoFilter tipo) {
        this.tipo = tipo;
    }

    public StringFilter getPlaca() {
        return placa;
    }

    public StringFilter placa() {
        if (placa == null) {
            placa = new StringFilter();
        }
        return placa;
    }

    public void setPlaca(StringFilter placa) {
        this.placa = placa;
    }

    public StringFilter getMarca() {
        return marca;
    }

    public StringFilter marca() {
        if (marca == null) {
            marca = new StringFilter();
        }
        return marca;
    }

    public void setMarca(StringFilter marca) {
        this.marca = marca;
    }

    public StringFilter getModelo() {
        return modelo;
    }

    public StringFilter modelo() {
        if (modelo == null) {
            modelo = new StringFilter();
        }
        return modelo;
    }

    public void setModelo(StringFilter modelo) {
        this.modelo = modelo;
    }

    public StringFilter getAnio() {
        return anio;
    }

    public StringFilter anio() {
        if (anio == null) {
            anio = new StringFilter();
        }
        return anio;
    }

    public void setAnio(StringFilter anio) {
        this.anio = anio;
    }

    public InstantFilter getSoatVencimiento() {
        return soatVencimiento;
    }

    public InstantFilter soatVencimiento() {
        if (soatVencimiento == null) {
            soatVencimiento = new InstantFilter();
        }
        return soatVencimiento;
    }

    public void setSoatVencimiento(InstantFilter soatVencimiento) {
        this.soatVencimiento = soatVencimiento;
    }

    public InstantFilter getRevisionTecnicaVencimiento() {
        return revisionTecnicaVencimiento;
    }

    public InstantFilter revisionTecnicaVencimiento() {
        if (revisionTecnicaVencimiento == null) {
            revisionTecnicaVencimiento = new InstantFilter();
        }
        return revisionTecnicaVencimiento;
    }

    public void setRevisionTecnicaVencimiento(InstantFilter revisionTecnicaVencimiento) {
        this.revisionTecnicaVencimiento = revisionTecnicaVencimiento;
    }

    public AutomovilCajaFilter getCaja() {
        return caja;
    }

    public AutomovilCajaFilter caja() {
        if (caja == null) {
            caja = new AutomovilCajaFilter();
        }
        return caja;
    }

    public void setCaja(AutomovilCajaFilter caja) {
        this.caja = caja;
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
        final AutomovilCriteria that = (AutomovilCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(codigo, that.codigo) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(tipo, that.tipo) &&
            Objects.equals(placa, that.placa) &&
            Objects.equals(marca, that.marca) &&
            Objects.equals(modelo, that.modelo) &&
            Objects.equals(anio, that.anio) &&
            Objects.equals(soatVencimiento, that.soatVencimiento) &&
            Objects.equals(revisionTecnicaVencimiento, that.revisionTecnicaVencimiento) &&
            Objects.equals(caja, that.caja) &&
            Objects.equals(programacionId, that.programacionId) &&
            Objects.equals(horarioId, that.horarioId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            activo,
            codigo,
            nombre,
            tipo,
            placa,
            marca,
            modelo,
            anio,
            soatVencimiento,
            revisionTecnicaVencimiento,
            caja,
            programacionId,
            horarioId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AutomovilCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (codigo != null ? "codigo=" + codigo + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (tipo != null ? "tipo=" + tipo + ", " : "") +
            (placa != null ? "placa=" + placa + ", " : "") +
            (marca != null ? "marca=" + marca + ", " : "") +
            (modelo != null ? "modelo=" + modelo + ", " : "") +
            (anio != null ? "anio=" + anio + ", " : "") +
            (soatVencimiento != null ? "soatVencimiento=" + soatVencimiento + ", " : "") +
            (revisionTecnicaVencimiento != null ? "revisionTecnicaVencimiento=" + revisionTecnicaVencimiento + ", " : "") +
            (caja != null ? "caja=" + caja + ", " : "") +
            (programacionId != null ? "programacionId=" + programacionId + ", " : "") +
            (horarioId != null ? "horarioId=" + horarioId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
