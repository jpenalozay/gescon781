package com.creinfor.domain;

import com.creinfor.domain.enumeration.SiNo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Fecha.
 */
@Entity
@Table(name = "fecha")
public class Fecha implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "fecha", nullable = false, unique = true)
    private LocalDate fecha;

    @NotNull
    @Column(name = "dia", nullable = false)
    private Integer dia;

    @NotNull
    @Column(name = "mes", nullable = false)
    private Integer mes;

    @NotNull
    @Column(name = "anio", nullable = false)
    private Integer anio;

    @NotNull
    @Size(min = 2, max = 32)
    @Column(name = "dia_nombre", length = 32, nullable = false)
    private String diaNombre;

    @NotNull
    @Size(min = 2, max = 8)
    @Column(name = "dia_nombre_corto", length = 8, nullable = false)
    private String diaNombreCorto;

    @Enumerated(EnumType.STRING)
    @Column(name = "feriado")
    private SiNo feriado;

    @Enumerated(EnumType.STRING)
    @Column(name = "laboral")
    private SiNo laboral;

    @Enumerated(EnumType.STRING)
    @Column(name = "fin_semana")
    private SiNo finSemana;

    @OneToMany(mappedBy = "fecha")
    @JsonIgnoreProperties(
        value = {
            "horarioDeshabilitacions", "alumno", "instructor", "programacion", "fecha", "horarioCatalogo", "automovil", "lugarSalida",
        },
        allowSetters = true
    )
    private Set<Horario> horarios = new HashSet<>();

    @ManyToMany(mappedBy = "fechas")
    @JsonIgnoreProperties(
        value = { "horarioDeshabilitaciones", "fechas", "horarioCatalogos", "programacion", "usuario" },
        allowSetters = true
    )
    private Set<ProgramacionDeshabilitacion> programacionDeshabilitacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Fecha id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return this.fecha;
    }

    public Fecha fecha(LocalDate fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Integer getDia() {
        return this.dia;
    }

    public Fecha dia(Integer dia) {
        this.setDia(dia);
        return this;
    }

    public void setDia(Integer dia) {
        this.dia = dia;
    }

    public Integer getMes() {
        return this.mes;
    }

    public Fecha mes(Integer mes) {
        this.setMes(mes);
        return this;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public Integer getAnio() {
        return this.anio;
    }

    public Fecha anio(Integer anio) {
        this.setAnio(anio);
        return this;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public String getDiaNombre() {
        return this.diaNombre;
    }

    public Fecha diaNombre(String diaNombre) {
        this.setDiaNombre(diaNombre);
        return this;
    }

    public void setDiaNombre(String diaNombre) {
        this.diaNombre = diaNombre;
    }

    public String getDiaNombreCorto() {
        return this.diaNombreCorto;
    }

    public Fecha diaNombreCorto(String diaNombreCorto) {
        this.setDiaNombreCorto(diaNombreCorto);
        return this;
    }

    public void setDiaNombreCorto(String diaNombreCorto) {
        this.diaNombreCorto = diaNombreCorto;
    }

    public SiNo getFeriado() {
        return this.feriado;
    }

    public Fecha feriado(SiNo feriado) {
        this.setFeriado(feriado);
        return this;
    }

    public void setFeriado(SiNo feriado) {
        this.feriado = feriado;
    }

    public SiNo getLaboral() {
        return this.laboral;
    }

    public Fecha laboral(SiNo laboral) {
        this.setLaboral(laboral);
        return this;
    }

    public void setLaboral(SiNo laboral) {
        this.laboral = laboral;
    }

    public SiNo getFinSemana() {
        return this.finSemana;
    }

    public Fecha finSemana(SiNo finSemana) {
        this.setFinSemana(finSemana);
        return this;
    }

    public void setFinSemana(SiNo finSemana) {
        this.finSemana = finSemana;
    }

    public Set<Horario> getHorarios() {
        return this.horarios;
    }

    public void setHorarios(Set<Horario> horarios) {
        if (this.horarios != null) {
            this.horarios.forEach(i -> i.setFecha(null));
        }
        if (horarios != null) {
            horarios.forEach(i -> i.setFecha(this));
        }
        this.horarios = horarios;
    }

    public Fecha horarios(Set<Horario> horarios) {
        this.setHorarios(horarios);
        return this;
    }

    public Fecha addHorario(Horario horario) {
        this.horarios.add(horario);
        horario.setFecha(this);
        return this;
    }

    public Fecha removeHorario(Horario horario) {
        this.horarios.remove(horario);
        horario.setFecha(null);
        return this;
    }

    public Set<ProgramacionDeshabilitacion> getProgramacionDeshabilitacions() {
        return this.programacionDeshabilitacions;
    }

    public void setProgramacionDeshabilitacions(Set<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        if (this.programacionDeshabilitacions != null) {
            this.programacionDeshabilitacions.forEach(i -> i.removeFechas(this));
        }
        if (programacionDeshabilitacions != null) {
            programacionDeshabilitacions.forEach(i -> i.addFechas(this));
        }
        this.programacionDeshabilitacions = programacionDeshabilitacions;
    }

    public Fecha programacionDeshabilitacions(Set<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        this.setProgramacionDeshabilitacions(programacionDeshabilitacions);
        return this;
    }

    public Fecha addProgramacionDeshabilitacion(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        this.programacionDeshabilitacions.add(programacionDeshabilitacion);
        programacionDeshabilitacion.getFechas().add(this);
        return this;
    }

    public Fecha removeProgramacionDeshabilitacion(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        this.programacionDeshabilitacions.remove(programacionDeshabilitacion);
        programacionDeshabilitacion.getFechas().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fecha)) {
            return false;
        }
        return id != null && id.equals(((Fecha) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Fecha{" +
            "id=" + getId() +
            ", fecha='" + getFecha() + "'" +
            ", dia=" + getDia() +
            ", mes=" + getMes() +
            ", anio=" + getAnio() +
            ", diaNombre='" + getDiaNombre() + "'" +
            ", diaNombreCorto='" + getDiaNombreCorto() + "'" +
            ", feriado='" + getFeriado() + "'" +
            ", laboral='" + getLaboral() + "'" +
            ", finSemana='" + getFinSemana() + "'" +
            "}";
    }
}
