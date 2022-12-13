package com.creinfor.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 2, max = 6)
    @Column(name = "codigo", length = 6, nullable = false, unique = true)
    private String codigo;

    @Size(min = 2, max = 6)
    @Column(name = "codigo_secreto", length = 6)
    private String codigoSecreto;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    @JsonIgnoreProperties(value = { "persona", "cargo" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Empleado empleado;

    @OneToMany(mappedBy = "usuario")
    @JsonIgnoreProperties(
        value = { "horarioDeshabilitaciones", "fechas", "horarioCatalogos", "programacion", "usuario" },
        allowSetters = true
    )
    private Set<ProgramacionDeshabilitacion> programacionDeshabilitacions = new HashSet<>();

    @ManyToMany
    @NotNull
    @JoinTable(
        name = "rel_usuario__sucursal",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "sucursal_id")
    )
    @JsonIgnoreProperties(value = { "areas", "sucursalSeries", "distrito", "usuarios" }, allowSetters = true)
    private Set<Sucursal> sucursals = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_usuario__computadora",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "computadora_id")
    )
    @JsonIgnoreProperties(value = { "usuarios" }, allowSetters = true)
    private Set<Computadora> computadoras = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Usuario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Usuario codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getCodigoSecreto() {
        return this.codigoSecreto;
    }

    public Usuario codigoSecreto(String codigoSecreto) {
        this.setCodigoSecreto(codigoSecreto);
        return this;
    }

    public void setCodigoSecreto(String codigoSecreto) {
        this.codigoSecreto = codigoSecreto;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public Usuario imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public Usuario imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Usuario user(User user) {
        this.setUser(user);
        return this;
    }

    public Empleado getEmpleado() {
        return this.empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }

    public Usuario empleado(Empleado empleado) {
        this.setEmpleado(empleado);
        return this;
    }

    public Set<ProgramacionDeshabilitacion> getProgramacionDeshabilitacions() {
        return this.programacionDeshabilitacions;
    }

    public void setProgramacionDeshabilitacions(Set<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        if (this.programacionDeshabilitacions != null) {
            this.programacionDeshabilitacions.forEach(i -> i.setUsuario(null));
        }
        if (programacionDeshabilitacions != null) {
            programacionDeshabilitacions.forEach(i -> i.setUsuario(this));
        }
        this.programacionDeshabilitacions = programacionDeshabilitacions;
    }

    public Usuario programacionDeshabilitacions(Set<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        this.setProgramacionDeshabilitacions(programacionDeshabilitacions);
        return this;
    }

    public Usuario addProgramacionDeshabilitacion(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        this.programacionDeshabilitacions.add(programacionDeshabilitacion);
        programacionDeshabilitacion.setUsuario(this);
        return this;
    }

    public Usuario removeProgramacionDeshabilitacion(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        this.programacionDeshabilitacions.remove(programacionDeshabilitacion);
        programacionDeshabilitacion.setUsuario(null);
        return this;
    }

    public Set<Sucursal> getSucursals() {
        return this.sucursals;
    }

    public void setSucursals(Set<Sucursal> sucursals) {
        this.sucursals = sucursals;
    }

    public Usuario sucursals(Set<Sucursal> sucursals) {
        this.setSucursals(sucursals);
        return this;
    }

    public Usuario addSucursal(Sucursal sucursal) {
        this.sucursals.add(sucursal);
        sucursal.getUsuarios().add(this);
        return this;
    }

    public Usuario removeSucursal(Sucursal sucursal) {
        this.sucursals.remove(sucursal);
        sucursal.getUsuarios().remove(this);
        return this;
    }

    public Set<Computadora> getComputadoras() {
        return this.computadoras;
    }

    public void setComputadoras(Set<Computadora> computadoras) {
        this.computadoras = computadoras;
    }

    public Usuario computadoras(Set<Computadora> computadoras) {
        this.setComputadoras(computadoras);
        return this;
    }

    public Usuario addComputadora(Computadora computadora) {
        this.computadoras.add(computadora);
        computadora.getUsuarios().add(this);
        return this;
    }

    public Usuario removeComputadora(Computadora computadora) {
        this.computadoras.remove(computadora);
        computadora.getUsuarios().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Usuario)) {
            return false;
        }
        return id != null && id.equals(((Usuario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", codigoSecreto='" + getCodigoSecreto() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
