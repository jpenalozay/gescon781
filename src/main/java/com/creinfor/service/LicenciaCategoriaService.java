package com.creinfor.service;

import com.creinfor.domain.LicenciaCategoria;
import com.creinfor.repository.LicenciaCategoriaRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LicenciaCategoria}.
 */
@Service
@Transactional
public class LicenciaCategoriaService {

    private final Logger log = LoggerFactory.getLogger(LicenciaCategoriaService.class);

    private final LicenciaCategoriaRepository licenciaCategoriaRepository;

    public LicenciaCategoriaService(LicenciaCategoriaRepository licenciaCategoriaRepository) {
        this.licenciaCategoriaRepository = licenciaCategoriaRepository;
    }

    /**
     * Save a licenciaCategoria.
     *
     * @param licenciaCategoria the entity to save.
     * @return the persisted entity.
     */
    public LicenciaCategoria save(LicenciaCategoria licenciaCategoria) {
        log.debug("Request to save LicenciaCategoria : {}", licenciaCategoria);
        return licenciaCategoriaRepository.save(licenciaCategoria);
    }

    /**
     * Update a licenciaCategoria.
     *
     * @param licenciaCategoria the entity to save.
     * @return the persisted entity.
     */
    public LicenciaCategoria update(LicenciaCategoria licenciaCategoria) {
        log.debug("Request to save LicenciaCategoria : {}", licenciaCategoria);
        return licenciaCategoriaRepository.save(licenciaCategoria);
    }

    /**
     * Partially update a licenciaCategoria.
     *
     * @param licenciaCategoria the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LicenciaCategoria> partialUpdate(LicenciaCategoria licenciaCategoria) {
        log.debug("Request to partially update LicenciaCategoria : {}", licenciaCategoria);

        return licenciaCategoriaRepository
            .findById(licenciaCategoria.getId())
            .map(existingLicenciaCategoria -> {
                if (licenciaCategoria.getCategoria() != null) {
                    existingLicenciaCategoria.setCategoria(licenciaCategoria.getCategoria());
                }

                return existingLicenciaCategoria;
            })
            .map(licenciaCategoriaRepository::save);
    }

    /**
     * Get all the licenciaCategorias.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LicenciaCategoria> findAll() {
        log.debug("Request to get all LicenciaCategorias");
        return licenciaCategoriaRepository.findAll();
    }

    /**
     * Get one licenciaCategoria by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LicenciaCategoria> findOne(Long id) {
        log.debug("Request to get LicenciaCategoria : {}", id);
        return licenciaCategoriaRepository.findById(id);
    }

    /**
     * Delete the licenciaCategoria by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LicenciaCategoria : {}", id);
        licenciaCategoriaRepository.deleteById(id);
    }
}
