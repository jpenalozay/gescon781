package com.creinfor.service;

import com.creinfor.domain.InscripcionDescuento;
import com.creinfor.repository.InscripcionDescuentoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link InscripcionDescuento}.
 */
@Service
@Transactional
public class InscripcionDescuentoService {

    private final Logger log = LoggerFactory.getLogger(InscripcionDescuentoService.class);

    private final InscripcionDescuentoRepository inscripcionDescuentoRepository;

    public InscripcionDescuentoService(InscripcionDescuentoRepository inscripcionDescuentoRepository) {
        this.inscripcionDescuentoRepository = inscripcionDescuentoRepository;
    }

    /**
     * Save a inscripcionDescuento.
     *
     * @param inscripcionDescuento the entity to save.
     * @return the persisted entity.
     */
    public InscripcionDescuento save(InscripcionDescuento inscripcionDescuento) {
        log.debug("Request to save InscripcionDescuento : {}", inscripcionDescuento);
        return inscripcionDescuentoRepository.save(inscripcionDescuento);
    }

    /**
     * Update a inscripcionDescuento.
     *
     * @param inscripcionDescuento the entity to save.
     * @return the persisted entity.
     */
    public InscripcionDescuento update(InscripcionDescuento inscripcionDescuento) {
        log.debug("Request to save InscripcionDescuento : {}", inscripcionDescuento);
        return inscripcionDescuentoRepository.save(inscripcionDescuento);
    }

    /**
     * Partially update a inscripcionDescuento.
     *
     * @param inscripcionDescuento the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<InscripcionDescuento> partialUpdate(InscripcionDescuento inscripcionDescuento) {
        log.debug("Request to partially update InscripcionDescuento : {}", inscripcionDescuento);

        return inscripcionDescuentoRepository
            .findById(inscripcionDescuento.getId())
            .map(existingInscripcionDescuento -> {
                if (inscripcionDescuento.getDescripcion() != null) {
                    existingInscripcionDescuento.setDescripcion(inscripcionDescuento.getDescripcion());
                }
                if (inscripcionDescuento.getMonto() != null) {
                    existingInscripcionDescuento.setMonto(inscripcionDescuento.getMonto());
                }

                return existingInscripcionDescuento;
            })
            .map(inscripcionDescuentoRepository::save);
    }

    /**
     * Get all the inscripcionDescuentos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<InscripcionDescuento> findAll() {
        log.debug("Request to get all InscripcionDescuentos");
        return inscripcionDescuentoRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the inscripcionDescuentos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<InscripcionDescuento> findAllWithEagerRelationships(Pageable pageable) {
        return inscripcionDescuentoRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one inscripcionDescuento by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InscripcionDescuento> findOne(Long id) {
        log.debug("Request to get InscripcionDescuento : {}", id);
        return inscripcionDescuentoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the inscripcionDescuento by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete InscripcionDescuento : {}", id);
        inscripcionDescuentoRepository.deleteById(id);
    }
}
