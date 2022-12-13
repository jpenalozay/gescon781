package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.InscripcionAdicional;
import com.creinfor.repository.InscripcionAdicionalRepository;
import com.creinfor.service.criteria.InscripcionAdicionalCriteria;
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
 * Service for executing complex queries for {@link InscripcionAdicional} entities in the database.
 * The main input is a {@link InscripcionAdicionalCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link InscripcionAdicional} or a {@link Page} of {@link InscripcionAdicional} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InscripcionAdicionalQueryService extends QueryService<InscripcionAdicional> {

    private final Logger log = LoggerFactory.getLogger(InscripcionAdicionalQueryService.class);

    private final InscripcionAdicionalRepository inscripcionAdicionalRepository;

    public InscripcionAdicionalQueryService(InscripcionAdicionalRepository inscripcionAdicionalRepository) {
        this.inscripcionAdicionalRepository = inscripcionAdicionalRepository;
    }

    /**
     * Return a {@link List} of {@link InscripcionAdicional} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<InscripcionAdicional> findByCriteria(InscripcionAdicionalCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<InscripcionAdicional> specification = createSpecification(criteria);
        return inscripcionAdicionalRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link InscripcionAdicional} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<InscripcionAdicional> findByCriteria(InscripcionAdicionalCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<InscripcionAdicional> specification = createSpecification(criteria);
        return inscripcionAdicionalRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InscripcionAdicionalCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<InscripcionAdicional> specification = createSpecification(criteria);
        return inscripcionAdicionalRepository.count(specification);
    }

    /**
     * Function to convert {@link InscripcionAdicionalCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<InscripcionAdicional> createSpecification(InscripcionAdicionalCriteria criteria) {
        Specification<InscripcionAdicional> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), InscripcionAdicional_.id));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), InscripcionAdicional_.descripcion));
            }
            if (criteria.getCantidad() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCantidad(), InscripcionAdicional_.cantidad));
            }
            if (criteria.getCosto() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCosto(), InscripcionAdicional_.costo));
            }
            if (criteria.getInscripcionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionId(),
                            root -> root.join(InscripcionAdicional_.inscripcion, JoinType.LEFT).get(Inscripcion_.id)
                        )
                    );
            }
            if (criteria.getInscripcionRequisitoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionRequisitoId(),
                            root -> root.join(InscripcionAdicional_.inscripcionRequisito, JoinType.LEFT).get(RequisitosInscripcion_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
