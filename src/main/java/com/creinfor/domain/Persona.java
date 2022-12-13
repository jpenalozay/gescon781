package com.creinfor.domain;

import com.creinfor.domain.enumeration.EstadoCivilPersona;
import com.creinfor.domain.enumeration.Paises;
import com.creinfor.domain.enumeration.Sexo;
import com.creinfor.domain.enumeration.TipoDocumentoPersona;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Persona.
 */
@Entity
@Table(name = "persona")
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "nacionalidad")
    private Paises nacionalidad;

    @NotNull
    @Size(min = 1, max = 128)
    @Column(name = "nombres", length = 128, nullable = false)
    private String nombres;

    @NotNull
    @Size(min = 1, max = 128)
    @Column(name = "apellido_paterno", length = 128, nullable = false)
    private String apellidoPaterno;

    @Size(min = 1, max = 128)
    @Column(name = "apellido_materno", length = 128)
    private String apellidoMaterno;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Enumerated(EnumType.STRING)
    @Column(name = "genero")
    private Sexo genero;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_civil")
    private EstadoCivilPersona estadoCivil;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_documento", nullable = false)
    private TipoDocumentoPersona tipoDocumento;

    @NotNull
    @Size(min = 2, max = 15)
    @Column(name = "numero_documento", length = 15, nullable = false, unique = true)
    private String numeroDocumento;

    @Size(min = 1, max = 20)
    @Column(name = "telefono_particular", length = 20)
    private String telefonoParticular;

    @Size(min = 1, max = 20)
    @Column(name = "telefono_particular_1", length = 20)
    private String telefonoParticular1;

    @Size(min = 1, max = 128)
    @Column(name = "email_personal", length = 128)
    private String emailPersonal;

    @Size(min = 1, max = 512)
    @Column(name = "direccion", length = 512)
    private String direccion;

    @ManyToOne
    @JsonIgnoreProperties(value = { "sucursals", "personas" }, allowSetters = true)
    private Distrit distrito;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Persona id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Paises getNacionalidad() {
        return this.nacionalidad;
    }

    public Persona nacionalidad(Paises nacionalidad) {
        this.setNacionalidad(nacionalidad);
        return this;
    }

    public void setNacionalidad(Paises nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public String getNombres() {
        return this.nombres;
    }

    public Persona nombres(String nombres) {
        this.setNombres(nombres);
        return this;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidoPaterno() {
        return this.apellidoPaterno;
    }

    public Persona apellidoPaterno(String apellidoPaterno) {
        this.setApellidoPaterno(apellidoPaterno);
        return this;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return this.apellidoMaterno;
    }

    public Persona apellidoMaterno(String apellidoMaterno) {
        this.setApellidoMaterno(apellidoMaterno);
        return this;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public LocalDate getFechaNacimiento() {
        return this.fechaNacimiento;
    }

    public Persona fechaNacimiento(LocalDate fechaNacimiento) {
        this.setFechaNacimiento(fechaNacimiento);
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Sexo getGenero() {
        return this.genero;
    }

    public Persona genero(Sexo genero) {
        this.setGenero(genero);
        return this;
    }

    public void setGenero(Sexo genero) {
        this.genero = genero;
    }

    public EstadoCivilPersona getEstadoCivil() {
        return this.estadoCivil;
    }

    public Persona estadoCivil(EstadoCivilPersona estadoCivil) {
        this.setEstadoCivil(estadoCivil);
        return this;
    }

    public void setEstadoCivil(EstadoCivilPersona estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public TipoDocumentoPersona getTipoDocumento() {
        return this.tipoDocumento;
    }

    public Persona tipoDocumento(TipoDocumentoPersona tipoDocumento) {
        this.setTipoDocumento(tipoDocumento);
        return this;
    }

    public void setTipoDocumento(TipoDocumentoPersona tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getNumeroDocumento() {
        return this.numeroDocumento;
    }

    public Persona numeroDocumento(String numeroDocumento) {
        this.setNumeroDocumento(numeroDocumento);
        return this;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getTelefonoParticular() {
        return this.telefonoParticular;
    }

    public Persona telefonoParticular(String telefonoParticular) {
        this.setTelefonoParticular(telefonoParticular);
        return this;
    }

    public void setTelefonoParticular(String telefonoParticular) {
        this.telefonoParticular = telefonoParticular;
    }

    public String getTelefonoParticular1() {
        return this.telefonoParticular1;
    }

    public Persona telefonoParticular1(String telefonoParticular1) {
        this.setTelefonoParticular1(telefonoParticular1);
        return this;
    }

    public void setTelefonoParticular1(String telefonoParticular1) {
        this.telefonoParticular1 = telefonoParticular1;
    }

    public String getEmailPersonal() {
        return this.emailPersonal;
    }

    public Persona emailPersonal(String emailPersonal) {
        this.setEmailPersonal(emailPersonal);
        return this;
    }

    public void setEmailPersonal(String emailPersonal) {
        this.emailPersonal = emailPersonal;
    }

    public String getDireccion() {
        return this.direccion;
    }

    public Persona direccion(String direccion) {
        this.setDireccion(direccion);
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Distrit getDistrito() {
        return this.distrito;
    }

    public void setDistrito(Distrit distrit) {
        this.distrito = distrit;
    }

    public Persona distrito(Distrit distrit) {
        this.setDistrito(distrit);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Persona)) {
            return false;
        }
        return id != null && id.equals(((Persona) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Persona{" +
            "id=" + getId() +
            ", nacionalidad='" + getNacionalidad() + "'" +
            ", nombres='" + getNombres() + "'" +
            ", apellidoPaterno='" + getApellidoPaterno() + "'" +
            ", apellidoMaterno='" + getApellidoMaterno() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", genero='" + getGenero() + "'" +
            ", estadoCivil='" + getEstadoCivil() + "'" +
            ", tipoDocumento='" + getTipoDocumento() + "'" +
            ", numeroDocumento='" + getNumeroDocumento() + "'" +
            ", telefonoParticular='" + getTelefonoParticular() + "'" +
            ", telefonoParticular1='" + getTelefonoParticular1() + "'" +
            ", emailPersonal='" + getEmailPersonal() + "'" +
            ", direccion='" + getDireccion() + "'" +
            "}";
    }
}
