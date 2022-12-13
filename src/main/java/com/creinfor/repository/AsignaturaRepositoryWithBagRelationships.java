package com.creinfor.repository;

import com.creinfor.domain.Asignatura;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface AsignaturaRepositoryWithBagRelationships {
    Optional<Asignatura> fetchBagRelationships(Optional<Asignatura> asignatura);

    List<Asignatura> fetchBagRelationships(List<Asignatura> asignaturas);

    Page<Asignatura> fetchBagRelationships(Page<Asignatura> asignaturas);
}
