package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Automovil;
import com.creinfor.repository.AutomovilRepository;
import com.creinfor.service.criteria.AutomovilCriteria;
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
 * Service for executing complex queries for {@link Automovil} entities in the database.
 * The main input is a {@link AutomovilCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Automovil} or a {@link Page} of {@link Automovil} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AutomovilQueryService extends QueryService<Automovil> {

    private final Logger log = LoggerFactory.getLogger(AutomovilQueryService.class);

    private final AutomovilRepository automovilRepository;

    public AutomovilQueryService(AutomovilRepository automovilRepository) {
        this.automovilRepository = automovilRepository;
    }

    /**
     * Return a {@link List} of {@link Automovil} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Automovil> findByCriteria(AutomovilCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Automovil> specification = createSpecification(criteria);
        return automovilRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Automovil} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Automovil> findByCriteria(AutomovilCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Automovil> specification = createSpecification(criteria);
        return automovilRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AutomovilCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Automovil> specification = createSpecification(criteria);
        return automovilRepository.count(specification);
    }

    /**
     * Function to convert {@link AutomovilCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Automovil> createSpecification(AutomovilCriteria criteria) {
        Specification<Automovil> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Automovil_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), Automovil_.activo));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), Automovil_.codigo));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Automovil_.nombre));
            }
            if (criteria.getTipo() != null) {
                specification = specification.and(buildSpecification(criteria.getTipo(), Automovil_.tipo));
            }
            if (criteria.getPlaca() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPlaca(), Automovil_.placa));
            }
            if (criteria.getMarca() != null) {
                specification = specification.and(buildStringSpecification(criteria.getMarca(), Automovil_.marca));
            }
            if (criteria.getModelo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getModelo(), Automovil_.modelo));
            }
            if (criteria.getAnio() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAnio(), Automovil_.anio));
            }
            if (criteria.getSoatVencimiento() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getSoatVencimiento(), Automovil_.soatVencimiento));
            }
            if (criteria.getRevisionTecnicaVencimiento() != null) {
                specification =
                    specification.and(
                        buildRangeSpecification(criteria.getRevisionTecnicaVencimiento(), Automovil_.revisionTecnicaVencimiento)
                    );
            }
            if (criteria.getCaja() != null) {
                specification = specification.and(buildSpecification(criteria.getCaja(), Automovil_.caja));
            }
            if (criteria.getProgramacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionId(),
                            root -> root.join(Automovil_.programacions, JoinType.LEFT).get(Programacion_.id)
                        )
                    );
            }
            if (criteria.getHorarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getHorarioId(), root -> root.join(Automovil_.horarios, JoinType.LEFT).get(Horario_.id))
                    );
            }
        }
        return specification;
    }
}
