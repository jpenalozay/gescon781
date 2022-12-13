package com.creinfor.service;

import com.creinfor.domain.Teoria;
import com.creinfor.repository.TeoriaRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Teoria}.
 */
@Service
@Transactional
public class TeoriaService {

    private final Logger log = LoggerFactory.getLogger(TeoriaService.class);

    private final TeoriaRepository teoriaRepository;

    public TeoriaService(TeoriaRepository teoriaRepository) {
        this.teoriaRepository = teoriaRepository;
    }

    /**
     * Save a teoria.
     *
     * @param teoria the entity to save.
     * @return the persisted entity.
     */
    public Teoria save(Teoria teoria) {
        log.debug("Request to save Teoria : {}", teoria);
        return teoriaRepository.save(teoria);
    }

    /**
     * Update a teoria.
     *
     * @param teoria the entity to save.
     * @return the persisted entity.
     */
    public Teoria update(Teoria teoria) {
        log.debug("Request to save Teoria : {}", teoria);
        return teoriaRepository.save(teoria);
    }

    /**
     * Partially update a teoria.
     *
     * @param teoria the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Teoria> partialUpdate(Teoria teoria) {
        log.debug("Request to partially update Teoria : {}", teoria);

        return teoriaRepository
            .findById(teoria.getId())
            .map(existingTeoria -> {
                if (teoria.getActivo() != null) {
                    existingTeoria.setActivo(teoria.getActivo());
                }
                if (teoria.getNombre() != null) {
                    existingTeoria.setNombre(teoria.getNombre());
                }
                if (teoria.getNombreCorto() != null) {
                    existingTeoria.setNombreCorto(teoria.getNombreCorto());
                }
                if (teoria.getDescripcion() != null) {
                    existingTeoria.setDescripcion(teoria.getDescripcion());
                }
                if (teoria.getImagen() != null) {
                    existingTeoria.setImagen(teoria.getImagen());
                }
                if (teoria.getImagenContentType() != null) {
                    existingTeoria.setImagenContentType(teoria.getImagenContentType());
                }

                return existingTeoria;
            })
            .map(teoriaRepository::save);
    }

    /**
     * Get all the teorias.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Teoria> findAll() {
        log.debug("Request to get all Teorias");
        return teoriaRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the teorias with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Teoria> findAllWithEagerRelationships(Pageable pageable) {
        return teoriaRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one teoria by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Teoria> findOne(Long id) {
        log.debug("Request to get Teoria : {}", id);
        return teoriaRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the teoria by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Teoria : {}", id);
        teoriaRepository.deleteById(id);
    }
}
