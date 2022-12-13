package com.creinfor.repository;

import com.creinfor.domain.Sucursal;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Sucursal entity.
 */
@Repository
public interface SucursalRepository extends JpaRepository<Sucursal, Long>, JpaSpecificationExecutor<Sucursal> {
    default Optional<Sucursal> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Sucursal> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Sucursal> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct sucursal from Sucursal sucursal left join fetch sucursal.distrito",
        countQuery = "select count(distinct sucursal) from Sucursal sucursal"
    )
    Page<Sucursal> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct sucursal from Sucursal sucursal left join fetch sucursal.distrito")
    List<Sucursal> findAllWithToOneRelationships();

    @Query("select sucursal from Sucursal sucursal left join fetch sucursal.distrito where sucursal.id =:id")
    Optional<Sucursal> findOneWithToOneRelationships(@Param("id") Long id);
}
