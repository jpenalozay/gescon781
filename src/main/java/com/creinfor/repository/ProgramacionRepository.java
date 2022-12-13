package com.creinfor.repository;

import com.creinfor.domain.Programacion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Programacion entity.
 */
@Repository
public interface ProgramacionRepository
    extends ProgramacionRepositoryWithBagRelationships, JpaRepository<Programacion, Long>, JpaSpecificationExecutor<Programacion> {
    default Optional<Programacion> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<Programacion> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<Programacion> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct programacion from Programacion programacion left join fetch programacion.profesor left join fetch programacion.automovil",
        countQuery = "select count(distinct programacion) from Programacion programacion"
    )
    Page<Programacion> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct programacion from Programacion programacion left join fetch programacion.profesor left join fetch programacion.automovil"
    )
    List<Programacion> findAllWithToOneRelationships();

    @Query(
        "select programacion from Programacion programacion left join fetch programacion.profesor left join fetch programacion.automovil where programacion.id =:id"
    )
    Optional<Programacion> findOneWithToOneRelationships(@Param("id") Long id);
}
