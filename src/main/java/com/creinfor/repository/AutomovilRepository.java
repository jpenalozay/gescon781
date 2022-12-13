package com.creinfor.repository;

import com.creinfor.domain.Automovil;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Automovil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutomovilRepository extends JpaRepository<Automovil, Long>, JpaSpecificationExecutor<Automovil> {}
