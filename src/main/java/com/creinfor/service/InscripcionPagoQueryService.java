package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.InscripcionPago;
import com.creinfor.repository.InscripcionPagoRepository;
import com.creinfor.service.criteria.InscripcionPagoCriteria;
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
 * Service for executing complex queries for {@link InscripcionPago} entities in the database.
 * The main input is a {@link InscripcionPagoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link InscripcionPago} or a {@link Page} of {@link InscripcionPago} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InscripcionPagoQueryService extends QueryService<InscripcionPago> {

    private final Logger log = LoggerFactory.getLogger(InscripcionPagoQueryService.class);

    private final InscripcionPagoRepository inscripcionPagoRepository;

    public InscripcionPagoQueryService(InscripcionPagoRepository inscripcionPagoRepository) {
        this.inscripcionPagoRepository = inscripcionPagoRepository;
    }

    /**
     * Return a {@link List} of {@link InscripcionPago} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<InscripcionPago> findByCriteria(InscripcionPagoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<InscripcionPago> specification = createSpecification(criteria);
        return inscripcionPagoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link InscripcionPago} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<InscripcionPago> findByCriteria(InscripcionPagoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<InscripcionPago> specification = createSpecification(criteria);
        return inscripcionPagoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InscripcionPagoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<InscripcionPago> specification = createSpecification(criteria);
        return inscripcionPagoRepository.count(specification);
    }

    /**
     * Function to convert {@link InscripcionPagoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<InscripcionPago> createSpecification(InscripcionPagoCriteria criteria) {
        Specification<InscripcionPago> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), InscripcionPago_.id));
            }
            if (criteria.getFormaPago() != null) {
                specification = specification.and(buildSpecification(criteria.getFormaPago(), InscripcionPago_.formaPago));
            }
            if (criteria.getDocumentoPago() != null) {
                specification = specification.and(buildSpecification(criteria.getDocumentoPago(), InscripcionPago_.documentoPago));
            }
            if (criteria.getMonto() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getMonto(), InscripcionPago_.monto));
            }
            if (criteria.getFecha() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFecha(), InscripcionPago_.fecha));
            }
            if (criteria.getCodigoOP() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigoOP(), InscripcionPago_.codigoOP));
            }
            if (criteria.getNumeroDocumento() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNumeroDocumento(), InscripcionPago_.numeroDocumento));
            }
            if (criteria.getPlazoPago() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getPlazoPago(), InscripcionPago_.plazoPago));
            }
            if (criteria.getInscripcionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionId(),
                            root -> root.join(InscripcionPago_.inscripcion, JoinType.LEFT).get(Inscripcion_.id)
                        )
                    );
            }
            if (criteria.getSerieId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getSerieId(),
                            root -> root.join(InscripcionPago_.serie, JoinType.LEFT).get(SucursalSerie_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
