package com.creinfor.repository;

import com.creinfor.domain.Profesor;
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
public class ProfesorRepositoryWithBagRelationshipsImpl implements ProfesorRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Profesor> fetchBagRelationships(Optional<Profesor> profesor) {
        return profesor.map(this::fetchLicenciasPermitidas);
    }

    @Override
    public Page<Profesor> fetchBagRelationships(Page<Profesor> profesors) {
        return new PageImpl<>(fetchBagRelationships(profesors.getContent()), profesors.getPageable(), profesors.getTotalElements());
    }

    @Override
    public List<Profesor> fetchBagRelationships(List<Profesor> profesors) {
        return Optional.of(profesors).map(this::fetchLicenciasPermitidas).orElse(Collections.emptyList());
    }

    Profesor fetchLicenciasPermitidas(Profesor result) {
        return entityManager
            .createQuery(
                "select profesor from Profesor profesor left join fetch profesor.licenciasPermitidas where profesor is :profesor",
                Profesor.class
            )
            .setParameter("profesor", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Profesor> fetchLicenciasPermitidas(List<Profesor> profesors) {
        return entityManager
            .createQuery(
                "select distinct profesor from Profesor profesor left join fetch profesor.licenciasPermitidas where profesor in :profesors",
                Profesor.class
            )
            .setParameter("profesors", profesors)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
