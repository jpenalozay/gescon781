package com.creinfor.service;

import com.creinfor.domain.Inscripcion;
import com.creinfor.repository.InscripcionRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Inscripcion}.
 */
@Service
@Transactional
public class InscripcionService {

    private final Logger log = LoggerFactory.getLogger(InscripcionService.class);

    private final InscripcionRepository inscripcionRepository;

    public InscripcionService(InscripcionRepository inscripcionRepository) {
        this.inscripcionRepository = inscripcionRepository;
    }

    /**
     * Save a inscripcion.
     *
     * @param inscripcion the entity to save.
     * @return the persisted entity.
     */
    public Inscripcion save(Inscripcion inscripcion) {
        log.debug("Request to save Inscripcion : {}", inscripcion);
        return inscripcionRepository.save(inscripcion);
    }

    /**
     * Update a inscripcion.
     *
     * @param inscripcion the entity to save.
     * @return the persisted entity.
     */
    public Inscripcion update(Inscripcion inscripcion) {
        log.debug("Request to save Inscripcion : {}", inscripcion);
        return inscripcionRepository.save(inscripcion);
    }

    /**
     * Partially update a inscripcion.
     *
     * @param inscripcion the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Inscripcion> partialUpdate(Inscripcion inscripcion) {
        log.debug("Request to partially update Inscripcion : {}", inscripcion);

        return inscripcionRepository
            .findById(inscripcion.getId())
            .map(existingInscripcion -> {
                if (inscripcion.getCodigo() != null) {
                    existingInscripcion.setCodigo(inscripcion.getCodigo());
                }
                if (inscripcion.getEstado() != null) {
                    existingInscripcion.setEstado(inscripcion.getEstado());
                }
                if (inscripcion.getNumeroDocumento() != null) {
                    existingInscripcion.setNumeroDocumento(inscripcion.getNumeroDocumento());
                }
                if (inscripcion.getFecha() != null) {
                    existingInscripcion.setFecha(inscripcion.getFecha());
                }
                if (inscripcion.getCostoTotal() != null) {
                    existingInscripcion.setCostoTotal(inscripcion.getCostoTotal());
                }

                return existingInscripcion;
            })
            .map(inscripcionRepository::save);
    }

    /**
     * Get all the inscripcions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Inscripcion> findAll() {
        log.debug("Request to get all Inscripcions");
        return inscripcionRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the inscripcions with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Inscripcion> findAllWithEagerRelationships(Pageable pageable) {
        return inscripcionRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     *  Get all the inscripcions where InsDescuento is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Inscripcion> findAllWhereInsDescuentoIsNull() {
        log.debug("Request to get all inscripcions where InsDescuento is null");
        return StreamSupport
            .stream(inscripcionRepository.findAll().spliterator(), false)
            .filter(inscripcion -> inscripcion.getInsDescuento() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one inscripcion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Inscripcion> findOne(Long id) {
        log.debug("Request to get Inscripcion : {}", id);
        return inscripcionRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the inscripcion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Inscripcion : {}", id);
        inscripcionRepository.deleteById(id);
    }
}
