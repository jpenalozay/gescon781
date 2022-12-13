package com.creinfor.service;

import com.creinfor.domain.Automovil;
import com.creinfor.repository.AutomovilRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Automovil}.
 */
@Service
@Transactional
public class AutomovilService {

    private final Logger log = LoggerFactory.getLogger(AutomovilService.class);

    private final AutomovilRepository automovilRepository;

    public AutomovilService(AutomovilRepository automovilRepository) {
        this.automovilRepository = automovilRepository;
    }

    /**
     * Save a automovil.
     *
     * @param automovil the entity to save.
     * @return the persisted entity.
     */
    public Automovil save(Automovil automovil) {
        log.debug("Request to save Automovil : {}", automovil);
        return automovilRepository.save(automovil);
    }

    /**
     * Update a automovil.
     *
     * @param automovil the entity to save.
     * @return the persisted entity.
     */
    public Automovil update(Automovil automovil) {
        log.debug("Request to save Automovil : {}", automovil);
        return automovilRepository.save(automovil);
    }

    /**
     * Partially update a automovil.
     *
     * @param automovil the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Automovil> partialUpdate(Automovil automovil) {
        log.debug("Request to partially update Automovil : {}", automovil);

        return automovilRepository
            .findById(automovil.getId())
            .map(existingAutomovil -> {
                if (automovil.getActivo() != null) {
                    existingAutomovil.setActivo(automovil.getActivo());
                }
                if (automovil.getCodigo() != null) {
                    existingAutomovil.setCodigo(automovil.getCodigo());
                }
                if (automovil.getNombre() != null) {
                    existingAutomovil.setNombre(automovil.getNombre());
                }
                if (automovil.getTipo() != null) {
                    existingAutomovil.setTipo(automovil.getTipo());
                }
                if (automovil.getPlaca() != null) {
                    existingAutomovil.setPlaca(automovil.getPlaca());
                }
                if (automovil.getMarca() != null) {
                    existingAutomovil.setMarca(automovil.getMarca());
                }
                if (automovil.getModelo() != null) {
                    existingAutomovil.setModelo(automovil.getModelo());
                }
                if (automovil.getAnio() != null) {
                    existingAutomovil.setAnio(automovil.getAnio());
                }
                if (automovil.getSoatVencimiento() != null) {
                    existingAutomovil.setSoatVencimiento(automovil.getSoatVencimiento());
                }
                if (automovil.getRevisionTecnicaVencimiento() != null) {
                    existingAutomovil.setRevisionTecnicaVencimiento(automovil.getRevisionTecnicaVencimiento());
                }
                if (automovil.getCaja() != null) {
                    existingAutomovil.setCaja(automovil.getCaja());
                }
                if (automovil.getImagen() != null) {
                    existingAutomovil.setImagen(automovil.getImagen());
                }
                if (automovil.getImagenContentType() != null) {
                    existingAutomovil.setImagenContentType(automovil.getImagenContentType());
                }

                return existingAutomovil;
            })
            .map(automovilRepository::save);
    }

    /**
     * Get all the automovils.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Automovil> findAll() {
        log.debug("Request to get all Automovils");
        return automovilRepository.findAll();
    }

    /**
     * Get one automovil by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Automovil> findOne(Long id) {
        log.debug("Request to get Automovil : {}", id);
        return automovilRepository.findById(id);
    }

    /**
     * Delete the automovil by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Automovil : {}", id);
        automovilRepository.deleteById(id);
    }
}
