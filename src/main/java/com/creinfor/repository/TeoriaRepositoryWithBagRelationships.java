package com.creinfor.repository;

import com.creinfor.domain.Teoria;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface TeoriaRepositoryWithBagRelationships {
    Optional<Teoria> fetchBagRelationships(Optional<Teoria> teoria);

    List<Teoria> fetchBagRelationships(List<Teoria> teorias);

    Page<Teoria> fetchBagRelationships(Page<Teoria> teorias);
}
