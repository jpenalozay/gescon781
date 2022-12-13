package com.creinfor.repository;

import com.creinfor.domain.Asignatura;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class AsignaturaRepositoryWithBagRelationshipsImpl implements AsignaturaRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Asignatura> fetchBagRelationships(Optional<Asignatura> asignatura) {
        return asignatura
            .map(this::fetchCategorias)
            .map(this::fetchAdicionals)
            .map(this::fetchHorarios)
            .map(this::fetchAsignaturaRequisitos);
    }

    @Override
    public Page<Asignatura> fetchBagRelationships(Page<Asignatura> asignaturas) {
        return new PageImpl<>(fetchBagRelationships(asignaturas.getContent()), asignaturas.getPageable(), asignaturas.getTotalElements());
    }

    @Override
    public List<Asignatura> fetchBagRelationships(List<Asignatura> asignaturas) {
        return Optional
            .of(asignaturas)
            .map(this::fetchCategorias)
            .map(this::fetchAdicionals)
            .map(this::fetchHorarios)
            .map(this::fetchAsignaturaRequisitos)
            .orElse(Collections.emptyList());
    }

    Asignatura fetchCategorias(Asignatura result) {
        return entityManager
            .createQuery(
                "select asignatura from Asignatura asignatura left join fetch asignatura.categorias where asignatura is :asignatura",
                Asignatura.class
            )
            .setParameter("asignatura", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Asignatura> fetchCategorias(List<Asignatura> asignaturas) {
        return entityManager
            .createQuery(
                "select distinct asignatura from Asignatura asignatura left join fetch asignatura.categorias where asignatura in :asignaturas",
                Asignatura.class
            )
            .setParameter("asignaturas", asignaturas)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Asignatura fetchAdicionals(Asignatura result) {
        return entityManager
            .createQuery(
                "select asignatura from Asignatura asignatura left join fetch asignatura.adicionals where asignatura is :asignatura",
                Asignatura.class
            )
            .setParameter("asignatura", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Asignatura> fetchAdicionals(List<Asignatura> asignaturas) {
        return entityManager
            .createQuery(
                "select distinct asignatura from Asignatura asignatura left join fetch asignatura.adicionals where asignatura in :asignaturas",
                Asignatura.class
            )
            .setParameter("asignaturas", asignaturas)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Asignatura fetchHorarios(Asignatura result) {
        return entityManager
            .createQuery(
                "select asignatura from Asignatura asignatura left join fetch asignatura.horarios where asignatura is :asignatura",
                Asignatura.class
            )
            .setParameter("asignatura", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Asignatura> fetchHorarios(List<Asignatura> asignaturas) {
        return entityManager
            .createQuery(
                "select distinct asignatura from Asignatura asignatura left join fetch asignatura.horarios where asignatura in :asignaturas",
                Asignatura.class
            )
            .setParameter("asignaturas", asignaturas)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Asignatura fetchAsignaturaRequisitos(Asignatura result) {
        return entityManager
            .createQuery(
                "select asignatura from Asignatura asignatura left join fetch asignatura.asignaturaRequisitos where asignatura is :asignatura",
                Asignatura.class
            )
            .setParameter("asignatura", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Asignatura> fetchAsignaturaRequisitos(List<Asignatura> asignaturas) {
        return entityManager
            .createQuery(
                "select distinct asignatura from Asignatura asignatura left join fetch asignatura.asignaturaRequisitos where asignatura in :asignaturas",
                Asignatura.class
            )
            .setParameter("asignaturas", asignaturas)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
