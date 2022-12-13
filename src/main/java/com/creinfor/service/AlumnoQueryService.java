package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Alumno;
import com.creinfor.repository.AlumnoRepository;
import com.creinfor.service.criteria.AlumnoCriteria;
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
 * Service for executing complex queries for {@link Alumno} entities in the database.
 * The main input is a {@link AlumnoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Alumno} or a {@link Page} of {@link Alumno} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AlumnoQueryService extends QueryService<Alumno> {

    private final Logger log = LoggerFactory.getLogger(AlumnoQueryService.class);

    private final AlumnoRepository alumnoRepository;

    public AlumnoQueryService(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    /**
     * Return a {@link List} of {@link Alumno} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Alumno> findByCriteria(AlumnoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Alumno> specification = createSpecification(criteria);
        return alumnoRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Alumno} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Alumno> findByCriteria(AlumnoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Alumno> specification = createSpecification(criteria);
        return alumnoRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AlumnoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Alumno> specification = createSpecification(criteria);
        return alumnoRepository.count(specification);
    }

    /**
     * Function to convert {@link AlumnoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Alumno> createSpecification(AlumnoCriteria criteria) {
        Specification<Alumno> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Alumno_.id));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), Alumno_.codigo));
            }
            if (criteria.getEstado() != null) {
                specification = specification.and(buildSpecification(criteria.getEstado(), Alumno_.estado));
            }
            if (criteria.getTipo() != null) {
                specification = specification.and(buildSpecification(criteria.getTipo(), Alumno_.tipo));
            }
            if (criteria.getAlumnoGradoInstruccion() != null) {
                specification = specification.and(buildSpecification(criteria.getAlumnoGradoInstruccion(), Alumno_.alumnoGradoInstruccion));
            }
            if (criteria.getOcupacion() != null) {
                specification = specification.and(buildSpecification(criteria.getOcupacion(), Alumno_.ocupacion));
            }
            if (criteria.getPersonaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getPersonaId(), root -> root.join(Alumno_.persona, JoinType.LEFT).get(Persona_.id))
                    );
            }
            if (criteria.getAlumnoClasesId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAlumnoClasesId(),
                            root -> root.join(Alumno_.alumnoClases, JoinType.LEFT).get(AlumnoClases_.id)
                        )
                    );
            }
            if (criteria.getAlumnoUsuarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAlumnoUsuarioId(),
                            root -> root.join(Alumno_.alumnoUsuarios, JoinType.LEFT).get(AlumnoUsuario_.id)
                        )
                    );
            }
            if (criteria.getAlumnoCategoriaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAlumnoCategoriaId(),
                            root -> root.join(Alumno_.alumnoCategorias, JoinType.LEFT).get(AlumnoCategoria_.id)
                        )
                    );
            }
            if (criteria.getInscripcionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInscripcionId(),
                            root -> root.join(Alumno_.inscripcions, JoinType.LEFT).get(Inscripcion_.id)
                        )
                    );
            }
            if (criteria.getHorarioId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getHorarioId(), root -> root.join(Alumno_.horarios, JoinType.LEFT).get(Horario_.id))
                    );
            }
        }
        return specification;
    }
}
