package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A LugarSalida.
 */
@Entity
@Table(name = "lugar_salida")
public class LugarSalida implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @OneToMany(mappedBy = "lugarSalida")
    @JsonIgnoreProperties(
        value = {
            "horarioDeshabilitacions", "alumno", "instructor", "programacion", "fecha", "horarioCatalogo", "automovil", "lugarSalida",
        },
        allowSetters = true
    )
    private Set<Horario> horarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LugarSalida id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public LugarSalida nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Horario> getHorarios() {
        return this.horarios;
    }

    public void setHorarios(Set<Horario> horarios) {
        if (this.horarios != null) {
            this.horarios.forEach(i -> i.setLugarSalida(null));
        }
        if (horarios != null) {
            horarios.forEach(i -> i.setLugarSalida(this));
        }
        this.horarios = horarios;
    }

    public LugarSalida horarios(Set<Horario> horarios) {
        this.setHorarios(horarios);
        return this;
    }

    public LugarSalida addHorario(Horario horario) {
        this.horarios.add(horario);
        horario.setLugarSalida(this);
        return this;
    }

    public LugarSalida removeHorario(Horario horario) {
        this.horarios.remove(horario);
        horario.setLugarSalida(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LugarSalida)) {
            return false;
        }
        return id != null && id.equals(((LugarSalida) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LugarSalida{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
