package com.creinfor.service;

import com.creinfor.domain.RequisitosInscripcion;
import com.creinfor.repository.RequisitosInscripcionRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link RequisitosInscripcion}.
 */
@Service
@Transactional
public class RequisitosInscripcionService {

    private final Logger log = LoggerFactory.getLogger(RequisitosInscripcionService.class);

    private final RequisitosInscripcionRepository requisitosInscripcionRepository;

    public RequisitosInscripcionService(RequisitosInscripcionRepository requisitosInscripcionRepository) {
        this.requisitosInscripcionRepository = requisitosInscripcionRepository;
    }

    /**
     * Save a requisitosInscripcion.
     *
     * @param requisitosInscripcion the entity to save.
     * @return the persisted entity.
     */
    public RequisitosInscripcion save(RequisitosInscripcion requisitosInscripcion) {
        log.debug("Request to save RequisitosInscripcion : {}", requisitosInscripcion);
        return requisitosInscripcionRepository.save(requisitosInscripcion);
    }

    /**
     * Update a requisitosInscripcion.
     *
     * @param requisitosInscripcion the entity to save.
     * @return the persisted entity.
     */
    public RequisitosInscripcion update(RequisitosInscripcion requisitosInscripcion) {
        log.debug("Request to save RequisitosInscripcion : {}", requisitosInscripcion);
        return requisitosInscripcionRepository.save(requisitosInscripcion);
    }

    /**
     * Partially update a requisitosInscripcion.
     *
     * @param requisitosInscripcion the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<RequisitosInscripcion> partialUpdate(RequisitosInscripcion requisitosInscripcion) {
        log.debug("Request to partially update RequisitosInscripcion : {}", requisitosInscripcion);

        return requisitosInscripcionRepository
            .findById(requisitosInscripcion.getId())
            .map(existingRequisitosInscripcion -> {
                if (requisitosInscripcion.getActivo() != null) {
                    existingRequisitosInscripcion.setActivo(requisitosInscripcion.getActivo());
                }
                if (requisitosInscripcion.getObligatorio() != null) {
                    existingRequisitosInscripcion.setObligatorio(requisitosInscripcion.getObligatorio());
                }
                if (requisitosInscripcion.getNombre() != null) {
                    existingRequisitosInscripcion.setNombre(requisitosInscripcion.getNombre());
                }
                if (requisitosInscripcion.getNombreCorto() != null) {
                    existingRequisitosInscripcion.setNombreCorto(requisitosInscripcion.getNombreCorto());
                }
                if (requisitosInscripcion.getCosto() != null) {
                    existingRequisitosInscripcion.setCosto(requisitosInscripcion.getCosto());
                }
                if (requisitosInscripcion.getImagen() != null) {
                    existingRequisitosInscripcion.setImagen(requisitosInscripcion.getImagen());
                }
                if (requisitosInscripcion.getImagenContentType() != null) {
                    existingRequisitosInscripcion.setImagenContentType(requisitosInscripcion.getImagenContentType());
                }
                if (requisitosInscripcion.getTipoRequisito() != null) {
                    existingRequisitosInscripcion.setTipoRequisito(requisitosInscripcion.getTipoRequisito());
                }
                if (requisitosInscripcion.getValores() != null) {
                    existingRequisitosInscripcion.setValores(requisitosInscripcion.getValores());
                }

                return existingRequisitosInscripcion;
            })
            .map(requisitosInscripcionRepository::save);
    }

    /**
     * Get all the requisitosInscripcions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<RequisitosInscripcion> findAll() {
        log.debug("Request to get all RequisitosInscripcions");
        return requisitosInscripcionRepository.findAll();
    }

    /**
     * Get one requisitosInscripcion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<RequisitosInscripcion> findOne(Long id) {
        log.debug("Request to get RequisitosInscripcion : {}", id);
        return requisitosInscripcionRepository.findById(id);
    }

    /**
     * Delete the requisitosInscripcion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete RequisitosInscripcion : {}", id);
        requisitosInscripcionRepository.deleteById(id);
    }
}
