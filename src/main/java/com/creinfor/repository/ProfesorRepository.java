package com.creinfor.repository;

import com.creinfor.domain.Profesor;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Profesor entity.
 */
@Repository
public interface ProfesorRepository
    extends ProfesorRepositoryWithBagRelationships, JpaRepository<Profesor, Long>, JpaSpecificationExecutor<Profesor> {
    default Optional<Profesor> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<Profesor> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<Profesor> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct profesor from Profesor profesor left join fetch profesor.empleado left join fetch profesor.licenciaCategoria",
        countQuery = "select count(distinct profesor) from Profesor profesor"
    )
    Page<Profesor> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct profesor from Profesor profesor left join fetch profesor.empleado left join fetch profesor.licenciaCategoria")
    List<Profesor> findAllWithToOneRelationships();

    @Query(
        "select profesor from Profesor profesor left join fetch profesor.empleado left join fetch profesor.licenciaCategoria where profesor.id =:id"
    )
    Optional<Profesor> findOneWithToOneRelationships(@Param("id") Long id);
}
