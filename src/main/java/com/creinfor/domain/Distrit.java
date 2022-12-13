package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Distrit.
 */
@Entity
@Table(name = "distrit")
public class Distrit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 2)
    @Column(name = "departamento")
    private String departamento;

    @Size(min = 2)
    @Column(name = "provincia")
    private String provincia;

    @Size(min = 2)
    @Column(name = "distrito")
    private String distrito;

    @Column(name = "ubigeo")
    private String ubigeo;

    @OneToMany(mappedBy = "distrito")
    @JsonIgnoreProperties(value = { "areas", "sucursalSeries", "distrito", "usuarios" }, allowSetters = true)
    private Set<Sucursal> sucursals = new HashSet<>();

    @OneToMany(mappedBy = "distrito")
    @JsonIgnoreProperties(value = { "distrito" }, allowSetters = true)
    private Set<Persona> personas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Distrit id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartamento() {
        return this.departamento;
    }

    public Distrit departamento(String departamento) {
        this.setDepartamento(departamento);
        return this;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getProvincia() {
        return this.provincia;
    }

    public Distrit provincia(String provincia) {
        this.setProvincia(provincia);
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getDistrito() {
        return this.distrito;
    }

    public Distrit distrito(String distrito) {
        this.setDistrito(distrito);
        return this;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getUbigeo() {
        return this.ubigeo;
    }

    public Distrit ubigeo(String ubigeo) {
        this.setUbigeo(ubigeo);
        return this;
    }

    public void setUbigeo(String ubigeo) {
        this.ubigeo = ubigeo;
    }

    public Set<Sucursal> getSucursals() {
        return this.sucursals;
    }

    public void setSucursals(Set<Sucursal> sucursals) {
        if (this.sucursals != null) {
            this.sucursals.forEach(i -> i.setDistrito(null));
        }
        if (sucursals != null) {
            sucursals.forEach(i -> i.setDistrito(this));
        }
        this.sucursals = sucursals;
    }

    public Distrit sucursals(Set<Sucursal> sucursals) {
        this.setSucursals(sucursals);
        return this;
    }

    public Distrit addSucursal(Sucursal sucursal) {
        this.sucursals.add(sucursal);
        sucursal.setDistrito(this);
        return this;
    }

    public Distrit removeSucursal(Sucursal sucursal) {
        this.sucursals.remove(sucursal);
        sucursal.setDistrito(null);
        return this;
    }

    public Set<Persona> getPersonas() {
        return this.personas;
    }

    public void setPersonas(Set<Persona> personas) {
        if (this.personas != null) {
            this.personas.forEach(i -> i.setDistrito(null));
        }
        if (personas != null) {
            personas.forEach(i -> i.setDistrito(this));
        }
        this.personas = personas;
    }

    public Distrit personas(Set<Persona> personas) {
        this.setPersonas(personas);
        return this;
    }

    public Distrit addPersona(Persona persona) {
        this.personas.add(persona);
        persona.setDistrito(this);
        return this;
    }

    public Distrit removePersona(Persona persona) {
        this.personas.remove(persona);
        persona.setDistrito(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Distrit)) {
            return false;
        }
        return id != null && id.equals(((Distrit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Distrit{" +
            "id=" + getId() +
            ", departamento='" + getDepartamento() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", distrito='" + getDistrito() + "'" +
            ", ubigeo='" + getUbigeo() + "'" +
            "}";
    }
}
