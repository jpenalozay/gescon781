package com.creinfor.repository;

import com.creinfor.domain.RequisitosInscripcion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the RequisitosInscripcion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequisitosInscripcionRepository
    extends JpaRepository<RequisitosInscripcion, Long>, JpaSpecificationExecutor<RequisitosInscripcion> {}
