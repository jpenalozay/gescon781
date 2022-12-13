package com.creinfor.repository;

import com.creinfor.domain.AlumnoUsuario;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AlumnoUsuario entity.
 */
@Repository
public interface AlumnoUsuarioRepository extends JpaRepository<AlumnoUsuario, Long>, JpaSpecificationExecutor<AlumnoUsuario> {
    default Optional<AlumnoUsuario> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<AlumnoUsuario> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<AlumnoUsuario> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct alumnoUsuario from AlumnoUsuario alumnoUsuario left join fetch alumnoUsuario.alumno",
        countQuery = "select count(distinct alumnoUsuario) from AlumnoUsuario alumnoUsuario"
    )
    Page<AlumnoUsuario> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct alumnoUsuario from AlumnoUsuario alumnoUsuario left join fetch alumnoUsuario.alumno")
    List<AlumnoUsuario> findAllWithToOneRelationships();

    @Query("select alumnoUsuario from AlumnoUsuario alumnoUsuario left join fetch alumnoUsuario.alumno where alumnoUsuario.id =:id")
    Optional<AlumnoUsuario> findOneWithToOneRelationships(@Param("id") Long id);
}
