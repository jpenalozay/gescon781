package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.TeoriaHorarioCatalogo;
import com.creinfor.repository.TeoriaHorarioCatalogoRepository;
import com.creinfor.service.criteria.TeoriaHorarioCatalogoCriteria;
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
 * Service for executing complex queries for {@link TeoriaHorarioCatalogo} entities in the database.
 * The main input is a {@link TeoriaHorarioCatalogoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link TeoriaHorarioCatalogo} or a {@link Page} of {@link TeoriaHorarioCatalogo} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class TeoriaHorarioCatalogoQueryService extends QueryService<TeoriaHorarioCatalogo> {

    private final Logger log = LoggerFactory.getLogger(TeoriaHorarioCatalogoQueryService.class);

    private final TeoriaHorarioCatalogoRepository teoriaHorarioCatalogoRepository;

    public TeoriaHorarioCatalogoQueryService(TeoriaHorarioCatalogoRepository teoriaHorarioCatalogoRepository) {
        this.teoriaHorarioCatalogoRepository = teoriaHorarioCatalogoRepository;
    }

    /**
     * Return a {@link List} of {@link TeoriaHorarioCatalogo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<TeoriaHorarioCatalogo> findByCriteria(TeoriaHorarioCatalogoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<TeoriaHorarioCatalogo> specification = createSpecification(criteria);
        return teoriaHorarioCatalogoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link TeoriaHorarioCatalogo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<TeoriaHorarioCatalogo> findByCriteria(TeoriaHorarioCatalogoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<TeoriaHorarioCatalogo> specification = createSpecification(criteria);
        return teoriaHorarioCatalogoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(TeoriaHorarioCatalogoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<TeoriaHorarioCatalogo> specification = createSpecification(criteria);
        return teoriaHorarioCatalogoRepository.count(specification);
    }

    /**
     * Function to convert {@link TeoriaHorarioCatalogoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<TeoriaHorarioCatalogo> createSpecification(TeoriaHorarioCatalogoCriteria criteria) {
        Specification<TeoriaHorarioCatalogo> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), TeoriaHorarioCatalogo_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), TeoriaHorarioCatalogo_.activo));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), TeoriaHorarioCatalogo_.nombre));
            }
            if (criteria.getNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreCorto(), TeoriaHorarioCatalogo_.nombreCorto));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), TeoriaHorarioCatalogo_.descripcion));
            }
            if (criteria.getPeriodo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPeriodo(), TeoriaHorarioCatalogo_.periodo));
            }
            if (criteria.getAnio() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAnio(), TeoriaHorarioCatalogo_.anio));
            }
            if (criteria.getMes() != null) {
                specification = specification.and(buildStringSpecification(criteria.getMes(), TeoriaHorarioCatalogo_.mes));
            }
            if (criteria.getDia() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDia(), TeoriaHorarioCatalogo_.dia));
            }
            if (criteria.getHoraInicio() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getHoraInicio(), TeoriaHorarioCatalogo_.horaInicio));
            }
            if (criteria.getHoraFin() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getHoraFin(), TeoriaHorarioCatalogo_.horaFin));
            }
            if (criteria.getInscripcionDetalleId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionDetalleId(),
                            root -> root.join(TeoriaHorarioCatalogo_.inscripcionDetalles, JoinType.LEFT).get(InscripcionDetalle_.id)
                        )
                    );
            }
            if (criteria.getTeoriaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getTeoriaId(),
                            root -> root.join(TeoriaHorarioCatalogo_.teorias, JoinType.LEFT).get(Teoria_.id)
                        )
                    );
            }
            if (criteria.getAsignaturaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAsignaturaId(),
                            root -> root.join(TeoriaHorarioCatalogo_.asignaturas, JoinType.LEFT).get(Asignatura_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
