package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Profesor;
import com.creinfor.repository.ProfesorRepository;
import com.creinfor.service.criteria.ProfesorCriteria;
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
 * Service for executing complex queries for {@link Profesor} entities in the database.
 * The main input is a {@link ProfesorCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Profesor} or a {@link Page} of {@link Profesor} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ProfesorQueryService extends QueryService<Profesor> {

    private final Logger log = LoggerFactory.getLogger(ProfesorQueryService.class);

    private final ProfesorRepository profesorRepository;

    public ProfesorQueryService(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    /**
     * Return a {@link List} of {@link Profesor} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Profesor> findByCriteria(ProfesorCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Profesor> specification = createSpecification(criteria);
        return profesorRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Profesor} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Profesor> findByCriteria(ProfesorCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Profesor> specification = createSpecification(criteria);
        return profesorRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ProfesorCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Profesor> specification = createSpecification(criteria);
        return profesorRepository.count(specification);
    }

    /**
     * Function to convert {@link ProfesorCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Profesor> createSpecification(ProfesorCriteria criteria) {
        Specification<Profesor> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Profesor_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), Profesor_.activo));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), Profesor_.codigo));
            }
            if (criteria.getTeoria() != null) {
                specification = specification.and(buildSpecification(criteria.getTeoria(), Profesor_.teoria));
            }
            if (criteria.getPractica() != null) {
                specification = specification.and(buildSpecification(criteria.getPractica(), Profesor_.practica));
            }
            if (criteria.getLicenciaNumero() != null) {
                specification = specification.and(buildStringSpecification(criteria.getLicenciaNumero(), Profesor_.licenciaNumero));
            }
            if (criteria.getEmpleadoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getEmpleadoId(), root -> root.join(Profesor_.empleado, JoinType.LEFT).get(Empleado_.id))
                    );
            }
            if (criteria.getHorarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getHorarioId(), root -> root.join(Profesor_.horarios, JoinType.LEFT).get(Horario_.id))
                    );
            }
            if (criteria.getProgramacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionId(),
                            root -> root.join(Profesor_.programacions, JoinType.LEFT).get(Programacion_.id)
                        )
                    );
            }
            if (criteria.getLicenciasPermitidasId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getLicenciasPermitidasId(),
                            root -> root.join(Profesor_.licenciasPermitidas, JoinType.LEFT).get(LicenciaCategoria_.id)
                        )
                    );
            }
            if (criteria.getLicenciaCategoriaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getLicenciaCategoriaId(),
                            root -> root.join(Profesor_.licenciaCategoria, JoinType.LEFT).get(LicenciaCategoria_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
