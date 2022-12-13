package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.AsignaturaAdiciones;
import com.creinfor.repository.AsignaturaAdicionesRepository;
import com.creinfor.service.criteria.AsignaturaAdicionesCriteria;
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
 * Service for executing complex queries for {@link AsignaturaAdiciones} entities in the database.
 * The main input is a {@link AsignaturaAdicionesCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AsignaturaAdiciones} or a {@link Page} of {@link AsignaturaAdiciones} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AsignaturaAdicionesQueryService extends QueryService<AsignaturaAdiciones> {

    private final Logger log = LoggerFactory.getLogger(AsignaturaAdicionesQueryService.class);

    private final AsignaturaAdicionesRepository asignaturaAdicionesRepository;

    public AsignaturaAdicionesQueryService(AsignaturaAdicionesRepository asignaturaAdicionesRepository) {
        this.asignaturaAdicionesRepository = asignaturaAdicionesRepository;
    }

    /**
     * Return a {@link List} of {@link AsignaturaAdiciones} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AsignaturaAdiciones> findByCriteria(AsignaturaAdicionesCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AsignaturaAdiciones> specification = createSpecification(criteria);
        return asignaturaAdicionesRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link AsignaturaAdiciones} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AsignaturaAdiciones> findByCriteria(AsignaturaAdicionesCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AsignaturaAdiciones> specification = createSpecification(criteria);
        return asignaturaAdicionesRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AsignaturaAdicionesCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AsignaturaAdiciones> specification = createSpecification(criteria);
        return asignaturaAdicionesRepository.count(specification);
    }

    /**
     * Function to convert {@link AsignaturaAdicionesCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AsignaturaAdiciones> createSpecification(AsignaturaAdicionesCriteria criteria) {
        Specification<AsignaturaAdiciones> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AsignaturaAdiciones_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), AsignaturaAdiciones_.activo));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), AsignaturaAdiciones_.nombre));
            }
            if (criteria.getNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreCorto(), AsignaturaAdiciones_.nombreCorto));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), AsignaturaAdiciones_.descripcion));
            }
            if (criteria.getAsignaturaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAsignaturaId(),
                            root -> root.join(AsignaturaAdiciones_.asignaturas, JoinType.LEFT).get(Asignatura_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
