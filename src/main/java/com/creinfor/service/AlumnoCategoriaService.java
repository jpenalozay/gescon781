package com.creinfor.service;

import com.creinfor.domain.AlumnoCategoria;
import com.creinfor.repository.AlumnoCategoriaRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AlumnoCategoria}.
 */
@Service
@Transactional
public class AlumnoCategoriaService {

    private final Logger log = LoggerFactory.getLogger(AlumnoCategoriaService.class);

    private final AlumnoCategoriaRepository alumnoCategoriaRepository;

    public AlumnoCategoriaService(AlumnoCategoriaRepository alumnoCategoriaRepository) {
        this.alumnoCategoriaRepository = alumnoCategoriaRepository;
    }

    /**
     * Save a alumnoCategoria.
     *
     * @param alumnoCategoria the entity to save.
     * @return the persisted entity.
     */
    public AlumnoCategoria save(AlumnoCategoria alumnoCategoria) {
        log.debug("Request to save AlumnoCategoria : {}", alumnoCategoria);
        return alumnoCategoriaRepository.save(alumnoCategoria);
    }

    /**
     * Update a alumnoCategoria.
     *
     * @param alumnoCategoria the entity to save.
     * @return the persisted entity.
     */
    public AlumnoCategoria update(AlumnoCategoria alumnoCategoria) {
        log.debug("Request to save AlumnoCategoria : {}", alumnoCategoria);
        return alumnoCategoriaRepository.save(alumnoCategoria);
    }

    /**
     * Partially update a alumnoCategoria.
     *
     * @param alumnoCategoria the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AlumnoCategoria> partialUpdate(AlumnoCategoria alumnoCategoria) {
        log.debug("Request to partially update AlumnoCategoria : {}", alumnoCategoria);

        return alumnoCategoriaRepository
            .findById(alumnoCategoria.getId())
            .map(existingAlumnoCategoria -> {
                if (alumnoCategoria.getLicenciaNumeroAlumno() != null) {
                    existingAlumnoCategoria.setLicenciaNumeroAlumno(alumnoCategoria.getLicenciaNumeroAlumno());
                }

                return existingAlumnoCategoria;
            })
            .map(alumnoCategoriaRepository::save);
    }

    /**
     * Get all the alumnoCategorias.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AlumnoCategoria> findAll() {
        log.debug("Request to get all AlumnoCategorias");
        return alumnoCategoriaRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the alumnoCategorias with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<AlumnoCategoria> findAllWithEagerRelationships(Pageable pageable) {
        return alumnoCategoriaRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one alumnoCategoria by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AlumnoCategoria> findOne(Long id) {
        log.debug("Request to get AlumnoCategoria : {}", id);
        return alumnoCategoriaRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the alumnoCategoria by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AlumnoCategoria : {}", id);
        alumnoCategoriaRepository.deleteById(id);
    }
}
