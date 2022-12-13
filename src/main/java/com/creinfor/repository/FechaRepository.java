package com.creinfor.repository;

import com.creinfor.domain.Fecha;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Fecha entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FechaRepository extends JpaRepository<Fecha, Long>, JpaSpecificationExecutor<Fecha> {}
