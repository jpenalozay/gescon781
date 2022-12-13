package com.creinfor.web.rest;

import com.creinfor.domain.Distrit;
import com.creinfor.repository.DistritRepository;
import com.creinfor.service.DistritQueryService;
import com.creinfor.service.DistritService;
import com.creinfor.service.criteria.DistritCriteria;
import com.creinfor.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.creinfor.domain.Distrit}.
 */
@RestController
@RequestMapping("/api")
public class DistritResource {

    private final Logger log = LoggerFactory.getLogger(DistritResource.class);

    private final DistritService distritService;

    private final DistritRepository distritRepository;

    private final DistritQueryService distritQueryService;

    public DistritResource(DistritService distritService, DistritRepository distritRepository, DistritQueryService distritQueryService) {
        this.distritService = distritService;
        this.distritRepository = distritRepository;
        this.distritQueryService = distritQueryService;
    }

    /**
     * {@code GET  /distrits} : get all the distrits.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of distrits in body.
     */
    @GetMapping("/distrits")
    public ResponseEntity<List<Distrit>> getAllDistrits(DistritCriteria criteria) {
        log.debug("REST request to get Distrits by criteria: {}", criteria);
        List<Distrit> entityList = distritQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /distrits/count} : count all the distrits.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/distrits/count")
    public ResponseEntity<Long> countDistrits(DistritCriteria criteria) {
        log.debug("REST request to count Distrits by criteria: {}", criteria);
        return ResponseEntity.ok().body(distritQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /distrits/:id} : get the "id" distrit.
     *
     * @param id the id of the distrit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the distrit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/distrits/{id}")
    public ResponseEntity<Distrit> getDistrit(@PathVariable Long id) {
        log.debug("REST request to get Distrit : {}", id);
        Optional<Distrit> distrit = distritService.findOne(id);
        return ResponseUtil.wrapOrNotFound(distrit);
    }
}
