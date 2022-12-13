package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Teoria.
 */
@Entity
@Table(name = "teoria")
public class Teoria implements Serializable {

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
    @Size(min = 2, max = 512)
    @Column(name = "nombre", length = 512, nullable = false, unique = true)
    private String nombre;

    @NotNull
    @Size(min = 2, max = 64)
    @Column(name = "nombre_corto", length = 64, nullable = false, unique = true)
    private String nombreCorto;

    @Size(min = 2, max = 512)
    @Column(name = "descripcion", length = 512)
    private String descripcion;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @ManyToMany
    @JoinTable(
        name = "rel_teoria__horarios",
        joinColumns = @JoinColumn(name = "teoria_id"),
        inverseJoinColumns = @JoinColumn(name = "horarios_id")
    )
    @JsonIgnoreProperties(value = { "inscripcionDetalles", "teorias", "asignaturas" }, allowSetters = true)
    private Set<TeoriaHorarioCatalogo> horarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Teoria id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public Teoria activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Teoria nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public Teoria nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Teoria descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public Teoria imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public Teoria imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Set<TeoriaHorarioCatalogo> getHorarios() {
        return this.horarios;
    }

    public void setHorarios(Set<TeoriaHorarioCatalogo> teoriaHorarioCatalogos) {
        this.horarios = teoriaHorarioCatalogos;
    }

    public Teoria horarios(Set<TeoriaHorarioCatalogo> teoriaHorarioCatalogos) {
        this.setHorarios(teoriaHorarioCatalogos);
        return this;
    }

    public Teoria addHorarios(TeoriaHorarioCatalogo teoriaHorarioCatalogo) {
        this.horarios.add(teoriaHorarioCatalogo);
        teoriaHorarioCatalogo.getTeorias().add(this);
        return this;
    }

    public Teoria removeHorarios(TeoriaHorarioCatalogo teoriaHorarioCatalogo) {
        this.horarios.remove(teoriaHorarioCatalogo);
        teoriaHorarioCatalogo.getTeorias().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Teoria)) {
            return false;
        }
        return id != null && id.equals(((Teoria) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Teoria{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", nombreCorto='" + getNombreCorto() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
