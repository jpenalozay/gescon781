package com.creinfor.repository;

import com.creinfor.domain.Area;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Area entity.
 */
@Repository
public interface AreaRepository extends JpaRepository<Area, Long>, JpaSpecificationExecutor<Area> {
    default Optional<Area> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Area> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Area> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct area from Area area left join fetch area.sucursal left join fetch area.areaSuperior",
        countQuery = "select count(distinct area) from Area area"
    )
    Page<Area> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct area from Area area left join fetch area.sucursal left join fetch area.areaSuperior")
    List<Area> findAllWithToOneRelationships();

    @Query("select area from Area area left join fetch area.sucursal left join fetch area.areaSuperior where area.id =:id")
    Optional<Area> findOneWithToOneRelationships(@Param("id") Long id);
}
