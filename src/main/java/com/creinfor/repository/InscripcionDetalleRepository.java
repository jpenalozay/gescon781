package com.creinfor.repository;

import com.creinfor.domain.InscripcionDetalle;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the InscripcionDetalle entity.
 */
@Repository
public interface InscripcionDetalleRepository
    extends JpaRepository<InscripcionDetalle, Long>, JpaSpecificationExecutor<InscripcionDetalle> {
    default Optional<InscripcionDetalle> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<InscripcionDetalle> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<InscripcionDetalle> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct inscripcionDetalle from InscripcionDetalle inscripcionDetalle left join fetch inscripcionDetalle.inscripcion left join fetch inscripcionDetalle.asignatura left join fetch inscripcionDetalle.horario",
        countQuery = "select count(distinct inscripcionDetalle) from InscripcionDetalle inscripcionDetalle"
    )
    Page<InscripcionDetalle> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct inscripcionDetalle from InscripcionDetalle inscripcionDetalle left join fetch inscripcionDetalle.inscripcion left join fetch inscripcionDetalle.asignatura left join fetch inscripcionDetalle.horario"
    )
    List<InscripcionDetalle> findAllWithToOneRelationships();

    @Query(
        "select inscripcionDetalle from InscripcionDetalle inscripcionDetalle left join fetch inscripcionDetalle.inscripcion left join fetch inscripcionDetalle.asignatura left join fetch inscripcionDetalle.horario where inscripcionDetalle.id =:id"
    )
    Optional<InscripcionDetalle> findOneWithToOneRelationships(@Param("id") Long id);
}
