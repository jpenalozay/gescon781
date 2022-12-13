package com.creinfor.service;

import com.creinfor.domain.TeoriaHorarioCatalogo;
import com.creinfor.repository.TeoriaHorarioCatalogoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TeoriaHorarioCatalogo}.
 */
@Service
@Transactional
public class TeoriaHorarioCatalogoService {

    private final Logger log = LoggerFactory.getLogger(TeoriaHorarioCatalogoService.class);

    private final TeoriaHorarioCatalogoRepository teoriaHorarioCatalogoRepository;

    public TeoriaHorarioCatalogoService(TeoriaHorarioCatalogoRepository teoriaHorarioCatalogoRepository) {
        this.teoriaHorarioCatalogoRepository = teoriaHorarioCatalogoRepository;
    }

    /**
     * Save a teoriaHorarioCatalogo.
     *
     * @param teoriaHorarioCatalogo the entity to save.
     * @return the persisted entity.
     */
    public TeoriaHorarioCatalogo save(TeoriaHorarioCatalogo teoriaHorarioCatalogo) {
        log.debug("Request to save TeoriaHorarioCatalogo : {}", teoriaHorarioCatalogo);
        return teoriaHorarioCatalogoRepository.save(teoriaHorarioCatalogo);
    }

    /**
     * Update a teoriaHorarioCatalogo.
     *
     * @param teoriaHorarioCatalogo the entity to save.
     * @return the persisted entity.
     */
    public TeoriaHorarioCatalogo update(TeoriaHorarioCatalogo teoriaHorarioCatalogo) {
        log.debug("Request to save TeoriaHorarioCatalogo : {}", teoriaHorarioCatalogo);
        return teoriaHorarioCatalogoRepository.save(teoriaHorarioCatalogo);
    }

    /**
     * Partially update a teoriaHorarioCatalogo.
     *
     * @param teoriaHorarioCatalogo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TeoriaHorarioCatalogo> partialUpdate(TeoriaHorarioCatalogo teoriaHorarioCatalogo) {
        log.debug("Request to partially update TeoriaHorarioCatalogo : {}", teoriaHorarioCatalogo);

        return teoriaHorarioCatalogoRepository
            .findById(teoriaHorarioCatalogo.getId())
            .map(existingTeoriaHorarioCatalogo -> {
                if (teoriaHorarioCatalogo.getActivo() != null) {
                    existingTeoriaHorarioCatalogo.setActivo(teoriaHorarioCatalogo.getActivo());
                }
                if (teoriaHorarioCatalogo.getNombre() != null) {
                    existingTeoriaHorarioCatalogo.setNombre(teoriaHorarioCatalogo.getNombre());
                }
                if (teoriaHorarioCatalogo.getNombreCorto() != null) {
                    existingTeoriaHorarioCatalogo.setNombreCorto(teoriaHorarioCatalogo.getNombreCorto());
                }
                if (teoriaHorarioCatalogo.getDescripcion() != null) {
                    existingTeoriaHorarioCatalogo.setDescripcion(teoriaHorarioCatalogo.getDescripcion());
                }
                if (teoriaHorarioCatalogo.getImagen() != null) {
                    existingTeoriaHorarioCatalogo.setImagen(teoriaHorarioCatalogo.getImagen());
                }
                if (teoriaHorarioCatalogo.getImagenContentType() != null) {
                    existingTeoriaHorarioCatalogo.setImagenContentType(teoriaHorarioCatalogo.getImagenContentType());
                }
                if (teoriaHorarioCatalogo.getPeriodo() != null) {
                    existingTeoriaHorarioCatalogo.setPeriodo(teoriaHorarioCatalogo.getPeriodo());
                }
                if (teoriaHorarioCatalogo.getAnio() != null) {
                    existingTeoriaHorarioCatalogo.setAnio(teoriaHorarioCatalogo.getAnio());
                }
                if (teoriaHorarioCatalogo.getMes() != null) {
                    existingTeoriaHorarioCatalogo.setMes(teoriaHorarioCatalogo.getMes());
                }
                if (teoriaHorarioCatalogo.getDia() != null) {
                    existingTeoriaHorarioCatalogo.setDia(teoriaHorarioCatalogo.getDia());
                }
                if (teoriaHorarioCatalogo.getHoraInicio() != null) {
                    existingTeoriaHorarioCatalogo.setHoraInicio(teoriaHorarioCatalogo.getHoraInicio());
                }
                if (teoriaHorarioCatalogo.getHoraFin() != null) {
                    existingTeoriaHorarioCatalogo.setHoraFin(teoriaHorarioCatalogo.getHoraFin());
                }

                return existingTeoriaHorarioCatalogo;
            })
            .map(teoriaHorarioCatalogoRepository::save);
    }

    /**
     * Get all the teoriaHorarioCatalogos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<TeoriaHorarioCatalogo> findAll() {
        log.debug("Request to get all TeoriaHorarioCatalogos");
        return teoriaHorarioCatalogoRepository.findAll();
    }

    /**
     * Get one teoriaHorarioCatalogo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TeoriaHorarioCatalogo> findOne(Long id) {
        log.debug("Request to get TeoriaHorarioCatalogo : {}", id);
        return teoriaHorarioCatalogoRepository.findById(id);
    }

    /**
     * Delete the teoriaHorarioCatalogo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete TeoriaHorarioCatalogo : {}", id);
        teoriaHorarioCatalogoRepository.deleteById(id);
    }
}
