package com.creinfor.repository;

import com.creinfor.domain.HorarioCatalogo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the HorarioCatalogo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HorarioCatalogoRepository extends JpaRepository<HorarioCatalogo, Long>, JpaSpecificationExecutor<HorarioCatalogo> {}
