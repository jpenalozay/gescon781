package com.creinfor.service;

import com.creinfor.domain.AsignaturaAdiciones;
import com.creinfor.repository.AsignaturaAdicionesRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AsignaturaAdiciones}.
 */
@Service
@Transactional
public class AsignaturaAdicionesService {

    private final Logger log = LoggerFactory.getLogger(AsignaturaAdicionesService.class);

    private final AsignaturaAdicionesRepository asignaturaAdicionesRepository;

    public AsignaturaAdicionesService(AsignaturaAdicionesRepository asignaturaAdicionesRepository) {
        this.asignaturaAdicionesRepository = asignaturaAdicionesRepository;
    }

    /**
     * Save a asignaturaAdiciones.
     *
     * @param asignaturaAdiciones the entity to save.
     * @return the persisted entity.
     */
    public AsignaturaAdiciones save(AsignaturaAdiciones asignaturaAdiciones) {
        log.debug("Request to save AsignaturaAdiciones : {}", asignaturaAdiciones);
        return asignaturaAdicionesRepository.save(asignaturaAdiciones);
    }

    /**
     * Update a asignaturaAdiciones.
     *
     * @param asignaturaAdiciones the entity to save.
     * @return the persisted entity.
     */
    public AsignaturaAdiciones update(AsignaturaAdiciones asignaturaAdiciones) {
        log.debug("Request to save AsignaturaAdiciones : {}", asignaturaAdiciones);
        return asignaturaAdicionesRepository.save(asignaturaAdiciones);
    }

    /**
     * Partially update a asignaturaAdiciones.
     *
     * @param asignaturaAdiciones the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AsignaturaAdiciones> partialUpdate(AsignaturaAdiciones asignaturaAdiciones) {
        log.debug("Request to partially update AsignaturaAdiciones : {}", asignaturaAdiciones);

        return asignaturaAdicionesRepository
            .findById(asignaturaAdiciones.getId())
            .map(existingAsignaturaAdiciones -> {
                if (asignaturaAdiciones.getActivo() != null) {
                    existingAsignaturaAdiciones.setActivo(asignaturaAdiciones.getActivo());
                }
                if (asignaturaAdiciones.getNombre() != null) {
                    existingAsignaturaAdiciones.setNombre(asignaturaAdiciones.getNombre());
                }
                if (asignaturaAdiciones.getNombreCorto() != null) {
                    existingAsignaturaAdiciones.setNombreCorto(asignaturaAdiciones.getNombreCorto());
                }
                if (asignaturaAdiciones.getDescripcion() != null) {
                    existingAsignaturaAdiciones.setDescripcion(asignaturaAdiciones.getDescripcion());
                }
                if (asignaturaAdiciones.getImagen() != null) {
                    existingAsignaturaAdiciones.setImagen(asignaturaAdiciones.getImagen());
                }
                if (asignaturaAdiciones.getImagenContentType() != null) {
                    existingAsignaturaAdiciones.setImagenContentType(asignaturaAdiciones.getImagenContentType());
                }

                return existingAsignaturaAdiciones;
            })
            .map(asignaturaAdicionesRepository::save);
    }

    /**
     * Get all the asignaturaAdiciones.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AsignaturaAdiciones> findAll() {
        log.debug("Request to get all AsignaturaAdiciones");
        return asignaturaAdicionesRepository.findAll();
    }

    /**
     * Get one asignaturaAdiciones by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AsignaturaAdiciones> findOne(Long id) {
        log.debug("Request to get AsignaturaAdiciones : {}", id);
        return asignaturaAdicionesRepository.findById(id);
    }

    /**
     * Delete the asignaturaAdiciones by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AsignaturaAdiciones : {}", id);
        asignaturaAdicionesRepository.deleteById(id);
    }
}
