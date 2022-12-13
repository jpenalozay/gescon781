package com.creinfor.service;

import com.creinfor.domain.Programacion;
import com.creinfor.repository.ProgramacionRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Programacion}.
 */
@Service
@Transactional
public class ProgramacionService {

    private final Logger log = LoggerFactory.getLogger(ProgramacionService.class);

    private final ProgramacionRepository programacionRepository;

    public ProgramacionService(ProgramacionRepository programacionRepository) {
        this.programacionRepository = programacionRepository;
    }

    /**
     * Save a programacion.
     *
     * @param programacion the entity to save.
     * @return the persisted entity.
     */
    public Programacion save(Programacion programacion) {
        log.debug("Request to save Programacion : {}", programacion);
        return programacionRepository.save(programacion);
    }

    /**
     * Update a programacion.
     *
     * @param programacion the entity to save.
     * @return the persisted entity.
     */
    public Programacion update(Programacion programacion) {
        log.debug("Request to save Programacion : {}", programacion);
        return programacionRepository.save(programacion);
    }

    /**
     * Partially update a programacion.
     *
     * @param programacion the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Programacion> partialUpdate(Programacion programacion) {
        log.debug("Request to partially update Programacion : {}", programacion);

        return programacionRepository
            .findById(programacion.getId())
            .map(existingProgramacion -> {
                if (programacion.getEstado() != null) {
                    existingProgramacion.setEstado(programacion.getEstado());
                }
                if (programacion.getCodigo() != null) {
                    existingProgramacion.setCodigo(programacion.getCodigo());
                }
                if (programacion.getFechaInicio() != null) {
                    existingProgramacion.setFechaInicio(programacion.getFechaInicio());
                }
                if (programacion.getFechaFin() != null) {
                    existingProgramacion.setFechaFin(programacion.getFechaFin());
                }
                if (programacion.getDeshabilitaciones() != null) {
                    existingProgramacion.setDeshabilitaciones(programacion.getDeshabilitaciones());
                }
                if (programacion.getFecha() != null) {
                    existingProgramacion.setFecha(programacion.getFecha());
                }
                if (programacion.getNombreUsuario() != null) {
                    existingProgramacion.setNombreUsuario(programacion.getNombreUsuario());
                }

                return existingProgramacion;
            })
            .map(programacionRepository::save);
    }

    /**
     * Get all the programacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Programacion> findAll() {
        log.debug("Request to get all Programacions");
        return programacionRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the programacions with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Programacion> findAllWithEagerRelationships(Pageable pageable) {
        return programacionRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one programacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Programacion> findOne(Long id) {
        log.debug("Request to get Programacion : {}", id);
        return programacionRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the programacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Programacion : {}", id);
        programacionRepository.deleteById(id);
    }
}
