package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.AlumnoUsuario;
import com.creinfor.repository.AlumnoUsuarioRepository;
import com.creinfor.service.criteria.AlumnoUsuarioCriteria;
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
 * Service for executing complex queries for {@link AlumnoUsuario} entities in the database.
 * The main input is a {@link AlumnoUsuarioCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AlumnoUsuario} or a {@link Page} of {@link AlumnoUsuario} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AlumnoUsuarioQueryService extends QueryService<AlumnoUsuario> {

    private final Logger log = LoggerFactory.getLogger(AlumnoUsuarioQueryService.class);

    private final AlumnoUsuarioRepository alumnoUsuarioRepository;

    public AlumnoUsuarioQueryService(AlumnoUsuarioRepository alumnoUsuarioRepository) {
        this.alumnoUsuarioRepository = alumnoUsuarioRepository;
    }

    /**
     * Return a {@link List} of {@link AlumnoUsuario} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AlumnoUsuario> findByCriteria(AlumnoUsuarioCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AlumnoUsuario> specification = createSpecification(criteria);
        return alumnoUsuarioRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link AlumnoUsuario} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AlumnoUsuario> findByCriteria(AlumnoUsuarioCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AlumnoUsuario> specification = createSpecification(criteria);
        return alumnoUsuarioRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AlumnoUsuarioCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AlumnoUsuario> specification = createSpecification(criteria);
        return alumnoUsuarioRepository.count(specification);
    }

    /**
     * Function to convert {@link AlumnoUsuarioCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AlumnoUsuario> createSpecification(AlumnoUsuarioCriteria criteria) {
        Specification<AlumnoUsuario> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AlumnoUsuario_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), AlumnoUsuario_.activo));
            }
            if (criteria.getUsuario() != null) {
                specification = specification.and(buildStringSpecification(criteria.getUsuario(), AlumnoUsuario_.usuario));
            }
            if (criteria.getClave() != null) {
                specification = specification.and(buildStringSpecification(criteria.getClave(), AlumnoUsuario_.clave));
            }
            if (criteria.getAlumnoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getAlumnoId(), root -> root.join(AlumnoUsuario_.alumno, JoinType.LEFT).get(Alumno_.id))
                    );
            }
        }
        return specification;
    }
}
