package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Computadora;
import com.creinfor.repository.ComputadoraRepository;
import com.creinfor.service.criteria.ComputadoraCriteria;
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
 * Service for executing complex queries for {@link Computadora} entities in the database.
 * The main input is a {@link ComputadoraCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Computadora} or a {@link Page} of {@link Computadora} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ComputadoraQueryService extends QueryService<Computadora> {

    private final Logger log = LoggerFactory.getLogger(ComputadoraQueryService.class);

    private final ComputadoraRepository computadoraRepository;

    public ComputadoraQueryService(ComputadoraRepository computadoraRepository) {
        this.computadoraRepository = computadoraRepository;
    }

    /**
     * Return a {@link List} of {@link Computadora} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Computadora> findByCriteria(ComputadoraCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Computadora> specification = createSpecification(criteria);
        return computadoraRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Computadora} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Computadora> findByCriteria(ComputadoraCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Computadora> specification = createSpecification(criteria);
        return computadoraRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ComputadoraCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Computadora> specification = createSpecification(criteria);
        return computadoraRepository.count(specification);
    }

    /**
     * Function to convert {@link ComputadoraCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Computadora> createSpecification(ComputadoraCriteria criteria) {
        Specification<Computadora> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Computadora_.id));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Computadora_.nombre));
            }
            if (criteria.getNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreCorto(), Computadora_.nombreCorto));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), Computadora_.descripcion));
            }
            if (criteria.getEstadoComputadora() != null) {
                specification = specification.and(buildSpecification(criteria.getEstadoComputadora(), Computadora_.estadoComputadora));
            }
            if (criteria.getMac() != null) {
                specification = specification.and(buildStringSpecification(criteria.getMac(), Computadora_.mac));
            }
            if (criteria.getTipo() != null) {
                specification = specification.and(buildSpecification(criteria.getTipo(), Computadora_.tipo));
            }
            if (criteria.getUsuarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getUsuarioId(),
                            root -> root.join(Computadora_.usuarios, JoinType.LEFT).get(Usuario_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
