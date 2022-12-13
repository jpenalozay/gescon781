package com.creinfor.service;

import com.creinfor.domain.Computadora;
import com.creinfor.repository.ComputadoraRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Computadora}.
 */
@Service
@Transactional
public class ComputadoraService {

    private final Logger log = LoggerFactory.getLogger(ComputadoraService.class);

    private final ComputadoraRepository computadoraRepository;

    public ComputadoraService(ComputadoraRepository computadoraRepository) {
        this.computadoraRepository = computadoraRepository;
    }

    /**
     * Save a computadora.
     *
     * @param computadora the entity to save.
     * @return the persisted entity.
     */
    public Computadora save(Computadora computadora) {
        log.debug("Request to save Computadora : {}", computadora);
        return computadoraRepository.save(computadora);
    }

    /**
     * Update a computadora.
     *
     * @param computadora the entity to save.
     * @return the persisted entity.
     */
    public Computadora update(Computadora computadora) {
        log.debug("Request to save Computadora : {}", computadora);
        return computadoraRepository.save(computadora);
    }

    /**
     * Partially update a computadora.
     *
     * @param computadora the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Computadora> partialUpdate(Computadora computadora) {
        log.debug("Request to partially update Computadora : {}", computadora);

        return computadoraRepository
            .findById(computadora.getId())
            .map(existingComputadora -> {
                if (computadora.getNombre() != null) {
                    existingComputadora.setNombre(computadora.getNombre());
                }
                if (computadora.getNombreCorto() != null) {
                    existingComputadora.setNombreCorto(computadora.getNombreCorto());
                }
                if (computadora.getDescripcion() != null) {
                    existingComputadora.setDescripcion(computadora.getDescripcion());
                }
                if (computadora.getEstadoComputadora() != null) {
                    existingComputadora.setEstadoComputadora(computadora.getEstadoComputadora());
                }
                if (computadora.getMac() != null) {
                    existingComputadora.setMac(computadora.getMac());
                }
                if (computadora.getTipo() != null) {
                    existingComputadora.setTipo(computadora.getTipo());
                }

                return existingComputadora;
            })
            .map(computadoraRepository::save);
    }

    /**
     * Get all the computadoras.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Computadora> findAll() {
        log.debug("Request to get all Computadoras");
        return computadoraRepository.findAll();
    }

    /**
     * Get one computadora by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Computadora> findOne(Long id) {
        log.debug("Request to get Computadora : {}", id);
        return computadoraRepository.findById(id);
    }

    /**
     * Delete the computadora by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Computadora : {}", id);
        computadoraRepository.deleteById(id);
    }
}
