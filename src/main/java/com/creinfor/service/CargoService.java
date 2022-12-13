package com.creinfor.service;

import com.creinfor.domain.Cargo;
import com.creinfor.repository.CargoRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Cargo}.
 */
@Service
@Transactional
public class CargoService {

    private final Logger log = LoggerFactory.getLogger(CargoService.class);

    private final CargoRepository cargoRepository;

    public CargoService(CargoRepository cargoRepository) {
        this.cargoRepository = cargoRepository;
    }

    /**
     * Save a cargo.
     *
     * @param cargo the entity to save.
     * @return the persisted entity.
     */
    public Cargo save(Cargo cargo) {
        log.debug("Request to save Cargo : {}", cargo);
        return cargoRepository.save(cargo);
    }

    /**
     * Update a cargo.
     *
     * @param cargo the entity to save.
     * @return the persisted entity.
     */
    public Cargo update(Cargo cargo) {
        log.debug("Request to save Cargo : {}", cargo);
        return cargoRepository.save(cargo);
    }

    /**
     * Partially update a cargo.
     *
     * @param cargo the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Cargo> partialUpdate(Cargo cargo) {
        log.debug("Request to partially update Cargo : {}", cargo);

        return cargoRepository
            .findById(cargo.getId())
            .map(existingCargo -> {
                if (cargo.getActivo() != null) {
                    existingCargo.setActivo(cargo.getActivo());
                }
                if (cargo.getCodigo() != null) {
                    existingCargo.setCodigo(cargo.getCodigo());
                }
                if (cargo.getNombre() != null) {
                    existingCargo.setNombre(cargo.getNombre());
                }
                if (cargo.getNombreCorto() != null) {
                    existingCargo.setNombreCorto(cargo.getNombreCorto());
                }

                return existingCargo;
            })
            .map(cargoRepository::save);
    }

    /**
     * Get all the cargos.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Cargo> findAll() {
        log.debug("Request to get all Cargos");
        return cargoRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the cargos with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Cargo> findAllWithEagerRelationships(Pageable pageable) {
        return cargoRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one cargo by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Cargo> findOne(Long id) {
        log.debug("Request to get Cargo : {}", id);
        return cargoRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the cargo by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Cargo : {}", id);
        cargoRepository.deleteById(id);
    }
}
