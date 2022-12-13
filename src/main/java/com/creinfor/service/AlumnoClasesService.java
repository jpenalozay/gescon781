package com.creinfor.service;

import com.creinfor.domain.AlumnoClases;
import com.creinfor.repository.AlumnoClasesRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AlumnoClases}.
 */
@Service
@Transactional
public class AlumnoClasesService {

    private final Logger log = LoggerFactory.getLogger(AlumnoClasesService.class);

    private final AlumnoClasesRepository alumnoClasesRepository;

    public AlumnoClasesService(AlumnoClasesRepository alumnoClasesRepository) {
        this.alumnoClasesRepository = alumnoClasesRepository;
    }

    /**
     * Save a alumnoClases.
     *
     * @param alumnoClases the entity to save.
     * @return the persisted entity.
     */
    public AlumnoClases save(AlumnoClases alumnoClases) {
        log.debug("Request to save AlumnoClases : {}", alumnoClases);
        return alumnoClasesRepository.save(alumnoClases);
    }

    /**
     * Update a alumnoClases.
     *
     * @param alumnoClases the entity to save.
     * @return the persisted entity.
     */
    public AlumnoClases update(AlumnoClases alumnoClases) {
        log.debug("Request to save AlumnoClases : {}", alumnoClases);
        return alumnoClasesRepository.save(alumnoClases);
    }

    /**
     * Partially update a alumnoClases.
     *
     * @param alumnoClases the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AlumnoClases> partialUpdate(AlumnoClases alumnoClases) {
        log.debug("Request to partially update AlumnoClases : {}", alumnoClases);

        return alumnoClasesRepository
            .findById(alumnoClases.getId())
            .map(existingAlumnoClases -> {
                if (alumnoClases.getClasesTotales() != null) {
                    existingAlumnoClases.setClasesTotales(alumnoClases.getClasesTotales());
                }
                if (alumnoClases.getClasesProgramadas() != null) {
                    existingAlumnoClases.setClasesProgramadas(alumnoClases.getClasesProgramadas());
                }
                if (alumnoClases.getClasesRealizadas() != null) {
                    existingAlumnoClases.setClasesRealizadas(alumnoClases.getClasesRealizadas());
                }

                return existingAlumnoClases;
            })
            .map(alumnoClasesRepository::save);
    }

    /**
     * Get all the alumnoClases.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AlumnoClases> findAll() {
        log.debug("Request to get all AlumnoClases");
        return alumnoClasesRepository.findAll();
    }

    /**
     *  Get all the alumnoClases where Alumno is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AlumnoClases> findAllWhereAlumnoIsNull() {
        log.debug("Request to get all alumnoClases where Alumno is null");
        return StreamSupport
            .stream(alumnoClasesRepository.findAll().spliterator(), false)
            .filter(alumnoClases -> alumnoClases.getAlumno() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one alumnoClases by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AlumnoClases> findOne(Long id) {
        log.debug("Request to get AlumnoClases : {}", id);
        return alumnoClasesRepository.findById(id);
    }

    /**
     * Delete the alumnoClases by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AlumnoClases : {}", id);
        alumnoClasesRepository.deleteById(id);
    }
}
