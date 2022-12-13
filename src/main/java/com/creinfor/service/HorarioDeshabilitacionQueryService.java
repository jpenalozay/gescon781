package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.HorarioDeshabilitacion;
import com.creinfor.repository.HorarioDeshabilitacionRepository;
import com.creinfor.service.criteria.HorarioDeshabilitacionCriteria;
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
 * Service for executing complex queries for {@link HorarioDeshabilitacion} entities in the database.
 * The main input is a {@link HorarioDeshabilitacionCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link HorarioDeshabilitacion} or a {@link Page} of {@link HorarioDeshabilitacion} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class HorarioDeshabilitacionQueryService extends QueryService<HorarioDeshabilitacion> {

    private final Logger log = LoggerFactory.getLogger(HorarioDeshabilitacionQueryService.class);

    private final HorarioDeshabilitacionRepository horarioDeshabilitacionRepository;

    public HorarioDeshabilitacionQueryService(HorarioDeshabilitacionRepository horarioDeshabilitacionRepository) {
        this.horarioDeshabilitacionRepository = horarioDeshabilitacionRepository;
    }

    /**
     * Return a {@link List} of {@link HorarioDeshabilitacion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<HorarioDeshabilitacion> findByCriteria(HorarioDeshabilitacionCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<HorarioDeshabilitacion> specification = createSpecification(criteria);
        return horarioDeshabilitacionRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link HorarioDeshabilitacion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<HorarioDeshabilitacion> findByCriteria(HorarioDeshabilitacionCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<HorarioDeshabilitacion> specification = createSpecification(criteria);
        return horarioDeshabilitacionRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(HorarioDeshabilitacionCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<HorarioDeshabilitacion> specification = createSpecification(criteria);
        return horarioDeshabilitacionRepository.count(specification);
    }

    /**
     * Function to convert {@link HorarioDeshabilitacionCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<HorarioDeshabilitacion> createSpecification(HorarioDeshabilitacionCriteria criteria) {
        Specification<HorarioDeshabilitacion> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), HorarioDeshabilitacion_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), HorarioDeshabilitacion_.activo));
            }
            if (criteria.getTipo() != null) {
                specification = specification.and(buildSpecification(criteria.getTipo(), HorarioDeshabilitacion_.tipo));
            }
            if (criteria.getProgramacionDeshabilitacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionDeshabilitacionId(),
                            root ->
                                root
                                    .join(HorarioDeshabilitacion_.programacionDeshabilitacion, JoinType.LEFT)
                                    .get(ProgramacionDeshabilitacion_.id)
                        )
                    );
            }
            if (criteria.getHorarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioId(),
                            root -> root.join(HorarioDeshabilitacion_.horario, JoinType.LEFT).get(Horario_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
