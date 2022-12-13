package com.creinfor.web.rest;

import com.creinfor.domain.AlumnoDesarrollo;
import com.creinfor.repository.AlumnoDesarrolloRepository;
import com.creinfor.service.AlumnoDesarrolloQueryService;
import com.creinfor.service.AlumnoDesarrolloService;
import com.creinfor.service.criteria.AlumnoDesarrolloCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.AlumnoDesarrollo}.
 */
@RestController
@RequestMapping("/api")
public class AlumnoDesarrolloResource {

    private final Logger log = LoggerFactory.getLogger(AlumnoDesarrolloResource.class);

    private static final String ENTITY_NAME = "alumnoDesarrollo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlumnoDesarrolloService alumnoDesarrolloService;

    private final AlumnoDesarrolloRepository alumnoDesarrolloRepository;

    private final AlumnoDesarrolloQueryService alumnoDesarrolloQueryService;

    public AlumnoDesarrolloResource(
        AlumnoDesarrolloService alumnoDesarrolloService,
        AlumnoDesarrolloRepository alumnoDesarrolloRepository,
        AlumnoDesarrolloQueryService alumnoDesarrolloQueryService
    ) {
        this.alumnoDesarrolloService = alumnoDesarrolloService;
        this.alumnoDesarrolloRepository = alumnoDesarrolloRepository;
        this.alumnoDesarrolloQueryService = alumnoDesarrolloQueryService;
    }

    /**
     * {@code POST  /alumno-desarrollos} : Create a new alumnoDesarrollo.
     *
     * @param alumnoDesarrollo the alumnoDesarrollo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alumnoDesarrollo, or with status {@code 400 (Bad Request)} if the alumnoDesarrollo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/alumno-desarrollos")
    public ResponseEntity<AlumnoDesarrollo> createAlumnoDesarrollo(@Valid @RequestBody AlumnoDesarrollo alumnoDesarrollo)
        throws URISyntaxException {
        log.debug("REST request to save AlumnoDesarrollo : {}", alumnoDesarrollo);
        if (alumnoDesarrollo.getId() != null) {
            throw new BadRequestAlertException("A new alumnoDesarrollo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlumnoDesarrollo result = alumnoDesarrolloService.save(alumnoDesarrollo);
        return ResponseEntity
            .created(new URI("/api/alumno-desarrollos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /alumno-desarrollos/:id} : Updates an existing alumnoDesarrollo.
     *
     * @param id the id of the alumnoDesarrollo to save.
     * @param alumnoDesarrollo the alumnoDesarrollo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alumnoDesarrollo,
     * or with status {@code 400 (Bad Request)} if the alumnoDesarrollo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alumnoDesarrollo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/alumno-desarrollos/{id}")
    public ResponseEntity<AlumnoDesarrollo> updateAlumnoDesarrollo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AlumnoDesarrollo alumnoDesarrollo
    ) throws URISyntaxException {
        log.debug("REST request to update AlumnoDesarrollo : {}, {}", id, alumnoDesarrollo);
        if (alumnoDesarrollo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alumnoDesarrollo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alumnoDesarrolloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AlumnoDesarrollo result = alumnoDesarrolloService.update(alumnoDesarrollo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alumnoDesarrollo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /alumno-desarrollos/:id} : Partial updates given fields of an existing alumnoDesarrollo, field will ignore if it is null
     *
     * @param id the id of the alumnoDesarrollo to save.
     * @param alumnoDesarrollo the alumnoDesarrollo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alumnoDesarrollo,
     * or with status {@code 400 (Bad Request)} if the alumnoDesarrollo is not valid,
     * or with status {@code 404 (Not Found)} if the alumnoDesarrollo is not found,
     * or with status {@code 500 (Internal Server Error)} if the alumnoDesarrollo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/alumno-desarrollos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AlumnoDesarrollo> partialUpdateAlumnoDesarrollo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AlumnoDesarrollo alumnoDesarrollo
    ) throws URISyntaxException {
        log.debug("REST request to partial update AlumnoDesarrollo partially : {}, {}", id, alumnoDesarrollo);
        if (alumnoDesarrollo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alumnoDesarrollo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alumnoDesarrolloRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AlumnoDesarrollo> result = alumnoDesarrolloService.partialUpdate(alumnoDesarrollo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alumnoDesarrollo.getId().toString())
        );
    }

    /**
     * {@code GET  /alumno-desarrollos} : get all the alumnoDesarrollos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alumnoDesarrollos in body.
     */
    @GetMapping("/alumno-desarrollos")
    public ResponseEntity<List<AlumnoDesarrollo>> getAllAlumnoDesarrollos(AlumnoDesarrolloCriteria criteria) {
        log.debug("REST request to get AlumnoDesarrollos by criteria: {}", criteria);
        List<AlumnoDesarrollo> entityList = alumnoDesarrolloQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /alumno-desarrollos/count} : count all the alumnoDesarrollos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/alumno-desarrollos/count")
    public ResponseEntity<Long> countAlumnoDesarrollos(AlumnoDesarrolloCriteria criteria) {
        log.debug("REST request to count AlumnoDesarrollos by criteria: {}", criteria);
        return ResponseEntity.ok().body(alumnoDesarrolloQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /alumno-desarrollos/:id} : get the "id" alumnoDesarrollo.
     *
     * @param id the id of the alumnoDesarrollo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alumnoDesarrollo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/alumno-desarrollos/{id}")
    public ResponseEntity<AlumnoDesarrollo> getAlumnoDesarrollo(@PathVariable Long id) {
        log.debug("REST request to get AlumnoDesarrollo : {}", id);
        Optional<AlumnoDesarrollo> alumnoDesarrollo = alumnoDesarrolloService.findOne(id);
        return ResponseUtil.wrapOrNotFound(alumnoDesarrollo);
    }

    /**
     * {@code DELETE  /alumno-desarrollos/:id} : delete the "id" alumnoDesarrollo.
     *
     * @param id the id of the alumnoDesarrollo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/alumno-desarrollos/{id}")
    public ResponseEntity<Void> deleteAlumnoDesarrollo(@PathVariable Long id) {
        log.debug("REST request to delete AlumnoDesarrollo : {}", id);
        alumnoDesarrolloService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
