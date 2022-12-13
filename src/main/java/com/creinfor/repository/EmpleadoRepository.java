package com.creinfor.repository;

import com.creinfor.domain.Empleado;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Empleado entity.
 */
@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long>, JpaSpecificationExecutor<Empleado> {
    default Optional<Empleado> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Empleado> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Empleado> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct empleado from Empleado empleado left join fetch empleado.persona left join fetch empleado.cargo",
        countQuery = "select count(distinct empleado) from Empleado empleado"
    )
    Page<Empleado> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct empleado from Empleado empleado left join fetch empleado.persona left join fetch empleado.cargo")
    List<Empleado> findAllWithToOneRelationships();

    @Query("select empleado from Empleado empleado left join fetch empleado.persona left join fetch empleado.cargo where empleado.id =:id")
    Optional<Empleado> findOneWithToOneRelationships(@Param("id") Long id);
}
