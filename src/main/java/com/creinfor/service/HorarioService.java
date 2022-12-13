package com.creinfor.service;

import com.creinfor.domain.Horario;
import com.creinfor.repository.HorarioRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Horario}.
 */
@Service
@Transactional
public class HorarioService {

    private final Logger log = LoggerFactory.getLogger(HorarioService.class);

    private final HorarioRepository horarioRepository;

    public HorarioService(HorarioRepository horarioRepository) {
        this.horarioRepository = horarioRepository;
    }

    /**
     * Save a horario.
     *
     * @param horario the entity to save.
     * @return the persisted entity.
     */
    public Horario save(Horario horario) {
        log.debug("Request to save Horario : {}", horario);
        return horarioRepository.save(horario);
    }

    /**
     * Update a horario.
     *
     * @param horario the entity to save.
     * @return the persisted entity.
     */
    public Horario update(Horario horario) {
        log.debug("Request to save Horario : {}", horario);
        return horarioRepository.save(horario);
    }

    /**
     * Partially update a horario.
     *
     * @param horario the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Horario> partialUpdate(Horario horario) {
        log.debug("Request to partially update Horario : {}", horario);

        return horarioRepository
            .findById(horario.getId())
            .map(existingHorario -> {
                if (horario.getActivo() != null) {
                    existingHorario.setActivo(horario.getActivo());
                }
                if (horario.getTipo() != null) {
                    existingHorario.setTipo(horario.getTipo());
                }
                if (horario.getFechaDia() != null) {
                    existingHorario.setFechaDia(horario.getFechaDia());
                }
                if (horario.getFechaDiaSem() != null) {
                    existingHorario.setFechaDiaSem(horario.getFechaDiaSem());
                }

                return existingHorario;
            })
            .map(horarioRepository::save);
    }

    /**
     * Get all the horarios.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Horario> findAll() {
        log.debug("Request to get all Horarios");
        return horarioRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the horarios with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Horario> findAllWithEagerRelationships(Pageable pageable) {
        return horarioRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one horario by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Horario> findOne(Long id) {
        log.debug("Request to get Horario : {}", id);
        return horarioRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the horario by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Horario : {}", id);
        horarioRepository.deleteById(id);
    }
}
