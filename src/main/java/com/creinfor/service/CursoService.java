package com.creinfor.service;

import com.creinfor.domain.Curso;
import com.creinfor.repository.CursoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Curso}.
 */
@Service
@Transactional
public class CursoService {

    private final Logger log = LoggerFactory.getLogger(CursoService.class);

    private final CursoRepository cursoRepository;

    public CursoService(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    /**
     * Save a curso.
     *
     * @param curso the entity to save.
     * @return the persisted entity.
     */
    public Curso save(Curso curso) {
        log.debug("Request to save Curso : {}", curso);
        return cursoRepository.save(curso);
    }

    /**
     * Update a curso.
     *
     * @param curso the entity to save.
     * @return the persisted entity.
     */
    public Curso update(Curso curso) {
        log.debug("Request to save Curso : {}", curso);
        return cursoRepository.save(curso);
    }

    /**
     * Partially update a curso.
     *
     * @param curso the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Curso> partialUpdate(Curso curso) {
        log.debug("Request to partially update Curso : {}", curso);

        return cursoRepository
            .findById(curso.getId())
            .map(existingCurso -> {
                if (curso.getActivo() != null) {
                    existingCurso.setActivo(curso.getActivo());
                }
                if (curso.getTipo() != null) {
                    existingCurso.setTipo(curso.getTipo());
                }
                if (curso.getNombre() != null) {
                    existingCurso.setNombre(curso.getNombre());
                }
                if (curso.getNombreCorto() != null) {
                    existingCurso.setNombreCorto(curso.getNombreCorto());
                }
                if (curso.getDescripcion() != null) {
                    existingCurso.setDescripcion(curso.getDescripcion());
                }
                if (curso.getImagen() != null) {
                    existingCurso.setImagen(curso.getImagen());
                }
                if (curso.getImagenContentType() != null) {
                    existingCurso.setImagenContentType(curso.getImagenContentType());
                }

                return existingCurso;
            })
            .map(cursoRepository::save);
    }

    /**
     * Get all the cursos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Curso> findAll() {
        log.debug("Request to get all Cursos");
        return cursoRepository.findAll();
    }

    /**
     * Get one curso by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Curso> findOne(Long id) {
        log.debug("Request to get Curso : {}", id);
        return cursoRepository.findById(id);
    }

    /**
     * Delete the curso by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Curso : {}", id);
        cursoRepository.deleteById(id);
    }
}
