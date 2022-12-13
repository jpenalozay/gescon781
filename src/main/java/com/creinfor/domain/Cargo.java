package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Cargo.
 */
@Entity
@Table(name = "t_cargo")
public class Cargo implements Serializable {

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
    @Size(min = 2, max = 4)
    @Column(name = "codigo", length = 4, nullable = false, unique = true)
    private String codigo;

    @NotNull
    @Size(min = 2, max = 256)
    @Column(name = "nombre", length = 256, nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Size(min = 2, max = 64)
    @Column(name = "nombre_corto", length = 64, nullable = false, unique = true)
    private String nombreCorto;

    @OneToMany(mappedBy = "cargoSuperior")
    @JsonIgnoreProperties(value = { "cargos", "empleados", "areaPerteneciente", "cargoSuperior" }, allowSetters = true)
    private Set<Cargo> cargos = new HashSet<>();

    @OneToMany(mappedBy = "cargo")
    @JsonIgnoreProperties(value = { "persona", "cargo" }, allowSetters = true)
    private Set<Empleado> empleados = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "areas", "cargos", "sucursal", "areaSuperior" }, allowSetters = true)
    private Area areaPerteneciente;

    @ManyToOne
    @JsonIgnoreProperties(value = { "cargos", "empleados", "areaPerteneciente", "cargoSuperior" }, allowSetters = true)
    private Cargo cargoSuperior;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cargo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public Cargo activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Cargo codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Cargo nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public Cargo nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public Set<Cargo> getCargos() {
        return this.cargos;
    }

    public void setCargos(Set<Cargo> cargos) {
        if (this.cargos != null) {
            this.cargos.forEach(i -> i.setCargoSuperior(null));
        }
        if (cargos != null) {
            cargos.forEach(i -> i.setCargoSuperior(this));
        }
        this.cargos = cargos;
    }

    public Cargo cargos(Set<Cargo> cargos) {
        this.setCargos(cargos);
        return this;
    }

    public Cargo addCargo(Cargo cargo) {
        this.cargos.add(cargo);
        cargo.setCargoSuperior(this);
        return this;
    }

    public Cargo removeCargo(Cargo cargo) {
        this.cargos.remove(cargo);
        cargo.setCargoSuperior(null);
        return this;
    }

    public Set<Empleado> getEmpleados() {
        return this.empleados;
    }

    public void setEmpleados(Set<Empleado> empleados) {
        if (this.empleados != null) {
            this.empleados.forEach(i -> i.setCargo(null));
        }
        if (empleados != null) {
            empleados.forEach(i -> i.setCargo(this));
        }
        this.empleados = empleados;
    }

    public Cargo empleados(Set<Empleado> empleados) {
        this.setEmpleados(empleados);
        return this;
    }

    public Cargo addEmpleado(Empleado empleado) {
        this.empleados.add(empleado);
        empleado.setCargo(this);
        return this;
    }

    public Cargo removeEmpleado(Empleado empleado) {
        this.empleados.remove(empleado);
        empleado.setCargo(null);
        return this;
    }

    public Area getAreaPerteneciente() {
        return this.areaPerteneciente;
    }

    public void setAreaPerteneciente(Area area) {
        this.areaPerteneciente = area;
    }

    public Cargo areaPerteneciente(Area area) {
        this.setAreaPerteneciente(area);
        return this;
    }

    public Cargo getCargoSuperior() {
        return this.cargoSuperior;
    }

    public void setCargoSuperior(Cargo cargo) {
        this.cargoSuperior = cargo;
    }

    public Cargo cargoSuperior(Cargo cargo) {
        this.setCargoSuperior(cargo);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cargo)) {
            return false;
        }
        return id != null && id.equals(((Cargo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cargo{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", nombreCorto='" + getNombreCorto() + "'" +
            "}";
    }
}
