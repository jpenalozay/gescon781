package com.creinfor.repository;

import com.creinfor.domain.InscripcionAdicional;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the InscripcionAdicional entity.
 */
@Repository
public interface InscripcionAdicionalRepository
    extends JpaRepository<InscripcionAdicional, Long>, JpaSpecificationExecutor<InscripcionAdicional> {
    default Optional<InscripcionAdicional> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<InscripcionAdicional> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<InscripcionAdicional> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct inscripcionAdicional from InscripcionAdicional inscripcionAdicional left join fetch inscripcionAdicional.inscripcion left join fetch inscripcionAdicional.inscripcionRequisito",
        countQuery = "select count(distinct inscripcionAdicional) from InscripcionAdicional inscripcionAdicional"
    )
    Page<InscripcionAdicional> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct inscripcionAdicional from InscripcionAdicional inscripcionAdicional left join fetch inscripcionAdicional.inscripcion left join fetch inscripcionAdicional.inscripcionRequisito"
    )
    List<InscripcionAdicional> findAllWithToOneRelationships();

    @Query(
        "select inscripcionAdicional from InscripcionAdicional inscripcionAdicional left join fetch inscripcionAdicional.inscripcion left join fetch inscripcionAdicional.inscripcionRequisito where inscripcionAdicional.id =:id"
    )
    Optional<InscripcionAdicional> findOneWithToOneRelationships(@Param("id") Long id);
}
