package com.creinfor.repository;

import com.creinfor.domain.AsignaturaRequisito;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AsignaturaRequisito entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsignaturaRequisitoRepository
    extends JpaRepository<AsignaturaRequisito, Long>, JpaSpecificationExecutor<AsignaturaRequisito> {}
