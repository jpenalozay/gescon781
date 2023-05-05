package com.creinfor.service.dto;

import java.io.Serializable;
import java.util.Objects;
import com.creinfor.domain.enumeration.Estado;

/**
 * A DTO for the {@link com.creinfor.domain.HorarioInfo} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class HorarioInfoDTO implements Serializable {

    private Long id;

    private Estado activo;

    private Long fechaId;

    private String fecha;

    private Long horarioCatalogoId;

    private String horario;

    private Long alumnoId;

    private String alumnoNombre;

    private Long instructorId;

    private String instructorNombre;

    private Long automovilId;

    private String automovil;

    private Long lugarSalidaId;

    private String lugarSalida;

    private Boolean distinct;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Estado getActivo() {
        return this.activo;
    }

    public void setActivo(Estado activo) {
        this.activo = activo;
    }

    public Long getFechaId() {
        return this.fechaId;
    }

    public void setFechaId(Long fechaId) {
        this.fechaId = fechaId;
    }

    public String getFecha() {
        return this.fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public Long getHorarioCatalogoId() {
        return this.horarioCatalogoId;
    }

    public void setHorarioCatalogoId(Long horarioCatalogoId) {
        this.horarioCatalogoId = horarioCatalogoId;
    }

    public String getHorario() {
        return this.horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public Long getAlumnoId() {
        return this.alumnoId;
    }

    public void setAlumnoId(Long alumnoId) {
        this.alumnoId = alumnoId;
    }

    public String getAlumnoNombre() {
        return this.alumnoNombre;
    }

    public void setAlumnoNombre(String alumnoNombre) {
        this.alumnoNombre = alumnoNombre;
    }

    public Long getInstructorId() {
        return this.instructorId;
    }

    public void setInstructorId(Long instructorId) {
        this.instructorId = instructorId;
    }

    public String getInstructorNombre() {
        return this.instructorNombre;
    }

    public void setInstructorNombre(String instructorNombre) {
        this.instructorNombre = instructorNombre;
    }

    public Long getAutomovilId() {
        return this.automovilId;
    }

    public void setAutomovilId(Long automovilId) {
        this.automovilId = automovilId;
    }

    public String getAutomovil() {
        return this.automovil;
    }

    public void setAutomovil(String automovil) {
        this.automovil = automovil;
    }

    public Long getLugarSalidaId() {
        return this.lugarSalidaId;
    }

    public void setLugarSalidaId(Long lugarSalidaId) {
        this.lugarSalidaId = lugarSalidaId;
    }

    public String getLugarSalida() {
        return this.lugarSalida;
    }

    public void setLugarSalida(String lugarSalida) {
        this.lugarSalida = lugarSalida;
    }

    public Boolean getDistinct() {
        return this.distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HorarioInfoDTO)) {
            return false;
        }

        HorarioInfoDTO horarioInfoDTO = (HorarioInfoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, horarioInfoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    
    public HorarioInfoDTO() {
        // Empty constructor needed for Jackson.
    }

    // public HorarioInfoDTO(Horario horarioInfo) {

    //     this.id = horarioInfo.getId();

    //     this.activo = horarioInfo.getActivo();
    
    //     this.fechaId = horarioInfo.getFecha();
    
    //     this.fecha = horarioInfo.getFecha();
    
    //     this.horarioCatalogoId = horarioInfo.getHorarioCatalogoId();
    
    //     this.horario = horarioInfo.getHorario();
    
    //     this.alumnoId = horarioInfo.getAlumnoId();
    
    //     this.alumnoNombre = horarioInfo.getAlumnoNombre();
    
    //     this.instructorId = horarioInfo.getInstructorId();
    
    //     this.instructorNombre = horarioInfo.getInstructorNombre();
    
    //     this.automovilId = horarioInfo.getAutomovilId();
    
    //     this.automovil = horarioInfo.getAutomovil();
    
    //     this.lugarSalidaId = horarioInfo.getLugarSalidaId();
    
    //     this.lugarSalida = horarioInfo.getLugarSalida();
    
    //     this.distinct = horarioInfo.getDistinct();
    // }

    // prettier-ignore
    // @Override
    // public String toString() {
    //     return "HorarioDTO{" +
    //         "id=" + getId() +
    //         ", activo='" + getActivo() + "'" +
    //         ", tipo='" + getTipo() + "'" +
    //         ", fechaDia='" + getFechaDia() + "'" +
    //         ", fechaDiaSem=" + getFechaDiaSem() +
    //         ", alumno=" + getAlumno() +
    //         ", instructor=" + getInstructor() +
    //         ", programacion=" + getProgramacion() +
    //         ", fecha=" + getFecha() +
    //         ", horarioCatalogo=" + getHorarioCatalogo() +
    //         ", automovil=" + getAutomovil() +
    //         ", lugarSalida=" + getLugarSalida() +
    //         "}";
    // }

}
