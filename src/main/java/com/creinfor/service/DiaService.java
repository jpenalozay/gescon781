package com.creinfor.service;

import com.creinfor.domain.Dia;
import com.creinfor.repository.DiaRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Dia}.
 */
@Service
@Transactional
public class DiaService {

    private final Logger log = LoggerFactory.getLogger(DiaService.class);

    private final DiaRepository diaRepository;

    public DiaService(DiaRepository diaRepository) {
        this.diaRepository = diaRepository;
    }

    /**
     * Save a dia.
     *
     * @param dia the entity to save.
     * @return the persisted entity.
     */
    public Dia save(Dia dia) {
        log.debug("Request to save Dia : {}", dia);
        return diaRepository.save(dia);
    }

    /**
     * Update a dia.
     *
     * @param dia the entity to save.
     * @return the persisted entity.
     */
    public Dia update(Dia dia) {
        log.debug("Request to save Dia : {}", dia);
        return diaRepository.save(dia);
    }

    /**
     * Partially update a dia.
     *
     * @param dia the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Dia> partialUpdate(Dia dia) {
        log.debug("Request to partially update Dia : {}", dia);

        return diaRepository
            .findById(dia.getId())
            .map(existingDia -> {
                if (dia.getNombre() != null) {
                    existingDia.setNombre(dia.getNombre());
                }
                if (dia.getNombreCorto() != null) {
                    existingDia.setNombreCorto(dia.getNombreCorto());
                }

                return existingDia;
            })
            .map(diaRepository::save);
    }

    /**
     * Get all the dias.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Dia> findAll() {
        log.debug("Request to get all Dias");
        return diaRepository.findAll();
    }

    /**
     * Get one dia by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Dia> findOne(Long id) {
        log.debug("Request to get Dia : {}", id);
        return diaRepository.findById(id);
    }

    /**
     * Delete the dia by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Dia : {}", id);
        diaRepository.deleteById(id);
    }
}
