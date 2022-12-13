package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.LugarSalida;
import com.creinfor.repository.LugarSalidaRepository;
import com.creinfor.service.criteria.LugarSalidaCriteria;
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
 * Service for executing complex queries for {@link LugarSalida} entities in the database.
 * The main input is a {@link LugarSalidaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LugarSalida} or a {@link Page} of {@link LugarSalida} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class LugarSalidaQueryService extends QueryService<LugarSalida> {

    private final Logger log = LoggerFactory.getLogger(LugarSalidaQueryService.class);

    private final LugarSalidaRepository lugarSalidaRepository;

    public LugarSalidaQueryService(LugarSalidaRepository lugarSalidaRepository) {
        this.lugarSalidaRepository = lugarSalidaRepository;
    }

    /**
     * Return a {@link List} of {@link LugarSalida} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LugarSalida> findByCriteria(LugarSalidaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<LugarSalida> specification = createSpecification(criteria);
        return lugarSalidaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link LugarSalida} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LugarSalida> findByCriteria(LugarSalidaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<LugarSalida> specification = createSpecification(criteria);
        return lugarSalidaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LugarSalidaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<LugarSalida> specification = createSpecification(criteria);
        return lugarSalidaRepository.count(specification);
    }

    /**
     * Function to convert {@link LugarSalidaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<LugarSalida> createSpecification(LugarSalidaCriteria criteria) {
        Specification<LugarSalida> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), LugarSalida_.id));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), LugarSalida_.nombre));
            }
            if (criteria.getHorarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioId(),
                            root -> root.join(LugarSalida_.horarios, JoinType.LEFT).get(Horario_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
