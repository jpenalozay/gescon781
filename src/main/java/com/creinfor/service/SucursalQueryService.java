package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Sucursal;
import com.creinfor.repository.SucursalRepository;
import com.creinfor.service.criteria.SucursalCriteria;
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
 * Service for executing complex queries for {@link Sucursal} entities in the database.
 * The main input is a {@link SucursalCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Sucursal} or a {@link Page} of {@link Sucursal} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class SucursalQueryService extends QueryService<Sucursal> {

    private final Logger log = LoggerFactory.getLogger(SucursalQueryService.class);

    private final SucursalRepository sucursalRepository;

    public SucursalQueryService(SucursalRepository sucursalRepository) {
        this.sucursalRepository = sucursalRepository;
    }

    /**
     * Return a {@link List} of {@link Sucursal} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Sucursal> findByCriteria(SucursalCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Sucursal> specification = createSpecification(criteria);
        return sucursalRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Sucursal} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Sucursal> findByCriteria(SucursalCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Sucursal> specification = createSpecification(criteria);
        return sucursalRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(SucursalCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Sucursal> specification = createSpecification(criteria);
        return sucursalRepository.count(specification);
    }

    /**
     * Function to convert {@link SucursalCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Sucursal> createSpecification(SucursalCriteria criteria) {
        Specification<Sucursal> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Sucursal_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), Sucursal_.activo));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), Sucursal_.codigo));
            }
            if (criteria.getCentral() != null) {
                specification = specification.and(buildSpecification(criteria.getCentral(), Sucursal_.central));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Sucursal_.nombre));
            }
            if (criteria.getNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreCorto(), Sucursal_.nombreCorto));
            }
            if (criteria.getNombreAbreviado() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreAbreviado(), Sucursal_.nombreAbreviado));
            }
            if (criteria.getFechaInicio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaInicio(), Sucursal_.fechaInicio));
            }
            if (criteria.getTelefono() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTelefono(), Sucursal_.telefono));
            }
            if (criteria.getTelefono1() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTelefono1(), Sucursal_.telefono1));
            }
            if (criteria.getDireccion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDireccion(), Sucursal_.direccion));
            }
            if (criteria.getAreaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getAreaId(), root -> root.join(Sucursal_.areas, JoinType.LEFT).get(Area_.id))
                    );
            }
            if (criteria.getSucursalSerieId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getSucursalSerieId(),
                            root -> root.join(Sucursal_.sucursalSeries, JoinType.LEFT).get(SucursalSerie_.id)
                        )
                    );
            }
            if (criteria.getDistritoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getDistritoId(), root -> root.join(Sucursal_.distrito, JoinType.LEFT).get(Distrit_.id))
                    );
            }
            if (criteria.getUsuarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getUsuarioId(), root -> root.join(Sucursal_.usuarios, JoinType.LEFT).get(Usuario_.id))
                    );
            }
        }
        return specification;
    }
}
