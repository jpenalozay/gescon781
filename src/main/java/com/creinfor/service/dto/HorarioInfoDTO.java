package com.creinfor.service.dto;

import com.creinfor.domain.enumeration.Estado;
import com.creinfor.domain.enumeration.EstadoHorario;

public class HorarioInfoDTO {

    private Long id;

    private EstadoHorario activo;

    private String codigo;

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

    public EstadoHorario getActivo() {
        return this.activo;
    }

    public void setActivo(EstadoHorario activo) {
        this.activo = activo;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public void setcodigo(String codigo) {
        this.codigo = codigo;
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
}
