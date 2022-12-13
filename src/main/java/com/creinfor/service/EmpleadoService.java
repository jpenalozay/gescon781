package com.creinfor.service;

import com.creinfor.domain.Empleado;
import com.creinfor.repository.EmpleadoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Empleado}.
 */
@Service
@Transactional
public class EmpleadoService {

    private final Logger log = LoggerFactory.getLogger(EmpleadoService.class);

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    /**
     * Save a empleado.
     *
     * @param empleado the entity to save.
     * @return the persisted entity.
     */
    public Empleado save(Empleado empleado) {
        log.debug("Request to save Empleado : {}", empleado);
        return empleadoRepository.save(empleado);
    }

    /**
     * Update a empleado.
     *
     * @param empleado the entity to save.
     * @return the persisted entity.
     */
    public Empleado update(Empleado empleado) {
        log.debug("Request to save Empleado : {}", empleado);
        return empleadoRepository.save(empleado);
    }

    /**
     * Partially update a empleado.
     *
     * @param empleado the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Empleado> partialUpdate(Empleado empleado) {
        log.debug("Request to partially update Empleado : {}", empleado);

        return empleadoRepository
            .findById(empleado.getId())
            .map(existingEmpleado -> {
                if (empleado.getEstado() != null) {
                    existingEmpleado.setEstado(empleado.getEstado());
                }
                if (empleado.getTipo() != null) {
                    existingEmpleado.setTipo(empleado.getTipo());
                }
                if (empleado.getCodigo() != null) {
                    existingEmpleado.setCodigo(empleado.getCodigo());
                }
                if (empleado.getCodigoAcceso() != null) {
                    existingEmpleado.setCodigoAcceso(empleado.getCodigoAcceso());
                }
                if (empleado.getTelefonoTrabajo() != null) {
                    existingEmpleado.setTelefonoTrabajo(empleado.getTelefonoTrabajo());
                }
                if (empleado.getTelefonoTrabajo1() != null) {
                    existingEmpleado.setTelefonoTrabajo1(empleado.getTelefonoTrabajo1());
                }
                if (empleado.getGradoInstrucion() != null) {
                    existingEmpleado.setGradoInstrucion(empleado.getGradoInstrucion());
                }
                if (empleado.getEmailCoorporativo() != null) {
                    existingEmpleado.setEmailCoorporativo(empleado.getEmailCoorporativo());
                }
                if (empleado.getFechaIngreso() != null) {
                    existingEmpleado.setFechaIngreso(empleado.getFechaIngreso());
                }
                if (empleado.getInasistencias() != null) {
                    existingEmpleado.setInasistencias(empleado.getInasistencias());
                }
                if (empleado.getTardanzas() != null) {
                    existingEmpleado.setTardanzas(empleado.getTardanzas());
                }
                if (empleado.getImagen() != null) {
                    existingEmpleado.setImagen(empleado.getImagen());
                }
                if (empleado.getImagenContentType() != null) {
                    existingEmpleado.setImagenContentType(empleado.getImagenContentType());
                }
                if (empleado.getSueldo() != null) {
                    existingEmpleado.setSueldo(empleado.getSueldo());
                }
                if (empleado.getFirma() != null) {
                    existingEmpleado.setFirma(empleado.getFirma());
                }
                if (empleado.getFirmaContentType() != null) {
                    existingEmpleado.setFirmaContentType(empleado.getFirmaContentType());
                }

                return existingEmpleado;
            })
            .map(empleadoRepository::save);
    }

    /**
     * Get all the empleados.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Empleado> findAll() {
        log.debug("Request to get all Empleados");
        return empleadoRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the empleados with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Empleado> findAllWithEagerRelationships(Pageable pageable) {
        return empleadoRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one empleado by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Empleado> findOne(Long id) {
        log.debug("Request to get Empleado : {}", id);
        return empleadoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the empleado by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Empleado : {}", id);
        empleadoRepository.deleteById(id);
    }
}
