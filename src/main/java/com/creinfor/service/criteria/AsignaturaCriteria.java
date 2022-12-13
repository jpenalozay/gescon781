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
 * Criteria class for the {@link com.creinfor.domain.Asignatura} entity. This class is used
 * in {@link com.creinfor.web.rest.AsignaturaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /asignaturas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class AsignaturaCriteria implements Serializable, Criteria {

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

    private IntegerFilter horasTeoricas;

    private IntegerFilter horasPracticas;

    private IntegerFilter numeroClasesTeoria;

    private IntegerFilter numeroClasesPractica;

    private IntegerFilter vigencia;

    private FloatFilter costo;

    private LongFilter inscripcionDetalleId;

    private LongFilter categoriaId;

    private LongFilter adicionalId;

    private LongFilter horarioId;

    private LongFilter asignaturaRequisitoId;

    private LongFilter cursoId;

    private Boolean distinct;

    public AsignaturaCriteria() {}

    public AsignaturaCriteria(AsignaturaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.activo = other.activo == null ? null : other.activo.copy();
        this.nombre = other.nombre == null ? null : other.nombre.copy();
        this.nombreCorto = other.nombreCorto == null ? null : other.nombreCorto.copy();
        this.descripcion = other.descripcion == null ? null : other.descripcion.copy();
        this.horasTeoricas = other.horasTeoricas == null ? null : other.horasTeoricas.copy();
        this.horasPracticas = other.horasPracticas == null ? null : other.horasPracticas.copy();
        this.numeroClasesTeoria = other.numeroClasesTeoria == null ? null : other.numeroClasesTeoria.copy();
        this.numeroClasesPractica = other.numeroClasesPractica == null ? null : other.numeroClasesPractica.copy();
        this.vigencia = other.vigencia == null ? null : other.vigencia.copy();
        this.costo = other.costo == null ? null : other.costo.copy();
        this.inscripcionDetalleId = other.inscripcionDetalleId == null ? null : other.inscripcionDetalleId.copy();
        this.categoriaId = other.categoriaId == null ? null : other.categoriaId.copy();
        this.adicionalId = other.adicionalId == null ? null : other.adicionalId.copy();
        this.horarioId = other.horarioId == null ? null : other.horarioId.copy();
        this.asignaturaRequisitoId = other.asignaturaRequisitoId == null ? null : other.asignaturaRequisitoId.copy();
        this.cursoId = other.cursoId == null ? null : other.cursoId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public AsignaturaCriteria copy() {
        return new AsignaturaCriteria(this);
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

    public IntegerFilter getHorasTeoricas() {
        return horasTeoricas;
    }

    public IntegerFilter horasTeoricas() {
        if (horasTeoricas == null) {
            horasTeoricas = new IntegerFilter();
        }
        return horasTeoricas;
    }

    public void setHorasTeoricas(IntegerFilter horasTeoricas) {
        this.horasTeoricas = horasTeoricas;
    }

    public IntegerFilter getHorasPracticas() {
        return horasPracticas;
    }

    public IntegerFilter horasPracticas() {
        if (horasPracticas == null) {
            horasPracticas = new IntegerFilter();
        }
        return horasPracticas;
    }

    public void setHorasPracticas(IntegerFilter horasPracticas) {
        this.horasPracticas = horasPracticas;
    }

    public IntegerFilter getNumeroClasesTeoria() {
        return numeroClasesTeoria;
    }

    public IntegerFilter numeroClasesTeoria() {
        if (numeroClasesTeoria == null) {
            numeroClasesTeoria = new IntegerFilter();
        }
        return numeroClasesTeoria;
    }

    public void setNumeroClasesTeoria(IntegerFilter numeroClasesTeoria) {
        this.numeroClasesTeoria = numeroClasesTeoria;
    }

    public IntegerFilter getNumeroClasesPractica() {
        return numeroClasesPractica;
    }

    public IntegerFilter numeroClasesPractica() {
        if (numeroClasesPractica == null) {
            numeroClasesPractica = new IntegerFilter();
        }
        return numeroClasesPractica;
    }

    public void setNumeroClasesPractica(IntegerFilter numeroClasesPractica) {
        this.numeroClasesPractica = numeroClasesPractica;
    }

    public IntegerFilter getVigencia() {
        return vigencia;
    }

    public IntegerFilter vigencia() {
        if (vigencia == null) {
            vigencia = new IntegerFilter();
        }
        return vigencia;
    }

    public void setVigencia(IntegerFilter vigencia) {
        this.vigencia = vigencia;
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

    public LongFilter getCategoriaId() {
        return categoriaId;
    }

    public LongFilter categoriaId() {
        if (categoriaId == null) {
            categoriaId = new LongFilter();
        }
        return categoriaId;
    }

    public void setCategoriaId(LongFilter categoriaId) {
        this.categoriaId = categoriaId;
    }

    public LongFilter getAdicionalId() {
        return adicionalId;
    }

    public LongFilter adicionalId() {
        if (adicionalId == null) {
            adicionalId = new LongFilter();
        }
        return adicionalId;
    }

    public void setAdicionalId(LongFilter adicionalId) {
        this.adicionalId = adicionalId;
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

    public LongFilter getAsignaturaRequisitoId() {
        return asignaturaRequisitoId;
    }

    public LongFilter asignaturaRequisitoId() {
        if (asignaturaRequisitoId == null) {
            asignaturaRequisitoId = new LongFilter();
        }
        return asignaturaRequisitoId;
    }

    public void setAsignaturaRequisitoId(LongFilter asignaturaRequisitoId) {
        this.asignaturaRequisitoId = asignaturaRequisitoId;
    }

    public LongFilter getCursoId() {
        return cursoId;
    }

    public LongFilter cursoId() {
        if (cursoId == null) {
            cursoId = new LongFilter();
        }
        return cursoId;
    }

    public void setCursoId(LongFilter cursoId) {
        this.cursoId = cursoId;
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
        final AsignaturaCriteria that = (AsignaturaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(activo, that.activo) &&
            Objects.equals(nombre, that.nombre) &&
            Objects.equals(nombreCorto, that.nombreCorto) &&
            Objects.equals(descripcion, that.descripcion) &&
            Objects.equals(horasTeoricas, that.horasTeoricas) &&
            Objects.equals(horasPracticas, that.horasPracticas) &&
            Objects.equals(numeroClasesTeoria, that.numeroClasesTeoria) &&
            Objects.equals(numeroClasesPractica, that.numeroClasesPractica) &&
            Objects.equals(vigencia, that.vigencia) &&
            Objects.equals(costo, that.costo) &&
            Objects.equals(inscripcionDetalleId, that.inscripcionDetalleId) &&
            Objects.equals(categoriaId, that.categoriaId) &&
            Objects.equals(adicionalId, that.adicionalId) &&
            Objects.equals(horarioId, that.horarioId) &&
            Objects.equals(asignaturaRequisitoId, that.asignaturaRequisitoId) &&
            Objects.equals(cursoId, that.cursoId) &&
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
            horasTeoricas,
            horasPracticas,
            numeroClasesTeoria,
            numeroClasesPractica,
            vigencia,
            costo,
            inscripcionDetalleId,
            categoriaId,
            adicionalId,
            horarioId,
            asignaturaRequisitoId,
            cursoId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AsignaturaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (activo != null ? "activo=" + activo + ", " : "") +
            (nombre != null ? "nombre=" + nombre + ", " : "") +
            (nombreCorto != null ? "nombreCorto=" + nombreCorto + ", " : "") +
            (descripcion != null ? "descripcion=" + descripcion + ", " : "") +
            (horasTeoricas != null ? "horasTeoricas=" + horasTeoricas + ", " : "") +
            (horasPracticas != null ? "horasPracticas=" + horasPracticas + ", " : "") +
            (numeroClasesTeoria != null ? "numeroClasesTeoria=" + numeroClasesTeoria + ", " : "") +
            (numeroClasesPractica != null ? "numeroClasesPractica=" + numeroClasesPractica + ", " : "") +
            (vigencia != null ? "vigencia=" + vigencia + ", " : "") +
            (costo != null ? "costo=" + costo + ", " : "") +
            (inscripcionDetalleId != null ? "inscripcionDetalleId=" + inscripcionDetalleId + ", " : "") +
            (categoriaId != null ? "categoriaId=" + categoriaId + ", " : "") +
            (adicionalId != null ? "adicionalId=" + adicionalId + ", " : "") +
            (horarioId != null ? "horarioId=" + horarioId + ", " : "") +
            (asignaturaRequisitoId != null ? "asignaturaRequisitoId=" + asignaturaRequisitoId + ", " : "") +
            (cursoId != null ? "cursoId=" + cursoId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
