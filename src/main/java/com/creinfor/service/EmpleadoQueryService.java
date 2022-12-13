package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Empleado;
import com.creinfor.repository.EmpleadoRepository;
import com.creinfor.service.criteria.EmpleadoCriteria;
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
 * Service for executing complex queries for {@link Empleado} entities in the database.
 * The main input is a {@link EmpleadoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Empleado} or a {@link Page} of {@link Empleado} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class EmpleadoQueryService extends QueryService<Empleado> {

    private final Logger log = LoggerFactory.getLogger(EmpleadoQueryService.class);

    private final EmpleadoRepository empleadoRepository;

    public EmpleadoQueryService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    /**
     * Return a {@link List} of {@link Empleado} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Empleado> findByCriteria(EmpleadoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Empleado> specification = createSpecification(criteria);
        return empleadoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Empleado} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Empleado> findByCriteria(EmpleadoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Empleado> specification = createSpecification(criteria);
        return empleadoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(EmpleadoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Empleado> specification = createSpecification(criteria);
        return empleadoRepository.count(specification);
    }

    /**
     * Function to convert {@link EmpleadoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Empleado> createSpecification(EmpleadoCriteria criteria) {
        Specification<Empleado> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Empleado_.id));
            }
            if (criteria.getEstado() != null) {
                specification = specification.and(buildSpecification(criteria.getEstado(), Empleado_.estado));
            }
            if (criteria.getTipo() != null) {
                specification = specification.and(buildSpecification(criteria.getTipo(), Empleado_.tipo));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), Empleado_.codigo));
            }
            if (criteria.getCodigoAcceso() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigoAcceso(), Empleado_.codigoAcceso));
            }
            if (criteria.getTelefonoTrabajo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTelefonoTrabajo(), Empleado_.telefonoTrabajo));
            }
            if (criteria.getTelefonoTrabajo1() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTelefonoTrabajo1(), Empleado_.telefonoTrabajo1));
            }
            if (criteria.getGradoInstrucion() != null) {
                specification = specification.and(buildSpecification(criteria.getGradoInstrucion(), Empleado_.gradoInstrucion));
            }
            if (criteria.getEmailCoorporativo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getEmailCoorporativo(), Empleado_.emailCoorporativo));
            }
            if (criteria.getFechaIngreso() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaIngreso(), Empleado_.fechaIngreso));
            }
            if (criteria.getInasistencias() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getInasistencias(), Empleado_.inasistencias));
            }
            if (criteria.getTardanzas() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getTardanzas(), Empleado_.tardanzas));
            }
            if (criteria.getSueldo() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getSueldo(), Empleado_.sueldo));
            }
            if (criteria.getPersonaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getPersonaId(), root -> root.join(Empleado_.persona, JoinType.LEFT).get(Persona_.id))
                    );
            }
            if (criteria.getCargoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getCargoId(), root -> root.join(Empleado_.cargo, JoinType.LEFT).get(Cargo_.id))
                    );
            }
        }
        return specification;
    }
}
