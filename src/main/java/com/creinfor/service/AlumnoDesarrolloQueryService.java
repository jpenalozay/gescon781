package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.AlumnoDesarrollo;
import com.creinfor.repository.AlumnoDesarrolloRepository;
import com.creinfor.service.criteria.AlumnoDesarrolloCriteria;
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
 * Service for executing complex queries for {@link AlumnoDesarrollo} entities in the database.
 * The main input is a {@link AlumnoDesarrolloCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AlumnoDesarrollo} or a {@link Page} of {@link AlumnoDesarrollo} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AlumnoDesarrolloQueryService extends QueryService<AlumnoDesarrollo> {

    private final Logger log = LoggerFactory.getLogger(AlumnoDesarrolloQueryService.class);

    private final AlumnoDesarrolloRepository alumnoDesarrolloRepository;

    public AlumnoDesarrolloQueryService(AlumnoDesarrolloRepository alumnoDesarrolloRepository) {
        this.alumnoDesarrolloRepository = alumnoDesarrolloRepository;
    }

    /**
     * Return a {@link List} of {@link AlumnoDesarrollo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AlumnoDesarrollo> findByCriteria(AlumnoDesarrolloCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<AlumnoDesarrollo> specification = createSpecification(criteria);
        return alumnoDesarrolloRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link AlumnoDesarrollo} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AlumnoDesarrollo> findByCriteria(AlumnoDesarrolloCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<AlumnoDesarrollo> specification = createSpecification(criteria);
        return alumnoDesarrolloRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AlumnoDesarrolloCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<AlumnoDesarrollo> specification = createSpecification(criteria);
        return alumnoDesarrolloRepository.count(specification);
    }

    /**
     * Function to convert {@link AlumnoDesarrolloCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<AlumnoDesarrollo> createSpecification(AlumnoDesarrolloCriteria criteria) {
        Specification<AlumnoDesarrollo> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), AlumnoDesarrollo_.id));
            }
            if (criteria.getClasesTeoriaProgramadas() != null) {
                specification =
                    specification.and(
                        buildRangeSpecification(criteria.getClasesTeoriaProgramadas(), AlumnoDesarrollo_.clasesTeoriaProgramadas)
                    );
            }
            if (criteria.getClasesPracticasProgramas() != null) {
                specification =
                    specification.and(
                        buildRangeSpecification(criteria.getClasesPracticasProgramas(), AlumnoDesarrollo_.clasesPracticasProgramas)
                    );
            }
            if (criteria.getClasesInasistenciaTeoria() != null) {
                specification =
                    specification.and(
                        buildRangeSpecification(criteria.getClasesInasistenciaTeoria(), AlumnoDesarrollo_.clasesInasistenciaTeoria)
                    );
            }
            if (criteria.getClasesInasistenciaPractica() != null) {
                specification =
                    specification.and(
                        buildRangeSpecification(criteria.getClasesInasistenciaPractica(), AlumnoDesarrollo_.clasesInasistenciaPractica)
                    );
            }
            if (criteria.getClasesRealizadasTeoria() != null) {
                specification =
                    specification.and(
                        buildRangeSpecification(criteria.getClasesRealizadasTeoria(), AlumnoDesarrollo_.clasesRealizadasTeoria)
                    );
            }
            if (criteria.getClasesRealizadasPractica() != null) {
                specification =
                    specification.and(
                        buildRangeSpecification(criteria.getClasesRealizadasPractica(), AlumnoDesarrollo_.clasesRealizadasPractica)
                    );
            }
            if (criteria.getAlumnoDesarrolloEstado() != null) {
                specification =
                    specification.and(buildSpecification(criteria.getAlumnoDesarrolloEstado(), AlumnoDesarrollo_.alumnoDesarrolloEstado));
            }
        }
        return specification;
    }
}
