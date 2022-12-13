package com.creinfor.service;

import com.creinfor.domain.SucursalSerie;
import com.creinfor.repository.SucursalSerieRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link SucursalSerie}.
 */
@Service
@Transactional
public class SucursalSerieService {

    private final Logger log = LoggerFactory.getLogger(SucursalSerieService.class);

    private final SucursalSerieRepository sucursalSerieRepository;

    public SucursalSerieService(SucursalSerieRepository sucursalSerieRepository) {
        this.sucursalSerieRepository = sucursalSerieRepository;
    }

    /**
     * Save a sucursalSerie.
     *
     * @param sucursalSerie the entity to save.
     * @return the persisted entity.
     */
    public SucursalSerie save(SucursalSerie sucursalSerie) {
        log.debug("Request to save SucursalSerie : {}", sucursalSerie);
        return sucursalSerieRepository.save(sucursalSerie);
    }

    /**
     * Update a sucursalSerie.
     *
     * @param sucursalSerie the entity to save.
     * @return the persisted entity.
     */
    public SucursalSerie update(SucursalSerie sucursalSerie) {
        log.debug("Request to save SucursalSerie : {}", sucursalSerie);
        return sucursalSerieRepository.save(sucursalSerie);
    }

    /**
     * Partially update a sucursalSerie.
     *
     * @param sucursalSerie the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<SucursalSerie> partialUpdate(SucursalSerie sucursalSerie) {
        log.debug("Request to partially update SucursalSerie : {}", sucursalSerie);

        return sucursalSerieRepository
            .findById(sucursalSerie.getId())
            .map(existingSucursalSerie -> {
                if (sucursalSerie.getActivo() != null) {
                    existingSucursalSerie.setActivo(sucursalSerie.getActivo());
                }
                if (sucursalSerie.getTipoDocumento() != null) {
                    existingSucursalSerie.setTipoDocumento(sucursalSerie.getTipoDocumento());
                }
                if (sucursalSerie.getSerie() != null) {
                    existingSucursalSerie.setSerie(sucursalSerie.getSerie());
                }
                if (sucursalSerie.getFechaEmision() != null) {
                    existingSucursalSerie.setFechaEmision(sucursalSerie.getFechaEmision());
                }
                if (sucursalSerie.getNumeroMaximo() != null) {
                    existingSucursalSerie.setNumeroMaximo(sucursalSerie.getNumeroMaximo());
                }
                if (sucursalSerie.getNumeroUltimo() != null) {
                    existingSucursalSerie.setNumeroUltimo(sucursalSerie.getNumeroUltimo());
                }

                return existingSucursalSerie;
            })
            .map(sucursalSerieRepository::save);
    }

    /**
     * Get all the sucursalSeries.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<SucursalSerie> findAll() {
        log.debug("Request to get all SucursalSeries");
        return sucursalSerieRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the sucursalSeries with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<SucursalSerie> findAllWithEagerRelationships(Pageable pageable) {
        return sucursalSerieRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one sucursalSerie by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<SucursalSerie> findOne(Long id) {
        log.debug("Request to get SucursalSerie : {}", id);
        return sucursalSerieRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the sucursalSerie by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete SucursalSerie : {}", id);
        sucursalSerieRepository.deleteById(id);
    }
}
