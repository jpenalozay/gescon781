package com.creinfor.service;

import com.creinfor.domain.Sucursal;
import com.creinfor.repository.SucursalRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Sucursal}.
 */
@Service
@Transactional
public class SucursalService {

    private final Logger log = LoggerFactory.getLogger(SucursalService.class);

    private final SucursalRepository sucursalRepository;

    public SucursalService(SucursalRepository sucursalRepository) {
        this.sucursalRepository = sucursalRepository;
    }

    /**
     * Save a sucursal.
     *
     * @param sucursal the entity to save.
     * @return the persisted entity.
     */
    public Sucursal save(Sucursal sucursal) {
        log.debug("Request to save Sucursal : {}", sucursal);
        return sucursalRepository.save(sucursal);
    }

    /**
     * Update a sucursal.
     *
     * @param sucursal the entity to save.
     * @return the persisted entity.
     */
    public Sucursal update(Sucursal sucursal) {
        log.debug("Request to save Sucursal : {}", sucursal);
        return sucursalRepository.save(sucursal);
    }

    /**
     * Partially update a sucursal.
     *
     * @param sucursal the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Sucursal> partialUpdate(Sucursal sucursal) {
        log.debug("Request to partially update Sucursal : {}", sucursal);

        return sucursalRepository
            .findById(sucursal.getId())
            .map(existingSucursal -> {
                if (sucursal.getActivo() != null) {
                    existingSucursal.setActivo(sucursal.getActivo());
                }
                if (sucursal.getCodigo() != null) {
                    existingSucursal.setCodigo(sucursal.getCodigo());
                }
                if (sucursal.getCentral() != null) {
                    existingSucursal.setCentral(sucursal.getCentral());
                }
                if (sucursal.getNombre() != null) {
                    existingSucursal.setNombre(sucursal.getNombre());
                }
                if (sucursal.getNombreCorto() != null) {
                    existingSucursal.setNombreCorto(sucursal.getNombreCorto());
                }
                if (sucursal.getNombreAbreviado() != null) {
                    existingSucursal.setNombreAbreviado(sucursal.getNombreAbreviado());
                }
                if (sucursal.getFechaInicio() != null) {
                    existingSucursal.setFechaInicio(sucursal.getFechaInicio());
                }
                if (sucursal.getTelefono() != null) {
                    existingSucursal.setTelefono(sucursal.getTelefono());
                }
                if (sucursal.getTelefono1() != null) {
                    existingSucursal.setTelefono1(sucursal.getTelefono1());
                }
                if (sucursal.getImagen() != null) {
                    existingSucursal.setImagen(sucursal.getImagen());
                }
                if (sucursal.getImagenContentType() != null) {
                    existingSucursal.setImagenContentType(sucursal.getImagenContentType());
                }
                if (sucursal.getDireccion() != null) {
                    existingSucursal.setDireccion(sucursal.getDireccion());
                }

                return existingSucursal;
            })
            .map(sucursalRepository::save);
    }

    /**
     * Get all the sucursals.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Sucursal> findAll() {
        log.debug("Request to get all Sucursals");
        return sucursalRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the sucursals with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Sucursal> findAllWithEagerRelationships(Pageable pageable) {
        return sucursalRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one sucursal by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Sucursal> findOne(Long id) {
        log.debug("Request to get Sucursal : {}", id);
        return sucursalRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the sucursal by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Sucursal : {}", id);
        sucursalRepository.deleteById(id);
    }
}
