package com.creinfor.repository;

import com.creinfor.domain.Horario;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Horario entity.
 */
@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long>, JpaSpecificationExecutor<Horario> {
    default Optional<Horario> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Horario> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Horario> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct horario from Horario horario left join fetch horario.alumno left join fetch horario.instructor left join fetch horario.programacion left join fetch horario.fecha left join fetch horario.horarioCatalogo left join fetch horario.automovil left join fetch horario.lugarSalida",
        countQuery = "select count(distinct horario) from Horario horario"
    )
    Page<Horario> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select distinct horario from Horario horario left join fetch horario.alumno left join fetch horario.instructor left join fetch horario.programacion left join fetch horario.fecha left join fetch horario.horarioCatalogo left join fetch horario.automovil left join fetch horario.lugarSalida"
    )
    List<Horario> findAllWithToOneRelationships();

    @Query(
        "select horario from Horario horario left join fetch horario.alumno left join fetch horario.instructor left join fetch horario.programacion left join fetch horario.fecha left join fetch horario.horarioCatalogo left join fetch horario.automovil left join fetch horario.lugarSalida where horario.id =:id"
    )
    Optional<Horario> findOneWithToOneRelationships(@Param("id") Long id);

    boolean existsByCodigo(String codigo);
}
