package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Usuario;
import com.creinfor.repository.UsuarioRepository;
import com.creinfor.service.criteria.UsuarioCriteria;
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
 * Service for executing complex queries for {@link Usuario} entities in the database.
 * The main input is a {@link UsuarioCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Usuario} or a {@link Page} of {@link Usuario} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class UsuarioQueryService extends QueryService<Usuario> {

    private final Logger log = LoggerFactory.getLogger(UsuarioQueryService.class);

    private final UsuarioRepository usuarioRepository;

    public UsuarioQueryService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Return a {@link List} of {@link Usuario} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Usuario> findByCriteria(UsuarioCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Usuario> specification = createSpecification(criteria);
        return usuarioRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Usuario} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Usuario> findByCriteria(UsuarioCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Usuario> specification = createSpecification(criteria);
        return usuarioRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(UsuarioCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Usuario> specification = createSpecification(criteria);
        return usuarioRepository.count(specification);
    }

    /**
     * Function to convert {@link UsuarioCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Usuario> createSpecification(UsuarioCriteria criteria) {
        Specification<Usuario> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Usuario_.id));
            }
            if (criteria.getCodigo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigo(), Usuario_.codigo));
            }
            if (criteria.getCodigoSecreto() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCodigoSecreto(), Usuario_.codigoSecreto));
            }
            if (criteria.getUserId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getUserId(), root -> root.join(Usuario_.user, JoinType.LEFT).get(User_.id))
                    );
            }
            if (criteria.getEmpleadoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getEmpleadoId(), root -> root.join(Usuario_.empleado, JoinType.LEFT).get(Empleado_.id))
                    );
            }
            if (criteria.getProgramacionDeshabilitacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionDeshabilitacionId(),
                            root -> root.join(Usuario_.programacionDeshabilitacions, JoinType.LEFT).get(ProgramacionDeshabilitacion_.id)
                        )
                    );
            }
            if (criteria.getSucursalId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getSucursalId(), root -> root.join(Usuario_.sucursals, JoinType.LEFT).get(Sucursal_.id))
                    );
            }
            if (criteria.getComputadoraId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getComputadoraId(),
                            root -> root.join(Usuario_.computadoras, JoinType.LEFT).get(Computadora_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
