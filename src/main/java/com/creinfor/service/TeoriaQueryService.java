package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Teoria;
import com.creinfor.repository.TeoriaRepository;
import com.creinfor.service.criteria.TeoriaCriteria;
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
 * Service for executing complex queries for {@link Teoria} entities in the database.
 * The main input is a {@link TeoriaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Teoria} or a {@link Page} of {@link Teoria} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TeoriaQueryService extends QueryService<Teoria> {

    private final Logger log = LoggerFactory.getLogger(TeoriaQueryService.class);

    private final TeoriaRepository teoriaRepository;

    public TeoriaQueryService(TeoriaRepository teoriaRepository) {
        this.teoriaRepository = teoriaRepository;
    }

    /**
     * Return a {@link List} of {@link Teoria} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Teoria> findByCriteria(TeoriaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Teoria> specification = createSpecification(criteria);
        return teoriaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Teoria} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Teoria> findByCriteria(TeoriaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Teoria> specification = createSpecification(criteria);
        return teoriaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TeoriaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Teoria> specification = createSpecification(criteria);
        return teoriaRepository.count(specification);
    }

    /**
     * Function to convert {@link TeoriaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Teoria> createSpecification(TeoriaCriteria criteria) {
        Specification<Teoria> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Teoria_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), Teoria_.activo));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Teoria_.nombre));
            }
            if (criteria.getNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreCorto(), Teoria_.nombreCorto));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), Teoria_.descripcion));
            }
            if (criteria.getHorariosId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorariosId(),
                            root -> root.join(Teoria_.horarios, JoinType.LEFT).get(TeoriaHorarioCatalogo_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
