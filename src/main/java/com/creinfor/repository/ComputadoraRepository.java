package com.creinfor.repository;

import com.creinfor.domain.Computadora;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Computadora entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComputadoraRepository extends JpaRepository<Computadora, Long>, JpaSpecificationExecutor<Computadora> {}
