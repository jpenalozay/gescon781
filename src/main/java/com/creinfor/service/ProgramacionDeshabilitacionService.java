package com.creinfor.service;

import com.creinfor.domain.ProgramacionDeshabilitacion;
import com.creinfor.repository.ProgramacionDeshabilitacionRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ProgramacionDeshabilitacion}.
 */
@Service
@Transactional
public class ProgramacionDeshabilitacionService {

    private final Logger log = LoggerFactory.getLogger(ProgramacionDeshabilitacionService.class);

    private final ProgramacionDeshabilitacionRepository programacionDeshabilitacionRepository;

    public ProgramacionDeshabilitacionService(ProgramacionDeshabilitacionRepository programacionDeshabilitacionRepository) {
        this.programacionDeshabilitacionRepository = programacionDeshabilitacionRepository;
    }

    /**
     * Save a programacionDeshabilitacion.
     *
     * @param programacionDeshabilitacion the entity to save.
     * @return the persisted entity.
     */
    public ProgramacionDeshabilitacion save(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        log.debug("Request to save ProgramacionDeshabilitacion : {}", programacionDeshabilitacion);
        return programacionDeshabilitacionRepository.save(programacionDeshabilitacion);
    }

    /**
     * Update a programacionDeshabilitacion.
     *
     * @param programacionDeshabilitacion the entity to save.
     * @return the persisted entity.
     */
    public ProgramacionDeshabilitacion update(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        log.debug("Request to save ProgramacionDeshabilitacion : {}", programacionDeshabilitacion);
        return programacionDeshabilitacionRepository.save(programacionDeshabilitacion);
    }

    /**
     * Partially update a programacionDeshabilitacion.
     *
     * @param programacionDeshabilitacion the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ProgramacionDeshabilitacion> partialUpdate(ProgramacionDeshabilitacion programacionDeshabilitacion) {
        log.debug("Request to partially update ProgramacionDeshabilitacion : {}", programacionDeshabilitacion);

        return programacionDeshabilitacionRepository
            .findById(programacionDeshabilitacion.getId())
            .map(existingProgramacionDeshabilitacion -> {
                if (programacionDeshabilitacion.getActivo() != null) {
                    existingProgramacionDeshabilitacion.setActivo(programacionDeshabilitacion.getActivo());
                }
                if (programacionDeshabilitacion.getCodigo() != null) {
                    existingProgramacionDeshabilitacion.setCodigo(programacionDeshabilitacion.getCodigo());
                }
                if (programacionDeshabilitacion.getDescripcion() != null) {
                    existingProgramacionDeshabilitacion.setDescripcion(programacionDeshabilitacion.getDescripcion());
                }
                if (programacionDeshabilitacion.getFecha() != null) {
                    existingProgramacionDeshabilitacion.setFecha(programacionDeshabilitacion.getFecha());
                }
                if (programacionDeshabilitacion.getNombreUsuario() != null) {
                    existingProgramacionDeshabilitacion.setNombreUsuario(programacionDeshabilitacion.getNombreUsuario());
                }

                return existingProgramacionDeshabilitacion;
            })
            .map(programacionDeshabilitacionRepository::save);
    }

    /**
     * Get all the programacionDeshabilitacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ProgramacionDeshabilitacion> findAll() {
        log.debug("Request to get all ProgramacionDeshabilitacions");
        return programacionDeshabilitacionRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the programacionDeshabilitacions with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ProgramacionDeshabilitacion> findAllWithEagerRelationships(Pageable pageable) {
        return programacionDeshabilitacionRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one programacionDeshabilitacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ProgramacionDeshabilitacion> findOne(Long id) {
        log.debug("Request to get ProgramacionDeshabilitacion : {}", id);
        return programacionDeshabilitacionRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the programacionDeshabilitacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ProgramacionDeshabilitacion : {}", id);
        programacionDeshabilitacionRepository.deleteById(id);
    }
}
