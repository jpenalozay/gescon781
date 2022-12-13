package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.ProgramacionDeshabilitacion;
import com.creinfor.repository.ProgramacionDeshabilitacionRepository;
import com.creinfor.service.criteria.ProgramacionDeshabilitacionCriteria;
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
 * Service for executing complex queries for {@link ProgramacionDeshabilitacion} entities in the database.
 * The main input is a {@link ProgramacionDeshabilitacionCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link ProgramacionDeshabilitacion} or a {@link Page} of {@link ProgramacionDeshabilitacion} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ProgramacionDeshabilitacionQueryService extends QueryService<ProgramacionDeshabilitacion> {

    private final Logger log = LoggerFactory.getLogger(ProgramacionDeshabilitacionQueryService.class);

    private final ProgramacionDeshabilitacionRepository programacionDeshabilitacionRepository;

    public ProgramacionDeshabilitacionQueryService(ProgramacionDeshabilitacionRepository programacionDeshabilitacionRepository) {
        this.programacionDeshabilitacionRepository = programacionDeshabilitacionRepository;
    }

    /**
     * Return a {@link List} of {@link ProgramacionDeshabilitacion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<ProgramacionDeshabilitacion> findByCriteria(ProgramacionDeshabilitacionCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<ProgramacionDeshabilitacion> specification = createSpecification(criteria);
        return programacionDeshabilitacionRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link ProgramacionDeshabilitacion} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<ProgramacionDeshabilitacion> findByCriteria(ProgramacionDeshabilitacionCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<ProgramacionDeshabilitacion> specification = createSpecification(criteria);
        return programacionDeshabilitacionRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ProgramacionDeshabilitacionCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<ProgramacionDeshabilitacion> specification = createSpecification(criteria);
        return programacionDeshabilitacionRepository.count(specification);
    }

    /**
     * Function to convert {@link ProgramacionDeshabilitacionCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<ProgramacionDeshabilitacion> createSpecification(ProgramacionDeshabilitacionCriteria criteria) {
        Specification<ProgramacionDeshabilitacion> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), ProgramacionDeshabilitacion_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), ProgramacionDeshabilitacion_.activo));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), ProgramacionDeshabilitacion_.codigo));
            }
            if (criteria.getDescripcion() != null) {
                specification =
                    specification.and(buildStringSpecification(criteria.getDescripcion(), ProgramacionDeshabilitacion_.descripcion));
            }
            if (criteria.getFecha() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFecha(), ProgramacionDeshabilitacion_.fecha));
            }
            if (criteria.getNombreUsuario() != null) {
                specification =
                    specification.and(buildStringSpecification(criteria.getNombreUsuario(), ProgramacionDeshabilitacion_.nombreUsuario));
            }
            if (criteria.getHorarioDeshabilitacionesId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioDeshabilitacionesId(),
                            root ->
                                root
                                    .join(ProgramacionDeshabilitacion_.horarioDeshabilitaciones, JoinType.LEFT)
                                    .get(HorarioDeshabilitacion_.id)
                        )
                    );
            }
            if (criteria.getFechasId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getFechasId(),
                            root -> root.join(ProgramacionDeshabilitacion_.fechas, JoinType.LEFT).get(Fecha_.id)
                        )
                    );
            }
            if (criteria.getHorarioCatalogoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioCatalogoId(),
                            root -> root.join(ProgramacionDeshabilitacion_.horarioCatalogos, JoinType.LEFT).get(HorarioCatalogo_.id)
                        )
                    );
            }
            if (criteria.getProgramacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionId(),
                            root -> root.join(ProgramacionDeshabilitacion_.programacion, JoinType.LEFT).get(Programacion_.id)
                        )
                    );
            }
            if (criteria.getUsuarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getUsuarioId(),
                            root -> root.join(ProgramacionDeshabilitacion_.usuario, JoinType.LEFT).get(Usuario_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
