package com.creinfor.repository;

import com.creinfor.domain.ProgramacionDeshabilitacion;
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
public class ProgramacionDeshabilitacionRepositoryWithBagRelationshipsImpl
    implements ProgramacionDeshabilitacionRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<ProgramacionDeshabilitacion> fetchBagRelationships(Optional<ProgramacionDeshabilitacion> programacionDeshabilitacion) {
        return programacionDeshabilitacion.map(this::fetchFechas).map(this::fetchHorarioCatalogos);
    }

    @Override
    public Page<ProgramacionDeshabilitacion> fetchBagRelationships(Page<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        return new PageImpl<>(
            fetchBagRelationships(programacionDeshabilitacions.getContent()),
            programacionDeshabilitacions.getPageable(),
            programacionDeshabilitacions.getTotalElements()
        );
    }

    @Override
    public List<ProgramacionDeshabilitacion> fetchBagRelationships(List<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        return Optional
            .of(programacionDeshabilitacions)
            .map(this::fetchFechas)
            .map(this::fetchHorarioCatalogos)
            .orElse(Collections.emptyList());
    }

    ProgramacionDeshabilitacion fetchFechas(ProgramacionDeshabilitacion result) {
        return entityManager
            .createQuery(
                "select programacionDeshabilitacion from ProgramacionDeshabilitacion programacionDeshabilitacion left join fetch programacionDeshabilitacion.fechas where programacionDeshabilitacion is :programacionDeshabilitacion",
                ProgramacionDeshabilitacion.class
            )
            .setParameter("programacionDeshabilitacion", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<ProgramacionDeshabilitacion> fetchFechas(List<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        return entityManager
            .createQuery(
                "select distinct programacionDeshabilitacion from ProgramacionDeshabilitacion programacionDeshabilitacion left join fetch programacionDeshabilitacion.fechas where programacionDeshabilitacion in :programacionDeshabilitacions",
                ProgramacionDeshabilitacion.class
            )
            .setParameter("programacionDeshabilitacions", programacionDeshabilitacions)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }

    ProgramacionDeshabilitacion fetchHorarioCatalogos(ProgramacionDeshabilitacion result) {
        return entityManager
            .createQuery(
                "select programacionDeshabilitacion from ProgramacionDeshabilitacion programacionDeshabilitacion left join fetch programacionDeshabilitacion.horarioCatalogos where programacionDeshabilitacion is :programacionDeshabilitacion",
                ProgramacionDeshabilitacion.class
            )
            .setParameter("programacionDeshabilitacion", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<ProgramacionDeshabilitacion> fetchHorarioCatalogos(List<ProgramacionDeshabilitacion> programacionDeshabilitacions) {
        return entityManager
            .createQuery(
                "select distinct programacionDeshabilitacion from ProgramacionDeshabilitacion programacionDeshabilitacion left join fetch programacionDeshabilitacion.horarioCatalogos where programacionDeshabilitacion in :programacionDeshabilitacions",
                ProgramacionDeshabilitacion.class
            )
            .setParameter("programacionDeshabilitacions", programacionDeshabilitacions)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
