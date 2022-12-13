package com.creinfor.service;

import com.creinfor.domain.Alumno;
import com.creinfor.repository.AlumnoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Alumno}.
 */
@Service
@Transactional
public class AlumnoService {

    private final Logger log = LoggerFactory.getLogger(AlumnoService.class);

    private final AlumnoRepository alumnoRepository;

    public AlumnoService(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    /**
     * Save a alumno.
     *
     * @param alumno the entity to save.
     * @return the persisted entity.
     */
    public Alumno save(Alumno alumno) {
        log.debug("Request to save Alumno : {}", alumno);
        return alumnoRepository.save(alumno);
    }

    /**
     * Update a alumno.
     *
     * @param alumno the entity to save.
     * @return the persisted entity.
     */
    public Alumno update(Alumno alumno) {
        log.debug("Request to save Alumno : {}", alumno);
        return alumnoRepository.save(alumno);
    }

    /**
     * Partially update a alumno.
     *
     * @param alumno the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Alumno> partialUpdate(Alumno alumno) {
        log.debug("Request to partially update Alumno : {}", alumno);

        return alumnoRepository
            .findById(alumno.getId())
            .map(existingAlumno -> {
                if (alumno.getCodigo() != null) {
                    existingAlumno.setCodigo(alumno.getCodigo());
                }
                if (alumno.getEstado() != null) {
                    existingAlumno.setEstado(alumno.getEstado());
                }
                if (alumno.getTipo() != null) {
                    existingAlumno.setTipo(alumno.getTipo());
                }
                if (alumno.getAlumnoGradoInstruccion() != null) {
                    existingAlumno.setAlumnoGradoInstruccion(alumno.getAlumnoGradoInstruccion());
                }
                if (alumno.getOcupacion() != null) {
                    existingAlumno.setOcupacion(alumno.getOcupacion());
                }
                if (alumno.getImagen() != null) {
                    existingAlumno.setImagen(alumno.getImagen());
                }
                if (alumno.getImagenContentType() != null) {
                    existingAlumno.setImagenContentType(alumno.getImagenContentType());
                }

                return existingAlumno;
            })
            .map(alumnoRepository::save);
    }

    /**
     * Get all the alumnos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Alumno> findAll() {
        log.debug("Request to get all Alumnos");
        return alumnoRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the alumnos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Alumno> findAllWithEagerRelationships(Pageable pageable) {
        return alumnoRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one alumno by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Alumno> findOne(Long id) {
        log.debug("Request to get Alumno : {}", id);
        return alumnoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the alumno by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Alumno : {}", id);
        alumnoRepository.deleteById(id);
    }
}
