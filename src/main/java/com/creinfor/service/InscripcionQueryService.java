package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Inscripcion;
import com.creinfor.repository.InscripcionRepository;
import com.creinfor.service.criteria.InscripcionCriteria;
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
 * Service for executing complex queries for {@link Inscripcion} entities in the database.
 * The main input is a {@link InscripcionCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Inscripcion} or a {@link Page} of {@link Inscripcion} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InscripcionQueryService extends QueryService<Inscripcion> {

    private final Logger log = LoggerFactory.getLogger(InscripcionQueryService.class);

    private final InscripcionRepository inscripcionRepository;

    public InscripcionQueryService(InscripcionRepository inscripcionRepository) {
        this.inscripcionRepository = inscripcionRepository;
    }

    /**
     * Return a {@link List} of {@link Inscripcion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Inscripcion> findByCriteria(InscripcionCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Inscripcion> specification = createSpecification(criteria);
        return inscripcionRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Inscripcion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Inscripcion> findByCriteria(InscripcionCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Inscripcion> specification = createSpecification(criteria);
        return inscripcionRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InscripcionCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Inscripcion> specification = createSpecification(criteria);
        return inscripcionRepository.count(specification);
    }

    /**
     * Function to convert {@link InscripcionCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Inscripcion> createSpecification(InscripcionCriteria criteria) {
        Specification<Inscripcion> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Inscripcion_.id));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), Inscripcion_.codigo));
            }
            if (criteria.getEstado() != null) {
                specification = specification.and(buildSpecification(criteria.getEstado(), Inscripcion_.estado));
            }
            if (criteria.getNumeroDocumento() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNumeroDocumento(), Inscripcion_.numeroDocumento));
            }
            if (criteria.getFecha() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFecha(), Inscripcion_.fecha));
            }
            if (criteria.getCostoTotal() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCostoTotal(), Inscripcion_.costoTotal));
            }
            if (criteria.getInscripcionPagosId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionPagosId(),
                            root -> root.join(Inscripcion_.inscripcionPagos, JoinType.LEFT).get(InscripcionPago_.id)
                        )
                    );
            }
            if (criteria.getInscripcionAdicionalId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionAdicionalId(),
                            root -> root.join(Inscripcion_.inscripcionAdicionals, JoinType.LEFT).get(InscripcionAdicional_.id)
                        )
                    );
            }
            if (criteria.getInscripcionDetalleId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionDetalleId(),
                            root -> root.join(Inscripcion_.inscripcionDetalles, JoinType.LEFT).get(InscripcionDetalle_.id)
                        )
                    );
            }
            if (criteria.getInsDescuentoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInsDescuentoId(),
                            root -> root.join(Inscripcion_.insDescuento, JoinType.LEFT).get(InscripcionDescuento_.id)
                        )
                    );
            }
            if (criteria.getAlumnoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getAlumnoId(), root -> root.join(Inscripcion_.alumno, JoinType.LEFT).get(Alumno_.id))
                    );
            }
        }
        return specification;
    }
}
