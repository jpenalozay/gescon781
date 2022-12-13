package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.InscripcionDescuento;
import com.creinfor.repository.InscripcionDescuentoRepository;
import com.creinfor.service.criteria.InscripcionDescuentoCriteria;
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
 * Service for executing complex queries for {@link InscripcionDescuento} entities in the database.
 * The main input is a {@link InscripcionDescuentoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link InscripcionDescuento} or a {@link Page} of {@link InscripcionDescuento} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InscripcionDescuentoQueryService extends QueryService<InscripcionDescuento> {

    private final Logger log = LoggerFactory.getLogger(InscripcionDescuentoQueryService.class);

    private final InscripcionDescuentoRepository inscripcionDescuentoRepository;

    public InscripcionDescuentoQueryService(InscripcionDescuentoRepository inscripcionDescuentoRepository) {
        this.inscripcionDescuentoRepository = inscripcionDescuentoRepository;
    }

    /**
     * Return a {@link List} of {@link InscripcionDescuento} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<InscripcionDescuento> findByCriteria(InscripcionDescuentoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<InscripcionDescuento> specification = createSpecification(criteria);
        return inscripcionDescuentoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link InscripcionDescuento} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<InscripcionDescuento> findByCriteria(InscripcionDescuentoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<InscripcionDescuento> specification = createSpecification(criteria);
        return inscripcionDescuentoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InscripcionDescuentoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<InscripcionDescuento> specification = createSpecification(criteria);
        return inscripcionDescuentoRepository.count(specification);
    }

    /**
     * Function to convert {@link InscripcionDescuentoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<InscripcionDescuento> createSpecification(InscripcionDescuentoCriteria criteria) {
        Specification<InscripcionDescuento> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), InscripcionDescuento_.id));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), InscripcionDescuento_.descripcion));
            }
            if (criteria.getMonto() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getMonto(), InscripcionDescuento_.monto));
            }
            if (criteria.getInscripcionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionId(),
                            root -> root.join(InscripcionDescuento_.inscripcion, JoinType.LEFT).get(Inscripcion_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
