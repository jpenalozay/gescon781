package com.creinfor.repository;

import com.creinfor.domain.TeoriaHorarioCatalogo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the TeoriaHorarioCatalogo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeoriaHorarioCatalogoRepository
    extends JpaRepository<TeoriaHorarioCatalogo, Long>, JpaSpecificationExecutor<TeoriaHorarioCatalogo> {}
