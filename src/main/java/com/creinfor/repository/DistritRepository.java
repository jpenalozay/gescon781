package com.creinfor.repository;

import com.creinfor.domain.Distrit;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Distrit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DistritRepository extends JpaRepository<Distrit, Long>, JpaSpecificationExecutor<Distrit> {}
