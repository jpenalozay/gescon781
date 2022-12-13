package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.RequitisoTipo;
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
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.creinfor.domain.RequisitosInscripcion} entity. This class is used
 * in {@link com.creinfor.web.rest.RequisitosInscripcionResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /requisitos-inscripcions?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class RequisitosInscripcionCriteria implements Serializable, Criteria {

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

    /**
     * Class for filtering RequitisoTipo
     */
    public static class RequitisoTipoFilter extends Filter<RequitisoTipo> {

        public RequitisoTipoFilter() {}

        public RequitisoTipoFilter(RequitisoTipoFilter filter) {
            super(filter);
        }

        @Override
        public RequitisoTipoFilter copy() {
            return new RequitisoTipoFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private EstadoFilter activo;

    private SiNoFilter obligatorio;

    private StringFilter nombre;

    private StringFilter nombreCorto;

    private FloatFilter costo;

    private RequitisoTipoFilter tipoRequisito;

    private StringFilter valores;

    private LongFilter inscripcionAdicionalId;

    private Boolean distinct;

    public RequisitosInscripcionCriteria() {}

    public RequisitosInscripcionCriteria(RequisitosInscripcionCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.obligatorio = other.obligatorio == null ? null : other.obligatorio.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.nombreCorto = other.nombreCorto == null ? null : other.nombreCorto.copy();
        this.costo = other.costo == null ? null : other.costo.copy();
        this.tipoRequisito = other.tipoRequisito == null ? null : other.tipoRequisito.copy();
        this.valores = other.valores == null ? null : other.valores.copy();
        this.inscripcionAdicionalId = other.inscripcionAdicionalId == null ? null : other.inscripcionAdicionalId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public RequisitosInscripcionCriteria copy() {
        return new RequisitosInscripcionCriteria(this);
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

    public SiNoFilter getObligatorio() {
        return obligatorio;
    }

    public SiNoFilter obligatorio() {
        if (obligatorio == null) {
            obligatorio = new SiNoFilter();
        }
        return obligatorio;
    }

    public void setObligatorio(SiNoFilter obligatorio) {
        this.obligatorio = obligatorio;
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

    public FloatFilter getCosto() {
        return costo;
    }

    public FloatFilter costo() {
        if (costo == null) {
            costo = new FloatFilter();
        }
        return costo;
    }

    public void setCosto(FloatFilter costo) {
        this.costo = costo;
    }

    public RequitisoTipoFilter getTipoRequisito() {
        return tipoRequisito;
    }

    public RequitisoTipoFilter tipoRequisito() {
        if (tipoRequisito == null) {
            tipoRequisito = new RequitisoTipoFilter();
        }
        return tipoRequisito;
    }

    public void setTipoRequisito(RequitisoTipoFilter tipoRequisito) {
        this.tipoRequisito = tipoRequisito;
    }

    public StringFilter getValores() {
        return valores;
    }

    public StringFilter valores() {
        if (valores == null) {
            valores = new StringFilter();
        }
        return valores;
    }

    public void setValores(StringFilter valores) {
        this.valores = valores;
    }

    public LongFilter getInscripcionAdicionalId() {
        return inscripcionAdicionalId;
    }

    public LongFilter inscripcionAdicionalId() {
        if (inscripcionAdicionalId == null) {
            inscripcionAdicionalId = new LongFilter();
        }
        return inscripcionAdicionalId;
    }

    public void setInscripcionAdicionalId(LongFilter inscripcionAdicionalId) {
        this.inscripcionAdicionalId = inscripcionAdicionalId;
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
        final RequisitosInscripcionCriteria that = (RequisitosInscripcionCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(obligatorio, that.obligatorio) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(nombreCorto, that.nombreCorto) &&
            Objects.equals(costo, that.costo) &&
            Objects.equals(tipoRequisito, that.tipoRequisito) &&
            Objects.equals(valores, that.valores) &&
            Objects.equals(inscripcionAdicionalId, that.inscripcionAdicionalId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, activo, obligatorio, nombre, nombreCorto, costo, tipoRequisito, valores, inscripcionAdicionalId, distinct);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RequisitosInscripcionCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (obligatorio != null ? "obligatorio=" + obligatorio + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (nombreCorto != null ? "nombreCorto=" + nombreCorto + ", " : "") +
            (costo != null ? "costo=" + costo + ", " : "") +
            (tipoRequisito != null ? "tipoRequisito=" + tipoRequisito + ", " : "") +
            (valores != null ? "valores=" + valores + ", " : "") +
            (inscripcionAdicionalId != null ? "inscripcionAdicionalId=" + inscripcionAdicionalId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
