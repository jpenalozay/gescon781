package com.creinfor.service;

import com.creinfor.domain.Asignatura;
import com.creinfor.repository.AsignaturaRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Asignatura}.
 */
@Service
@Transactional
public class AsignaturaService {

    private final Logger log = LoggerFactory.getLogger(AsignaturaService.class);

    private final AsignaturaRepository asignaturaRepository;

    public AsignaturaService(AsignaturaRepository asignaturaRepository) {
        this.asignaturaRepository = asignaturaRepository;
    }

    /**
     * Save a asignatura.
     *
     * @param asignatura the entity to save.
     * @return the persisted entity.
     */
    public Asignatura save(Asignatura asignatura) {
        log.debug("Request to save Asignatura : {}", asignatura);
        return asignaturaRepository.save(asignatura);
    }

    /**
     * Update a asignatura.
     *
     * @param asignatura the entity to save.
     * @return the persisted entity.
     */
    public Asignatura update(Asignatura asignatura) {
        log.debug("Request to save Asignatura : {}", asignatura);
        return asignaturaRepository.save(asignatura);
    }

    /**
     * Partially update a asignatura.
     *
     * @param asignatura the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Asignatura> partialUpdate(Asignatura asignatura) {
        log.debug("Request to partially update Asignatura : {}", asignatura);

        return asignaturaRepository
            .findById(asignatura.getId())
            .map(existingAsignatura -> {
                if (asignatura.getActivo() != null) {
                    existingAsignatura.setActivo(asignatura.getActivo());
                }
                if (asignatura.getNombre() != null) {
                    existingAsignatura.setNombre(asignatura.getNombre());
                }
                if (asignatura.getNombreCorto() != null) {
                    existingAsignatura.setNombreCorto(asignatura.getNombreCorto());
                }
                if (asignatura.getDescripcion() != null) {
                    existingAsignatura.setDescripcion(asignatura.getDescripcion());
                }
                if (asignatura.getDocumento() != null) {
                    existingAsignatura.setDocumento(asignatura.getDocumento());
                }
                if (asignatura.getHorasTeoricas() != null) {
                    existingAsignatura.setHorasTeoricas(asignatura.getHorasTeoricas());
                }
                if (asignatura.getHorasPracticas() != null) {
                    existingAsignatura.setHorasPracticas(asignatura.getHorasPracticas());
                }
                if (asignatura.getNumeroClasesTeoria() != null) {
                    existingAsignatura.setNumeroClasesTeoria(asignatura.getNumeroClasesTeoria());
                }
                if (asignatura.getNumeroClasesPractica() != null) {
                    existingAsignatura.setNumeroClasesPractica(asignatura.getNumeroClasesPractica());
                }
                if (asignatura.getVigencia() != null) {
                    existingAsignatura.setVigencia(asignatura.getVigencia());
                }
                if (asignatura.getCosto() != null) {
                    existingAsignatura.setCosto(asignatura.getCosto());
                }
                if (asignatura.getImagen() != null) {
                    existingAsignatura.setImagen(asignatura.getImagen());
                }
                if (asignatura.getImagenContentType() != null) {
                    existingAsignatura.setImagenContentType(asignatura.getImagenContentType());
                }

                return existingAsignatura;
            })
            .map(asignaturaRepository::save);
    }

    /**
     * Get all the asignaturas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Asignatura> findAll() {
        log.debug("Request to get all Asignaturas");
        return asignaturaRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the asignaturas with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Asignatura> findAllWithEagerRelationships(Pageable pageable) {
        return asignaturaRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one asignatura by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Asignatura> findOne(Long id) {
        log.debug("Request to get Asignatura : {}", id);
        return asignaturaRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the asignatura by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Asignatura : {}", id);
        asignaturaRepository.deleteById(id);
    }
}
