package com.creinfor.service;

import com.creinfor.domain.InscripcionDetalle;
import com.creinfor.repository.InscripcionDetalleRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link InscripcionDetalle}.
 */
@Service
@Transactional
public class InscripcionDetalleService {

    private final Logger log = LoggerFactory.getLogger(InscripcionDetalleService.class);

    private final InscripcionDetalleRepository inscripcionDetalleRepository;

    public InscripcionDetalleService(InscripcionDetalleRepository inscripcionDetalleRepository) {
        this.inscripcionDetalleRepository = inscripcionDetalleRepository;
    }

    /**
     * Save a inscripcionDetalle.
     *
     * @param inscripcionDetalle the entity to save.
     * @return the persisted entity.
     */
    public InscripcionDetalle save(InscripcionDetalle inscripcionDetalle) {
        log.debug("Request to save InscripcionDetalle : {}", inscripcionDetalle);
        return inscripcionDetalleRepository.save(inscripcionDetalle);
    }

    /**
     * Update a inscripcionDetalle.
     *
     * @param inscripcionDetalle the entity to save.
     * @return the persisted entity.
     */
    public InscripcionDetalle update(InscripcionDetalle inscripcionDetalle) {
        log.debug("Request to save InscripcionDetalle : {}", inscripcionDetalle);
        return inscripcionDetalleRepository.save(inscripcionDetalle);
    }

    /**
     * Partially update a inscripcionDetalle.
     *
     * @param inscripcionDetalle the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<InscripcionDetalle> partialUpdate(InscripcionDetalle inscripcionDetalle) {
        log.debug("Request to partially update InscripcionDetalle : {}", inscripcionDetalle);

        return inscripcionDetalleRepository
            .findById(inscripcionDetalle.getId())
            .map(existingInscripcionDetalle -> {
                if (inscripcionDetalle.getCodigo() != null) {
                    existingInscripcionDetalle.setCodigo(inscripcionDetalle.getCodigo());
                }
                if (inscripcionDetalle.getFechaInicio() != null) {
                    existingInscripcionDetalle.setFechaInicio(inscripcionDetalle.getFechaInicio());
                }

                return existingInscripcionDetalle;
            })
            .map(inscripcionDetalleRepository::save);
    }

    /**
     * Get all the inscripcionDetalles.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<InscripcionDetalle> findAll() {
        log.debug("Request to get all InscripcionDetalles");
        return inscripcionDetalleRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the inscripcionDetalles with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<InscripcionDetalle> findAllWithEagerRelationships(Pageable pageable) {
        return inscripcionDetalleRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one inscripcionDetalle by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InscripcionDetalle> findOne(Long id) {
        log.debug("Request to get InscripcionDetalle : {}", id);
        return inscripcionDetalleRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the inscripcionDetalle by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete InscripcionDetalle : {}", id);
        inscripcionDetalleRepository.deleteById(id);
    }
}
