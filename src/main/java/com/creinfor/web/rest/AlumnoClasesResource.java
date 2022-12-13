package com.creinfor.web.rest;

import com.creinfor.domain.AlumnoClases;
import com.creinfor.repository.AlumnoClasesRepository;
import com.creinfor.service.AlumnoClasesQueryService;
import com.creinfor.service.AlumnoClasesService;
import com.creinfor.service.criteria.AlumnoClasesCriteria;
import com.creinfor.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.creinfor.domain.AlumnoClases}.
 */
@RestController
@RequestMapping("/api")
public class AlumnoClasesResource {

    private final Logger log = LoggerFactory.getLogger(AlumnoClasesResource.class);

    private static final String ENTITY_NAME = "alumnoClases";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlumnoClasesService alumnoClasesService;

    private final AlumnoClasesRepository alumnoClasesRepository;

    private final AlumnoClasesQueryService alumnoClasesQueryService;

    public AlumnoClasesResource(
        AlumnoClasesService alumnoClasesService,
        AlumnoClasesRepository alumnoClasesRepository,
        AlumnoClasesQueryService alumnoClasesQueryService
    ) {
        this.alumnoClasesService = alumnoClasesService;
        this.alumnoClasesRepository = alumnoClasesRepository;
        this.alumnoClasesQueryService = alumnoClasesQueryService;
    }

    /**
     * {@code POST  /alumno-clases} : Create a new alumnoClases.
     *
     * @param alumnoClases the alumnoClases to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alumnoClases, or with status {@code 400 (Bad Request)} if the alumnoClases has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/alumno-clases")
    public ResponseEntity<AlumnoClases> createAlumnoClases(@RequestBody AlumnoClases alumnoClases) throws URISyntaxException {
        log.debug("REST request to save AlumnoClases : {}", alumnoClases);
        if (alumnoClases.getId() != null) {
            throw new BadRequestAlertException("A new alumnoClases cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlumnoClases result = alumnoClasesService.save(alumnoClases);
        return ResponseEntity
            .created(new URI("/api/alumno-clases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /alumno-clases/:id} : Updates an existing alumnoClases.
     *
     * @param id the id of the alumnoClases to save.
     * @param alumnoClases the alumnoClases to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alumnoClases,
     * or with status {@code 400 (Bad Request)} if the alumnoClases is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alumnoClases couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/alumno-clases/{id}")
    public ResponseEntity<AlumnoClases> updateAlumnoClases(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AlumnoClases alumnoClases
    ) throws URISyntaxException {
        log.debug("REST request to update AlumnoClases : {}, {}", id, alumnoClases);
        if (alumnoClases.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alumnoClases.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alumnoClasesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AlumnoClases result = alumnoClasesService.update(alumnoClases);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alumnoClases.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /alumno-clases/:id} : Partial updates given fields of an existing alumnoClases, field will ignore if it is null
     *
     * @param id the id of the alumnoClases to save.
     * @param alumnoClases the alumnoClases to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alumnoClases,
     * or with status {@code 400 (Bad Request)} if the alumnoClases is not valid,
     * or with status {@code 404 (Not Found)} if the alumnoClases is not found,
     * or with status {@code 500 (Internal Server Error)} if the alumnoClases couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/alumno-clases/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AlumnoClases> partialUpdateAlumnoClases(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AlumnoClases alumnoClases
    ) throws URISyntaxException {
        log.debug("REST request to partial update AlumnoClases partially : {}, {}", id, alumnoClases);
        if (alumnoClases.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alumnoClases.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alumnoClasesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AlumnoClases> result = alumnoClasesService.partialUpdate(alumnoClases);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alumnoClases.getId().toString())
        );
    }

    /**
     * {@code GET  /alumno-clases} : get all the alumnoClases.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alumnoClases in body.
     */
    @GetMapping("/alumno-clases")
    public ResponseEntity<List<AlumnoClases>> getAllAlumnoClases(AlumnoClasesCriteria criteria) {
        log.debug("REST request to get AlumnoClases by criteria: {}", criteria);
        List<AlumnoClases> entityList = alumnoClasesQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /alumno-clases/count} : count all the alumnoClases.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/alumno-clases/count")
    public ResponseEntity<Long> countAlumnoClases(AlumnoClasesCriteria criteria) {
        log.debug("REST request to count AlumnoClases by criteria: {}", criteria);
        return ResponseEntity.ok().body(alumnoClasesQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /alumno-clases/:id} : get the "id" alumnoClases.
     *
     * @param id the id of the alumnoClases to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alumnoClases, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/alumno-clases/{id}")
    public ResponseEntity<AlumnoClases> getAlumnoClases(@PathVariable Long id) {
        log.debug("REST request to get AlumnoClases : {}", id);
        Optional<AlumnoClases> alumnoClases = alumnoClasesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(alumnoClases);
    }

    /**
     * {@code DELETE  /alumno-clases/:id} : delete the "id" alumnoClases.
     *
     * @param id the id of the alumnoClases to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/alumno-clases/{id}")
    public ResponseEntity<Void> deleteAlumnoClases(@PathVariable Long id) {
        log.debug("REST request to delete AlumnoClases : {}", id);
        alumnoClasesService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
