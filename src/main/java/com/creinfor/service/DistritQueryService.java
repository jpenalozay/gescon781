package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Distrit;
import com.creinfor.repository.DistritRepository;
import com.creinfor.service.criteria.DistritCriteria;
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
 * Service for executing complex queries for {@link Distrit} entities in the database.
 * The main input is a {@link DistritCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Distrit} or a {@link Page} of {@link Distrit} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DistritQueryService extends QueryService<Distrit> {

    private final Logger log = LoggerFactory.getLogger(DistritQueryService.class);

    private final DistritRepository distritRepository;

    public DistritQueryService(DistritRepository distritRepository) {
        this.distritRepository = distritRepository;
    }

    /**
     * Return a {@link List} of {@link Distrit} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Distrit> findByCriteria(DistritCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Distrit> specification = createSpecification(criteria);
        return distritRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Distrit} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Distrit> findByCriteria(DistritCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Distrit> specification = createSpecification(criteria);
        return distritRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DistritCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Distrit> specification = createSpecification(criteria);
        return distritRepository.count(specification);
    }

    /**
     * Function to convert {@link DistritCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Distrit> createSpecification(DistritCriteria criteria) {
        Specification<Distrit> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Distrit_.id));
            }
            if (criteria.getDepartamento() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDepartamento(), Distrit_.departamento));
            }
            if (criteria.getProvincia() != null) {
                specification = specification.and(buildStringSpecification(criteria.getProvincia(), Distrit_.provincia));
            }
            if (criteria.getDistrito() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDistrito(), Distrit_.distrito));
            }
            if (criteria.getUbigeo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getUbigeo(), Distrit_.ubigeo));
            }
            if (criteria.getSucursalId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getSucursalId(), root -> root.join(Distrit_.sucursals, JoinType.LEFT).get(Sucursal_.id))
                    );
            }
            if (criteria.getPersonaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getPersonaId(), root -> root.join(Distrit_.personas, JoinType.LEFT).get(Persona_.id))
                    );
            }
        }
        return specification;
    }
}
