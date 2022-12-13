package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.HorarioCatalogo;
import com.creinfor.repository.HorarioCatalogoRepository;
import com.creinfor.service.criteria.HorarioCatalogoCriteria;
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
 * Service for executing complex queries for {@link HorarioCatalogo} entities in the database.
 * The main input is a {@link HorarioCatalogoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link HorarioCatalogo} or a {@link Page} of {@link HorarioCatalogo} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class HorarioCatalogoQueryService extends QueryService<HorarioCatalogo> {

    private final Logger log = LoggerFactory.getLogger(HorarioCatalogoQueryService.class);

    private final HorarioCatalogoRepository horarioCatalogoRepository;

    public HorarioCatalogoQueryService(HorarioCatalogoRepository horarioCatalogoRepository) {
        this.horarioCatalogoRepository = horarioCatalogoRepository;
    }

    /**
     * Return a {@link List} of {@link HorarioCatalogo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<HorarioCatalogo> findByCriteria(HorarioCatalogoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<HorarioCatalogo> specification = createSpecification(criteria);
        return horarioCatalogoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link HorarioCatalogo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<HorarioCatalogo> findByCriteria(HorarioCatalogoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<HorarioCatalogo> specification = createSpecification(criteria);
        return horarioCatalogoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(HorarioCatalogoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<HorarioCatalogo> specification = createSpecification(criteria);
        return horarioCatalogoRepository.count(specification);
    }

    /**
     * Function to convert {@link HorarioCatalogoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<HorarioCatalogo> createSpecification(HorarioCatalogoCriteria criteria) {
        Specification<HorarioCatalogo> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), HorarioCatalogo_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), HorarioCatalogo_.activo));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCodigo(), HorarioCatalogo_.codigo));
            }
            if (criteria.getHoraInicio() != null) {
                specification = specification.and(buildStringSpecification(criteria.getHoraInicio(), HorarioCatalogo_.horaInicio));
            }
            if (criteria.getHoraFin() != null) {
                specification = specification.and(buildStringSpecification(criteria.getHoraFin(), HorarioCatalogo_.horaFin));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), HorarioCatalogo_.descripcion));
            }
            if (criteria.getHorarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioId(),
                            root -> root.join(HorarioCatalogo_.horarios, JoinType.LEFT).get(Horario_.id)
                        )
                    );
            }
            if (criteria.getProgramacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionId(),
                            root -> root.join(HorarioCatalogo_.programacions, JoinType.LEFT).get(Programacion_.id)
                        )
                    );
            }
            if (criteria.getProgramacionDeshabilitacionesId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionDeshabilitacionesId(),
                            root ->
                                root
                                    .join(HorarioCatalogo_.programacionDeshabilitaciones, JoinType.LEFT)
                                    .get(ProgramacionDeshabilitacion_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
