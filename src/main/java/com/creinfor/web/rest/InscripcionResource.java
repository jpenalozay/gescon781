package com.creinfor.web.rest;

import com.creinfor.domain.Inscripcion;
import com.creinfor.repository.InscripcionRepository;
import com.creinfor.service.InscripcionQueryService;
import com.creinfor.service.InscripcionService;
import com.creinfor.service.criteria.InscripcionCriteria;
import com.creinfor.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
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
 * REST controller for managing {@link com.creinfor.domain.Inscripcion}.
 */
@RestController
@RequestMapping("/api")
public class InscripcionResource {

    private final Logger log = LoggerFactory.getLogger(InscripcionResource.class);

    private static final String ENTITY_NAME = "inscripcion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InscripcionService inscripcionService;

    private final InscripcionRepository inscripcionRepository;

    private final InscripcionQueryService inscripcionQueryService;

    public InscripcionResource(
        InscripcionService inscripcionService,
        InscripcionRepository inscripcionRepository,
        InscripcionQueryService inscripcionQueryService
    ) {
        this.inscripcionService = inscripcionService;
        this.inscripcionRepository = inscripcionRepository;
        this.inscripcionQueryService = inscripcionQueryService;
    }

    /**
     * {@code POST  /inscripcions} : Create a new inscripcion.
     *
     * @param inscripcion the inscripcion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inscripcion, or with status {@code 400 (Bad Request)} if the inscripcion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inscripcions")
    public ResponseEntity<Inscripcion> createInscripcion(@Valid @RequestBody Inscripcion inscripcion) throws URISyntaxException {
        log.debug("REST request to save Inscripcion : {}", inscripcion);
        if (inscripcion.getId() != null) {
            throw new BadRequestAlertException("A new inscripcion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Inscripcion result = inscripcionService.save(inscripcion);
        return ResponseEntity
            .created(new URI("/api/inscripcions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inscripcions/:id} : Updates an existing inscripcion.
     *
     * @param id the id of the inscripcion to save.
     * @param inscripcion the inscripcion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcion,
     * or with status {@code 400 (Bad Request)} if the inscripcion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inscripcion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inscripcions/{id}")
    public ResponseEntity<Inscripcion> updateInscripcion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Inscripcion inscripcion
    ) throws URISyntaxException {
        log.debug("REST request to update Inscripcion : {}, {}", id, inscripcion);
        if (inscripcion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Inscripcion result = inscripcionService.update(inscripcion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /inscripcions/:id} : Partial updates given fields of an existing inscripcion, field will ignore if it is null
     *
     * @param id the id of the inscripcion to save.
     * @param inscripcion the inscripcion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcion,
     * or with status {@code 400 (Bad Request)} if the inscripcion is not valid,
     * or with status {@code 404 (Not Found)} if the inscripcion is not found,
     * or with status {@code 500 (Internal Server Error)} if the inscripcion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/inscripcions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Inscripcion> partialUpdateInscripcion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Inscripcion inscripcion
    ) throws URISyntaxException {
        log.debug("REST request to partial update Inscripcion partially : {}, {}", id, inscripcion);
        if (inscripcion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Inscripcion> result = inscripcionService.partialUpdate(inscripcion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcion.getId().toString())
        );
    }

    /**
     * {@code GET  /inscripcions} : get all the inscripcions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inscripcions in body.
     */
    @GetMapping("/inscripcions")
    public ResponseEntity<List<Inscripcion>> getAllInscripcions(InscripcionCriteria criteria) {
        log.debug("REST request to get Inscripcions by criteria: {}", criteria);
        List<Inscripcion> entityList = inscripcionQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /inscripcions/count} : count all the inscripcions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/inscripcions/count")
    public ResponseEntity<Long> countInscripcions(InscripcionCriteria criteria) {
        log.debug("REST request to count Inscripcions by criteria: {}", criteria);
        return ResponseEntity.ok().body(inscripcionQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /inscripcions/:id} : get the "id" inscripcion.
     *
     * @param id the id of the inscripcion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inscripcion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inscripcions/{id}")
    public ResponseEntity<Inscripcion> getInscripcion(@PathVariable Long id) {
        log.debug("REST request to get Inscripcion : {}", id);
        Optional<Inscripcion> inscripcion = inscripcionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(inscripcion);
    }

    /**
     * {@code DELETE  /inscripcions/:id} : delete the "id" inscripcion.
     *
     * @param id the id of the inscripcion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inscripcions/{id}")
    public ResponseEntity<Void> deleteInscripcion(@PathVariable Long id) {
        log.debug("REST request to delete Inscripcion : {}", id);
        inscripcionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
