package com.creinfor.service;

import com.creinfor.domain.LugarSalida;
import com.creinfor.repository.LugarSalidaRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LugarSalida}.
 */
@Service
@Transactional
public class LugarSalidaService {

    private final Logger log = LoggerFactory.getLogger(LugarSalidaService.class);

    private final LugarSalidaRepository lugarSalidaRepository;

    public LugarSalidaService(LugarSalidaRepository lugarSalidaRepository) {
        this.lugarSalidaRepository = lugarSalidaRepository;
    }

    /**
     * Save a lugarSalida.
     *
     * @param lugarSalida the entity to save.
     * @return the persisted entity.
     */
    public LugarSalida save(LugarSalida lugarSalida) {
        log.debug("Request to save LugarSalida : {}", lugarSalida);
        return lugarSalidaRepository.save(lugarSalida);
    }

    /**
     * Update a lugarSalida.
     *
     * @param lugarSalida the entity to save.
     * @return the persisted entity.
     */
    public LugarSalida update(LugarSalida lugarSalida) {
        log.debug("Request to save LugarSalida : {}", lugarSalida);
        return lugarSalidaRepository.save(lugarSalida);
    }

    /**
     * Partially update a lugarSalida.
     *
     * @param lugarSalida the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LugarSalida> partialUpdate(LugarSalida lugarSalida) {
        log.debug("Request to partially update LugarSalida : {}", lugarSalida);

        return lugarSalidaRepository
            .findById(lugarSalida.getId())
            .map(existingLugarSalida -> {
                if (lugarSalida.getNombre() != null) {
                    existingLugarSalida.setNombre(lugarSalida.getNombre());
                }

                return existingLugarSalida;
            })
            .map(lugarSalidaRepository::save);
    }

    /**
     * Get all the lugarSalidas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LugarSalida> findAll() {
        log.debug("Request to get all LugarSalidas");
        return lugarSalidaRepository.findAll();
    }

    /**
     * Get one lugarSalida by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LugarSalida> findOne(Long id) {
        log.debug("Request to get LugarSalida : {}", id);
        return lugarSalidaRepository.findById(id);
    }

    /**
     * Delete the lugarSalida by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LugarSalida : {}", id);
        lugarSalidaRepository.deleteById(id);
    }
}
