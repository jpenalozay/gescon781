package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.InscripcionDetalle;
import com.creinfor.repository.InscripcionDetalleRepository;
import com.creinfor.service.criteria.InscripcionDetalleCriteria;
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
 * Service for executing complex queries for {@link InscripcionDetalle} entities in the database.
 * The main input is a {@link InscripcionDetalleCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link InscripcionDetalle} or a {@link Page} of {@link InscripcionDetalle} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InscripcionDetalleQueryService extends QueryService<InscripcionDetalle> {

    private final Logger log = LoggerFactory.getLogger(InscripcionDetalleQueryService.class);

    private final InscripcionDetalleRepository inscripcionDetalleRepository;

    public InscripcionDetalleQueryService(InscripcionDetalleRepository inscripcionDetalleRepository) {
        this.inscripcionDetalleRepository = inscripcionDetalleRepository;
    }

    /**
     * Return a {@link List} of {@link InscripcionDetalle} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<InscripcionDetalle> findByCriteria(InscripcionDetalleCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<InscripcionDetalle> specification = createSpecification(criteria);
        return inscripcionDetalleRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link InscripcionDetalle} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<InscripcionDetalle> findByCriteria(InscripcionDetalleCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<InscripcionDetalle> specification = createSpecification(criteria);
        return inscripcionDetalleRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InscripcionDetalleCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<InscripcionDetalle> specification = createSpecification(criteria);
        return inscripcionDetalleRepository.count(specification);
    }

    /**
     * Function to convert {@link InscripcionDetalleCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<InscripcionDetalle> createSpecification(InscripcionDetalleCriteria criteria) {
        Specification<InscripcionDetalle> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), InscripcionDetalle_.id));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), InscripcionDetalle_.codigo));
            }
            if (criteria.getFechaInicio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaInicio(), InscripcionDetalle_.fechaInicio));
            }
            if (criteria.getInscripcionAsignaturaRequisitoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionAsignaturaRequisitoId(),
                            root ->
                                root
                                    .join(InscripcionDetalle_.inscripcionAsignaturaRequisitos, JoinType.LEFT)
                                    .get(InscripcionAsignaturaRequisito_.id)
                        )
                    );
            }
            if (criteria.getInscripcionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionId(),
                            root -> root.join(InscripcionDetalle_.inscripcion, JoinType.LEFT).get(Inscripcion_.id)
                        )
                    );
            }
            if (criteria.getAsignaturaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAsignaturaId(),
                            root -> root.join(InscripcionDetalle_.asignatura, JoinType.LEFT).get(Asignatura_.id)
                        )
                    );
            }
            if (criteria.getHorarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioId(),
                            root -> root.join(InscripcionDetalle_.horario, JoinType.LEFT).get(TeoriaHorarioCatalogo_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
