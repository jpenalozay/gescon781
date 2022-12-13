package com.creinfor.repository;

import com.creinfor.domain.Programacion;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface ProgramacionRepositoryWithBagRelationships {
    Optional<Programacion> fetchBagRelationships(Optional<Programacion> programacion);

    List<Programacion> fetchBagRelationships(List<Programacion> programacions);

    Page<Programacion> fetchBagRelationships(Page<Programacion> programacions);
}
