package com.creinfor.repository;

import com.creinfor.domain.ProgramacionDeshabilitacion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProgramacionDeshabilitacion entity.
 */
@Repository
public interface ProgramacionDeshabilitacionRepository
    extends
        ProgramacionDeshabilitacionRepositoryWithBagRelationships,
        JpaRepository<ProgramacionDeshabilitacion, Long>,
        JpaSpecificationExecutor<ProgramacionDeshabilitacion> {
    default Optional<ProgramacionDeshabilitacion> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findOneWithToOneRelationships(id));
    }

    default List<ProgramacionDeshabilitacion> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships());
    }

    default Page<ProgramacionDeshabilitacion> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAllWithToOneRelationships(pageable));
    }

    @Query(
        value = "select distinct programacionDeshabilitacion from ProgramacionDeshabilitacion programacionDeshabilitacion left join fetch programacionDeshabilitacion.programacion left join fetch programacionDeshabilitacion.usuario",
        countQuery = "select count(distinct programacionDeshabilitacion) from ProgramacionDeshabilitacion programacionDeshabilitacion"
    )
    Page<ProgramacionDeshabilitacion> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct programacionDeshabilitacion from ProgramacionDeshabilitacion programacionDeshabilitacion left join fetch programacionDeshabilitacion.programacion left join fetch programacionDeshabilitacion.usuario"
    )
    List<ProgramacionDeshabilitacion> findAllWithToOneRelationships();

    @Query(
        "select programacionDeshabilitacion from ProgramacionDeshabilitacion programacionDeshabilitacion left join fetch programacionDeshabilitacion.programacion left join fetch programacionDeshabilitacion.usuario where programacionDeshabilitacion.id =:id"
    )
    Optional<ProgramacionDeshabilitacion> findOneWithToOneRelationships(@Param("id") Long id);
}
