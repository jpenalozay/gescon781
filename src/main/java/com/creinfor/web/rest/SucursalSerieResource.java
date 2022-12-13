package com.creinfor.web.rest;

import com.creinfor.domain.SucursalSerie;
import com.creinfor.repository.SucursalSerieRepository;
import com.creinfor.service.SucursalSerieQueryService;
import com.creinfor.service.SucursalSerieService;
import com.creinfor.service.criteria.SucursalSerieCriteria;
import com.creinfor.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.creinfor.domain.SucursalSerie}.
 */
@RestController
@RequestMapping("/api")
public class SucursalSerieResource {

    private final Logger log = LoggerFactory.getLogger(SucursalSerieResource.class);

    private static final String ENTITY_NAME = "sucursalSerie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SucursalSerieService sucursalSerieService;

    private final SucursalSerieRepository sucursalSerieRepository;

    private final SucursalSerieQueryService sucursalSerieQueryService;

    public SucursalSerieResource(
        SucursalSerieService sucursalSerieService,
        SucursalSerieRepository sucursalSerieRepository,
        SucursalSerieQueryService sucursalSerieQueryService
    ) {
        this.sucursalSerieService = sucursalSerieService;
        this.sucursalSerieRepository = sucursalSerieRepository;
        this.sucursalSerieQueryService = sucursalSerieQueryService;
    }

    /**
     * {@code POST  /sucursal-series} : Create a new sucursalSerie.
     *
     * @param sucursalSerie the sucursalSerie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sucursalSerie, or with status {@code 400 (Bad Request)} if the sucursalSerie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sucursal-series")
    public ResponseEntity<SucursalSerie> createSucursalSerie(@Valid @RequestBody SucursalSerie sucursalSerie) throws URISyntaxException {
        log.debug("REST request to save SucursalSerie : {}", sucursalSerie);
        if (sucursalSerie.getId() != null) {
            throw new BadRequestAlertException("A new sucursalSerie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SucursalSerie result = sucursalSerieService.save(sucursalSerie);
        return ResponseEntity
            .created(new URI("/api/sucursal-series/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sucursal-series/:id} : Updates an existing sucursalSerie.
     *
     * @param id the id of the sucursalSerie to save.
     * @param sucursalSerie the sucursalSerie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sucursalSerie,
     * or with status {@code 400 (Bad Request)} if the sucursalSerie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sucursalSerie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sucursal-series/{id}")
    public ResponseEntity<SucursalSerie> updateSucursalSerie(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody SucursalSerie sucursalSerie
    ) throws URISyntaxException {
        log.debug("REST request to update SucursalSerie : {}, {}", id, sucursalSerie);
        if (sucursalSerie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sucursalSerie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sucursalSerieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SucursalSerie result = sucursalSerieService.update(sucursalSerie);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sucursalSerie.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /sucursal-series/:id} : Partial updates given fields of an existing sucursalSerie, field will ignore if it is null
     *
     * @param id the id of the sucursalSerie to save.
     * @param sucursalSerie the sucursalSerie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sucursalSerie,
     * or with status {@code 400 (Bad Request)} if the sucursalSerie is not valid,
     * or with status {@code 404 (Not Found)} if the sucursalSerie is not found,
     * or with status {@code 500 (Internal Server Error)} if the sucursalSerie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/sucursal-series/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SucursalSerie> partialUpdateSucursalSerie(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody SucursalSerie sucursalSerie
    ) throws URISyntaxException {
        log.debug("REST request to partial update SucursalSerie partially : {}, {}", id, sucursalSerie);
        if (sucursalSerie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sucursalSerie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sucursalSerieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SucursalSerie> result = sucursalSerieService.partialUpdate(sucursalSerie);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sucursalSerie.getId().toString())
        );
    }

    /**
     * {@code GET  /sucursal-series} : get all the sucursalSeries.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sucursalSeries in body.
     */
    @GetMapping("/sucursal-series")
    public ResponseEntity<List<SucursalSerie>> getAllSucursalSeries(SucursalSerieCriteria criteria) {
        log.debug("REST request to get SucursalSeries by criteria: {}", criteria);
        List<SucursalSerie> entityList = sucursalSerieQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /sucursal-series/count} : count all the sucursalSeries.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/sucursal-series/count")
    public ResponseEntity<Long> countSucursalSeries(SucursalSerieCriteria criteria) {
        log.debug("REST request to count SucursalSeries by criteria: {}", criteria);
        return ResponseEntity.ok().body(sucursalSerieQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /sucursal-series/:id} : get the "id" sucursalSerie.
     *
     * @param id the id of the sucursalSerie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sucursalSerie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sucursal-series/{id}")
    public ResponseEntity<SucursalSerie> getSucursalSerie(@PathVariable Long id) {
        log.debug("REST request to get SucursalSerie : {}", id);
        Optional<SucursalSerie> sucursalSerie = sucursalSerieService.findOne(id);
        return ResponseUtil.wrapOrNotFound(sucursalSerie);
    }

    /**
     * {@code DELETE  /sucursal-series/:id} : delete the "id" sucursalSerie.
     *
     * @param id the id of the sucursalSerie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sucursal-series/{id}")
    public ResponseEntity<Void> deleteSucursalSerie(@PathVariable Long id) {
        log.debug("REST request to delete SucursalSerie : {}", id);
        sucursalSerieService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
