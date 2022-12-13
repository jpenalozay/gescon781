package com.creinfor.repository;

import com.creinfor.domain.Programacion;
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
public class ProgramacionRepositoryWithBagRelationshipsImpl implements ProgramacionRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Programacion> fetchBagRelationships(Optional<Programacion> programacion) {
        return programacion.map(this::fetchDias).map(this::fetchHorarioCatalogos);
    }

    @Override
    public Page<Programacion> fetchBagRelationships(Page<Programacion> programacions) {
        return new PageImpl<>(
            fetchBagRelationships(programacions.getContent()),
            programacions.getPageable(),
            programacions.getTotalElements()
        );
    }

    @Override
    public List<Programacion> fetchBagRelationships(List<Programacion> programacions) {
        return Optional.of(programacions).map(this::fetchDias).map(this::fetchHorarioCatalogos).orElse(Collections.emptyList());
    }

    Programacion fetchDias(Programacion result) {
        return entityManager
            .createQuery(
                "select programacion from Programacion programacion left join fetch programacion.dias where programacion is :programacion",
                Programacion.class
            )
            .setParameter("programacion", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Programacion> fetchDias(List<Programacion> programacions) {
        return entityManager
            .createQuery(
                "select distinct programacion from Programacion programacion left join fetch programacion.dias where programacion in :programacions",
                Programacion.class
            )
            .setParameter("programacions", programacions)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    Programacion fetchHorarioCatalogos(Programacion result) {
        return entityManager
            .createQuery(
                "select programacion from Programacion programacion left join fetch programacion.horarioCatalogos where programacion is :programacion",
                Programacion.class
            )
            .setParameter("programacion", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Programacion> fetchHorarioCatalogos(List<Programacion> programacions) {
        return entityManager
            .createQuery(
                "select distinct programacion from Programacion programacion left join fetch programacion.horarioCatalogos where programacion in :programacions",
                Programacion.class
            )
            .setParameter("programacions", programacions)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
