package com.creinfor.web.rest;

import com.creinfor.domain.InscripcionDetalle;
import com.creinfor.repository.InscripcionDetalleRepository;
import com.creinfor.service.InscripcionDetalleQueryService;
import com.creinfor.service.InscripcionDetalleService;
import com.creinfor.service.criteria.InscripcionDetalleCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.InscripcionDetalle}.
 */
@RestController
@RequestMapping("/api")
public class InscripcionDetalleResource {

    private final Logger log = LoggerFactory.getLogger(InscripcionDetalleResource.class);

    private static final String ENTITY_NAME = "inscripcionDetalle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InscripcionDetalleService inscripcionDetalleService;

    private final InscripcionDetalleRepository inscripcionDetalleRepository;

    private final InscripcionDetalleQueryService inscripcionDetalleQueryService;

    public InscripcionDetalleResource(
        InscripcionDetalleService inscripcionDetalleService,
        InscripcionDetalleRepository inscripcionDetalleRepository,
        InscripcionDetalleQueryService inscripcionDetalleQueryService
    ) {
        this.inscripcionDetalleService = inscripcionDetalleService;
        this.inscripcionDetalleRepository = inscripcionDetalleRepository;
        this.inscripcionDetalleQueryService = inscripcionDetalleQueryService;
    }

    /**
     * {@code POST  /inscripcion-detalles} : Create a new inscripcionDetalle.
     *
     * @param inscripcionDetalle the inscripcionDetalle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inscripcionDetalle, or with status {@code 400 (Bad Request)} if the inscripcionDetalle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inscripcion-detalles")
    public ResponseEntity<InscripcionDetalle> createInscripcionDetalle(@Valid @RequestBody InscripcionDetalle inscripcionDetalle)
        throws URISyntaxException {
        log.debug("REST request to save InscripcionDetalle : {}", inscripcionDetalle);
        if (inscripcionDetalle.getId() != null) {
            throw new BadRequestAlertException("A new inscripcionDetalle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InscripcionDetalle result = inscripcionDetalleService.save(inscripcionDetalle);
        return ResponseEntity
            .created(new URI("/api/inscripcion-detalles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inscripcion-detalles/:id} : Updates an existing inscripcionDetalle.
     *
     * @param id the id of the inscripcionDetalle to save.
     * @param inscripcionDetalle the inscripcionDetalle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcionDetalle,
     * or with status {@code 400 (Bad Request)} if the inscripcionDetalle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inscripcionDetalle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inscripcion-detalles/{id}")
    public ResponseEntity<InscripcionDetalle> updateInscripcionDetalle(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody InscripcionDetalle inscripcionDetalle
    ) throws URISyntaxException {
        log.debug("REST request to update InscripcionDetalle : {}, {}", id, inscripcionDetalle);
        if (inscripcionDetalle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcionDetalle.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionDetalleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InscripcionDetalle result = inscripcionDetalleService.update(inscripcionDetalle);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcionDetalle.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /inscripcion-detalles/:id} : Partial updates given fields of an existing inscripcionDetalle, field will ignore if it is null
     *
     * @param id the id of the inscripcionDetalle to save.
     * @param inscripcionDetalle the inscripcionDetalle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcionDetalle,
     * or with status {@code 400 (Bad Request)} if the inscripcionDetalle is not valid,
     * or with status {@code 404 (Not Found)} if the inscripcionDetalle is not found,
     * or with status {@code 500 (Internal Server Error)} if the inscripcionDetalle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/inscripcion-detalles/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InscripcionDetalle> partialUpdateInscripcionDetalle(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody InscripcionDetalle inscripcionDetalle
    ) throws URISyntaxException {
        log.debug("REST request to partial update InscripcionDetalle partially : {}, {}", id, inscripcionDetalle);
        if (inscripcionDetalle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcionDetalle.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionDetalleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InscripcionDetalle> result = inscripcionDetalleService.partialUpdate(inscripcionDetalle);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcionDetalle.getId().toString())
        );
    }

    /**
     * {@code GET  /inscripcion-detalles} : get all the inscripcionDetalles.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inscripcionDetalles in body.
     */
    @GetMapping("/inscripcion-detalles")
    public ResponseEntity<List<InscripcionDetalle>> getAllInscripcionDetalles(InscripcionDetalleCriteria criteria) {
        log.debug("REST request to get InscripcionDetalles by criteria: {}", criteria);
        List<InscripcionDetalle> entityList = inscripcionDetalleQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /inscripcion-detalles/count} : count all the inscripcionDetalles.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/inscripcion-detalles/count")
    public ResponseEntity<Long> countInscripcionDetalles(InscripcionDetalleCriteria criteria) {
        log.debug("REST request to count InscripcionDetalles by criteria: {}", criteria);
        return ResponseEntity.ok().body(inscripcionDetalleQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /inscripcion-detalles/:id} : get the "id" inscripcionDetalle.
     *
     * @param id the id of the inscripcionDetalle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inscripcionDetalle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inscripcion-detalles/{id}")
    public ResponseEntity<InscripcionDetalle> getInscripcionDetalle(@PathVariable Long id) {
        log.debug("REST request to get InscripcionDetalle : {}", id);
        Optional<InscripcionDetalle> inscripcionDetalle = inscripcionDetalleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(inscripcionDetalle);
    }

    /**
     * {@code DELETE  /inscripcion-detalles/:id} : delete the "id" inscripcionDetalle.
     *
     * @param id the id of the inscripcionDetalle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inscripcion-detalles/{id}")
    public ResponseEntity<Void> deleteInscripcionDetalle(@PathVariable Long id) {
        log.debug("REST request to delete InscripcionDetalle : {}", id);
        inscripcionDetalleService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
