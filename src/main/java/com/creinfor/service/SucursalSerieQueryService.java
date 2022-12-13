package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.SucursalSerie;
import com.creinfor.repository.SucursalSerieRepository;
import com.creinfor.service.criteria.SucursalSerieCriteria;
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
 * Service for executing complex queries for {@link SucursalSerie} entities in the database.
 * The main input is a {@link SucursalSerieCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link SucursalSerie} or a {@link Page} of {@link SucursalSerie} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class SucursalSerieQueryService extends QueryService<SucursalSerie> {

    private final Logger log = LoggerFactory.getLogger(SucursalSerieQueryService.class);

    private final SucursalSerieRepository sucursalSerieRepository;

    public SucursalSerieQueryService(SucursalSerieRepository sucursalSerieRepository) {
        this.sucursalSerieRepository = sucursalSerieRepository;
    }

    /**
     * Return a {@link List} of {@link SucursalSerie} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<SucursalSerie> findByCriteria(SucursalSerieCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<SucursalSerie> specification = createSpecification(criteria);
        return sucursalSerieRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link SucursalSerie} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<SucursalSerie> findByCriteria(SucursalSerieCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<SucursalSerie> specification = createSpecification(criteria);
        return sucursalSerieRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(SucursalSerieCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<SucursalSerie> specification = createSpecification(criteria);
        return sucursalSerieRepository.count(specification);
    }

    /**
     * Function to convert {@link SucursalSerieCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<SucursalSerie> createSpecification(SucursalSerieCriteria criteria) {
        Specification<SucursalSerie> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), SucursalSerie_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), SucursalSerie_.activo));
            }
            if (criteria.getTipoDocumento() != null) {
                specification = specification.and(buildSpecification(criteria.getTipoDocumento(), SucursalSerie_.tipoDocumento));
            }
            if (criteria.getSerie() != null) {
                specification = specification.and(buildStringSpecification(criteria.getSerie(), SucursalSerie_.serie));
            }
            if (criteria.getFechaEmision() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaEmision(), SucursalSerie_.fechaEmision));
            }
            if (criteria.getNumeroMaximo() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNumeroMaximo(), SucursalSerie_.numeroMaximo));
            }
            if (criteria.getNumeroUltimo() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getNumeroUltimo(), SucursalSerie_.numeroUltimo));
            }
            if (criteria.getInscripcionPagosId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionPagosId(),
                            root -> root.join(SucursalSerie_.inscripcionPagos, JoinType.LEFT).get(InscripcionPago_.id)
                        )
                    );
            }
            if (criteria.getSucursalId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getSucursalId(),
                            root -> root.join(SucursalSerie_.sucursal, JoinType.LEFT).get(Sucursal_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
