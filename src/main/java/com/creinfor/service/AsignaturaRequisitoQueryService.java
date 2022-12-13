package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.AsignaturaRequisito;
import com.creinfor.repository.AsignaturaRequisitoRepository;
import com.creinfor.service.criteria.AsignaturaRequisitoCriteria;
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
 * Service for executing complex queries for {@link AsignaturaRequisito} entities in the database.
 * The main input is a {@link AsignaturaRequisitoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AsignaturaRequisito} or a {@link Page} of {@link AsignaturaRequisito} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AsignaturaRequisitoQueryService extends QueryService<AsignaturaRequisito> {

    private final Logger log = LoggerFactory.getLogger(AsignaturaRequisitoQueryService.class);

    private final AsignaturaRequisitoRepository asignaturaRequisitoRepository;

    public AsignaturaRequisitoQueryService(AsignaturaRequisitoRepository asignaturaRequisitoRepository) {
        this.asignaturaRequisitoRepository = asignaturaRequisitoRepository;
    }

    /**
     * Return a {@link List} of {@link AsignaturaRequisito} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AsignaturaRequisito> findByCriteria(AsignaturaRequisitoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AsignaturaRequisito> specification = createSpecification(criteria);
        return asignaturaRequisitoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link AsignaturaRequisito} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AsignaturaRequisito> findByCriteria(AsignaturaRequisitoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AsignaturaRequisito> specification = createSpecification(criteria);
        return asignaturaRequisitoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AsignaturaRequisitoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AsignaturaRequisito> specification = createSpecification(criteria);
        return asignaturaRequisitoRepository.count(specification);
    }

    /**
     * Function to convert {@link AsignaturaRequisitoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AsignaturaRequisito> createSpecification(AsignaturaRequisitoCriteria criteria) {
        Specification<AsignaturaRequisito> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AsignaturaRequisito_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), AsignaturaRequisito_.activo));
            }
            if (criteria.getTipo() != null) {
                specification = specification.and(buildSpecification(criteria.getTipo(), AsignaturaRequisito_.tipo));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), AsignaturaRequisito_.nombre));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), AsignaturaRequisito_.descripcion));
            }
            if (criteria.getInscripcionAsignaturaRequisitoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionAsignaturaRequisitoId(),
                            root ->
                                root
                                    .join(AsignaturaRequisito_.inscripcionAsignaturaRequisitos, JoinType.LEFT)
                                    .get(InscripcionAsignaturaRequisito_.id)
                        )
                    );
            }
            if (criteria.getAsignaturaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAsignaturaId(),
                            root -> root.join(AsignaturaRequisito_.asignaturas, JoinType.LEFT).get(Asignatura_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
