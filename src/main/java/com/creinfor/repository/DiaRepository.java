package com.creinfor.repository;

import com.creinfor.domain.Dia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Dia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiaRepository extends JpaRepository<Dia, Long>, JpaSpecificationExecutor<Dia> {}
