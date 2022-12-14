package com.creinfor.service;

import com.creinfor.domain.InscripcionPago;
import com.creinfor.repository.InscripcionPagoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link InscripcionPago}.
 */
@Service
@Transactional
public class InscripcionPagoService {

    private final Logger log = LoggerFactory.getLogger(InscripcionPagoService.class);

    private final InscripcionPagoRepository inscripcionPagoRepository;

    public InscripcionPagoService(InscripcionPagoRepository inscripcionPagoRepository) {
        this.inscripcionPagoRepository = inscripcionPagoRepository;
    }

    /**
     * Save a inscripcionPago.
     *
     * @param inscripcionPago the entity to save.
     * @return the persisted entity.
     */
    public InscripcionPago save(InscripcionPago inscripcionPago) {
        log.debug("Request to save InscripcionPago : {}", inscripcionPago);
        return inscripcionPagoRepository.save(inscripcionPago);
    }

    /**
     * Update a inscripcionPago.
     *
     * @param inscripcionPago the entity to save.
     * @return the persisted entity.
     */
    public InscripcionPago update(InscripcionPago inscripcionPago) {
        log.debug("Request to save InscripcionPago : {}", inscripcionPago);
        return inscripcionPagoRepository.save(inscripcionPago);
    }

    /**
     * Partially update a inscripcionPago.
     *
     * @param inscripcionPago the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<InscripcionPago> partialUpdate(InscripcionPago inscripcionPago) {
        log.debug("Request to partially update InscripcionPago : {}", inscripcionPago);

        return inscripcionPagoRepository
            .findById(inscripcionPago.getId())
            .map(existingInscripcionPago -> {
                if (inscripcionPago.getFormaPago() != null) {
                    existingInscripcionPago.setFormaPago(inscripcionPago.getFormaPago());
                }
                if (inscripcionPago.getDocumentoPago() != null) {
                    existingInscripcionPago.setDocumentoPago(inscripcionPago.getDocumentoPago());
                }
                if (inscripcionPago.getMonto() != null) {
                    existingInscripcionPago.setMonto(inscripcionPago.getMonto());
                }
                if (inscripcionPago.getFecha() != null) {
                    existingInscripcionPago.setFecha(inscripcionPago.getFecha());
                }
                if (inscripcionPago.getCodigoOP() != null) {
                    existingInscripcionPago.setCodigoOP(inscripcionPago.getCodigoOP());
                }
                if (inscripcionPago.getNumeroDocumento() != null) {
                    existingInscripcionPago.setNumeroDocumento(inscripcionPago.getNumeroDocumento());
                }
                if (inscripcionPago.getPlazoPago() != null) {
                    existingInscripcionPago.setPlazoPago(inscripcionPago.getPlazoPago());
                }

                return existingInscripcionPago;
            })
            .map(inscripcionPagoRepository::save);
    }

    /**
     * Get all the inscripcionPagos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<InscripcionPago> findAll() {
        log.debug("Request to get all InscripcionPagos");
        return inscripcionPagoRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the inscripcionPagos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<InscripcionPago> findAllWithEagerRelationships(Pageable pageable) {
        return inscripcionPagoRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one inscripcionPago by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InscripcionPago> findOne(Long id) {
        log.debug("Request to get InscripcionPago : {}", id);
        return inscripcionPagoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the inscripcionPago by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete InscripcionPago : {}", id);
        inscripcionPagoRepository.deleteById(id);
    }
}
