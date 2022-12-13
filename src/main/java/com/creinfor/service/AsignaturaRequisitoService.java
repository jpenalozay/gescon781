package com.creinfor.service;

import com.creinfor.domain.AsignaturaRequisito;
import com.creinfor.repository.AsignaturaRequisitoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AsignaturaRequisito}.
 */
@Service
@Transactional
public class AsignaturaRequisitoService {

    private final Logger log = LoggerFactory.getLogger(AsignaturaRequisitoService.class);

    private final AsignaturaRequisitoRepository asignaturaRequisitoRepository;

    public AsignaturaRequisitoService(AsignaturaRequisitoRepository asignaturaRequisitoRepository) {
        this.asignaturaRequisitoRepository = asignaturaRequisitoRepository;
    }

    /**
     * Save a asignaturaRequisito.
     *
     * @param asignaturaRequisito the entity to save.
     * @return the persisted entity.
     */
    public AsignaturaRequisito save(AsignaturaRequisito asignaturaRequisito) {
        log.debug("Request to save AsignaturaRequisito : {}", asignaturaRequisito);
        return asignaturaRequisitoRepository.save(asignaturaRequisito);
    }

    /**
     * Update a asignaturaRequisito.
     *
     * @param asignaturaRequisito the entity to save.
     * @return the persisted entity.
     */
    public AsignaturaRequisito update(AsignaturaRequisito asignaturaRequisito) {
        log.debug("Request to save AsignaturaRequisito : {}", asignaturaRequisito);
        return asignaturaRequisitoRepository.save(asignaturaRequisito);
    }

    /**
     * Partially update a asignaturaRequisito.
     *
     * @param asignaturaRequisito the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AsignaturaRequisito> partialUpdate(AsignaturaRequisito asignaturaRequisito) {
        log.debug("Request to partially update AsignaturaRequisito : {}", asignaturaRequisito);

        return asignaturaRequisitoRepository
            .findById(asignaturaRequisito.getId())
            .map(existingAsignaturaRequisito -> {
                if (asignaturaRequisito.getActivo() != null) {
                    existingAsignaturaRequisito.setActivo(asignaturaRequisito.getActivo());
                }
                if (asignaturaRequisito.getTipo() != null) {
                    existingAsignaturaRequisito.setTipo(asignaturaRequisito.getTipo());
                }
                if (asignaturaRequisito.getNombre() != null) {
                    existingAsignaturaRequisito.setNombre(asignaturaRequisito.getNombre());
                }
                if (asignaturaRequisito.getDescripcion() != null) {
                    existingAsignaturaRequisito.setDescripcion(asignaturaRequisito.getDescripcion());
                }
                if (asignaturaRequisito.getImagen() != null) {
                    existingAsignaturaRequisito.setImagen(asignaturaRequisito.getImagen());
                }
                if (asignaturaRequisito.getImagenContentType() != null) {
                    existingAsignaturaRequisito.setImagenContentType(asignaturaRequisito.getImagenContentType());
                }

                return existingAsignaturaRequisito;
            })
            .map(asignaturaRequisitoRepository::save);
    }

    /**
     * Get all the asignaturaRequisitos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AsignaturaRequisito> findAll() {
        log.debug("Request to get all AsignaturaRequisitos");
        return asignaturaRequisitoRepository.findAll();
    }

    /**
     * Get one asignaturaRequisito by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AsignaturaRequisito> findOne(Long id) {
        log.debug("Request to get AsignaturaRequisito : {}", id);
        return asignaturaRequisitoRepository.findById(id);
    }

    /**
     * Delete the asignaturaRequisito by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AsignaturaRequisito : {}", id);
        asignaturaRequisitoRepository.deleteById(id);
    }
}
