package com.creinfor.repository;

import com.creinfor.domain.HorarioDeshabilitacion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the HorarioDeshabilitacion entity.
 */
@Repository
public interface HorarioDeshabilitacionRepository
    extends JpaRepository<HorarioDeshabilitacion, Long>, JpaSpecificationExecutor<HorarioDeshabilitacion> {
    default Optional<HorarioDeshabilitacion> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<HorarioDeshabilitacion> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<HorarioDeshabilitacion> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct horarioDeshabilitacion from HorarioDeshabilitacion horarioDeshabilitacion left join fetch horarioDeshabilitacion.programacionDeshabilitacion",
        countQuery = "select count(distinct horarioDeshabilitacion) from HorarioDeshabilitacion horarioDeshabilitacion"
    )
    Page<HorarioDeshabilitacion> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct horarioDeshabilitacion from HorarioDeshabilitacion horarioDeshabilitacion left join fetch horarioDeshabilitacion.programacionDeshabilitacion"
    )
    List<HorarioDeshabilitacion> findAllWithToOneRelationships();

    @Query(
        "select horarioDeshabilitacion from HorarioDeshabilitacion horarioDeshabilitacion left join fetch horarioDeshabilitacion.programacionDeshabilitacion where horarioDeshabilitacion.id =:id"
    )
    Optional<HorarioDeshabilitacion> findOneWithToOneRelationships(@Param("id") Long id);
}
