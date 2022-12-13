package com.creinfor.repository;

import com.creinfor.domain.Inscripcion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Inscripcion entity.
 */
@Repository
public interface InscripcionRepository extends JpaRepository<Inscripcion, Long>, JpaSpecificationExecutor<Inscripcion> {
    default Optional<Inscripcion> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Inscripcion> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Inscripcion> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct inscripcion from Inscripcion inscripcion left join fetch inscripcion.alumno",
        countQuery = "select count(distinct inscripcion) from Inscripcion inscripcion"
    )
    Page<Inscripcion> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct inscripcion from Inscripcion inscripcion left join fetch inscripcion.alumno")
    List<Inscripcion> findAllWithToOneRelationships();

    @Query("select inscripcion from Inscripcion inscripcion left join fetch inscripcion.alumno where inscripcion.id =:id")
    Optional<Inscripcion> findOneWithToOneRelationships(@Param("id") Long id);
}
