package com.creinfor.repository;

import com.creinfor.domain.InscripcionDescuento;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the InscripcionDescuento entity.
 */
@Repository
public interface InscripcionDescuentoRepository
    extends JpaRepository<InscripcionDescuento, Long>, JpaSpecificationExecutor<InscripcionDescuento> {
    default Optional<InscripcionDescuento> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<InscripcionDescuento> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<InscripcionDescuento> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct inscripcionDescuento from InscripcionDescuento inscripcionDescuento left join fetch inscripcionDescuento.inscripcion",
        countQuery = "select count(distinct inscripcionDescuento) from InscripcionDescuento inscripcionDescuento"
    )
    Page<InscripcionDescuento> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct inscripcionDescuento from InscripcionDescuento inscripcionDescuento left join fetch inscripcionDescuento.inscripcion"
    )
    List<InscripcionDescuento> findAllWithToOneRelationships();

    @Query(
        "select inscripcionDescuento from InscripcionDescuento inscripcionDescuento left join fetch inscripcionDescuento.inscripcion where inscripcionDescuento.id =:id"
    )
    Optional<InscripcionDescuento> findOneWithToOneRelationships(@Param("id") Long id);
}
