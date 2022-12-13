package com.creinfor.repository;

import com.creinfor.domain.SucursalSerie;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SucursalSerie entity.
 */
@Repository
public interface SucursalSerieRepository extends JpaRepository<SucursalSerie, Long>, JpaSpecificationExecutor<SucursalSerie> {
    default Optional<SucursalSerie> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<SucursalSerie> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<SucursalSerie> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct sucursalSerie from SucursalSerie sucursalSerie left join fetch sucursalSerie.sucursal",
        countQuery = "select count(distinct sucursalSerie) from SucursalSerie sucursalSerie"
    )
    Page<SucursalSerie> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct sucursalSerie from SucursalSerie sucursalSerie left join fetch sucursalSerie.sucursal")
    List<SucursalSerie> findAllWithToOneRelationships();

    @Query("select sucursalSerie from SucursalSerie sucursalSerie left join fetch sucursalSerie.sucursal where sucursalSerie.id =:id")
    Optional<SucursalSerie> findOneWithToOneRelationships(@Param("id") Long id);
}
