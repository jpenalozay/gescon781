package com.creinfor.service;

import com.creinfor.domain.InscripcionAsignaturaRequisito;
import com.creinfor.repository.InscripcionAsignaturaRequisitoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link InscripcionAsignaturaRequisito}.
 */
@Service
@Transactional
public class InscripcionAsignaturaRequisitoService {

    private final Logger log = LoggerFactory.getLogger(InscripcionAsignaturaRequisitoService.class);

    private final InscripcionAsignaturaRequisitoRepository inscripcionAsignaturaRequisitoRepository;

    public InscripcionAsignaturaRequisitoService(InscripcionAsignaturaRequisitoRepository inscripcionAsignaturaRequisitoRepository) {
        this.inscripcionAsignaturaRequisitoRepository = inscripcionAsignaturaRequisitoRepository;
    }

    /**
     * Save a inscripcionAsignaturaRequisito.
     *
     * @param inscripcionAsignaturaRequisito the entity to save.
     * @return the persisted entity.
     */
    public InscripcionAsignaturaRequisito save(InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito) {
        log.debug("Request to save InscripcionAsignaturaRequisito : {}", inscripcionAsignaturaRequisito);
        return inscripcionAsignaturaRequisitoRepository.save(inscripcionAsignaturaRequisito);
    }

    /**
     * Update a inscripcionAsignaturaRequisito.
     *
     * @param inscripcionAsignaturaRequisito the entity to save.
     * @return the persisted entity.
     */
    public InscripcionAsignaturaRequisito update(InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito) {
        log.debug("Request to save InscripcionAsignaturaRequisito : {}", inscripcionAsignaturaRequisito);
        return inscripcionAsignaturaRequisitoRepository.save(inscripcionAsignaturaRequisito);
    }

    /**
     * Partially update a inscripcionAsignaturaRequisito.
     *
     * @param inscripcionAsignaturaRequisito the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<InscripcionAsignaturaRequisito> partialUpdate(InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito) {
        log.debug("Request to partially update InscripcionAsignaturaRequisito : {}", inscripcionAsignaturaRequisito);

        return inscripcionAsignaturaRequisitoRepository
            .findById(inscripcionAsignaturaRequisito.getId())
            .map(existingInscripcionAsignaturaRequisito -> {
                if (inscripcionAsignaturaRequisito.getDescripcion() != null) {
                    existingInscripcionAsignaturaRequisito.setDescripcion(inscripcionAsignaturaRequisito.getDescripcion());
                }
                if (inscripcionAsignaturaRequisito.getImagen() != null) {
                    existingInscripcionAsignaturaRequisito.setImagen(inscripcionAsignaturaRequisito.getImagen());
                }
                if (inscripcionAsignaturaRequisito.getImagenContentType() != null) {
                    existingInscripcionAsignaturaRequisito.setImagenContentType(inscripcionAsignaturaRequisito.getImagenContentType());
                }
                if (inscripcionAsignaturaRequisito.getDocumento() != null) {
                    existingInscripcionAsignaturaRequisito.setDocumento(inscripcionAsignaturaRequisito.getDocumento());
                }

                return existingInscripcionAsignaturaRequisito;
            })
            .map(inscripcionAsignaturaRequisitoRepository::save);
    }

    /**
     * Get all the inscripcionAsignaturaRequisitos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<InscripcionAsignaturaRequisito> findAll() {
        log.debug("Request to get all InscripcionAsignaturaRequisitos");
        return inscripcionAsignaturaRequisitoRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the inscripcionAsignaturaRequisitos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<InscripcionAsignaturaRequisito> findAllWithEagerRelationships(Pageable pageable) {
        return inscripcionAsignaturaRequisitoRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one inscripcionAsignaturaRequisito by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<InscripcionAsignaturaRequisito> findOne(Long id) {
        log.debug("Request to get InscripcionAsignaturaRequisito : {}", id);
        return inscripcionAsignaturaRequisitoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the inscripcionAsignaturaRequisito by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete InscripcionAsignaturaRequisito : {}", id);
        inscripcionAsignaturaRequisitoRepository.deleteById(id);
    }
}
