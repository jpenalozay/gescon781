package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.TipoUnidadOrganizativa;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Area.
 */
@Entity
@Table(name = "t_area")
public class Area implements Serializable {

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
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoUnidadOrganizativa tipo;

    @NotNull
    @Size(min = 2, max = 256)
    @Column(name = "nombre", length = 256, nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Size(min = 2, max = 64)
    @Column(name = "nombre_corto", length = 64, nullable = false, unique = true)
    private String nombreCorto;

    @OneToMany(mappedBy = "areaSuperior")
    @JsonIgnoreProperties(value = { "areas", "cargos", "sucursal", "areaSuperior" }, allowSetters = true)
    private Set<Area> areas = new HashSet<>();

    @OneToMany(mappedBy = "areaPerteneciente")
    @JsonIgnoreProperties(value = { "cargos", "empleados", "areaPerteneciente", "cargoSuperior" }, allowSetters = true)
    private Set<Cargo> cargos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "areas", "sucursalSeries", "distrito", "usuarios" }, allowSetters = true)
    private Sucursal sucursal;

    @ManyToOne
    @JsonIgnoreProperties(value = { "areas", "cargos", "sucursal", "areaSuperior" }, allowSetters = true)
    private Area areaSuperior;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Area id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public Area activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Area codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public TipoUnidadOrganizativa getTipo() {
        return this.tipo;
    }

    public Area tipo(TipoUnidadOrganizativa tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(TipoUnidadOrganizativa tipo) {
        this.tipo = tipo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Area nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public Area nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public Set<Area> getAreas() {
        return this.areas;
    }

    public void setAreas(Set<Area> areas) {
        if (this.areas != null) {
            this.areas.forEach(i -> i.setAreaSuperior(null));
        }
        if (areas != null) {
            areas.forEach(i -> i.setAreaSuperior(this));
        }
        this.areas = areas;
    }

    public Area areas(Set<Area> areas) {
        this.setAreas(areas);
        return this;
    }

    public Area addArea(Area area) {
        this.areas.add(area);
        area.setAreaSuperior(this);
        return this;
    }

    public Area removeArea(Area area) {
        this.areas.remove(area);
        area.setAreaSuperior(null);
        return this;
    }

    public Set<Cargo> getCargos() {
        return this.cargos;
    }

    public void setCargos(Set<Cargo> cargos) {
        if (this.cargos != null) {
            this.cargos.forEach(i -> i.setAreaPerteneciente(null));
        }
        if (cargos != null) {
            cargos.forEach(i -> i.setAreaPerteneciente(this));
        }
        this.cargos = cargos;
    }

    public Area cargos(Set<Cargo> cargos) {
        this.setCargos(cargos);
        return this;
    }

    public Area addCargo(Cargo cargo) {
        this.cargos.add(cargo);
        cargo.setAreaPerteneciente(this);
        return this;
    }

    public Area removeCargo(Cargo cargo) {
        this.cargos.remove(cargo);
        cargo.setAreaPerteneciente(null);
        return this;
    }

    public Sucursal getSucursal() {
        return this.sucursal;
    }

    public void setSucursal(Sucursal sucursal) {
        this.sucursal = sucursal;
    }

    public Area sucursal(Sucursal sucursal) {
        this.setSucursal(sucursal);
        return this;
    }

    public Area getAreaSuperior() {
        return this.areaSuperior;
    }

    public void setAreaSuperior(Area area) {
        this.areaSuperior = area;
    }

    public Area areaSuperior(Area area) {
        this.setAreaSuperior(area);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Area)) {
            return false;
        }
        return id != null && id.equals(((Area) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Area{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", nombreCorto='" + getNombreCorto() + "'" +
            "}";
    }
}
