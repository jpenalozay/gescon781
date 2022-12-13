package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.AlumnoCategoria;
import com.creinfor.repository.AlumnoCategoriaRepository;
import com.creinfor.service.criteria.AlumnoCategoriaCriteria;
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
 * Service for executing complex queries for {@link AlumnoCategoria} entities in the database.
 * The main input is a {@link AlumnoCategoriaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AlumnoCategoria} or a {@link Page} of {@link AlumnoCategoria} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AlumnoCategoriaQueryService extends QueryService<AlumnoCategoria> {

    private final Logger log = LoggerFactory.getLogger(AlumnoCategoriaQueryService.class);

    private final AlumnoCategoriaRepository alumnoCategoriaRepository;

    public AlumnoCategoriaQueryService(AlumnoCategoriaRepository alumnoCategoriaRepository) {
        this.alumnoCategoriaRepository = alumnoCategoriaRepository;
    }

    /**
     * Return a {@link List} of {@link AlumnoCategoria} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AlumnoCategoria> findByCriteria(AlumnoCategoriaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AlumnoCategoria> specification = createSpecification(criteria);
        return alumnoCategoriaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link AlumnoCategoria} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AlumnoCategoria> findByCriteria(AlumnoCategoriaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AlumnoCategoria> specification = createSpecification(criteria);
        return alumnoCategoriaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AlumnoCategoriaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AlumnoCategoria> specification = createSpecification(criteria);
        return alumnoCategoriaRepository.count(specification);
    }

    /**
     * Function to convert {@link AlumnoCategoriaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AlumnoCategoria> createSpecification(AlumnoCategoriaCriteria criteria) {
        Specification<AlumnoCategoria> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AlumnoCategoria_.id));
            }
            if (criteria.getLicenciaNumeroAlumno() != null) {
                specification =
                    specification.and(buildStringSpecification(criteria.getLicenciaNumeroAlumno(), AlumnoCategoria_.licenciaNumeroAlumno));
            }
            if (criteria.getAlumnoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAlumnoId(),
                            root -> root.join(AlumnoCategoria_.alumno, JoinType.LEFT).get(Alumno_.id)
                        )
                    );
            }
            if (criteria.getCategoriaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getCategoriaId(),
                            root -> root.join(AlumnoCategoria_.categoria, JoinType.LEFT).get(LicenciaCategoria_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
