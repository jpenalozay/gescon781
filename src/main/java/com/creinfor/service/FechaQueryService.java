package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Fecha;
import com.creinfor.repository.FechaRepository;
import com.creinfor.service.criteria.FechaCriteria;
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
 * Service for executing complex queries for {@link Fecha} entities in the database.
 * The main input is a {@link FechaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Fecha} or a {@link Page} of {@link Fecha} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class FechaQueryService extends QueryService<Fecha> {

    private final Logger log = LoggerFactory.getLogger(FechaQueryService.class);

    private final FechaRepository fechaRepository;

    public FechaQueryService(FechaRepository fechaRepository) {
        this.fechaRepository = fechaRepository;
    }

    /**
     * Return a {@link List} of {@link Fecha} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Fecha> findByCriteria(FechaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Fecha> specification = createSpecification(criteria);
        return fechaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Fecha} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Fecha> findByCriteria(FechaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Fecha> specification = createSpecification(criteria);
        return fechaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(FechaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Fecha> specification = createSpecification(criteria);
        return fechaRepository.count(specification);
    }

    /**
     * Function to convert {@link FechaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Fecha> createSpecification(FechaCriteria criteria) {
        Specification<Fecha> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Fecha_.id));
            }
            if (criteria.getFecha() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFecha(), Fecha_.fecha));
            }
            if (criteria.getDia() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDia(), Fecha_.dia));
            }
            if (criteria.getMes() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getMes(), Fecha_.mes));
            }
            if (criteria.getAnio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAnio(), Fecha_.anio));
            }
            if (criteria.getDiaNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDiaNombre(), Fecha_.diaNombre));
            }
            if (criteria.getDiaNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDiaNombreCorto(), Fecha_.diaNombreCorto));
            }
            if (criteria.getFeriado() != null) {
                specification = specification.and(buildSpecification(criteria.getFeriado(), Fecha_.feriado));
            }
            if (criteria.getLaboral() != null) {
                specification = specification.and(buildSpecification(criteria.getLaboral(), Fecha_.laboral));
            }
            if (criteria.getFinSemana() != null) {
                specification = specification.and(buildSpecification(criteria.getFinSemana(), Fecha_.finSemana));
            }
            if (criteria.getHorarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getHorarioId(), root -> root.join(Fecha_.horarios, JoinType.LEFT).get(Horario_.id))
                    );
            }
            if (criteria.getProgramacionDeshabilitacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionDeshabilitacionId(),
                            root -> root.join(Fecha_.programacionDeshabilitacions, JoinType.LEFT).get(ProgramacionDeshabilitacion_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
