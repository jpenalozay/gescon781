package com.creinfor.repository;

import com.creinfor.domain.LicenciaCategoria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LicenciaCategoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LicenciaCategoriaRepository extends JpaRepository<LicenciaCategoria, Long>, JpaSpecificationExecutor<LicenciaCategoria> {}
