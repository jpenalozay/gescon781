package com.creinfor.repository;

import com.creinfor.domain.AlumnoCategoria;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AlumnoCategoria entity.
 */
@Repository
public interface AlumnoCategoriaRepository extends JpaRepository<AlumnoCategoria, Long>, JpaSpecificationExecutor<AlumnoCategoria> {
    default Optional<AlumnoCategoria> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<AlumnoCategoria> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<AlumnoCategoria> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct alumnoCategoria from AlumnoCategoria alumnoCategoria left join fetch alumnoCategoria.alumno left join fetch alumnoCategoria.categoria",
        countQuery = "select count(distinct alumnoCategoria) from AlumnoCategoria alumnoCategoria"
    )
    Page<AlumnoCategoria> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct alumnoCategoria from AlumnoCategoria alumnoCategoria left join fetch alumnoCategoria.alumno left join fetch alumnoCategoria.categoria"
    )
    List<AlumnoCategoria> findAllWithToOneRelationships();

    @Query(
        "select alumnoCategoria from AlumnoCategoria alumnoCategoria left join fetch alumnoCategoria.alumno left join fetch alumnoCategoria.categoria where alumnoCategoria.id =:id"
    )
    Optional<AlumnoCategoria> findOneWithToOneRelationships(@Param("id") Long id);
}
