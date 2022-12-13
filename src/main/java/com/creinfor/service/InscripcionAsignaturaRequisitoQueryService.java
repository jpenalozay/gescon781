package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.InscripcionAsignaturaRequisito;
import com.creinfor.repository.InscripcionAsignaturaRequisitoRepository;
import com.creinfor.service.criteria.InscripcionAsignaturaRequisitoCriteria;
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
 * Service for executing complex queries for {@link InscripcionAsignaturaRequisito} entities in the database.
 * The main input is a {@link InscripcionAsignaturaRequisitoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link InscripcionAsignaturaRequisito} or a {@link Page} of {@link InscripcionAsignaturaRequisito} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InscripcionAsignaturaRequisitoQueryService extends QueryService<InscripcionAsignaturaRequisito> {

    private final Logger log = LoggerFactory.getLogger(InscripcionAsignaturaRequisitoQueryService.class);

    private final InscripcionAsignaturaRequisitoRepository inscripcionAsignaturaRequisitoRepository;

    public InscripcionAsignaturaRequisitoQueryService(InscripcionAsignaturaRequisitoRepository inscripcionAsignaturaRequisitoRepository) {
        this.inscripcionAsignaturaRequisitoRepository = inscripcionAsignaturaRequisitoRepository;
    }

    /**
     * Return a {@link List} of {@link InscripcionAsignaturaRequisito} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<InscripcionAsignaturaRequisito> findByCriteria(InscripcionAsignaturaRequisitoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<InscripcionAsignaturaRequisito> specification = createSpecification(criteria);
        return inscripcionAsignaturaRequisitoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link InscripcionAsignaturaRequisito} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<InscripcionAsignaturaRequisito> findByCriteria(InscripcionAsignaturaRequisitoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<InscripcionAsignaturaRequisito> specification = createSpecification(criteria);
        return inscripcionAsignaturaRequisitoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InscripcionAsignaturaRequisitoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<InscripcionAsignaturaRequisito> specification = createSpecification(criteria);
        return inscripcionAsignaturaRequisitoRepository.count(specification);
    }

    /**
     * Function to convert {@link InscripcionAsignaturaRequisitoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<InscripcionAsignaturaRequisito> createSpecification(InscripcionAsignaturaRequisitoCriteria criteria) {
        Specification<InscripcionAsignaturaRequisito> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), InscripcionAsignaturaRequisito_.id));
            }
            if (criteria.getDescripcion() != null) {
                specification =
                    specification.and(buildStringSpecification(criteria.getDescripcion(), InscripcionAsignaturaRequisito_.descripcion));
            }
            if (criteria.getInscripcionDetalleId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionDetalleId(),
                            root -> root.join(InscripcionAsignaturaRequisito_.inscripcionDetalle, JoinType.LEFT).get(InscripcionDetalle_.id)
                        )
                    );
            }
            if (criteria.getAsignaturaRequisitoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAsignaturaRequisitoId(),
                            root ->
                                root.join(InscripcionAsignaturaRequisito_.asignaturaRequisito, JoinType.LEFT).get(AsignaturaRequisito_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
