package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Persona;
import com.creinfor.repository.PersonaRepository;
import com.creinfor.service.criteria.PersonaCriteria;
import java.util.List;
import javax.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Persona} entities in the database.
 * The main input is a {@link PersonaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Persona} or a {@link Page} of {@link Persona} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class PersonaQueryService extends QueryService<Persona> {

    private final Logger log = LoggerFactory.getLogger(PersonaQueryService.class);

    private final PersonaRepository personaRepository;

    public PersonaQueryService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    /**
     * Return a {@link List} of {@link Persona} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Persona> findByCriteria(PersonaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Persona> specification = createSpecification(criteria);
        return personaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Persona} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Persona> findByCriteria(PersonaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Persona> specification = createSpecification(criteria);
        return personaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PersonaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Persona> specification = createSpecification(criteria);
        return personaRepository.count(specification);
    }

    /**
     * Function to convert {@link PersonaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Persona> createSpecification(PersonaCriteria criteria) {
        Specification<Persona> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Persona_.id));
            }
            if (criteria.getNacionalidad() != null) {
                specification = specification.and(buildSpecification(criteria.getNacionalidad(), Persona_.nacionalidad));
            }
            if (criteria.getNombres() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombres(), Persona_.nombres));
            }
            if (criteria.getApellidoPaterno() != null) {
                specification = specification.and(buildStringSpecification(criteria.getApellidoPaterno(), Persona_.apellidoPaterno));
            }
            if (criteria.getApellidoMaterno() != null) {
                specification = specification.and(buildStringSpecification(criteria.getApellidoMaterno(), Persona_.apellidoMaterno));
            }
            if (criteria.getFechaNacimiento() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaNacimiento(), Persona_.fechaNacimiento));
            }
            if (criteria.getGenero() != null) {
                specification = specification.and(buildSpecification(criteria.getGenero(), Persona_.genero));
            }
            if (criteria.getEstadoCivil() != null) {
                specification = specification.and(buildSpecification(criteria.getEstadoCivil(), Persona_.estadoCivil));
            }
            if (criteria.getTipoDocumento() != null) {
                specification = specification.and(buildSpecification(criteria.getTipoDocumento(), Persona_.tipoDocumento));
            }
            if (criteria.getNumeroDocumento() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNumeroDocumento(), Persona_.numeroDocumento));
            }
            if (criteria.getTelefonoParticular() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTelefonoParticular(), Persona_.telefonoParticular));
            }
            if (criteria.getTelefonoParticular1() != null) {
                specification =
                    specification.and(buildStringSpecification(criteria.getTelefonoParticular1(), Persona_.telefonoParticular1));
            }
            if (criteria.getEmailPersonal() != null) {
                specification = specification.and(buildStringSpecification(criteria.getEmailPersonal(), Persona_.emailPersonal));
            }
            if (criteria.getDireccion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDireccion(), Persona_.direccion));
            }
            if (criteria.getDistritoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getDistritoId(), root -> root.join(Persona_.distrito, JoinType.LEFT).get(Distrit_.id))
                    );
            }
        }
        return specification;
    }
}
