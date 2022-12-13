package com.creinfor.service;

import com.creinfor.domain.HorarioDeshabilitacion;
import com.creinfor.repository.HorarioDeshabilitacionRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link HorarioDeshabilitacion}.
 */
@Service
@Transactional
public class HorarioDeshabilitacionService {

    private final Logger log = LoggerFactory.getLogger(HorarioDeshabilitacionService.class);

    private final HorarioDeshabilitacionRepository horarioDeshabilitacionRepository;

    public HorarioDeshabilitacionService(HorarioDeshabilitacionRepository horarioDeshabilitacionRepository) {
        this.horarioDeshabilitacionRepository = horarioDeshabilitacionRepository;
    }

    /**
     * Save a horarioDeshabilitacion.
     *
     * @param horarioDeshabilitacion the entity to save.
     * @return the persisted entity.
     */
    public HorarioDeshabilitacion save(HorarioDeshabilitacion horarioDeshabilitacion) {
        log.debug("Request to save HorarioDeshabilitacion : {}", horarioDeshabilitacion);
        return horarioDeshabilitacionRepository.save(horarioDeshabilitacion);
    }

    /**
     * Update a horarioDeshabilitacion.
     *
     * @param horarioDeshabilitacion the entity to save.
     * @return the persisted entity.
     */
    public HorarioDeshabilitacion update(HorarioDeshabilitacion horarioDeshabilitacion) {
        log.debug("Request to save HorarioDeshabilitacion : {}", horarioDeshabilitacion);
        return horarioDeshabilitacionRepository.save(horarioDeshabilitacion);
    }

    /**
     * Partially update a horarioDeshabilitacion.
     *
     * @param horarioDeshabilitacion the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<HorarioDeshabilitacion> partialUpdate(HorarioDeshabilitacion horarioDeshabilitacion) {
        log.debug("Request to partially update HorarioDeshabilitacion : {}", horarioDeshabilitacion);

        return horarioDeshabilitacionRepository
            .findById(horarioDeshabilitacion.getId())
            .map(existingHorarioDeshabilitacion -> {
                if (horarioDeshabilitacion.getActivo() != null) {
                    existingHorarioDeshabilitacion.setActivo(horarioDeshabilitacion.getActivo());
                }
                if (horarioDeshabilitacion.getTipo() != null) {
                    existingHorarioDeshabilitacion.setTipo(horarioDeshabilitacion.getTipo());
                }

                return existingHorarioDeshabilitacion;
            })
            .map(horarioDeshabilitacionRepository::save);
    }

    /**
     * Get all the horarioDeshabilitacions.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<HorarioDeshabilitacion> findAll() {
        log.debug("Request to get all HorarioDeshabilitacions");
        return horarioDeshabilitacionRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the horarioDeshabilitacions with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<HorarioDeshabilitacion> findAllWithEagerRelationships(Pageable pageable) {
        return horarioDeshabilitacionRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one horarioDeshabilitacion by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<HorarioDeshabilitacion> findOne(Long id) {
        log.debug("Request to get HorarioDeshabilitacion : {}", id);
        return horarioDeshabilitacionRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the horarioDeshabilitacion by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete HorarioDeshabilitacion : {}", id);
        horarioDeshabilitacionRepository.deleteById(id);
    }
}
