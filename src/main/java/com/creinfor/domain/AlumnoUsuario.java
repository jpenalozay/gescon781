package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A AlumnoUsuario.
 */
@Entity
@Table(name = "alumno_usuario")
public class AlumnoUsuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "activo")
    private Estado activo;

    @NotNull
    @Size(min = 4, max = 128)
    @Column(name = "usuario", length = 128, nullable = false, unique = true)
    private String usuario;

    @NotNull
    @Size(min = 4, max = 128)
    @Column(name = "clave", length = 128, nullable = false)
    private String clave;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(
        value = { "persona", "alumnoClases", "alumnoUsuarios", "alumnoCategorias", "inscripcions", "horarios" },
        allowSetters = true
    )
    private Alumno alumno;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AlumnoUsuario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public AlumnoUsuario activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public String getUsuario() {
        return this.usuario;
    }

    public AlumnoUsuario usuario(String usuario) {
        this.setUsuario(usuario);
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getClave() {
        return this.clave;
    }

    public AlumnoUsuario clave(String clave) {
        this.setClave(clave);
        return this;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public AlumnoUsuario imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public AlumnoUsuario imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Alumno getAlumno() {
        return this.alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public AlumnoUsuario alumno(Alumno alumno) {
        this.setAlumno(alumno);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AlumnoUsuario)) {
            return false;
        }
        return id != null && id.equals(((AlumnoUsuario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AlumnoUsuario{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", usuario='" + getUsuario() + "'" +
            ", clave='" + getClave() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
