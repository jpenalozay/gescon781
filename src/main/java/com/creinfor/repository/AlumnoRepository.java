package com.creinfor.repository;

import com.creinfor.domain.Alumno;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Alumno entity.
 */
@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long>, JpaSpecificationExecutor<Alumno> {
    default Optional<Alumno> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Alumno> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Alumno> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct alumno from Alumno alumno left join fetch alumno.persona left join fetch alumno.alumnoClases",
        countQuery = "select count(distinct alumno) from Alumno alumno"
    )
    Page<Alumno> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct alumno from Alumno alumno left join fetch alumno.persona left join fetch alumno.alumnoClases")
    List<Alumno> findAllWithToOneRelationships();

    @Query("select alumno from Alumno alumno left join fetch alumno.persona left join fetch alumno.alumnoClases where alumno.id =:id")
    Optional<Alumno> findOneWithToOneRelationships(@Param("id") Long id);
}
