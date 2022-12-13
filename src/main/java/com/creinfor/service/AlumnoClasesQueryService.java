package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.AlumnoClases;
import com.creinfor.repository.AlumnoClasesRepository;
import com.creinfor.service.criteria.AlumnoClasesCriteria;
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
 * Service for executing complex queries for {@link AlumnoClases} entities in the database.
 * The main input is a {@link AlumnoClasesCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AlumnoClases} or a {@link Page} of {@link AlumnoClases} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AlumnoClasesQueryService extends QueryService<AlumnoClases> {

    private final Logger log = LoggerFactory.getLogger(AlumnoClasesQueryService.class);

    private final AlumnoClasesRepository alumnoClasesRepository;

    public AlumnoClasesQueryService(AlumnoClasesRepository alumnoClasesRepository) {
        this.alumnoClasesRepository = alumnoClasesRepository;
    }

    /**
     * Return a {@link List} of {@link AlumnoClases} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AlumnoClases> findByCriteria(AlumnoClasesCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AlumnoClases> specification = createSpecification(criteria);
        return alumnoClasesRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link AlumnoClases} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AlumnoClases> findByCriteria(AlumnoClasesCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AlumnoClases> specification = createSpecification(criteria);
        return alumnoClasesRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AlumnoClasesCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AlumnoClases> specification = createSpecification(criteria);
        return alumnoClasesRepository.count(specification);
    }

    /**
     * Function to convert {@link AlumnoClasesCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AlumnoClases> createSpecification(AlumnoClasesCriteria criteria) {
        Specification<AlumnoClases> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AlumnoClases_.id));
            }
            if (criteria.getClasesTotales() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getClasesTotales(), AlumnoClases_.clasesTotales));
            }
            if (criteria.getClasesProgramadas() != null) {
                specification =
                    specification.and(buildRangeSpecification(criteria.getClasesProgramadas(), AlumnoClases_.clasesProgramadas));
            }
            if (criteria.getClasesRealizadas() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getClasesRealizadas(), AlumnoClases_.clasesRealizadas));
            }
            if (criteria.getAlumnoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getAlumnoId(), root -> root.join(AlumnoClases_.alumno, JoinType.LEFT).get(Alumno_.id))
                    );
            }
        }
        return specification;
    }
}
