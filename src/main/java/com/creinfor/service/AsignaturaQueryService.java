package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Asignatura;
import com.creinfor.repository.AsignaturaRepository;
import com.creinfor.service.criteria.AsignaturaCriteria;
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
 * Service for executing complex queries for {@link Asignatura} entities in the database.
 * The main input is a {@link AsignaturaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Asignatura} or a {@link Page} of {@link Asignatura} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AsignaturaQueryService extends QueryService<Asignatura> {

    private final Logger log = LoggerFactory.getLogger(AsignaturaQueryService.class);

    private final AsignaturaRepository asignaturaRepository;

    public AsignaturaQueryService(AsignaturaRepository asignaturaRepository) {
        this.asignaturaRepository = asignaturaRepository;
    }

    /**
     * Return a {@link List} of {@link Asignatura} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Asignatura> findByCriteria(AsignaturaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Asignatura> specification = createSpecification(criteria);
        return asignaturaRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Asignatura} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Asignatura> findByCriteria(AsignaturaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Asignatura> specification = createSpecification(criteria);
        return asignaturaRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AsignaturaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Asignatura> specification = createSpecification(criteria);
        return asignaturaRepository.count(specification);
    }

    /**
     * Function to convert {@link AsignaturaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Asignatura> createSpecification(AsignaturaCriteria criteria) {
        Specification<Asignatura> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Asignatura_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), Asignatura_.activo));
            }
            if (criteria.getNombre() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombre(), Asignatura_.nombre));
            }
            if (criteria.getNombreCorto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNombreCorto(), Asignatura_.nombreCorto));
            }
            if (criteria.getDescripcion() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescripcion(), Asignatura_.descripcion));
            }
            if (criteria.getHorasTeoricas() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getHorasTeoricas(), Asignatura_.horasTeoricas));
            }
            if (criteria.getHorasPracticas() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getHorasPracticas(), Asignatura_.horasPracticas));
            }
            if (criteria.getNumeroClasesTeoria() != null) {
                specification =
                    specification.and(buildRangeSpecification(criteria.getNumeroClasesTeoria(), Asignatura_.numeroClasesTeoria));
            }
            if (criteria.getNumeroClasesPractica() != null) {
                specification =
                    specification.and(buildRangeSpecification(criteria.getNumeroClasesPractica(), Asignatura_.numeroClasesPractica));
            }
            if (criteria.getVigencia() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getVigencia(), Asignatura_.vigencia));
            }
            if (criteria.getCosto() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getCosto(), Asignatura_.costo));
            }
            if (criteria.getInscripcionDetalleId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionDetalleId(),
                            root -> root.join(Asignatura_.inscripcionDetalles, JoinType.LEFT).get(InscripcionDetalle_.id)
                        )
                    );
            }
            if (criteria.getCategoriaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getCategoriaId(),
                            root -> root.join(Asignatura_.categorias, JoinType.LEFT).get(LicenciaCategoria_.id)
                        )
                    );
            }
            if (criteria.getAdicionalId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAdicionalId(),
                            root -> root.join(Asignatura_.adicionals, JoinType.LEFT).get(AsignaturaAdiciones_.id)
                        )
                    );
            }
            if (criteria.getHorarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioId(),
                            root -> root.join(Asignatura_.horarios, JoinType.LEFT).get(TeoriaHorarioCatalogo_.id)
                        )
                    );
            }
            if (criteria.getAsignaturaRequisitoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAsignaturaRequisitoId(),
                            root -> root.join(Asignatura_.asignaturaRequisitos, JoinType.LEFT).get(AsignaturaRequisito_.id)
                        )
                    );
            }
            if (criteria.getCursoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getCursoId(), root -> root.join(Asignatura_.curso, JoinType.LEFT).get(Curso_.id))
                    );
            }
        }
        return specification;
    }
}
