package com.creinfor.repository;

import com.creinfor.domain.Cargo;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Cargo entity.
 */
@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long>, JpaSpecificationExecutor<Cargo> {
    default Optional<Cargo> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Cargo> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Cargo> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct cargo from Cargo cargo left join fetch cargo.areaPerteneciente left join fetch cargo.cargoSuperior",
        countQuery = "select count(distinct cargo) from Cargo cargo"
    )
    Page<Cargo> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct cargo from Cargo cargo left join fetch cargo.areaPerteneciente left join fetch cargo.cargoSuperior")
    List<Cargo> findAllWithToOneRelationships();

    @Query("select cargo from Cargo cargo left join fetch cargo.areaPerteneciente left join fetch cargo.cargoSuperior where cargo.id =:id")
    Optional<Cargo> findOneWithToOneRelationships(@Param("id") Long id);
}
