package com.creinfor.repository;

import com.creinfor.domain.AlumnoClases;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AlumnoClases entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlumnoClasesRepository extends JpaRepository<AlumnoClases, Long>, JpaSpecificationExecutor<AlumnoClases> {}
