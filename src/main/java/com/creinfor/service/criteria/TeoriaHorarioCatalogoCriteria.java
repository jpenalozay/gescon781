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
 * Criteria class for the {@link com.creinfor.domain.TeoriaHorarioCatalogo} entity. This class is used
 * in {@link com.creinfor.web.rest.TeoriaHorarioCatalogoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /teoria-horario-catalogos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class TeoriaHorarioCatalogoCriteria implements Serializable, Criteria {

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

    private StringFilter nombre;

    private StringFilter nombreCorto;

    private StringFilter descripcion;

    private StringFilter periodo;

    private StringFilter anio;

    private StringFilter mes;

    private StringFilter dia;

    private IntegerFilter horaInicio;

    private IntegerFilter horaFin;

    private LongFilter inscripcionDetalleId;

    private LongFilter teoriaId;

    private LongFilter asignaturaId;

    private Boolean distinct;

    public TeoriaHorarioCatalogoCriteria() {}

    public TeoriaHorarioCatalogoCriteria(TeoriaHorarioCatalogoCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.nombreCorto = other.nombreCorto == null ? null : other.nombreCorto.copy();
        this.descripcion = other.descripcion == null ? null : other.descripcion.copy();
        this.periodo = other.periodo == null ? null : other.periodo.copy();
        this.anio = other.anio == null ? null : other.anio.copy();
        this.mes = other.mes == null ? null : other.mes.copy();
        this.dia = other.dia == null ? null : other.dia.copy();
        this.horaInicio = other.horaInicio == null ? null : other.horaInicio.copy();
        this.horaFin = other.horaFin == null ? null : other.horaFin.copy();
        this.inscripcionDetalleId = other.inscripcionDetalleId == null ? null : other.inscripcionDetalleId.copy();
        this.teoriaId = other.teoriaId == null ? null : other.teoriaId.copy();
        this.asignaturaId = other.asignaturaId == null ? null : other.asignaturaId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public TeoriaHorarioCatalogoCriteria copy() {
        return new TeoriaHorarioCatalogoCriteria(this);
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

    public StringFilter getPeriodo() {
        return periodo;
    }

    public StringFilter periodo() {
        if (periodo == null) {
            periodo = new StringFilter();
        }
        return periodo;
    }

    public void setPeriodo(StringFilter periodo) {
        this.periodo = periodo;
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

    public StringFilter getMes() {
        return mes;
    }

    public StringFilter mes() {
        if (mes == null) {
            mes = new StringFilter();
        }
        return mes;
    }

    public void setMes(StringFilter mes) {
        this.mes = mes;
    }

    public StringFilter getDia() {
        return dia;
    }

    public StringFilter dia() {
        if (dia == null) {
            dia = new StringFilter();
        }
        return dia;
    }

    public void setDia(StringFilter dia) {
        this.dia = dia;
    }

    public IntegerFilter getHoraInicio() {
        return horaInicio;
    }

    public IntegerFilter horaInicio() {
        if (horaInicio == null) {
            horaInicio = new IntegerFilter();
        }
        return horaInicio;
    }

    public void setHoraInicio(IntegerFilter horaInicio) {
        this.horaInicio = horaInicio;
    }

    public IntegerFilter getHoraFin() {
        return horaFin;
    }

    public IntegerFilter horaFin() {
        if (horaFin == null) {
            horaFin = new IntegerFilter();
        }
        return horaFin;
    }

    public void setHoraFin(IntegerFilter horaFin) {
        this.horaFin = horaFin;
    }

    public LongFilter getInscripcionDetalleId() {
        return inscripcionDetalleId;
    }

    public LongFilter inscripcionDetalleId() {
        if (inscripcionDetalleId == null) {
            inscripcionDetalleId = new LongFilter();
        }
        return inscripcionDetalleId;
    }

    public void setInscripcionDetalleId(LongFilter inscripcionDetalleId) {
        this.inscripcionDetalleId = inscripcionDetalleId;
    }

    public LongFilter getTeoriaId() {
        return teoriaId;
    }

    public LongFilter teoriaId() {
        if (teoriaId == null) {
            teoriaId = new LongFilter();
        }
        return teoriaId;
    }

    public void setTeoriaId(LongFilter teoriaId) {
        this.teoriaId = teoriaId;
    }

    public LongFilter getAsignaturaId() {
        return asignaturaId;
    }

    public LongFilter asignaturaId() {
        if (asignaturaId == null) {
            asignaturaId = new LongFilter();
        }
        return asignaturaId;
    }

    public void setAsignaturaId(LongFilter asignaturaId) {
        this.asignaturaId = asignaturaId;
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
        final TeoriaHorarioCatalogoCriteria that = (TeoriaHorarioCatalogoCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(nombreCorto, that.nombreCorto) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(periodo, that.periodo) &&
            Objects.equals(anio, that.anio) &&
            Objects.equals(mes, that.mes) &&
            Objects.equals(dia, that.dia) &&
            Objects.equals(horaInicio, that.horaInicio) &&
            Objects.equals(horaFin, that.horaFin) &&
            Objects.equals(inscripcionDetalleId, that.inscripcionDetalleId) &&
            Objects.equals(teoriaId, that.teoriaId) &&
            Objects.equals(asignaturaId, that.asignaturaId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            activo,
            nombre,
            nombreCorto,
            descripcion,
            periodo,
            anio,
            mes,
            dia,
            horaInicio,
            horaFin,
            inscripcionDetalleId,
            teoriaId,
            asignaturaId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TeoriaHorarioCatalogoCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (nombreCorto != null ? "nombreCorto=" + nombreCorto + ", " : "") +
            (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
            (periodo != null ? "periodo=" + periodo + ", " : "") +
            (anio != null ? "anio=" + anio + ", " : "") +
            (mes != null ? "mes=" + mes + ", " : "") +
            (dia != null ? "dia=" + dia + ", " : "") +
            (horaInicio != null ? "horaInicio=" + horaInicio + ", " : "") +
            (horaFin != null ? "horaFin=" + horaFin + ", " : "") +
            (inscripcionDetalleId != null ? "inscripcionDetalleId=" + inscripcionDetalleId + ", " : "") +
            (teoriaId != null ? "teoriaId=" + teoriaId + ", " : "") +
            (asignaturaId != null ? "asignaturaId=" + asignaturaId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
