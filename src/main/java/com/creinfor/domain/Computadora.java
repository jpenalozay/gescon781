package com.creinfor.domain;

import com.creinfor.domain.enumeration.ComputadoraTipo;
import com.creinfor.domain.enumeration.Estado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Computadora.
 */
@Entity
@Table(name = "computadora")
public class Computadora implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 2, max = 256)
    @Column(name = "nombre", length = 256, nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Size(min = 2, max = 64)
    @Column(name = "nombre_corto", length = 64, nullable = false, unique = true)
    private String nombreCorto;

    @NotNull
    @Size(min = 2, max = 512)
    @Column(name = "descripcion", length = 512, nullable = false, unique = true)
    private String descripcion;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado_computadora", nullable = false)
    private Estado estadoComputadora;

    @NotNull
    @Size(min = 2, max = 30)
    @Column(name = "mac", length = 30, nullable = false, unique = true)
    private String mac;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private ComputadoraTipo tipo;

    @ManyToMany(mappedBy = "computadoras")
    @JsonIgnoreProperties(value = { "user", "empleado", "programacionDeshabilitacions", "sucursals", "computadoras" }, allowSetters = true)
    private Set<Usuario> usuarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Computadora id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Computadora nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public Computadora nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Computadora descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Estado getEstadoComputadora() {
        return this.estadoComputadora;
    }

    public Computadora estadoComputadora(Estado estadoComputadora) {
        this.setEstadoComputadora(estadoComputadora);
        return this;
    }

    public void setEstadoComputadora(Estado estadoComputadora) {
        this.estadoComputadora = estadoComputadora;
    }

    public String getMac() {
        return this.mac;
    }

    public Computadora mac(String mac) {
        this.setMac(mac);
        return this;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public ComputadoraTipo getTipo() {
        return this.tipo;
    }

    public Computadora tipo(ComputadoraTipo tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(ComputadoraTipo tipo) {
        this.tipo = tipo;
    }

    public Set<Usuario> getUsuarios() {
        return this.usuarios;
    }

    public void setUsuarios(Set<Usuario> usuarios) {
        if (this.usuarios != null) {
            this.usuarios.forEach(i -> i.removeComputadora(this));
        }
        if (usuarios != null) {
            usuarios.forEach(i -> i.addComputadora(this));
        }
        this.usuarios = usuarios;
    }

    public Computadora usuarios(Set<Usuario> usuarios) {
        this.setUsuarios(usuarios);
        return this;
    }

    public Computadora addUsuario(Usuario usuario) {
        this.usuarios.add(usuario);
        usuario.getComputadoras().add(this);
        return this;
    }

    public Computadora removeUsuario(Usuario usuario) {
        this.usuarios.remove(usuario);
        usuario.getComputadoras().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Computadora)) {
            return false;
        }
        return id != null && id.equals(((Computadora) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Computadora{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", nombreCorto='" + getNombreCorto() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", estadoComputadora='" + getEstadoComputadora() + "'" +
            ", mac='" + getMac() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
