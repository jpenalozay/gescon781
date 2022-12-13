package com.creinfor.repository;

import com.creinfor.domain.AlumnoDesarrollo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AlumnoDesarrollo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlumnoDesarrolloRepository extends JpaRepository<AlumnoDesarrollo, Long>, JpaSpecificationExecutor<AlumnoDesarrollo> {}
