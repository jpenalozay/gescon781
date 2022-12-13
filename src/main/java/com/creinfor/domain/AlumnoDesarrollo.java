package com.creinfor.domain;

import com.creinfor.domain.enumeration.AlumnoDesarrolloEstado;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A AlumnoDesarrollo.
 */
@Entity
@Table(name = "alumno_desarrollo")
public class AlumnoDesarrollo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "clases_teoria_programadas")
    private Integer clasesTeoriaProgramadas;

    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "clases_practicas_programas")
    private Integer clasesPracticasProgramas;

    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "clases_inasistencia_teoria")
    private Integer clasesInasistenciaTeoria;

    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "clases_inasistencia_practica")
    private Integer clasesInasistenciaPractica;

    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "clases_realizadas_teoria")
    private Integer clasesRealizadasTeoria;

    @Min(value = 0)
    @Max(value = 100)
    @Column(name = "clases_realizadas_practica")
    private Integer clasesRealizadasPractica;

    @Enumerated(EnumType.STRING)
    @Column(name = "alumno_desarrollo_estado")
    private AlumnoDesarrolloEstado alumnoDesarrolloEstado;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AlumnoDesarrollo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getClasesTeoriaProgramadas() {
        return this.clasesTeoriaProgramadas;
    }

    public AlumnoDesarrollo clasesTeoriaProgramadas(Integer clasesTeoriaProgramadas) {
        this.setClasesTeoriaProgramadas(clasesTeoriaProgramadas);
        return this;
    }

    public void setClasesTeoriaProgramadas(Integer clasesTeoriaProgramadas) {
        this.clasesTeoriaProgramadas = clasesTeoriaProgramadas;
    }

    public Integer getClasesPracticasProgramas() {
        return this.clasesPracticasProgramas;
    }

    public AlumnoDesarrollo clasesPracticasProgramas(Integer clasesPracticasProgramas) {
        this.setClasesPracticasProgramas(clasesPracticasProgramas);
        return this;
    }

    public void setClasesPracticasProgramas(Integer clasesPracticasProgramas) {
        this.clasesPracticasProgramas = clasesPracticasProgramas;
    }

    public Integer getClasesInasistenciaTeoria() {
        return this.clasesInasistenciaTeoria;
    }

    public AlumnoDesarrollo clasesInasistenciaTeoria(Integer clasesInasistenciaTeoria) {
        this.setClasesInasistenciaTeoria(clasesInasistenciaTeoria);
        return this;
    }

    public void setClasesInasistenciaTeoria(Integer clasesInasistenciaTeoria) {
        this.clasesInasistenciaTeoria = clasesInasistenciaTeoria;
    }

    public Integer getClasesInasistenciaPractica() {
        return this.clasesInasistenciaPractica;
    }

    public AlumnoDesarrollo clasesInasistenciaPractica(Integer clasesInasistenciaPractica) {
        this.setClasesInasistenciaPractica(clasesInasistenciaPractica);
        return this;
    }

    public void setClasesInasistenciaPractica(Integer clasesInasistenciaPractica) {
        this.clasesInasistenciaPractica = clasesInasistenciaPractica;
    }

    public Integer getClasesRealizadasTeoria() {
        return this.clasesRealizadasTeoria;
    }

    public AlumnoDesarrollo clasesRealizadasTeoria(Integer clasesRealizadasTeoria) {
        this.setClasesRealizadasTeoria(clasesRealizadasTeoria);
        return this;
    }

    public void setClasesRealizadasTeoria(Integer clasesRealizadasTeoria) {
        this.clasesRealizadasTeoria = clasesRealizadasTeoria;
    }

    public Integer getClasesRealizadasPractica() {
        return this.clasesRealizadasPractica;
    }

    public AlumnoDesarrollo clasesRealizadasPractica(Integer clasesRealizadasPractica) {
        this.setClasesRealizadasPractica(clasesRealizadasPractica);
        return this;
    }

    public void setClasesRealizadasPractica(Integer clasesRealizadasPractica) {
        this.clasesRealizadasPractica = clasesRealizadasPractica;
    }

    public AlumnoDesarrolloEstado getAlumnoDesarrolloEstado() {
        return this.alumnoDesarrolloEstado;
    }

    public AlumnoDesarrollo alumnoDesarrolloEstado(AlumnoDesarrolloEstado alumnoDesarrolloEstado) {
        this.setAlumnoDesarrolloEstado(alumnoDesarrolloEstado);
        return this;
    }

    public void setAlumnoDesarrolloEstado(AlumnoDesarrolloEstado alumnoDesarrolloEstado) {
        this.alumnoDesarrolloEstado = alumnoDesarrolloEstado;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AlumnoDesarrollo)) {
            return false;
        }
        return id != null && id.equals(((AlumnoDesarrollo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlumnoDesarrollo{" +
            "id=" + getId() +
            ", clasesTeoriaProgramadas=" + getClasesTeoriaProgramadas() +
            ", clasesPracticasProgramas=" + getClasesPracticasProgramas() +
            ", clasesInasistenciaTeoria=" + getClasesInasistenciaTeoria() +
            ", clasesInasistenciaPractica=" + getClasesInasistenciaPractica() +
            ", clasesRealizadasTeoria=" + getClasesRealizadasTeoria() +
            ", clasesRealizadasPractica=" + getClasesRealizadasPractica() +
            ", alumnoDesarrolloEstado='" + getAlumnoDesarrolloEstado() + "'" +
            "}";
    }
}
