package com.creinfor.web.rest;

import com.creinfor.domain.Computadora;
import com.creinfor.repository.ComputadoraRepository;
import com.creinfor.service.ComputadoraQueryService;
import com.creinfor.service.ComputadoraService;
import com.creinfor.service.criteria.ComputadoraCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.Computadora}.
 */
@RestController
@RequestMapping("/api")
public class ComputadoraResource {

    private final Logger log = LoggerFactory.getLogger(ComputadoraResource.class);

    private static final String ENTITY_NAME = "computadora";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ComputadoraService computadoraService;

    private final ComputadoraRepository computadoraRepository;

    private final ComputadoraQueryService computadoraQueryService;

    public ComputadoraResource(
        ComputadoraService computadoraService,
        ComputadoraRepository computadoraRepository,
        ComputadoraQueryService computadoraQueryService
    ) {
        this.computadoraService = computadoraService;
        this.computadoraRepository = computadoraRepository;
        this.computadoraQueryService = computadoraQueryService;
    }

    /**
     * {@code POST  /computadoras} : Create a new computadora.
     *
     * @param computadora the computadora to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new computadora, or with status {@code 400 (Bad Request)} if the computadora has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/computadoras")
    public ResponseEntity<Computadora> createComputadora(@Valid @RequestBody Computadora computadora) throws URISyntaxException {
        log.debug("REST request to save Computadora : {}", computadora);
        if (computadora.getId() != null) {
            throw new BadRequestAlertException("A new computadora cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Computadora result = computadoraService.save(computadora);
        return ResponseEntity
            .created(new URI("/api/computadoras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /computadoras/:id} : Updates an existing computadora.
     *
     * @param id the id of the computadora to save.
     * @param computadora the computadora to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated computadora,
     * or with status {@code 400 (Bad Request)} if the computadora is not valid,
     * or with status {@code 500 (Internal Server Error)} if the computadora couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/computadoras/{id}")
    public ResponseEntity<Computadora> updateComputadora(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Computadora computadora
    ) throws URISyntaxException {
        log.debug("REST request to update Computadora : {}, {}", id, computadora);
        if (computadora.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, computadora.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!computadoraRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Computadora result = computadoraService.update(computadora);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, computadora.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /computadoras/:id} : Partial updates given fields of an existing computadora, field will ignore if it is null
     *
     * @param id the id of the computadora to save.
     * @param computadora the computadora to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated computadora,
     * or with status {@code 400 (Bad Request)} if the computadora is not valid,
     * or with status {@code 404 (Not Found)} if the computadora is not found,
     * or with status {@code 500 (Internal Server Error)} if the computadora couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/computadoras/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Computadora> partialUpdateComputadora(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Computadora computadora
    ) throws URISyntaxException {
        log.debug("REST request to partial update Computadora partially : {}, {}", id, computadora);
        if (computadora.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, computadora.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!computadoraRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Computadora> result = computadoraService.partialUpdate(computadora);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, computadora.getId().toString())
        );
    }

    /**
     * {@code GET  /computadoras} : get all the computadoras.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of computadoras in body.
     */
    @GetMapping("/computadoras")
    public ResponseEntity<List<Computadora>> getAllComputadoras(ComputadoraCriteria criteria) {
        log.debug("REST request to get Computadoras by criteria: {}", criteria);
        List<Computadora> entityList = computadoraQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /computadoras/count} : count all the computadoras.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/computadoras/count")
    public ResponseEntity<Long> countComputadoras(ComputadoraCriteria criteria) {
        log.debug("REST request to count Computadoras by criteria: {}", criteria);
        return ResponseEntity.ok().body(computadoraQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /computadoras/:id} : get the "id" computadora.
     *
     * @param id the id of the computadora to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the computadora, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/computadoras/{id}")
    public ResponseEntity<Computadora> getComputadora(@PathVariable Long id) {
        log.debug("REST request to get Computadora : {}", id);
        Optional<Computadora> computadora = computadoraService.findOne(id);
        return ResponseUtil.wrapOrNotFound(computadora);
    }

    /**
     * {@code DELETE  /computadoras/:id} : delete the "id" computadora.
     *
     * @param id the id of the computadora to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/computadoras/{id}")
    public ResponseEntity<Void> deleteComputadora(@PathVariable Long id) {
        log.debug("REST request to delete Computadora : {}", id);
        computadoraService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
