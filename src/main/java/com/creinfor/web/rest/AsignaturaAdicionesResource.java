package com.creinfor.web.rest;

import com.creinfor.domain.AsignaturaAdiciones;
import com.creinfor.repository.AsignaturaAdicionesRepository;
import com.creinfor.service.AsignaturaAdicionesQueryService;
import com.creinfor.service.AsignaturaAdicionesService;
import com.creinfor.service.criteria.AsignaturaAdicionesCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.AsignaturaAdiciones}.
 */
@RestController
@RequestMapping("/api")
public class AsignaturaAdicionesResource {

    private final Logger log = LoggerFactory.getLogger(AsignaturaAdicionesResource.class);

    private static final String ENTITY_NAME = "asignaturaAdiciones";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsignaturaAdicionesService asignaturaAdicionesService;

    private final AsignaturaAdicionesRepository asignaturaAdicionesRepository;

    private final AsignaturaAdicionesQueryService asignaturaAdicionesQueryService;

    public AsignaturaAdicionesResource(
        AsignaturaAdicionesService asignaturaAdicionesService,
        AsignaturaAdicionesRepository asignaturaAdicionesRepository,
        AsignaturaAdicionesQueryService asignaturaAdicionesQueryService
    ) {
        this.asignaturaAdicionesService = asignaturaAdicionesService;
        this.asignaturaAdicionesRepository = asignaturaAdicionesRepository;
        this.asignaturaAdicionesQueryService = asignaturaAdicionesQueryService;
    }

    /**
     * {@code POST  /asignatura-adiciones} : Create a new asignaturaAdiciones.
     *
     * @param asignaturaAdiciones the asignaturaAdiciones to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asignaturaAdiciones, or with status {@code 400 (Bad Request)} if the asignaturaAdiciones has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asignatura-adiciones")
    public ResponseEntity<AsignaturaAdiciones> createAsignaturaAdiciones(@Valid @RequestBody AsignaturaAdiciones asignaturaAdiciones)
        throws URISyntaxException {
        log.debug("REST request to save AsignaturaAdiciones : {}", asignaturaAdiciones);
        if (asignaturaAdiciones.getId() != null) {
            throw new BadRequestAlertException("A new asignaturaAdiciones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AsignaturaAdiciones result = asignaturaAdicionesService.save(asignaturaAdiciones);
        return ResponseEntity
            .created(new URI("/api/asignatura-adiciones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asignatura-adiciones/:id} : Updates an existing asignaturaAdiciones.
     *
     * @param id the id of the asignaturaAdiciones to save.
     * @param asignaturaAdiciones the asignaturaAdiciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asignaturaAdiciones,
     * or with status {@code 400 (Bad Request)} if the asignaturaAdiciones is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asignaturaAdiciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asignatura-adiciones/{id}")
    public ResponseEntity<AsignaturaAdiciones> updateAsignaturaAdiciones(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AsignaturaAdiciones asignaturaAdiciones
    ) throws URISyntaxException {
        log.debug("REST request to update AsignaturaAdiciones : {}, {}", id, asignaturaAdiciones);
        if (asignaturaAdiciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, asignaturaAdiciones.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!asignaturaAdicionesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AsignaturaAdiciones result = asignaturaAdicionesService.update(asignaturaAdiciones);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asignaturaAdiciones.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /asignatura-adiciones/:id} : Partial updates given fields of an existing asignaturaAdiciones, field will ignore if it is null
     *
     * @param id the id of the asignaturaAdiciones to save.
     * @param asignaturaAdiciones the asignaturaAdiciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asignaturaAdiciones,
     * or with status {@code 400 (Bad Request)} if the asignaturaAdiciones is not valid,
     * or with status {@code 404 (Not Found)} if the asignaturaAdiciones is not found,
     * or with status {@code 500 (Internal Server Error)} if the asignaturaAdiciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/asignatura-adiciones/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AsignaturaAdiciones> partialUpdateAsignaturaAdiciones(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AsignaturaAdiciones asignaturaAdiciones
    ) throws URISyntaxException {
        log.debug("REST request to partial update AsignaturaAdiciones partially : {}, {}", id, asignaturaAdiciones);
        if (asignaturaAdiciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, asignaturaAdiciones.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!asignaturaAdicionesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AsignaturaAdiciones> result = asignaturaAdicionesService.partialUpdate(asignaturaAdiciones);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asignaturaAdiciones.getId().toString())
        );
    }

    /**
     * {@code GET  /asignatura-adiciones} : get all the asignaturaAdiciones.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asignaturaAdiciones in body.
     */
    @GetMapping("/asignatura-adiciones")
    public ResponseEntity<List<AsignaturaAdiciones>> getAllAsignaturaAdiciones(AsignaturaAdicionesCriteria criteria) {
        log.debug("REST request to get AsignaturaAdiciones by criteria: {}", criteria);
        List<AsignaturaAdiciones> entityList = asignaturaAdicionesQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /asignatura-adiciones/count} : count all the asignaturaAdiciones.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/asignatura-adiciones/count")
    public ResponseEntity<Long> countAsignaturaAdiciones(AsignaturaAdicionesCriteria criteria) {
        log.debug("REST request to count AsignaturaAdiciones by criteria: {}", criteria);
        return ResponseEntity.ok().body(asignaturaAdicionesQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /asignatura-adiciones/:id} : get the "id" asignaturaAdiciones.
     *
     * @param id the id of the asignaturaAdiciones to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asignaturaAdiciones, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asignatura-adiciones/{id}")
    public ResponseEntity<AsignaturaAdiciones> getAsignaturaAdiciones(@PathVariable Long id) {
        log.debug("REST request to get AsignaturaAdiciones : {}", id);
        Optional<AsignaturaAdiciones> asignaturaAdiciones = asignaturaAdicionesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(asignaturaAdiciones);
    }

    /**
     * {@code DELETE  /asignatura-adiciones/:id} : delete the "id" asignaturaAdiciones.
     *
     * @param id the id of the asignaturaAdiciones to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asignatura-adiciones/{id}")
    public ResponseEntity<Void> deleteAsignaturaAdiciones(@PathVariable Long id) {
        log.debug("REST request to delete AsignaturaAdiciones : {}", id);
        asignaturaAdicionesService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
