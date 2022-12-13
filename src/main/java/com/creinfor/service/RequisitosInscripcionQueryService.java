package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.RequisitosInscripcion;
import com.creinfor.repository.RequisitosInscripcionRepository;
import com.creinfor.service.criteria.RequisitosInscripcionCriteria;
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
 * Service for executing complex queries for {@link RequisitosInscripcion} entities in the database.
 * The main input is a {@link RequisitosInscripcionCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link RequisitosInscripcion} or a {@link Page} of {@link RequisitosInscripcion} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class RequisitosInscripcionQueryService extends QueryService<RequisitosInscripcion> {

    private final Logger log = LoggerFactory.getLogger(RequisitosInscripcionQueryService.class);

    private final RequisitosInscripcionRepository requisitosInscripcionRepository;

    public RequisitosInscripcionQueryService(RequisitosInscripcionRepository requisitosInscripcionRepository) {
        this.requisitosInscripcionRepository = requisitosInscripcionRepository;
    }

    /**
     * Return a {@link List} of {@link RequisitosInscripcion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<RequisitosInscripcion> findByCriteria(RequisitosInscripcionCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<RequisitosInscripcion> specification = createSpecification(criteria);
        return requisitosInscripcionRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link RequisitosInscripcion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<RequisitosInscripcion> findByCriteria(RequisitosInscripcionCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<RequisitosInscripcion> specification = createSpecification(criteria);
        return requisitosInscripcionRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(RequisitosInscripcionCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<RequisitosInscripcion> specification = createSpecification(criteria);
        return requisitosInscripcionRepository.count(specification);
    }

    /**
     * Function to convert {@link RequisitosInscripcionCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<RequisitosInscripcion> createSpecification(RequisitosInscripcionCriteria criteria) {
        Specification<RequisitosInscripcion> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), RequisitosInscripcion_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), RequisitosInscripcion_.activo));
            }
            if (criteria.getObligatorio() != null) {
                specification = specification.and(buildSpecification(criteria.getObligatorio(), RequisitosInscripcion_.obligatorio));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), RequisitosInscripcion_.nombre));
            }
            if (criteria.getNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreCorto(), RequisitosInscripcion_.nombreCorto));
            }
            if (criteria.getCosto() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCosto(), RequisitosInscripcion_.costo));
            }
            if (criteria.getTipoRequisito() != null) {
                specification = specification.and(buildSpecification(criteria.getTipoRequisito(), RequisitosInscripcion_.tipoRequisito));
            }
            if (criteria.getValores() != null) {
                specification = specification.and(buildStringSpecification(criteria.getValores(), RequisitosInscripcion_.valores));
            }
            if (criteria.getInscripcionAdicionalId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionAdicionalId(),
                            root -> root.join(RequisitosInscripcion_.inscripcionAdicionals, JoinType.LEFT).get(InscripcionAdicional_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
