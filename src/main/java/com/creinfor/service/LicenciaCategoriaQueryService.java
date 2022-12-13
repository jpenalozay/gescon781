package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.LicenciaCategoria;
import com.creinfor.repository.LicenciaCategoriaRepository;
import com.creinfor.service.criteria.LicenciaCategoriaCriteria;
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
 * Service for executing complex queries for {@link LicenciaCategoria} entities in the database.
 * The main input is a {@link LicenciaCategoriaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LicenciaCategoria} or a {@link Page} of {@link LicenciaCategoria} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class LicenciaCategoriaQueryService extends QueryService<LicenciaCategoria> {

    private final Logger log = LoggerFactory.getLogger(LicenciaCategoriaQueryService.class);

    private final LicenciaCategoriaRepository licenciaCategoriaRepository;

    public LicenciaCategoriaQueryService(LicenciaCategoriaRepository licenciaCategoriaRepository) {
        this.licenciaCategoriaRepository = licenciaCategoriaRepository;
    }

    /**
     * Return a {@link List} of {@link LicenciaCategoria} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LicenciaCategoria> findByCriteria(LicenciaCategoriaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LicenciaCategoria> specification = createSpecification(criteria);
        return licenciaCategoriaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link LicenciaCategoria} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LicenciaCategoria> findByCriteria(LicenciaCategoriaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<LicenciaCategoria> specification = createSpecification(criteria);
        return licenciaCategoriaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LicenciaCategoriaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<LicenciaCategoria> specification = createSpecification(criteria);
        return licenciaCategoriaRepository.count(specification);
    }

    /**
     * Function to convert {@link LicenciaCategoriaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<LicenciaCategoria> createSpecification(LicenciaCategoriaCriteria criteria) {
        Specification<LicenciaCategoria> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), LicenciaCategoria_.id));
            }
            if (criteria.getCategoria() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCategoria(), LicenciaCategoria_.categoria));
            }
            if (criteria.getAlumnoCategoriaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAlumnoCategoriaId(),
                            root -> root.join(LicenciaCategoria_.alumnoCategorias, JoinType.LEFT).get(AlumnoCategoria_.id)
                        )
                    );
            }
            if (criteria.getProfesorId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProfesorId(),
                            root -> root.join(LicenciaCategoria_.profesors, JoinType.LEFT).get(Profesor_.id)
                        )
                    );
            }
            if (criteria.getAsignaturaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAsignaturaId(),
                            root -> root.join(LicenciaCategoria_.asignaturas, JoinType.LEFT).get(Asignatura_.id)
                        )
                    );
            }
            if (criteria.getIntructoresId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getIntructoresId(),
                            root -> root.join(LicenciaCategoria_.intructores, JoinType.LEFT).get(Profesor_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
