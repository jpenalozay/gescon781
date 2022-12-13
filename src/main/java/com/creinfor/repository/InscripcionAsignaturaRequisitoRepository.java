package com.creinfor.repository;

import com.creinfor.domain.InscripcionAsignaturaRequisito;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the InscripcionAsignaturaRequisito entity.
 */
@Repository
public interface InscripcionAsignaturaRequisitoRepository
    extends JpaRepository<InscripcionAsignaturaRequisito, Long>, JpaSpecificationExecutor<InscripcionAsignaturaRequisito> {
    default Optional<InscripcionAsignaturaRequisito> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<InscripcionAsignaturaRequisito> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<InscripcionAsignaturaRequisito> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct inscripcionAsignaturaRequisito from InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito left join fetch inscripcionAsignaturaRequisito.inscripcionDetalle left join fetch inscripcionAsignaturaRequisito.asignaturaRequisito",
        countQuery = "select count(distinct inscripcionAsignaturaRequisito) from InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito"
    )
    Page<InscripcionAsignaturaRequisito> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct inscripcionAsignaturaRequisito from InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito left join fetch inscripcionAsignaturaRequisito.inscripcionDetalle left join fetch inscripcionAsignaturaRequisito.asignaturaRequisito"
    )
    List<InscripcionAsignaturaRequisito> findAllWithToOneRelationships();

    @Query(
        "select inscripcionAsignaturaRequisito from InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito left join fetch inscripcionAsignaturaRequisito.inscripcionDetalle left join fetch inscripcionAsignaturaRequisito.asignaturaRequisito where inscripcionAsignaturaRequisito.id =:id"
    )
    Optional<InscripcionAsignaturaRequisito> findOneWithToOneRelationships(@Param("id") Long id);
}
