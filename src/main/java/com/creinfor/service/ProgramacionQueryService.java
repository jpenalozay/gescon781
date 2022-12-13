package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Programacion;
import com.creinfor.repository.ProgramacionRepository;
import com.creinfor.service.criteria.ProgramacionCriteria;
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
 * Service for executing complex queries for {@link Programacion} entities in the database.
 * The main input is a {@link ProgramacionCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Programacion} or a {@link Page} of {@link Programacion} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ProgramacionQueryService extends QueryService<Programacion> {

    private final Logger log = LoggerFactory.getLogger(ProgramacionQueryService.class);

    private final ProgramacionRepository programacionRepository;

    public ProgramacionQueryService(ProgramacionRepository programacionRepository) {
        this.programacionRepository = programacionRepository;
    }

    /**
     * Return a {@link List} of {@link Programacion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Programacion> findByCriteria(ProgramacionCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Programacion> specification = createSpecification(criteria);
        return programacionRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Programacion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Programacion> findByCriteria(ProgramacionCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Programacion> specification = createSpecification(criteria);
        return programacionRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ProgramacionCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Programacion> specification = createSpecification(criteria);
        return programacionRepository.count(specification);
    }

    /**
     * Function to convert {@link ProgramacionCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Programacion> createSpecification(ProgramacionCriteria criteria) {
        Specification<Programacion> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Programacion_.id));
            }
            if (criteria.getEstado() != null) {
                specification = specification.and(buildSpecification(criteria.getEstado(), Programacion_.estado));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), Programacion_.codigo));
            }
            if (criteria.getFechaInicio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaInicio(), Programacion_.fechaInicio));
            }
            if (criteria.getFechaFin() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaFin(), Programacion_.fechaFin));
            }
            if (criteria.getDeshabilitaciones() != null) {
                specification =
                    specification.and(buildRangeSpecification(criteria.getDeshabilitaciones(), Programacion_.deshabilitaciones));
            }
            if (criteria.getFecha() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFecha(), Programacion_.fecha));
            }
            if (criteria.getNombreUsuario() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreUsuario(), Programacion_.nombreUsuario));
            }
            if (criteria.getProgramacionDeshabilitacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionDeshabilitacionId(),
                            root ->
                                root.join(Programacion_.programacionDeshabilitacions, JoinType.LEFT).get(ProgramacionDeshabilitacion_.id)
                        )
                    );
            }
            if (criteria.getHorarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioId(),
                            root -> root.join(Programacion_.horarios, JoinType.LEFT).get(Horario_.id)
                        )
                    );
            }
            if (criteria.getDiaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getDiaId(), root -> root.join(Programacion_.dias, JoinType.LEFT).get(Dia_.id))
                    );
            }
            if (criteria.getHorarioCatalogoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioCatalogoId(),
                            root -> root.join(Programacion_.horarioCatalogos, JoinType.LEFT).get(HorarioCatalogo_.id)
                        )
                    );
            }
            if (criteria.getProfesorId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProfesorId(),
                            root -> root.join(Programacion_.profesor, JoinType.LEFT).get(Profesor_.id)
                        )
                    );
            }
            if (criteria.getAutomovilId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAutomovilId(),
                            root -> root.join(Programacion_.automovil, JoinType.LEFT).get(Automovil_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
