package com.creinfor.service;

import com.creinfor.domain.HorarioCatalogo;
import com.creinfor.repository.HorarioCatalogoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link HorarioCatalogo}.
 */
@Service
@Transactional
public class HorarioCatalogoService {

    private final Logger log = LoggerFactory.getLogger(HorarioCatalogoService.class);

    private final HorarioCatalogoRepository horarioCatalogoRepository;

    public HorarioCatalogoService(HorarioCatalogoRepository horarioCatalogoRepository) {
        this.horarioCatalogoRepository = horarioCatalogoRepository;
    }

    /**
     * Save a horarioCatalogo.
     *
     * @param horarioCatalogo the entity to save.
     * @return the persisted entity.
     */
    public HorarioCatalogo save(HorarioCatalogo horarioCatalogo) {
        log.debug("Request to save HorarioCatalogo : {}", horarioCatalogo);
        return horarioCatalogoRepository.save(horarioCatalogo);
    }

    /**
     * Update a horarioCatalogo.
     *
     * @param horarioCatalogo the entity to save.
     * @return the persisted entity.
     */
    public HorarioCatalogo update(HorarioCatalogo horarioCatalogo) {
        log.debug("Request to save HorarioCatalogo : {}", horarioCatalogo);
        return horarioCatalogoRepository.save(horarioCatalogo);
    }

    /**
     * Partially update a horarioCatalogo.
     *
     * @param horarioCatalogo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<HorarioCatalogo> partialUpdate(HorarioCatalogo horarioCatalogo) {
        log.debug("Request to partially update HorarioCatalogo : {}", horarioCatalogo);

        return horarioCatalogoRepository
            .findById(horarioCatalogo.getId())
            .map(existingHorarioCatalogo -> {
                if (horarioCatalogo.getActivo() != null) {
                    existingHorarioCatalogo.setActivo(horarioCatalogo.getActivo());
                }
                if (horarioCatalogo.getCodigo() != null) {
                    existingHorarioCatalogo.setCodigo(horarioCatalogo.getCodigo());
                }
                if (horarioCatalogo.getHoraInicio() != null) {
                    existingHorarioCatalogo.setHoraInicio(horarioCatalogo.getHoraInicio());
                }
                if (horarioCatalogo.getHoraFin() != null) {
                    existingHorarioCatalogo.setHoraFin(horarioCatalogo.getHoraFin());
                }
                if (horarioCatalogo.getDescripcion() != null) {
                    existingHorarioCatalogo.setDescripcion(horarioCatalogo.getDescripcion());
                }

                return existingHorarioCatalogo;
            })
            .map(horarioCatalogoRepository::save);
    }

    /**
     * Get all the horarioCatalogos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<HorarioCatalogo> findAll() {
        log.debug("Request to get all HorarioCatalogos");
        return horarioCatalogoRepository.findAll();
    }

    /**
     * Get one horarioCatalogo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<HorarioCatalogo> findOne(Long id) {
        log.debug("Request to get HorarioCatalogo : {}", id);
        return horarioCatalogoRepository.findById(id);
    }

    /**
     * Delete the horarioCatalogo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete HorarioCatalogo : {}", id);
        horarioCatalogoRepository.deleteById(id);
    }
}
