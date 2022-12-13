package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.SiNo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Sucursal.
 */
@Entity
@Table(name = "sucursal")
public class Sucursal implements Serializable {

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
    @Size(min = 1, max = 3)
    @Column(name = "codigo", length = 3, nullable = false, unique = true)
    private String codigo;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "central", nullable = false)
    private SiNo central;

    @NotNull
    @Size(min = 2, max = 256)
    @Column(name = "nombre", length = 256, nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Size(min = 2, max = 64)
    @Column(name = "nombre_corto", length = 64, nullable = false, unique = true)
    private String nombreCorto;

    @NotNull
    @Size(min = 2, max = 16)
    @Column(name = "nombre_abreviado", length = 16, nullable = false, unique = true)
    private String nombreAbreviado;

    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;

    @Size(max = 15)
    @Column(name = "telefono", length = 15)
    private String telefono;

    @Size(max = 15)
    @Column(name = "telefono_1", length = 15)
    private String telefono1;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @NotNull
    @Size(min = 2, max = 512)
    @Column(name = "direccion", length = 512, nullable = false, unique = true)
    private String direccion;

    @OneToMany(mappedBy = "sucursal")
    @JsonIgnoreProperties(value = { "areas", "cargos", "sucursal", "areaSuperior" }, allowSetters = true)
    private Set<Area> areas = new HashSet<>();

    @OneToMany(mappedBy = "sucursal")
    @JsonIgnoreProperties(value = { "inscripcionPagos", "sucursal" }, allowSetters = true)
    private Set<SucursalSerie> sucursalSeries = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "sucursals", "personas" }, allowSetters = true)
    private Distrit distrito;

    @ManyToMany(mappedBy = "sucursals")
    @JsonIgnoreProperties(value = { "user", "empleado", "programacionDeshabilitacions", "sucursals", "computadoras" }, allowSetters = true)
    private Set<Usuario> usuarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Sucursal id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public Sucursal activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Sucursal codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public SiNo getCentral() {
        return this.central;
    }

    public Sucursal central(SiNo central) {
        this.setCentral(central);
        return this;
    }

    public void setCentral(SiNo central) {
        this.central = central;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Sucursal nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public Sucursal nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public String getNombreAbreviado() {
        return this.nombreAbreviado;
    }

    public Sucursal nombreAbreviado(String nombreAbreviado) {
        this.setNombreAbreviado(nombreAbreviado);
        return this;
    }

    public void setNombreAbreviado(String nombreAbreviado) {
        this.nombreAbreviado = nombreAbreviado;
    }

    public LocalDate getFechaInicio() {
        return this.fechaInicio;
    }

    public Sucursal fechaInicio(LocalDate fechaInicio) {
        this.setFechaInicio(fechaInicio);
        return this;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getTelefono() {
        return this.telefono;
    }

    public Sucursal telefono(String telefono) {
        this.setTelefono(telefono);
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getTelefono1() {
        return this.telefono1;
    }

    public Sucursal telefono1(String telefono1) {
        this.setTelefono1(telefono1);
        return this;
    }

    public void setTelefono1(String telefono1) {
        this.telefono1 = telefono1;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public Sucursal imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public Sucursal imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public String getDireccion() {
        return this.direccion;
    }

    public Sucursal direccion(String direccion) {
        this.setDireccion(direccion);
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Set<Area> getAreas() {
        return this.areas;
    }

    public void setAreas(Set<Area> areas) {
        if (this.areas != null) {
            this.areas.forEach(i -> i.setSucursal(null));
        }
        if (areas != null) {
            areas.forEach(i -> i.setSucursal(this));
        }
        this.areas = areas;
    }

    public Sucursal areas(Set<Area> areas) {
        this.setAreas(areas);
        return this;
    }

    public Sucursal addArea(Area area) {
        this.areas.add(area);
        area.setSucursal(this);
        return this;
    }

    public Sucursal removeArea(Area area) {
        this.areas.remove(area);
        area.setSucursal(null);
        return this;
    }

    public Set<SucursalSerie> getSucursalSeries() {
        return this.sucursalSeries;
    }

    public void setSucursalSeries(Set<SucursalSerie> sucursalSeries) {
        if (this.sucursalSeries != null) {
            this.sucursalSeries.forEach(i -> i.setSucursal(null));
        }
        if (sucursalSeries != null) {
            sucursalSeries.forEach(i -> i.setSucursal(this));
        }
        this.sucursalSeries = sucursalSeries;
    }

    public Sucursal sucursalSeries(Set<SucursalSerie> sucursalSeries) {
        this.setSucursalSeries(sucursalSeries);
        return this;
    }

    public Sucursal addSucursalSerie(SucursalSerie sucursalSerie) {
        this.sucursalSeries.add(sucursalSerie);
        sucursalSerie.setSucursal(this);
        return this;
    }

    public Sucursal removeSucursalSerie(SucursalSerie sucursalSerie) {
        this.sucursalSeries.remove(sucursalSerie);
        sucursalSerie.setSucursal(null);
        return this;
    }

    public Distrit getDistrito() {
        return this.distrito;
    }

    public void setDistrito(Distrit distrit) {
        this.distrito = distrit;
    }

    public Sucursal distrito(Distrit distrit) {
        this.setDistrito(distrit);
        return this;
    }

    public Set<Usuario> getUsuarios() {
        return this.usuarios;
    }

    public void setUsuarios(Set<Usuario> usuarios) {
        if (this.usuarios != null) {
            this.usuarios.forEach(i -> i.removeSucursal(this));
        }
        if (usuarios != null) {
            usuarios.forEach(i -> i.addSucursal(this));
        }
        this.usuarios = usuarios;
    }

    public Sucursal usuarios(Set<Usuario> usuarios) {
        this.setUsuarios(usuarios);
        return this;
    }

    public Sucursal addUsuario(Usuario usuario) {
        this.usuarios.add(usuario);
        usuario.getSucursals().add(this);
        return this;
    }

    public Sucursal removeUsuario(Usuario usuario) {
        this.usuarios.remove(usuario);
        usuario.getSucursals().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sucursal)) {
            return false;
        }
        return id != null && id.equals(((Sucursal) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sucursal{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", central='" + getCentral() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", nombreCorto='" + getNombreCorto() + "'" +
            ", nombreAbreviado='" + getNombreAbreviado() + "'" +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", telefono1='" + getTelefono1() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", direccion='" + getDireccion() + "'" +
            "}";
    }
}
