package com.creinfor.service;

import com.creinfor.domain.InscripcionAdicional;
import com.creinfor.repository.InscripcionAdicionalRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link InscripcionAdicional}.
 */
@Service
@Transactional
public class InscripcionAdicionalService {

    private final Logger log = LoggerFactory.getLogger(InscripcionAdicionalService.class);

    private final InscripcionAdicionalRepository inscripcionAdicionalRepository;

    public InscripcionAdicionalService(InscripcionAdicionalRepository inscripcionAdicionalRepository) {
        this.inscripcionAdicionalRepository = inscripcionAdicionalRepository;
    }

    /**
     * Save a inscripcionAdicional.
     *
     * @param inscripcionAdicional the entity to save.
     * @return the persisted entity.
     */
    public InscripcionAdicional save(InscripcionAdicional inscripcionAdicional) {
        log.debug("Request to save InscripcionAdicional : {}", inscripcionAdicional);
        return inscripcionAdicionalRepository.save(inscripcionAdicional);
    }

    /**
     * Update a inscripcionAdicional.
     *
     * @param inscripcionAdicional the entity to save.
     * @return the persisted entity.
     */
    public InscripcionAdicional update(InscripcionAdicional inscripcionAdicional) {
        log.debug("Request to save InscripcionAdicional : {}", inscripcionAdicional);
        return inscripcionAdicionalRepository.save(inscripcionAdicional);
    }

    /**
     * Partially update a inscripcionAdicional.
     *
     * @param inscripcionAdicional the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<InscripcionAdicional> partialUpdate(InscripcionAdicional inscripcionAdicional) {
        log.debug("Request to partially update InscripcionAdicional : {}", inscripcionAdicional);

        return inscripcionAdicionalRepository
            .findById(inscripcionAdicional.getId())
            .map(existingInscripcionAdicional -> {
                if (inscripcionAdicional.getDescripcion() != null) {
                    existingInscripcionAdicional.setDescripcion(inscripcionAdicional.getDescripcion());
                }
                if (inscripcionAdicional.getImagen() != null) {
                    existingInscripcionAdicional.setImagen(inscripcionAdicional.getImagen());
                }
                if (inscripcionAdicional.getImagenContentType() != null) {
                    existingInscripcionAdicional.setImagenContentType(inscripcionAdicional.getImagenContentType());
                }
                if (inscripcionAdicional.getDocumento() != null) {
                    existingInscripcionAdicional.setDocumento(inscripcionAdicional.getDocumento());
                }
                if (inscripcionAdicional.getCantidad() != null) {
                    existingInscripcionAdicional.setCantidad(inscripcionAdicional.getCantidad());
                }
                if (inscripcionAdicional.getCosto() != null) {
                    existingInscripcionAdicional.setCosto(inscripcionAdicional.getCosto());
                }

                return existingInscripcionAdicional;
            })
            .map(inscripcionAdicionalRepository::save);
    }

    /**
     * Get all the inscripcionAdicionals.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<InscripcionAdicional> findAll() {
        log.debug("Request to get all InscripcionAdicionals");
        return inscripcionAdicionalRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the inscripcionAdicionals with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<InscripcionAdicional> findAllWithEagerRelationships(Pageable pageable) {
        return inscripcionAdicionalRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one inscripcionAdicional by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InscripcionAdicional> findOne(Long id) {
        log.debug("Request to get InscripcionAdicional : {}", id);
        return inscripcionAdicionalRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the inscripcionAdicional by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete InscripcionAdicional : {}", id);
        inscripcionAdicionalRepository.deleteById(id);
    }
}
