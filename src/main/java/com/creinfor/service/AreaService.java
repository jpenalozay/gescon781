package com.creinfor.service;

import com.creinfor.domain.Area;
import com.creinfor.repository.AreaRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Area}.
 */
@Service
@Transactional
public class AreaService {

    private final Logger log = LoggerFactory.getLogger(AreaService.class);

    private final AreaRepository areaRepository;

    public AreaService(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    /**
     * Save a area.
     *
     * @param area the entity to save.
     * @return the persisted entity.
     */
    public Area save(Area area) {
        log.debug("Request to save Area : {}", area);
        return areaRepository.save(area);
    }

    /**
     * Update a area.
     *
     * @param area the entity to save.
     * @return the persisted entity.
     */
    public Area update(Area area) {
        log.debug("Request to save Area : {}", area);
        return areaRepository.save(area);
    }

    /**
     * Partially update a area.
     *
     * @param area the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Area> partialUpdate(Area area) {
        log.debug("Request to partially update Area : {}", area);

        return areaRepository
            .findById(area.getId())
            .map(existingArea -> {
                if (area.getActivo() != null) {
                    existingArea.setActivo(area.getActivo());
                }
                if (area.getCodigo() != null) {
                    existingArea.setCodigo(area.getCodigo());
                }
                if (area.getTipo() != null) {
                    existingArea.setTipo(area.getTipo());
                }
                if (area.getNombre() != null) {
                    existingArea.setNombre(area.getNombre());
                }
                if (area.getNombreCorto() != null) {
                    existingArea.setNombreCorto(area.getNombreCorto());
                }

                return existingArea;
            })
            .map(areaRepository::save);
    }

    /**
     * Get all the areas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Area> findAll() {
        log.debug("Request to get all Areas");
        return areaRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the areas with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Area> findAllWithEagerRelationships(Pageable pageable) {
        return areaRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one area by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Area> findOne(Long id) {
        log.debug("Request to get Area : {}", id);
        return areaRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the area by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Area : {}", id);
        areaRepository.deleteById(id);
    }
}
