package com.creinfor.domain;

import com.creinfor.domain.enumeration.AutomovilCaja;
import com.creinfor.domain.enumeration.AutomovilTipo;
import com.creinfor.domain.enumeration.Estado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Automovil.
 */
@Entity
@Table(name = "automovil")
public class Automovil implements Serializable {

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
    @Size(min = 1, max = 6)
    @Column(name = "codigo", length = 6, nullable = false, unique = true)
    private String codigo;

    @Size(min = 2, max = 64)
    @Column(name = "nombre", length = 64, unique = true)
    private String nombre;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private AutomovilTipo tipo;

    @NotNull
    @Size(min = 2, max = 64)
    @Column(name = "placa", length = 64, nullable = false, unique = true)
    private String placa;

    @Size(min = 2, max = 64)
    @Column(name = "marca", length = 64)
    private String marca;

    @Size(min = 2, max = 64)
    @Column(name = "modelo", length = 64)
    private String modelo;

    @Size(min = 4, max = 4)
    @Column(name = "anio", length = 4)
    private String anio;

    @Column(name = "soat_vencimiento")
    private Instant soatVencimiento;

    @Column(name = "revision_tecnica_vencimiento")
    private Instant revisionTecnicaVencimiento;

    @Enumerated(EnumType.STRING)
    @Column(name = "caja")
    private AutomovilCaja caja;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @OneToMany(mappedBy = "automovil")
    @JsonIgnoreProperties(
        value = { "programacionDeshabilitacions", "horarios", "dias", "horarioCatalogos", "profesor", "automovil" },
        allowSetters = true
    )
    private Set<Programacion> programacions = new HashSet<>();

    @OneToMany(mappedBy = "automovil")
    @JsonIgnoreProperties(
        value = {
            "horarioDeshabilitacions", "alumno", "instructor", "programacion", "fecha", "horarioCatalogo", "automovil", "lugarSalida",
        },
        allowSetters = true
    )
    private Set<Horario> horarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Automovil id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public Automovil activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Automovil codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Automovil nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public AutomovilTipo getTipo() {
        return this.tipo;
    }

    public Automovil tipo(AutomovilTipo tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(AutomovilTipo tipo) {
        this.tipo = tipo;
    }

    public String getPlaca() {
        return this.placa;
    }

    public Automovil placa(String placa) {
        this.setPlaca(placa);
        return this;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getMarca() {
        return this.marca;
    }

    public Automovil marca(String marca) {
        this.setMarca(marca);
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return this.modelo;
    }

    public Automovil modelo(String modelo) {
        this.setModelo(modelo);
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getAnio() {
        return this.anio;
    }

    public Automovil anio(String anio) {
        this.setAnio(anio);
        return this;
    }

    public void setAnio(String anio) {
        this.anio = anio;
    }

    public Instant getSoatVencimiento() {
        return this.soatVencimiento;
    }

    public Automovil soatVencimiento(Instant soatVencimiento) {
        this.setSoatVencimiento(soatVencimiento);
        return this;
    }

    public void setSoatVencimiento(Instant soatVencimiento) {
        this.soatVencimiento = soatVencimiento;
    }

    public Instant getRevisionTecnicaVencimiento() {
        return this.revisionTecnicaVencimiento;
    }

    public Automovil revisionTecnicaVencimiento(Instant revisionTecnicaVencimiento) {
        this.setRevisionTecnicaVencimiento(revisionTecnicaVencimiento);
        return this;
    }

    public void setRevisionTecnicaVencimiento(Instant revisionTecnicaVencimiento) {
        this.revisionTecnicaVencimiento = revisionTecnicaVencimiento;
    }

    public AutomovilCaja getCaja() {
        return this.caja;
    }

    public Automovil caja(AutomovilCaja caja) {
        this.setCaja(caja);
        return this;
    }

    public void setCaja(AutomovilCaja caja) {
        this.caja = caja;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public Automovil imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public Automovil imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Set<Programacion> getProgramacions() {
        return this.programacions;
    }

    public void setProgramacions(Set<Programacion> programacions) {
        if (this.programacions != null) {
            this.programacions.forEach(i -> i.setAutomovil(null));
        }
        if (programacions != null) {
            programacions.forEach(i -> i.setAutomovil(this));
        }
        this.programacions = programacions;
    }

    public Automovil programacions(Set<Programacion> programacions) {
        this.setProgramacions(programacions);
        return this;
    }

    public Automovil addProgramacion(Programacion programacion) {
        this.programacions.add(programacion);
        programacion.setAutomovil(this);
        return this;
    }

    public Automovil removeProgramacion(Programacion programacion) {
        this.programacions.remove(programacion);
        programacion.setAutomovil(null);
        return this;
    }

    public Set<Horario> getHorarios() {
        return this.horarios;
    }

    public void setHorarios(Set<Horario> horarios) {
        if (this.horarios != null) {
            this.horarios.forEach(i -> i.setAutomovil(null));
        }
        if (horarios != null) {
            horarios.forEach(i -> i.setAutomovil(this));
        }
        this.horarios = horarios;
    }

    public Automovil horarios(Set<Horario> horarios) {
        this.setHorarios(horarios);
        return this;
    }

    public Automovil addHorario(Horario horario) {
        this.horarios.add(horario);
        horario.setAutomovil(this);
        return this;
    }

    public Automovil removeHorario(Horario horario) {
        this.horarios.remove(horario);
        horario.setAutomovil(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Automovil)) {
            return false;
        }
        return id != null && id.equals(((Automovil) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Automovil{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", placa='" + getPlaca() + "'" +
            ", marca='" + getMarca() + "'" +
            ", modelo='" + getModelo() + "'" +
            ", anio='" + getAnio() + "'" +
            ", soatVencimiento='" + getSoatVencimiento() + "'" +
            ", revisionTecnicaVencimiento='" + getRevisionTecnicaVencimiento() + "'" +
            ", caja='" + getCaja() + "'" +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
