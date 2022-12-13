package com.creinfor.repository;

import com.creinfor.domain.AsignaturaAdiciones;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AsignaturaAdiciones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsignaturaAdicionesRepository
    extends JpaRepository<AsignaturaAdiciones, Long>, JpaSpecificationExecutor<AsignaturaAdiciones> {}
