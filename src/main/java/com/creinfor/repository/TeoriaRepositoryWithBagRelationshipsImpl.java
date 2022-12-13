package com.creinfor.repository;

import com.creinfor.domain.Teoria;
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
public class TeoriaRepositoryWithBagRelationshipsImpl implements TeoriaRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Teoria> fetchBagRelationships(Optional<Teoria> teoria) {
        return teoria.map(this::fetchHorarios);
    }

    @Override
    public Page<Teoria> fetchBagRelationships(Page<Teoria> teorias) {
        return new PageImpl<>(fetchBagRelationships(teorias.getContent()), teorias.getPageable(), teorias.getTotalElements());
    }

    @Override
    public List<Teoria> fetchBagRelationships(List<Teoria> teorias) {
        return Optional.of(teorias).map(this::fetchHorarios).orElse(Collections.emptyList());
    }

    Teoria fetchHorarios(Teoria result) {
        return entityManager
            .createQuery("select teoria from Teoria teoria left join fetch teoria.horarios where teoria is :teoria", Teoria.class)
            .setParameter("teoria", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Teoria> fetchHorarios(List<Teoria> teorias) {
        return entityManager
            .createQuery("select distinct teoria from Teoria teoria left join fetch teoria.horarios where teoria in :teorias", Teoria.class)
            .setParameter("teorias", teorias)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
