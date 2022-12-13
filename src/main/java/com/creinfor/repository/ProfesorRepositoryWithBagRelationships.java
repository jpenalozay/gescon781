package com.creinfor.repository;

import com.creinfor.domain.Profesor;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface ProfesorRepositoryWithBagRelationships {
    Optional<Profesor> fetchBagRelationships(Optional<Profesor> profesor);

    List<Profesor> fetchBagRelationships(List<Profesor> profesors);

    Page<Profesor> fetchBagRelationships(Page<Profesor> profesors);
}
