package com.creinfor.service;

import com.creinfor.domain.Persona;
import com.creinfor.repository.PersonaRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Persona}.
 */
@Service
@Transactional
public class PersonaService {

    private final Logger log = LoggerFactory.getLogger(PersonaService.class);

    private final PersonaRepository personaRepository;

    public PersonaService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    /**
     * Save a persona.
     *
     * @param persona the entity to save.
     * @return the persisted entity.
     */
    public Persona save(Persona persona) {
        log.debug("Request to save Persona : {}", persona);
        return personaRepository.save(persona);
    }

    /**
     * Update a persona.
     *
     * @param persona the entity to save.
     * @return the persisted entity.
     */
    public Persona update(Persona persona) {
        log.debug("Request to save Persona : {}", persona);
        return personaRepository.save(persona);
    }

    /**
     * Partially update a persona.
     *
     * @param persona the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Persona> partialUpdate(Persona persona) {
        log.debug("Request to partially update Persona : {}", persona);

        return personaRepository
            .findById(persona.getId())
            .map(existingPersona -> {
                if (persona.getNacionalidad() != null) {
                    existingPersona.setNacionalidad(persona.getNacionalidad());
                }
                if (persona.getNombres() != null) {
                    existingPersona.setNombres(persona.getNombres());
                }
                if (persona.getApellidoPaterno() != null) {
                    existingPersona.setApellidoPaterno(persona.getApellidoPaterno());
                }
                if (persona.getApellidoMaterno() != null) {
                    existingPersona.setApellidoMaterno(persona.getApellidoMaterno());
                }
                if (persona.getFechaNacimiento() != null) {
                    existingPersona.setFechaNacimiento(persona.getFechaNacimiento());
                }
                if (persona.getGenero() != null) {
                    existingPersona.setGenero(persona.getGenero());
                }
                if (persona.getEstadoCivil() != null) {
                    existingPersona.setEstadoCivil(persona.getEstadoCivil());
                }
                if (persona.getTipoDocumento() != null) {
                    existingPersona.setTipoDocumento(persona.getTipoDocumento());
                }
                if (persona.getNumeroDocumento() != null) {
                    existingPersona.setNumeroDocumento(persona.getNumeroDocumento());
                }
                if (persona.getTelefonoParticular() != null) {
                    existingPersona.setTelefonoParticular(persona.getTelefonoParticular());
                }
                if (persona.getTelefonoParticular1() != null) {
                    existingPersona.setTelefonoParticular1(persona.getTelefonoParticular1());
                }
                if (persona.getEmailPersonal() != null) {
                    existingPersona.setEmailPersonal(persona.getEmailPersonal());
                }
                if (persona.getDireccion() != null) {
                    existingPersona.setDireccion(persona.getDireccion());
                }

                return existingPersona;
            })
            .map(personaRepository::save);
    }

    /**
     * Get all the personas.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Persona> findAll() {
        log.debug("Request to get all Personas");
        return personaRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the personas with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Persona> findAllWithEagerRelationships(Pageable pageable) {
        return personaRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one persona by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Persona> findOne(Long id) {
        log.debug("Request to get Persona : {}", id);
        return personaRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the persona by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Persona : {}", id);
        personaRepository.deleteById(id);
    }
}
