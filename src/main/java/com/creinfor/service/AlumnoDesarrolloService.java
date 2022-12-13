package com.creinfor.service;

import com.creinfor.domain.AlumnoDesarrollo;
import com.creinfor.repository.AlumnoDesarrolloRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AlumnoDesarrollo}.
 */
@Service
@Transactional
public class AlumnoDesarrolloService {

    private final Logger log = LoggerFactory.getLogger(AlumnoDesarrolloService.class);

    private final AlumnoDesarrolloRepository alumnoDesarrolloRepository;

    public AlumnoDesarrolloService(AlumnoDesarrolloRepository alumnoDesarrolloRepository) {
        this.alumnoDesarrolloRepository = alumnoDesarrolloRepository;
    }

    /**
     * Save a alumnoDesarrollo.
     *
     * @param alumnoDesarrollo the entity to save.
     * @return the persisted entity.
     */
    public AlumnoDesarrollo save(AlumnoDesarrollo alumnoDesarrollo) {
        log.debug("Request to save AlumnoDesarrollo : {}", alumnoDesarrollo);
        return alumnoDesarrolloRepository.save(alumnoDesarrollo);
    }

    /**
     * Update a alumnoDesarrollo.
     *
     * @param alumnoDesarrollo the entity to save.
     * @return the persisted entity.
     */
    public AlumnoDesarrollo update(AlumnoDesarrollo alumnoDesarrollo) {
        log.debug("Request to save AlumnoDesarrollo : {}", alumnoDesarrollo);
        return alumnoDesarrolloRepository.save(alumnoDesarrollo);
    }

    /**
     * Partially update a alumnoDesarrollo.
     *
     * @param alumnoDesarrollo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AlumnoDesarrollo> partialUpdate(AlumnoDesarrollo alumnoDesarrollo) {
        log.debug("Request to partially update AlumnoDesarrollo : {}", alumnoDesarrollo);

        return alumnoDesarrolloRepository
            .findById(alumnoDesarrollo.getId())
            .map(existingAlumnoDesarrollo -> {
                if (alumnoDesarrollo.getClasesTeoriaProgramadas() != null) {
                    existingAlumnoDesarrollo.setClasesTeoriaProgramadas(alumnoDesarrollo.getClasesTeoriaProgramadas());
                }
                if (alumnoDesarrollo.getClasesPracticasProgramas() != null) {
                    existingAlumnoDesarrollo.setClasesPracticasProgramas(alumnoDesarrollo.getClasesPracticasProgramas());
                }
                if (alumnoDesarrollo.getClasesInasistenciaTeoria() != null) {
                    existingAlumnoDesarrollo.setClasesInasistenciaTeoria(alumnoDesarrollo.getClasesInasistenciaTeoria());
                }
                if (alumnoDesarrollo.getClasesInasistenciaPractica() != null) {
                    existingAlumnoDesarrollo.setClasesInasistenciaPractica(alumnoDesarrollo.getClasesInasistenciaPractica());
                }
                if (alumnoDesarrollo.getClasesRealizadasTeoria() != null) {
                    existingAlumnoDesarrollo.setClasesRealizadasTeoria(alumnoDesarrollo.getClasesRealizadasTeoria());
                }
                if (alumnoDesarrollo.getClasesRealizadasPractica() != null) {
                    existingAlumnoDesarrollo.setClasesRealizadasPractica(alumnoDesarrollo.getClasesRealizadasPractica());
                }
                if (alumnoDesarrollo.getAlumnoDesarrolloEstado() != null) {
                    existingAlumnoDesarrollo.setAlumnoDesarrolloEstado(alumnoDesarrollo.getAlumnoDesarrolloEstado());
                }

                return existingAlumnoDesarrollo;
            })
            .map(alumnoDesarrolloRepository::save);
    }

    /**
     * Get all the alumnoDesarrollos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AlumnoDesarrollo> findAll() {
        log.debug("Request to get all AlumnoDesarrollos");
        return alumnoDesarrolloRepository.findAll();
    }

    /**
     * Get one alumnoDesarrollo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AlumnoDesarrollo> findOne(Long id) {
        log.debug("Request to get AlumnoDesarrollo : {}", id);
        return alumnoDesarrolloRepository.findById(id);
    }

    /**
     * Delete the alumnoDesarrollo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AlumnoDesarrollo : {}", id);
        alumnoDesarrolloRepository.deleteById(id);
    }
}
