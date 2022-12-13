package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.SiNo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Profesor.
 */
@Entity
@Table(name = "profesor")
public class Profesor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "activo", nullable = false)
    private Estado activo;

    @NotNull
    @Size(min = 1, max = 6)
    @Column(name = "codigo", length = 6, nullable = false, unique = true)
    private String codigo;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "teoria", nullable = false)
    private SiNo teoria;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "practica", nullable = false)
    private SiNo practica;

    @Size(min = 2, max = 16)
    @Column(name = "licencia_numero", length = 16, unique = true)
    private String licenciaNumero;

    @JsonIgnoreProperties(value = { "persona", "cargo" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Empleado empleado;

    @OneToMany(mappedBy = "instructor")
    @JsonIgnoreProperties(
        value = {
            "horarioDeshabilitacions", "alumno", "instructor", "programacion", "fecha", "horarioCatalogo", "automovil", "lugarSalida",
        },
        allowSetters = true
    )
    private Set<Horario> horarios = new HashSet<>();

    @OneToMany(mappedBy = "profesor")
    @JsonIgnoreProperties(
        value = { "programacionDeshabilitacions", "horarios", "dias", "horarioCatalogos", "profesor", "automovil" },
        allowSetters = true
    )
    private Set<Programacion> programacions = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_profesor__licencias_permitidas",
        joinColumns = @JoinColumn(name = "profesor_id"),
        inverseJoinColumns = @JoinColumn(name = "licencias_permitidas_id")
    )
    @JsonIgnoreProperties(value = { "alumnoCategorias", "profesors", "asignaturas", "intructores" }, allowSetters = true)
    private Set<LicenciaCategoria> licenciasPermitidas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "alumnoCategorias", "profesors", "asignaturas", "intructores" }, allowSetters = true)
    private LicenciaCategoria licenciaCategoria;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Profesor id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public Profesor activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Profesor codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public SiNo getTeoria() {
        return this.teoria;
    }

    public Profesor teoria(SiNo teoria) {
        this.setTeoria(teoria);
        return this;
    }

    public void setTeoria(SiNo teoria) {
        this.teoria = teoria;
    }

    public SiNo getPractica() {
        return this.practica;
    }

    public Profesor practica(SiNo practica) {
        this.setPractica(practica);
        return this;
    }

    public void setPractica(SiNo practica) {
        this.practica = practica;
    }

    public String getLicenciaNumero() {
        return this.licenciaNumero;
    }

    public Profesor licenciaNumero(String licenciaNumero) {
        this.setLicenciaNumero(licenciaNumero);
        return this;
    }

    public void setLicenciaNumero(String licenciaNumero) {
        this.licenciaNumero = licenciaNumero;
    }

    public Empleado getEmpleado() {
        return this.empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Profesor empleado(Empleado empleado) {
        this.setEmpleado(empleado);
        return this;
    }

    public Set<Horario> getHorarios() {
        return this.horarios;
    }

    public void setHorarios(Set<Horario> horarios) {
        if (this.horarios != null) {
            this.horarios.forEach(i -> i.setInstructor(null));
        }
        if (horarios != null) {
            horarios.forEach(i -> i.setInstructor(this));
        }
        this.horarios = horarios;
    }

    public Profesor horarios(Set<Horario> horarios) {
        this.setHorarios(horarios);
        return this;
    }

    public Profesor addHorario(Horario horario) {
        this.horarios.add(horario);
        horario.setInstructor(this);
        return this;
    }

    public Profesor removeHorario(Horario horario) {
        this.horarios.remove(horario);
        horario.setInstructor(null);
        return this;
    }

    public Set<Programacion> getProgramacions() {
        return this.programacions;
    }

    public void setProgramacions(Set<Programacion> programacions) {
        if (this.programacions != null) {
            this.programacions.forEach(i -> i.setProfesor(null));
        }
        if (programacions != null) {
            programacions.forEach(i -> i.setProfesor(this));
        }
        this.programacions = programacions;
    }

    public Profesor programacions(Set<Programacion> programacions) {
        this.setProgramacions(programacions);
        return this;
    }

    public Profesor addProgramacion(Programacion programacion) {
        this.programacions.add(programacion);
        programacion.setProfesor(this);
        return this;
    }

    public Profesor removeProgramacion(Programacion programacion) {
        this.programacions.remove(programacion);
        programacion.setProfesor(null);
        return this;
    }

    public Set<LicenciaCategoria> getLicenciasPermitidas() {
        return this.licenciasPermitidas;
    }

    public void setLicenciasPermitidas(Set<LicenciaCategoria> licenciaCategorias) {
        this.licenciasPermitidas = licenciaCategorias;
    }

    public Profesor licenciasPermitidas(Set<LicenciaCategoria> licenciaCategorias) {
        this.setLicenciasPermitidas(licenciaCategorias);
        return this;
    }

    public Profesor addLicenciasPermitidas(LicenciaCategoria licenciaCategoria) {
        this.licenciasPermitidas.add(licenciaCategoria);
        licenciaCategoria.getIntructores().add(this);
        return this;
    }

    public Profesor removeLicenciasPermitidas(LicenciaCategoria licenciaCategoria) {
        this.licenciasPermitidas.remove(licenciaCategoria);
        licenciaCategoria.getIntructores().remove(this);
        return this;
    }

    public LicenciaCategoria getLicenciaCategoria() {
        return this.licenciaCategoria;
    }

    public void setLicenciaCategoria(LicenciaCategoria licenciaCategoria) {
        this.licenciaCategoria = licenciaCategoria;
    }

    public Profesor licenciaCategoria(LicenciaCategoria licenciaCategoria) {
        this.setLicenciaCategoria(licenciaCategoria);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Profesor)) {
            return false;
        }
        return id != null && id.equals(((Profesor) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Profesor{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", teoria='" + getTeoria() + "'" +
            ", practica='" + getPractica() + "'" +
            ", licenciaNumero='" + getLicenciaNumero() + "'" +
            "}";
    }
}
