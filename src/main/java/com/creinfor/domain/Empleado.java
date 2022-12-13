package com.creinfor.domain;

import com.creinfor.domain.enumeration.EmpleadoTipo;
import com.creinfor.domain.enumeration.EstadoEmpleado;
import com.creinfor.domain.enumeration.GradoInstruccion;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Empleado.
 */
@Entity
@Table(name = "empleado")
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EstadoEmpleado estado;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private EmpleadoTipo tipo;

    @NotNull
    @Size(min = 1, max = 6)
    @Column(name = "codigo", length = 6, nullable = false, unique = true)
    private String codigo;

    @Size(min = 1, max = 5)
    @Column(name = "codigo_acceso", length = 5)
    private String codigoAcceso;

    @Size(min = 1, max = 20)
    @Column(name = "telefono_trabajo", length = 20)
    private String telefonoTrabajo;

    @Size(min = 1, max = 20)
    @Column(name = "telefono_trabajo_1", length = 20)
    private String telefonoTrabajo1;

    @Enumerated(EnumType.STRING)
    @Column(name = "grado_instrucion")
    private GradoInstruccion gradoInstrucion;

    @Size(min = 1, max = 128)
    @Column(name = "email_coorporativo", length = 128, unique = true)
    private String emailCoorporativo;

    @NotNull
    @Column(name = "fecha_ingreso", nullable = false)
    private LocalDate fechaIngreso;

    @DecimalMin(value = "0")
    @DecimalMax(value = "100")
    @Column(name = "inasistencias")
    private Float inasistencias;

    @DecimalMin(value = "0")
    @DecimalMax(value = "100")
    @Column(name = "tardanzas")
    private Float tardanzas;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @Column(name = "sueldo")
    private Float sueldo;

    @Lob
    @Column(name = "firma")
    private byte[] firma;

    @Column(name = "firma_content_type")
    private String firmaContentType;

    @JsonIgnoreProperties(value = { "distrito" }, allowSetters = true)
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Persona persona;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "cargos", "empleados", "areaPerteneciente", "cargoSuperior" }, allowSetters = true)
    private Cargo cargo;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Empleado id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EstadoEmpleado getEstado() {
        return this.estado;
    }

    public Empleado estado(EstadoEmpleado estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(EstadoEmpleado estado) {
        this.estado = estado;
    }

    public EmpleadoTipo getTipo() {
        return this.tipo;
    }

    public Empleado tipo(EmpleadoTipo tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(EmpleadoTipo tipo) {
        this.tipo = tipo;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Empleado codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getCodigoAcceso() {
        return this.codigoAcceso;
    }

    public Empleado codigoAcceso(String codigoAcceso) {
        this.setCodigoAcceso(codigoAcceso);
        return this;
    }

    public void setCodigoAcceso(String codigoAcceso) {
        this.codigoAcceso = codigoAcceso;
    }

    public String getTelefonoTrabajo() {
        return this.telefonoTrabajo;
    }

    public Empleado telefonoTrabajo(String telefonoTrabajo) {
        this.setTelefonoTrabajo(telefonoTrabajo);
        return this;
    }

    public void setTelefonoTrabajo(String telefonoTrabajo) {
        this.telefonoTrabajo = telefonoTrabajo;
    }

    public String getTelefonoTrabajo1() {
        return this.telefonoTrabajo1;
    }

    public Empleado telefonoTrabajo1(String telefonoTrabajo1) {
        this.setTelefonoTrabajo1(telefonoTrabajo1);
        return this;
    }

    public void setTelefonoTrabajo1(String telefonoTrabajo1) {
        this.telefonoTrabajo1 = telefonoTrabajo1;
    }

    public GradoInstruccion getGradoInstrucion() {
        return this.gradoInstrucion;
    }

    public Empleado gradoInstrucion(GradoInstruccion gradoInstrucion) {
        this.setGradoInstrucion(gradoInstrucion);
        return this;
    }

    public void setGradoInstrucion(GradoInstruccion gradoInstrucion) {
        this.gradoInstrucion = gradoInstrucion;
    }

    public String getEmailCoorporativo() {
        return this.emailCoorporativo;
    }

    public Empleado emailCoorporativo(String emailCoorporativo) {
        this.setEmailCoorporativo(emailCoorporativo);
        return this;
    }

    public void setEmailCoorporativo(String emailCoorporativo) {
        this.emailCoorporativo = emailCoorporativo;
    }

    public LocalDate getFechaIngreso() {
        return this.fechaIngreso;
    }

    public Empleado fechaIngreso(LocalDate fechaIngreso) {
        this.setFechaIngreso(fechaIngreso);
        return this;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Float getInasistencias() {
        return this.inasistencias;
    }

    public Empleado inasistencias(Float inasistencias) {
        this.setInasistencias(inasistencias);
        return this;
    }

    public void setInasistencias(Float inasistencias) {
        this.inasistencias = inasistencias;
    }

    public Float getTardanzas() {
        return this.tardanzas;
    }

    public Empleado tardanzas(Float tardanzas) {
        this.setTardanzas(tardanzas);
        return this;
    }

    public void setTardanzas(Float tardanzas) {
        this.tardanzas = tardanzas;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public Empleado imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public Empleado imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Float getSueldo() {
        return this.sueldo;
    }

    public Empleado sueldo(Float sueldo) {
        this.setSueldo(sueldo);
        return this;
    }

    public void setSueldo(Float sueldo) {
        this.sueldo = sueldo;
    }

    public byte[] getFirma() {
        return this.firma;
    }

    public Empleado firma(byte[] firma) {
        this.setFirma(firma);
        return this;
    }

    public void setFirma(byte[] firma) {
        this.firma = firma;
    }

    public String getFirmaContentType() {
        return this.firmaContentType;
    }

    public Empleado firmaContentType(String firmaContentType) {
        this.firmaContentType = firmaContentType;
        return this;
    }

    public void setFirmaContentType(String firmaContentType) {
        this.firmaContentType = firmaContentType;
    }

    public Persona getPersona() {
        return this.persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Empleado persona(Persona persona) {
        this.setPersona(persona);
        return this;
    }

    public Cargo getCargo() {
        return this.cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public Empleado cargo(Cargo cargo) {
        this.setCargo(cargo);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empleado)) {
            return false;
        }
        return id != null && id.equals(((Empleado) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Empleado{" +
            "id=" + getId() +
            ", estado='" + getEstado() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", codigoAcceso='" + getCodigoAcceso() + "'" +
            ", telefonoTrabajo='" + getTelefonoTrabajo() + "'" +
            ", telefonoTrabajo1='" + getTelefonoTrabajo1() + "'" +
            ", gradoInstrucion='" + getGradoInstrucion() + "'" +
            ", emailCoorporativo='" + getEmailCoorporativo() + "'" +
            ", fechaIngreso='" + getFechaIngreso() + "'" +
            ", inasistencias=" + getInasistencias() +
            ", tardanzas=" + getTardanzas() +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            ", sueldo=" + getSueldo() +
            ", firma='" + getFirma() + "'" +
            ", firmaContentType='" + getFirmaContentType() + "'" +
            "}";
    }
}
