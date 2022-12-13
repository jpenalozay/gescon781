package com.creinfor.repository;

import com.creinfor.domain.ProgramacionDeshabilitacion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface ProgramacionDeshabilitacionRepositoryWithBagRelationships {
    Optional<ProgramacionDeshabilitacion> fetchBagRelationships(Optional<ProgramacionDeshabilitacion> programacionDeshabilitacion);

    List<ProgramacionDeshabilitacion> fetchBagRelationships(List<ProgramacionDeshabilitacion> programacionDeshabilitacions);

    Page<ProgramacionDeshabilitacion> fetchBagRelationships(Page<ProgramacionDeshabilitacion> programacionDeshabilitacions);
}
