package com.creinfor.service.criteria;

import com.creinfor.domain.enumeration.SiNo;
import com.creinfor.domain.enumeration.SiNo;
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
 * Criteria class for the {@link com.creinfor.domain.Fecha} entity. This class is used
 * in {@link com.creinfor.web.rest.FechaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /fechas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class FechaCriteria implements Serializable, Criteria {

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

    private LocalDateFilter fecha;

    private IntegerFilter dia;

    private IntegerFilter mes;

    private IntegerFilter anio;

    private StringFilter diaNombre;

    private StringFilter diaNombreCorto;

    private SiNoFilter feriado;

    private SiNoFilter laboral;

    private SiNoFilter finSemana;

    private LongFilter horarioId;

    private LongFilter programacionDeshabilitacionId;

    private Boolean distinct;

    public FechaCriteria() {}

    public FechaCriteria(FechaCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.fecha = other.fecha == null ? null : other.fecha.copy();
        this.dia = other.dia == null ? null : other.dia.copy();
        this.mes = other.mes == null ? null : other.mes.copy();
        this.anio = other.anio == null ? null : other.anio.copy();
        this.diaNombre = other.diaNombre == null ? null : other.diaNombre.copy();
        this.diaNombreCorto = other.diaNombreCorto == null ? null : other.diaNombreCorto.copy();
        this.feriado = other.feriado == null ? null : other.feriado.copy();
        this.laboral = other.laboral == null ? null : other.laboral.copy();
        this.finSemana = other.finSemana == null ? null : other.finSemana.copy();
        this.horarioId = other.horarioId == null ? null : other.horarioId.copy();
        this.programacionDeshabilitacionId =
            other.programacionDeshabilitacionId == null ? null : other.programacionDeshabilitacionId.copy();
        this.distinct = other.distinct;
    }

    @Override
    public FechaCriteria copy() {
        return new FechaCriteria(this);
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

    public LocalDateFilter getFecha() {
        return fecha;
    }

    public LocalDateFilter fecha() {
        if (fecha == null) {
            fecha = new LocalDateFilter();
        }
        return fecha;
    }

    public void setFecha(LocalDateFilter fecha) {
        this.fecha = fecha;
    }

    public IntegerFilter getDia() {
        return dia;
    }

    public IntegerFilter dia() {
        if (dia == null) {
            dia = new IntegerFilter();
        }
        return dia;
    }

    public void setDia(IntegerFilter dia) {
        this.dia = dia;
    }

    public IntegerFilter getMes() {
        return mes;
    }

    public IntegerFilter mes() {
        if (mes == null) {
            mes = new IntegerFilter();
        }
        return mes;
    }

    public void setMes(IntegerFilter mes) {
        this.mes = mes;
    }

    public IntegerFilter getAnio() {
        return anio;
    }

    public IntegerFilter anio() {
        if (anio == null) {
            anio = new IntegerFilter();
        }
        return anio;
    }

    public void setAnio(IntegerFilter anio) {
        this.anio = anio;
    }

    public StringFilter getDiaNombre() {
        return diaNombre;
    }

    public StringFilter diaNombre() {
        if (diaNombre == null) {
            diaNombre = new StringFilter();
        }
        return diaNombre;
    }

    public void setDiaNombre(StringFilter diaNombre) {
        this.diaNombre = diaNombre;
    }

    public StringFilter getDiaNombreCorto() {
        return diaNombreCorto;
    }

    public StringFilter diaNombreCorto() {
        if (diaNombreCorto == null) {
            diaNombreCorto = new StringFilter();
        }
        return diaNombreCorto;
    }

    public void setDiaNombreCorto(StringFilter diaNombreCorto) {
        this.diaNombreCorto = diaNombreCorto;
    }

    public SiNoFilter getFeriado() {
        return feriado;
    }

    public SiNoFilter feriado() {
        if (feriado == null) {
            feriado = new SiNoFilter();
        }
        return feriado;
    }

    public void setFeriado(SiNoFilter feriado) {
        this.feriado = feriado;
    }

    public SiNoFilter getLaboral() {
        return laboral;
    }

    public SiNoFilter laboral() {
        if (laboral == null) {
            laboral = new SiNoFilter();
        }
        return laboral;
    }

    public void setLaboral(SiNoFilter laboral) {
        this.laboral = laboral;
    }

    public SiNoFilter getFinSemana() {
        return finSemana;
    }

    public SiNoFilter finSemana() {
        if (finSemana == null) {
            finSemana = new SiNoFilter();
        }
        return finSemana;
    }

    public void setFinSemana(SiNoFilter finSemana) {
        this.finSemana = finSemana;
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
        final FechaCriteria that = (FechaCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(fecha, that.fecha) &&
            Objects.equals(dia, that.dia) &&
            Objects.equals(mes, that.mes) &&
            Objects.equals(anio, that.anio) &&
            Objects.equals(diaNombre, that.diaNombre) &&
            Objects.equals(diaNombreCorto, that.diaNombreCorto) &&
            Objects.equals(feriado, that.feriado) &&
            Objects.equals(laboral, that.laboral) &&
            Objects.equals(finSemana, that.finSemana) &&
            Objects.equals(horarioId, that.horarioId) &&
            Objects.equals(programacionDeshabilitacionId, that.programacionDeshabilitacionId) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            fecha,
            dia,
            mes,
            anio,
            diaNombre,
            diaNombreCorto,
            feriado,
            laboral,
            finSemana,
            horarioId,
            programacionDeshabilitacionId,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FechaCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (fecha != null ? "fecha=" + fecha + ", " : "") +
            (dia != null ? "dia=" + dia + ", " : "") +
            (mes != null ? "mes=" + mes + ", " : "") +
            (anio != null ? "anio=" + anio + ", " : "") +
            (diaNombre != null ? "diaNombre=" + diaNombre + ", " : "") +
            (diaNombreCorto != null ? "diaNombreCorto=" + diaNombreCorto + ", " : "") +
            (feriado != null ? "feriado=" + feriado + ", " : "") +
            (laboral != null ? "laboral=" + laboral + ", " : "") +
            (finSemana != null ? "finSemana=" + finSemana + ", " : "") +
            (horarioId != null ? "horarioId=" + horarioId + ", " : "") +
            (programacionDeshabilitacionId != null ? "programacionDeshabilitacionId=" + programacionDeshabilitacionId + ", " : "") +
            (distinct != null ? "distinct=" + distinct + ", " : "") +
            "}";
    }
}
