package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Area;
import com.creinfor.repository.AreaRepository;
import com.creinfor.service.criteria.AreaCriteria;
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
 * Service for executing complex queries for {@link Area} entities in the database.
 * The main input is a {@link AreaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Area} or a {@link Page} of {@link Area} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AreaQueryService extends QueryService<Area> {

    private final Logger log = LoggerFactory.getLogger(AreaQueryService.class);

    private final AreaRepository areaRepository;

    public AreaQueryService(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    /**
     * Return a {@link List} of {@link Area} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Area> findByCriteria(AreaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Area> specification = createSpecification(criteria);
        return areaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Area} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Area> findByCriteria(AreaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Area> specification = createSpecification(criteria);
        return areaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AreaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Area> specification = createSpecification(criteria);
        return areaRepository.count(specification);
    }

    /**
     * Function to convert {@link AreaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Area> createSpecification(AreaCriteria criteria) {
        Specification<Area> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Area_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), Area_.activo));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), Area_.codigo));
            }
            if (criteria.getTipo() != null) {
                specification = specification.and(buildSpecification(criteria.getTipo(), Area_.tipo));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Area_.nombre));
            }
            if (criteria.getNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreCorto(), Area_.nombreCorto));
            }
            if (criteria.getAreaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getAreaId(), root -> root.join(Area_.areas, JoinType.LEFT).get(Area_.id))
                    );
            }
            if (criteria.getCargoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getCargoId(), root -> root.join(Area_.cargos, JoinType.LEFT).get(Cargo_.id))
                    );
            }
            if (criteria.getSucursalId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getSucursalId(), root -> root.join(Area_.sucursal, JoinType.LEFT).get(Sucursal_.id))
                    );
            }
            if (criteria.getAreaSuperiorId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getAreaSuperiorId(), root -> root.join(Area_.areaSuperior, JoinType.LEFT).get(Area_.id))
                    );
            }
        }
        return specification;
    }
}
