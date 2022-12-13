package com.creinfor.domain;

import com.creinfor.domain.enumeration.InscripcionEstado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Inscripcion.
 */
@Entity
@Table(name = "inscripcion")
public class Inscripcion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 9, max = 9)
    @Column(name = "codigo", length = 9, nullable = false, unique = true)
    private String codigo;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private InscripcionEstado estado;

    @NotNull
    @Column(name = "numero_documento", nullable = false)
    private Integer numeroDocumento;

    @NotNull
    @Column(name = "fecha", nullable = false)
    private Instant fecha;

    @DecimalMin(value = "0")
    @DecimalMax(value = "10000")
    @Column(name = "costo_total")
    private Float costoTotal;

    @OneToMany(mappedBy = "inscripcion")
    @JsonIgnoreProperties(value = { "inscripcion", "serie" }, allowSetters = true)
    private Set<InscripcionPago> inscripcionPagos = new HashSet<>();

    @OneToMany(mappedBy = "inscripcion")
    @JsonIgnoreProperties(value = { "inscripcion", "inscripcionRequisito" }, allowSetters = true)
    private Set<InscripcionAdicional> inscripcionAdicionals = new HashSet<>();

    @OneToMany(mappedBy = "inscripcion")
    @JsonIgnoreProperties(value = { "inscripcionAsignaturaRequisitos", "inscripcion", "asignatura", "horario" }, allowSetters = true)
    private Set<InscripcionDetalle> inscripcionDetalles = new HashSet<>();

    @JsonIgnoreProperties(value = { "inscripcion" }, allowSetters = true)
    @OneToOne(mappedBy = "inscripcion")
    private InscripcionDescuento insDescuento;

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

    public Inscripcion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Inscripcion codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public InscripcionEstado getEstado() {
        return this.estado;
    }

    public Inscripcion estado(InscripcionEstado estado) {
        this.setEstado(estado);
        return this;
    }

    public void setEstado(InscripcionEstado estado) {
        this.estado = estado;
    }

    public Integer getNumeroDocumento() {
        return this.numeroDocumento;
    }

    public Inscripcion numeroDocumento(Integer numeroDocumento) {
        this.setNumeroDocumento(numeroDocumento);
        return this;
    }

    public void setNumeroDocumento(Integer numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public Instant getFecha() {
        return this.fecha;
    }

    public Inscripcion fecha(Instant fecha) {
        this.setFecha(fecha);
        return this;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public Float getCostoTotal() {
        return this.costoTotal;
    }

    public Inscripcion costoTotal(Float costoTotal) {
        this.setCostoTotal(costoTotal);
        return this;
    }

    public void setCostoTotal(Float costoTotal) {
        this.costoTotal = costoTotal;
    }

    public Set<InscripcionPago> getInscripcionPagos() {
        return this.inscripcionPagos;
    }

    public void setInscripcionPagos(Set<InscripcionPago> inscripcionPagos) {
        if (this.inscripcionPagos != null) {
            this.inscripcionPagos.forEach(i -> i.setInscripcion(null));
        }
        if (inscripcionPagos != null) {
            inscripcionPagos.forEach(i -> i.setInscripcion(this));
        }
        this.inscripcionPagos = inscripcionPagos;
    }

    public Inscripcion inscripcionPagos(Set<InscripcionPago> inscripcionPagos) {
        this.setInscripcionPagos(inscripcionPagos);
        return this;
    }

    public Inscripcion addInscripcionPagos(InscripcionPago inscripcionPago) {
        this.inscripcionPagos.add(inscripcionPago);
        inscripcionPago.setInscripcion(this);
        return this;
    }

    public Inscripcion removeInscripcionPagos(InscripcionPago inscripcionPago) {
        this.inscripcionPagos.remove(inscripcionPago);
        inscripcionPago.setInscripcion(null);
        return this;
    }

    public Set<InscripcionAdicional> getInscripcionAdicionals() {
        return this.inscripcionAdicionals;
    }

    public void setInscripcionAdicionals(Set<InscripcionAdicional> inscripcionAdicionals) {
        if (this.inscripcionAdicionals != null) {
            this.inscripcionAdicionals.forEach(i -> i.setInscripcion(null));
        }
        if (inscripcionAdicionals != null) {
            inscripcionAdicionals.forEach(i -> i.setInscripcion(this));
        }
        this.inscripcionAdicionals = inscripcionAdicionals;
    }

    public Inscripcion inscripcionAdicionals(Set<InscripcionAdicional> inscripcionAdicionals) {
        this.setInscripcionAdicionals(inscripcionAdicionals);
        return this;
    }

    public Inscripcion addInscripcionAdicional(InscripcionAdicional inscripcionAdicional) {
        this.inscripcionAdicionals.add(inscripcionAdicional);
        inscripcionAdicional.setInscripcion(this);
        return this;
    }

    public Inscripcion removeInscripcionAdicional(InscripcionAdicional inscripcionAdicional) {
        this.inscripcionAdicionals.remove(inscripcionAdicional);
        inscripcionAdicional.setInscripcion(null);
        return this;
    }

    public Set<InscripcionDetalle> getInscripcionDetalles() {
        return this.inscripcionDetalles;
    }

    public void setInscripcionDetalles(Set<InscripcionDetalle> inscripcionDetalles) {
        if (this.inscripcionDetalles != null) {
            this.inscripcionDetalles.forEach(i -> i.setInscripcion(null));
        }
        if (inscripcionDetalles != null) {
            inscripcionDetalles.forEach(i -> i.setInscripcion(this));
        }
        this.inscripcionDetalles = inscripcionDetalles;
    }

    public Inscripcion inscripcionDetalles(Set<InscripcionDetalle> inscripcionDetalles) {
        this.setInscripcionDetalles(inscripcionDetalles);
        return this;
    }

    public Inscripcion addInscripcionDetalle(InscripcionDetalle inscripcionDetalle) {
        this.inscripcionDetalles.add(inscripcionDetalle);
        inscripcionDetalle.setInscripcion(this);
        return this;
    }

    public Inscripcion removeInscripcionDetalle(InscripcionDetalle inscripcionDetalle) {
        this.inscripcionDetalles.remove(inscripcionDetalle);
        inscripcionDetalle.setInscripcion(null);
        return this;
    }

    public InscripcionDescuento getInsDescuento() {
        return this.insDescuento;
    }

    public void setInsDescuento(InscripcionDescuento inscripcionDescuento) {
        if (this.insDescuento != null) {
            this.insDescuento.setInscripcion(null);
        }
        if (inscripcionDescuento != null) {
            inscripcionDescuento.setInscripcion(this);
        }
        this.insDescuento = inscripcionDescuento;
    }

    public Inscripcion insDescuento(InscripcionDescuento inscripcionDescuento) {
        this.setInsDescuento(inscripcionDescuento);
        return this;
    }

    public Alumno getAlumno() {
        return this.alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Inscripcion alumno(Alumno alumno) {
        this.setAlumno(alumno);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Inscripcion)) {
            return false;
        }
        return id != null && id.equals(((Inscripcion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Inscripcion{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", estado='" + getEstado() + "'" +
            ", numeroDocumento=" + getNumeroDocumento() +
            ", fecha='" + getFecha() + "'" +
            ", costoTotal=" + getCostoTotal() +
            "}";
    }
}
