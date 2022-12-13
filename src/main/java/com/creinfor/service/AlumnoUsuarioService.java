package com.creinfor.service;

import com.creinfor.domain.AlumnoUsuario;
import com.creinfor.repository.AlumnoUsuarioRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link AlumnoUsuario}.
 */
@Service
@Transactional
public class AlumnoUsuarioService {

    private final Logger log = LoggerFactory.getLogger(AlumnoUsuarioService.class);

    private final AlumnoUsuarioRepository alumnoUsuarioRepository;

    public AlumnoUsuarioService(AlumnoUsuarioRepository alumnoUsuarioRepository) {
        this.alumnoUsuarioRepository = alumnoUsuarioRepository;
    }

    /**
     * Save a alumnoUsuario.
     *
     * @param alumnoUsuario the entity to save.
     * @return the persisted entity.
     */
    public AlumnoUsuario save(AlumnoUsuario alumnoUsuario) {
        log.debug("Request to save AlumnoUsuario : {}", alumnoUsuario);
        return alumnoUsuarioRepository.save(alumnoUsuario);
    }

    /**
     * Update a alumnoUsuario.
     *
     * @param alumnoUsuario the entity to save.
     * @return the persisted entity.
     */
    public AlumnoUsuario update(AlumnoUsuario alumnoUsuario) {
        log.debug("Request to save AlumnoUsuario : {}", alumnoUsuario);
        return alumnoUsuarioRepository.save(alumnoUsuario);
    }

    /**
     * Partially update a alumnoUsuario.
     *
     * @param alumnoUsuario the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AlumnoUsuario> partialUpdate(AlumnoUsuario alumnoUsuario) {
        log.debug("Request to partially update AlumnoUsuario : {}", alumnoUsuario);

        return alumnoUsuarioRepository
            .findById(alumnoUsuario.getId())
            .map(existingAlumnoUsuario -> {
                if (alumnoUsuario.getActivo() != null) {
                    existingAlumnoUsuario.setActivo(alumnoUsuario.getActivo());
                }
                if (alumnoUsuario.getUsuario() != null) {
                    existingAlumnoUsuario.setUsuario(alumnoUsuario.getUsuario());
                }
                if (alumnoUsuario.getClave() != null) {
                    existingAlumnoUsuario.setClave(alumnoUsuario.getClave());
                }
                if (alumnoUsuario.getImagen() != null) {
                    existingAlumnoUsuario.setImagen(alumnoUsuario.getImagen());
                }
                if (alumnoUsuario.getImagenContentType() != null) {
                    existingAlumnoUsuario.setImagenContentType(alumnoUsuario.getImagenContentType());
                }

                return existingAlumnoUsuario;
            })
            .map(alumnoUsuarioRepository::save);
    }

    /**
     * Get all the alumnoUsuarios.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AlumnoUsuario> findAll() {
        log.debug("Request to get all AlumnoUsuarios");
        return alumnoUsuarioRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the alumnoUsuarios with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<AlumnoUsuario> findAllWithEagerRelationships(Pageable pageable) {
        return alumnoUsuarioRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one alumnoUsuario by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AlumnoUsuario> findOne(Long id) {
        log.debug("Request to get AlumnoUsuario : {}", id);
        return alumnoUsuarioRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the alumnoUsuario by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AlumnoUsuario : {}", id);
        alumnoUsuarioRepository.deleteById(id);
    }
}
