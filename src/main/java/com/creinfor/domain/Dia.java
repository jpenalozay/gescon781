package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Dia.
 */
@Entity
@Table(name = "dia")
public class Dia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 2, max = 16)
    @Column(name = "nombre", length = 16, nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Size(min = 2, max = 6)
    @Column(name = "nombre_corto", length = 6, nullable = false, unique = true)
    private String nombreCorto;

    @ManyToMany(mappedBy = "dias")
    @JsonIgnoreProperties(
        value = { "programacionDeshabilitacions", "horarios", "dias", "horarioCatalogos", "profesor", "automovil" },
        allowSetters = true
    )
    private Set<Programacion> programacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Dia id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Dia nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public Dia nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public Set<Programacion> getProgramacions() {
        return this.programacions;
    }

    public void setProgramacions(Set<Programacion> programacions) {
        if (this.programacions != null) {
            this.programacions.forEach(i -> i.removeDia(this));
        }
        if (programacions != null) {
            programacions.forEach(i -> i.addDia(this));
        }
        this.programacions = programacions;
    }

    public Dia programacions(Set<Programacion> programacions) {
        this.setProgramacions(programacions);
        return this;
    }

    public Dia addProgramacion(Programacion programacion) {
        this.programacions.add(programacion);
        programacion.getDias().add(this);
        return this;
    }

    public Dia removeProgramacion(Programacion programacion) {
        this.programacions.remove(programacion);
        programacion.getDias().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dia)) {
            return false;
        }
        return id != null && id.equals(((Dia) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Dia{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", nombreCorto='" + getNombreCorto() + "'" +
            "}";
    }
}
