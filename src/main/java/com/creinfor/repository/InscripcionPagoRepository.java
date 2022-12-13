package com.creinfor.repository;

import com.creinfor.domain.InscripcionPago;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the InscripcionPago entity.
 */
@Repository
public interface InscripcionPagoRepository extends JpaRepository<InscripcionPago, Long>, JpaSpecificationExecutor<InscripcionPago> {
    default Optional<InscripcionPago> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<InscripcionPago> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<InscripcionPago> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct inscripcionPago from InscripcionPago inscripcionPago left join fetch inscripcionPago.inscripcion left join fetch inscripcionPago.serie",
        countQuery = "select count(distinct inscripcionPago) from InscripcionPago inscripcionPago"
    )
    Page<InscripcionPago> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct inscripcionPago from InscripcionPago inscripcionPago left join fetch inscripcionPago.inscripcion left join fetch inscripcionPago.serie"
    )
    List<InscripcionPago> findAllWithToOneRelationships();

    @Query(
        "select inscripcionPago from InscripcionPago inscripcionPago left join fetch inscripcionPago.inscripcion left join fetch inscripcionPago.serie where inscripcionPago.id =:id"
    )
    Optional<InscripcionPago> findOneWithToOneRelationships(@Param("id") Long id);
}
