package com.creinfor.repository;

import com.creinfor.domain.Asignatura;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Asignatura entity.
 */
@Repository
public interface AsignaturaRepository
    extends AsignaturaRepositoryWithBagRelationships, JpaRepository<Asignatura, Long>, JpaSpecificationExecutor<Asignatura> {
    default Optional<Asignatura> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<Asignatura> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<Asignatura> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct asignatura from Asignatura asignatura left join fetch asignatura.curso",
        countQuery = "select count(distinct asignatura) from Asignatura asignatura"
    )
    Page<Asignatura> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct asignatura from Asignatura asignatura left join fetch asignatura.curso")
    List<Asignatura> findAllWithToOneRelationships();

    @Query("select asignatura from Asignatura asignatura left join fetch asignatura.curso where asignatura.id =:id")
    Optional<Asignatura> findOneWithToOneRelationships(@Param("id") Long id);
}
