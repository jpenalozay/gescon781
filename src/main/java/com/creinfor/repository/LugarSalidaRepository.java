package com.creinfor.repository;

import com.creinfor.domain.LugarSalida;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LugarSalida entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LugarSalidaRepository extends JpaRepository<LugarSalida, Long>, JpaSpecificationExecutor<LugarSalida> {}
