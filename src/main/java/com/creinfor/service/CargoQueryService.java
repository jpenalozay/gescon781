package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Cargo;
import com.creinfor.repository.CargoRepository;
import com.creinfor.service.criteria.CargoCriteria;
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
 * Service for executing complex queries for {@link Cargo} entities in the database.
 * The main input is a {@link CargoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Cargo} or a {@link Page} of {@link Cargo} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class CargoQueryService extends QueryService<Cargo> {

    private final Logger log = LoggerFactory.getLogger(CargoQueryService.class);

    private final CargoRepository cargoRepository;

    public CargoQueryService(CargoRepository cargoRepository) {
        this.cargoRepository = cargoRepository;
    }

    /**
     * Return a {@link List} of {@link Cargo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Cargo> findByCriteria(CargoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Cargo> specification = createSpecification(criteria);
        return cargoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Cargo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Cargo> findByCriteria(CargoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Cargo> specification = createSpecification(criteria);
        return cargoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(CargoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Cargo> specification = createSpecification(criteria);
        return cargoRepository.count(specification);
    }

    /**
     * Function to convert {@link CargoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Cargo> createSpecification(CargoCriteria criteria) {
        Specification<Cargo> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Cargo_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), Cargo_.activo));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), Cargo_.codigo));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Cargo_.nombre));
            }
            if (criteria.getNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreCorto(), Cargo_.nombreCorto));
            }
            if (criteria.getCargoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getCargoId(), root -> root.join(Cargo_.cargos, JoinType.LEFT).get(Cargo_.id))
                    );
            }
            if (criteria.getEmpleadoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getEmpleadoId(), root -> root.join(Cargo_.empleados, JoinType.LEFT).get(Empleado_.id))
                    );
            }
            if (criteria.getAreaPertenecienteId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAreaPertenecienteId(),
                            root -> root.join(Cargo_.areaPerteneciente, JoinType.LEFT).get(Area_.id)
                        )
                    );
            }
            if (criteria.getCargoSuperiorId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getCargoSuperiorId(),
                            root -> root.join(Cargo_.cargoSuperior, JoinType.LEFT).get(Cargo_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
