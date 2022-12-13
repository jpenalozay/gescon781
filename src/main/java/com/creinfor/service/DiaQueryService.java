package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Dia;
import com.creinfor.repository.DiaRepository;
import com.creinfor.service.criteria.DiaCriteria;
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
 * Service for executing complex queries for {@link Dia} entities in the database.
 * The main input is a {@link DiaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Dia} or a {@link Page} of {@link Dia} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DiaQueryService extends QueryService<Dia> {

    private final Logger log = LoggerFactory.getLogger(DiaQueryService.class);

    private final DiaRepository diaRepository;

    public DiaQueryService(DiaRepository diaRepository) {
        this.diaRepository = diaRepository;
    }

    /**
     * Return a {@link List} of {@link Dia} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Dia> findByCriteria(DiaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Dia> specification = createSpecification(criteria);
        return diaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Dia} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Dia> findByCriteria(DiaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Dia> specification = createSpecification(criteria);
        return diaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DiaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Dia> specification = createSpecification(criteria);
        return diaRepository.count(specification);
    }

    /**
     * Function to convert {@link DiaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Dia> createSpecification(DiaCriteria criteria) {
        Specification<Dia> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Dia_.id));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Dia_.nombre));
            }
            if (criteria.getNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreCorto(), Dia_.nombreCorto));
            }
            if (criteria.getProgramacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionId(),
                            root -> root.join(Dia_.programacions, JoinType.LEFT).get(Programacion_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
