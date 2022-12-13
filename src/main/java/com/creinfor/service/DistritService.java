package com.creinfor.service;

import com.creinfor.domain.Distrit;
import com.creinfor.repository.DistritRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Distrit}.
 */
@Service
@Transactional
public class DistritService {

    private final Logger log = LoggerFactory.getLogger(DistritService.class);

    private final DistritRepository distritRepository;

    public DistritService(DistritRepository distritRepository) {
        this.distritRepository = distritRepository;
    }

    /**
     * Save a distrit.
     *
     * @param distrit the entity to save.
     * @return the persisted entity.
     */
    public Distrit save(Distrit distrit) {
        log.debug("Request to save Distrit : {}", distrit);
        return distritRepository.save(distrit);
    }

    /**
     * Update a distrit.
     *
     * @param distrit the entity to save.
     * @return the persisted entity.
     */
    public Distrit update(Distrit distrit) {
        log.debug("Request to save Distrit : {}", distrit);
        return distritRepository.save(distrit);
    }

    /**
     * Partially update a distrit.
     *
     * @param distrit the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Distrit> partialUpdate(Distrit distrit) {
        log.debug("Request to partially update Distrit : {}", distrit);

        return distritRepository
            .findById(distrit.getId())
            .map(existingDistrit -> {
                if (distrit.getDepartamento() != null) {
                    existingDistrit.setDepartamento(distrit.getDepartamento());
                }
                if (distrit.getProvincia() != null) {
                    existingDistrit.setProvincia(distrit.getProvincia());
                }
                if (distrit.getDistrito() != null) {
                    existingDistrit.setDistrito(distrit.getDistrito());
                }
                if (distrit.getUbigeo() != null) {
                    existingDistrit.setUbigeo(distrit.getUbigeo());
                }

                return existingDistrit;
            })
            .map(distritRepository::save);
    }

    /**
     * Get all the distrits.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Distrit> findAll() {
        log.debug("Request to get all Distrits");
        return distritRepository.findAll();
    }

    /**
     * Get one distrit by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Distrit> findOne(Long id) {
        log.debug("Request to get Distrit : {}", id);
        return distritRepository.findById(id);
    }

    /**
     * Delete the distrit by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Distrit : {}", id);
        distritRepository.deleteById(id);
    }
}
