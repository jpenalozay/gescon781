package com.creinfor.service;

import com.creinfor.domain.Profesor;
import com.creinfor.repository.ProfesorRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Profesor}.
 */
@Service
@Transactional
public class ProfesorService {

    private final Logger log = LoggerFactory.getLogger(ProfesorService.class);

    private final ProfesorRepository profesorRepository;

    public ProfesorService(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    /**
     * Save a profesor.
     *
     * @param profesor the entity to save.
     * @return the persisted entity.
     */
    public Profesor save(Profesor profesor) {
        log.debug("Request to save Profesor : {}", profesor);
        return profesorRepository.save(profesor);
    }

    /**
     * Update a profesor.
     *
     * @param profesor the entity to save.
     * @return the persisted entity.
     */
    public Profesor update(Profesor profesor) {
        log.debug("Request to save Profesor : {}", profesor);
        return profesorRepository.save(profesor);
    }

    /**
     * Partially update a profesor.
     *
     * @param profesor the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Profesor> partialUpdate(Profesor profesor) {
        log.debug("Request to partially update Profesor : {}", profesor);

        return profesorRepository
            .findById(profesor.getId())
            .map(existingProfesor -> {
                if (profesor.getActivo() != null) {
                    existingProfesor.setActivo(profesor.getActivo());
                }
                if (profesor.getCodigo() != null) {
                    existingProfesor.setCodigo(profesor.getCodigo());
                }
                if (profesor.getTeoria() != null) {
                    existingProfesor.setTeoria(profesor.getTeoria());
                }
                if (profesor.getPractica() != null) {
                    existingProfesor.setPractica(profesor.getPractica());
                }
                if (profesor.getLicenciaNumero() != null) {
                    existingProfesor.setLicenciaNumero(profesor.getLicenciaNumero());
                }

                return existingProfesor;
            })
            .map(profesorRepository::save);
    }

    /**
     * Get all the profesors.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Profesor> findAll() {
        log.debug("Request to get all Profesors");
        return profesorRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the profesors with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Profesor> findAllWithEagerRelationships(Pageable pageable) {
        return profesorRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one profesor by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Profesor> findOne(Long id) {
        log.debug("Request to get Profesor : {}", id);
        return profesorRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the profesor by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Profesor : {}", id);
        profesorRepository.deleteById(id);
    }
}
