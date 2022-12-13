package com.creinfor.domain;

import com.creinfor.domain.enumeration.Estado;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Asignatura.
 */
@Entity
@Table(name = "asignatura")
public class Asignatura implements Serializable {

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
    @Column(name = "documento")
    private String documento;

    @Column(name = "horas_teoricas")
    private Integer horasTeoricas;

    @Column(name = "horas_practicas")
    private Integer horasPracticas;

    @Column(name = "numero_clases_teoria")
    private Integer numeroClasesTeoria;

    @Column(name = "numero_clases_practica")
    private Integer numeroClasesPractica;

    @Column(name = "vigencia")
    private Integer vigencia;

    @NotNull
    @Column(name = "costo", nullable = false)
    private Float costo;

    @Lob
    @Column(name = "imagen")
    private byte[] imagen;

    @Column(name = "imagen_content_type")
    private String imagenContentType;

    @OneToMany(mappedBy = "asignatura")
    @JsonIgnoreProperties(value = { "inscripcionAsignaturaRequisitos", "inscripcion", "asignatura", "horario" }, allowSetters = true)
    private Set<InscripcionDetalle> inscripcionDetalles = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_asignatura__categoria",
        joinColumns = @JoinColumn(name = "asignatura_id"),
        inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    @JsonIgnoreProperties(value = { "alumnoCategorias", "profesors", "asignaturas", "intructores" }, allowSetters = true)
    private Set<LicenciaCategoria> categorias = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_asignatura__adicional",
        joinColumns = @JoinColumn(name = "asignatura_id"),
        inverseJoinColumns = @JoinColumn(name = "adicional_id")
    )
    @JsonIgnoreProperties(value = { "asignaturas" }, allowSetters = true)
    private Set<AsignaturaAdiciones> adicionals = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_asignatura__horario",
        joinColumns = @JoinColumn(name = "asignatura_id"),
        inverseJoinColumns = @JoinColumn(name = "horario_id")
    )
    @JsonIgnoreProperties(value = { "inscripcionDetalles", "teorias", "asignaturas" }, allowSetters = true)
    private Set<TeoriaHorarioCatalogo> horarios = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_asignatura__asignatura_requisito",
        joinColumns = @JoinColumn(name = "asignatura_id"),
        inverseJoinColumns = @JoinColumn(name = "asignatura_requisito_id")
    )
    @JsonIgnoreProperties(value = { "inscripcionAsignaturaRequisitos", "asignaturas" }, allowSetters = true)
    private Set<AsignaturaRequisito> asignaturaRequisitos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "asignaturas" }, allowSetters = true)
    private Curso curso;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Asignatura id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public Asignatura activo(Estado activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Asignatura nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombreCorto() {
        return this.nombreCorto;
    }

    public Asignatura nombreCorto(String nombreCorto) {
        this.setNombreCorto(nombreCorto);
        return this;
    }

    public void setNombreCorto(String nombreCorto) {
        this.nombreCorto = nombreCorto;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Asignatura descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDocumento() {
        return this.documento;
    }

    public Asignatura documento(String documento) {
        this.setDocumento(documento);
        return this;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public Integer getHorasTeoricas() {
        return this.horasTeoricas;
    }

    public Asignatura horasTeoricas(Integer horasTeoricas) {
        this.setHorasTeoricas(horasTeoricas);
        return this;
    }

    public void setHorasTeoricas(Integer horasTeoricas) {
        this.horasTeoricas = horasTeoricas;
    }

    public Integer getHorasPracticas() {
        return this.horasPracticas;
    }

    public Asignatura horasPracticas(Integer horasPracticas) {
        this.setHorasPracticas(horasPracticas);
        return this;
    }

    public void setHorasPracticas(Integer horasPracticas) {
        this.horasPracticas = horasPracticas;
    }

    public Integer getNumeroClasesTeoria() {
        return this.numeroClasesTeoria;
    }

    public Asignatura numeroClasesTeoria(Integer numeroClasesTeoria) {
        this.setNumeroClasesTeoria(numeroClasesTeoria);
        return this;
    }

    public void setNumeroClasesTeoria(Integer numeroClasesTeoria) {
        this.numeroClasesTeoria = numeroClasesTeoria;
    }

    public Integer getNumeroClasesPractica() {
        return this.numeroClasesPractica;
    }

    public Asignatura numeroClasesPractica(Integer numeroClasesPractica) {
        this.setNumeroClasesPractica(numeroClasesPractica);
        return this;
    }

    public void setNumeroClasesPractica(Integer numeroClasesPractica) {
        this.numeroClasesPractica = numeroClasesPractica;
    }

    public Integer getVigencia() {
        return this.vigencia;
    }

    public Asignatura vigencia(Integer vigencia) {
        this.setVigencia(vigencia);
        return this;
    }

    public void setVigencia(Integer vigencia) {
        this.vigencia = vigencia;
    }

    public Float getCosto() {
        return this.costo;
    }

    public Asignatura costo(Float costo) {
        this.setCosto(costo);
        return this;
    }

    public void setCosto(Float costo) {
        this.costo = costo;
    }

    public byte[] getImagen() {
        return this.imagen;
    }

    public Asignatura imagen(byte[] imagen) {
        this.setImagen(imagen);
        return this;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public String getImagenContentType() {
        return this.imagenContentType;
    }

    public Asignatura imagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
        return this;
    }

    public void setImagenContentType(String imagenContentType) {
        this.imagenContentType = imagenContentType;
    }

    public Set<InscripcionDetalle> getInscripcionDetalles() {
        return this.inscripcionDetalles;
    }

    public void setInscripcionDetalles(Set<InscripcionDetalle> inscripcionDetalles) {
        if (this.inscripcionDetalles != null) {
            this.inscripcionDetalles.forEach(i -> i.setAsignatura(null));
        }
        if (inscripcionDetalles != null) {
            inscripcionDetalles.forEach(i -> i.setAsignatura(this));
        }
        this.inscripcionDetalles = inscripcionDetalles;
    }

    public Asignatura inscripcionDetalles(Set<InscripcionDetalle> inscripcionDetalles) {
        this.setInscripcionDetalles(inscripcionDetalles);
        return this;
    }

    public Asignatura addInscripcionDetalle(InscripcionDetalle inscripcionDetalle) {
        this.inscripcionDetalles.add(inscripcionDetalle);
        inscripcionDetalle.setAsignatura(this);
        return this;
    }

    public Asignatura removeInscripcionDetalle(InscripcionDetalle inscripcionDetalle) {
        this.inscripcionDetalles.remove(inscripcionDetalle);
        inscripcionDetalle.setAsignatura(null);
        return this;
    }

    public Set<LicenciaCategoria> getCategorias() {
        return this.categorias;
    }

    public void setCategorias(Set<LicenciaCategoria> licenciaCategorias) {
        this.categorias = licenciaCategorias;
    }

    public Asignatura categorias(Set<LicenciaCategoria> licenciaCategorias) {
        this.setCategorias(licenciaCategorias);
        return this;
    }

    public Asignatura addCategoria(LicenciaCategoria licenciaCategoria) {
        this.categorias.add(licenciaCategoria);
        licenciaCategoria.getAsignaturas().add(this);
        return this;
    }

    public Asignatura removeCategoria(LicenciaCategoria licenciaCategoria) {
        this.categorias.remove(licenciaCategoria);
        licenciaCategoria.getAsignaturas().remove(this);
        return this;
    }

    public Set<AsignaturaAdiciones> getAdicionals() {
        return this.adicionals;
    }

    public void setAdicionals(Set<AsignaturaAdiciones> asignaturaAdiciones) {
        this.adicionals = asignaturaAdiciones;
    }

    public Asignatura adicionals(Set<AsignaturaAdiciones> asignaturaAdiciones) {
        this.setAdicionals(asignaturaAdiciones);
        return this;
    }

    public Asignatura addAdicional(AsignaturaAdiciones asignaturaAdiciones) {
        this.adicionals.add(asignaturaAdiciones);
        asignaturaAdiciones.getAsignaturas().add(this);
        return this;
    }

    public Asignatura removeAdicional(AsignaturaAdiciones asignaturaAdiciones) {
        this.adicionals.remove(asignaturaAdiciones);
        asignaturaAdiciones.getAsignaturas().remove(this);
        return this;
    }

    public Set<TeoriaHorarioCatalogo> getHorarios() {
        return this.horarios;
    }

    public void setHorarios(Set<TeoriaHorarioCatalogo> teoriaHorarioCatalogos) {
        this.horarios = teoriaHorarioCatalogos;
    }

    public Asignatura horarios(Set<TeoriaHorarioCatalogo> teoriaHorarioCatalogos) {
        this.setHorarios(teoriaHorarioCatalogos);
        return this;
    }

    public Asignatura addHorario(TeoriaHorarioCatalogo teoriaHorarioCatalogo) {
        this.horarios.add(teoriaHorarioCatalogo);
        teoriaHorarioCatalogo.getAsignaturas().add(this);
        return this;
    }

    public Asignatura removeHorario(TeoriaHorarioCatalogo teoriaHorarioCatalogo) {
        this.horarios.remove(teoriaHorarioCatalogo);
        teoriaHorarioCatalogo.getAsignaturas().remove(this);
        return this;
    }

    public Set<AsignaturaRequisito> getAsignaturaRequisitos() {
        return this.asignaturaRequisitos;
    }

    public void setAsignaturaRequisitos(Set<AsignaturaRequisito> asignaturaRequisitos) {
        this.asignaturaRequisitos = asignaturaRequisitos;
    }

    public Asignatura asignaturaRequisitos(Set<AsignaturaRequisito> asignaturaRequisitos) {
        this.setAsignaturaRequisitos(asignaturaRequisitos);
        return this;
    }

    public Asignatura addAsignaturaRequisito(AsignaturaRequisito asignaturaRequisito) {
        this.asignaturaRequisitos.add(asignaturaRequisito);
        asignaturaRequisito.getAsignaturas().add(this);
        return this;
    }

    public Asignatura removeAsignaturaRequisito(AsignaturaRequisito asignaturaRequisito) {
        this.asignaturaRequisitos.remove(asignaturaRequisito);
        asignaturaRequisito.getAsignaturas().remove(this);
        return this;
    }

    public Curso getCurso() {
        return this.curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public Asignatura curso(Curso curso) {
        this.setCurso(curso);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Asignatura)) {
            return false;
        }
        return id != null && id.equals(((Asignatura) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Asignatura{" +
            "id=" + getId() +
            ", activo='" + getActivo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", nombreCorto='" + getNombreCorto() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", documento='" + getDocumento() + "'" +
            ", horasTeoricas=" + getHorasTeoricas() +
            ", horasPracticas=" + getHorasPracticas() +
            ", numeroClasesTeoria=" + getNumeroClasesTeoria() +
            ", numeroClasesPractica=" + getNumeroClasesPractica() +
            ", vigencia=" + getVigencia() +
            ", costo=" + getCosto() +
            ", imagen='" + getImagen() + "'" +
            ", imagenContentType='" + getImagenContentType() + "'" +
            "}";
    }
}
