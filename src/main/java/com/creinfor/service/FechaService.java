package com.creinfor.service;

import com.creinfor.domain.Fecha;
import com.creinfor.repository.FechaRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Fecha}.
 */
@Service
@Transactional
public class FechaService {

    private final Logger log = LoggerFactory.getLogger(FechaService.class);

    private final FechaRepository fechaRepository;

    public FechaService(FechaRepository fechaRepository) {
        this.fechaRepository = fechaRepository;
    }

    /**
     * Save a fecha.
     *
     * @param fecha the entity to save.
     * @return the persisted entity.
     */
    public Fecha save(Fecha fecha) {
        log.debug("Request to save Fecha : {}", fecha);
        return fechaRepository.save(fecha);
    }

    /**
     * Update a fecha.
     *
     * @param fecha the entity to save.
     * @return the persisted entity.
     */
    public Fecha update(Fecha fecha) {
        log.debug("Request to save Fecha : {}", fecha);
        return fechaRepository.save(fecha);
    }

    /**
     * Partially update a fecha.
     *
     * @param fecha the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Fecha> partialUpdate(Fecha fecha) {
        log.debug("Request to partially update Fecha : {}", fecha);

        return fechaRepository
            .findById(fecha.getId())
            .map(existingFecha -> {
                if (fecha.getFecha() != null) {
                    existingFecha.setFecha(fecha.getFecha());
                }
                if (fecha.getDia() != null) {
                    existingFecha.setDia(fecha.getDia());
                }
                if (fecha.getMes() != null) {
                    existingFecha.setMes(fecha.getMes());
                }
                if (fecha.getAnio() != null) {
                    existingFecha.setAnio(fecha.getAnio());
                }
                if (fecha.getDiaNombre() != null) {
                    existingFecha.setDiaNombre(fecha.getDiaNombre());
                }
                if (fecha.getDiaNombreCorto() != null) {
                    existingFecha.setDiaNombreCorto(fecha.getDiaNombreCorto());
                }
                if (fecha.getFeriado() != null) {
                    existingFecha.setFeriado(fecha.getFeriado());
                }
                if (fecha.getLaboral() != null) {
                    existingFecha.setLaboral(fecha.getLaboral());
                }
                if (fecha.getFinSemana() != null) {
                    existingFecha.setFinSemana(fecha.getFinSemana());
                }

                return existingFecha;
            })
            .map(fechaRepository::save);
    }

    /**
     * Get all the fechas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Fecha> findAll() {
        log.debug("Request to get all Fechas");
        return fechaRepository.findAll();
    }

    /**
     * Get one fecha by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Fecha> findOne(Long id) {
        log.debug("Request to get Fecha : {}", id);
        return fechaRepository.findById(id);
    }

    /**
     * Delete the fecha by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Fecha : {}", id);
        fechaRepository.deleteById(id);
    }
}
