package com.creinfor.web.rest;

import com.creinfor.domain.RequisitosInscripcion;
import com.creinfor.repository.RequisitosInscripcionRepository;
import com.creinfor.service.RequisitosInscripcionQueryService;
import com.creinfor.service.RequisitosInscripcionService;
import com.creinfor.service.criteria.RequisitosInscripcionCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.RequisitosInscripcion}.
 */
@RestController
@RequestMapping("/api")
public class RequisitosInscripcionResource {

    private final Logger log = LoggerFactory.getLogger(RequisitosInscripcionResource.class);

    private static final String ENTITY_NAME = "requisitosInscripcion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RequisitosInscripcionService requisitosInscripcionService;

    private final RequisitosInscripcionRepository requisitosInscripcionRepository;

    private final RequisitosInscripcionQueryService requisitosInscripcionQueryService;

    public RequisitosInscripcionResource(
        RequisitosInscripcionService requisitosInscripcionService,
        RequisitosInscripcionRepository requisitosInscripcionRepository,
        RequisitosInscripcionQueryService requisitosInscripcionQueryService
    ) {
        this.requisitosInscripcionService = requisitosInscripcionService;
        this.requisitosInscripcionRepository = requisitosInscripcionRepository;
        this.requisitosInscripcionQueryService = requisitosInscripcionQueryService;
    }

    /**
     * {@code POST  /requisitos-inscripcions} : Create a new requisitosInscripcion.
     *
     * @param requisitosInscripcion the requisitosInscripcion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new requisitosInscripcion, or with status {@code 400 (Bad Request)} if the requisitosInscripcion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/requisitos-inscripcions")
    public ResponseEntity<RequisitosInscripcion> createRequisitosInscripcion(
        @Valid @RequestBody RequisitosInscripcion requisitosInscripcion
    ) throws URISyntaxException {
        log.debug("REST request to save RequisitosInscripcion : {}", requisitosInscripcion);
        if (requisitosInscripcion.getId() != null) {
            throw new BadRequestAlertException("A new requisitosInscripcion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RequisitosInscripcion result = requisitosInscripcionService.save(requisitosInscripcion);
        return ResponseEntity
            .created(new URI("/api/requisitos-inscripcions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /requisitos-inscripcions/:id} : Updates an existing requisitosInscripcion.
     *
     * @param id the id of the requisitosInscripcion to save.
     * @param requisitosInscripcion the requisitosInscripcion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated requisitosInscripcion,
     * or with status {@code 400 (Bad Request)} if the requisitosInscripcion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the requisitosInscripcion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/requisitos-inscripcions/{id}")
    public ResponseEntity<RequisitosInscripcion> updateRequisitosInscripcion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody RequisitosInscripcion requisitosInscripcion
    ) throws URISyntaxException {
        log.debug("REST request to update RequisitosInscripcion : {}, {}", id, requisitosInscripcion);
        if (requisitosInscripcion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, requisitosInscripcion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!requisitosInscripcionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        RequisitosInscripcion result = requisitosInscripcionService.update(requisitosInscripcion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, requisitosInscripcion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /requisitos-inscripcions/:id} : Partial updates given fields of an existing requisitosInscripcion, field will ignore if it is null
     *
     * @param id the id of the requisitosInscripcion to save.
     * @param requisitosInscripcion the requisitosInscripcion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated requisitosInscripcion,
     * or with status {@code 400 (Bad Request)} if the requisitosInscripcion is not valid,
     * or with status {@code 404 (Not Found)} if the requisitosInscripcion is not found,
     * or with status {@code 500 (Internal Server Error)} if the requisitosInscripcion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/requisitos-inscripcions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<RequisitosInscripcion> partialUpdateRequisitosInscripcion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody RequisitosInscripcion requisitosInscripcion
    ) throws URISyntaxException {
        log.debug("REST request to partial update RequisitosInscripcion partially : {}, {}", id, requisitosInscripcion);
        if (requisitosInscripcion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, requisitosInscripcion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!requisitosInscripcionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<RequisitosInscripcion> result = requisitosInscripcionService.partialUpdate(requisitosInscripcion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, requisitosInscripcion.getId().toString())
        );
    }

    /**
     * {@code GET  /requisitos-inscripcions} : get all the requisitosInscripcions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of requisitosInscripcions in body.
     */
    @GetMapping("/requisitos-inscripcions")
    public ResponseEntity<List<RequisitosInscripcion>> getAllRequisitosInscripcions(RequisitosInscripcionCriteria criteria) {
        log.debug("REST request to get RequisitosInscripcions by criteria: {}", criteria);
        List<RequisitosInscripcion> entityList = requisitosInscripcionQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /requisitos-inscripcions/count} : count all the requisitosInscripcions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/requisitos-inscripcions/count")
    public ResponseEntity<Long> countRequisitosInscripcions(RequisitosInscripcionCriteria criteria) {
        log.debug("REST request to count RequisitosInscripcions by criteria: {}", criteria);
        return ResponseEntity.ok().body(requisitosInscripcionQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /requisitos-inscripcions/:id} : get the "id" requisitosInscripcion.
     *
     * @param id the id of the requisitosInscripcion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the requisitosInscripcion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/requisitos-inscripcions/{id}")
    public ResponseEntity<RequisitosInscripcion> getRequisitosInscripcion(@PathVariable Long id) {
        log.debug("REST request to get RequisitosInscripcion : {}", id);
        Optional<RequisitosInscripcion> requisitosInscripcion = requisitosInscripcionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(requisitosInscripcion);
    }

    /**
     * {@code DELETE  /requisitos-inscripcions/:id} : delete the "id" requisitosInscripcion.
     *
     * @param id the id of the requisitosInscripcion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/requisitos-inscripcions/{id}")
    public ResponseEntity<Void> deleteRequisitosInscripcion(@PathVariable Long id) {
        log.debug("REST request to delete RequisitosInscripcion : {}", id);
        requisitosInscripcionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
