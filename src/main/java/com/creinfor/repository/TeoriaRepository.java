package com.creinfor.repository;

import com.creinfor.domain.Teoria;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Teoria entity.
 */
@Repository
public interface TeoriaRepository
    extends TeoriaRepositoryWithBagRelationships, JpaRepository<Teoria, Long>, JpaSpecificationExecutor<Teoria> {
    default Optional<Teoria> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<Teoria> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<Teoria> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }
}
