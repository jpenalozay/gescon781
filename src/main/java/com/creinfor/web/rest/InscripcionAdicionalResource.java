package com.creinfor.web.rest;

import com.creinfor.domain.InscripcionAdicional;
import com.creinfor.repository.InscripcionAdicionalRepository;
import com.creinfor.service.InscripcionAdicionalQueryService;
import com.creinfor.service.InscripcionAdicionalService;
import com.creinfor.service.criteria.InscripcionAdicionalCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.InscripcionAdicional}.
 */
@RestController
@RequestMapping("/api")
public class InscripcionAdicionalResource {

    private final Logger log = LoggerFactory.getLogger(InscripcionAdicionalResource.class);

    private static final String ENTITY_NAME = "inscripcionAdicional";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InscripcionAdicionalService inscripcionAdicionalService;

    private final InscripcionAdicionalRepository inscripcionAdicionalRepository;

    private final InscripcionAdicionalQueryService inscripcionAdicionalQueryService;

    public InscripcionAdicionalResource(
        InscripcionAdicionalService inscripcionAdicionalService,
        InscripcionAdicionalRepository inscripcionAdicionalRepository,
        InscripcionAdicionalQueryService inscripcionAdicionalQueryService
    ) {
        this.inscripcionAdicionalService = inscripcionAdicionalService;
        this.inscripcionAdicionalRepository = inscripcionAdicionalRepository;
        this.inscripcionAdicionalQueryService = inscripcionAdicionalQueryService;
    }

    /**
     * {@code POST  /inscripcion-adicionals} : Create a new inscripcionAdicional.
     *
     * @param inscripcionAdicional the inscripcionAdicional to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inscripcionAdicional, or with status {@code 400 (Bad Request)} if the inscripcionAdicional has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inscripcion-adicionals")
    public ResponseEntity<InscripcionAdicional> createInscripcionAdicional(@Valid @RequestBody InscripcionAdicional inscripcionAdicional)
        throws URISyntaxException {
        log.debug("REST request to save InscripcionAdicional : {}", inscripcionAdicional);
        if (inscripcionAdicional.getId() != null) {
            throw new BadRequestAlertException("A new inscripcionAdicional cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InscripcionAdicional result = inscripcionAdicionalService.save(inscripcionAdicional);
        return ResponseEntity
            .created(new URI("/api/inscripcion-adicionals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inscripcion-adicionals/:id} : Updates an existing inscripcionAdicional.
     *
     * @param id the id of the inscripcionAdicional to save.
     * @param inscripcionAdicional the inscripcionAdicional to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcionAdicional,
     * or with status {@code 400 (Bad Request)} if the inscripcionAdicional is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inscripcionAdicional couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inscripcion-adicionals/{id}")
    public ResponseEntity<InscripcionAdicional> updateInscripcionAdicional(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody InscripcionAdicional inscripcionAdicional
    ) throws URISyntaxException {
        log.debug("REST request to update InscripcionAdicional : {}, {}", id, inscripcionAdicional);
        if (inscripcionAdicional.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcionAdicional.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionAdicionalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InscripcionAdicional result = inscripcionAdicionalService.update(inscripcionAdicional);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcionAdicional.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /inscripcion-adicionals/:id} : Partial updates given fields of an existing inscripcionAdicional, field will ignore if it is null
     *
     * @param id the id of the inscripcionAdicional to save.
     * @param inscripcionAdicional the inscripcionAdicional to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcionAdicional,
     * or with status {@code 400 (Bad Request)} if the inscripcionAdicional is not valid,
     * or with status {@code 404 (Not Found)} if the inscripcionAdicional is not found,
     * or with status {@code 500 (Internal Server Error)} if the inscripcionAdicional couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/inscripcion-adicionals/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InscripcionAdicional> partialUpdateInscripcionAdicional(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody InscripcionAdicional inscripcionAdicional
    ) throws URISyntaxException {
        log.debug("REST request to partial update InscripcionAdicional partially : {}, {}", id, inscripcionAdicional);
        if (inscripcionAdicional.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcionAdicional.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionAdicionalRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InscripcionAdicional> result = inscripcionAdicionalService.partialUpdate(inscripcionAdicional);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcionAdicional.getId().toString())
        );
    }

    /**
     * {@code GET  /inscripcion-adicionals} : get all the inscripcionAdicionals.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inscripcionAdicionals in body.
     */
    @GetMapping("/inscripcion-adicionals")
    public ResponseEntity<List<InscripcionAdicional>> getAllInscripcionAdicionals(InscripcionAdicionalCriteria criteria) {
        log.debug("REST request to get InscripcionAdicionals by criteria: {}", criteria);
        List<InscripcionAdicional> entityList = inscripcionAdicionalQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /inscripcion-adicionals/count} : count all the inscripcionAdicionals.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/inscripcion-adicionals/count")
    public ResponseEntity<Long> countInscripcionAdicionals(InscripcionAdicionalCriteria criteria) {
        log.debug("REST request to count InscripcionAdicionals by criteria: {}", criteria);
        return ResponseEntity.ok().body(inscripcionAdicionalQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /inscripcion-adicionals/:id} : get the "id" inscripcionAdicional.
     *
     * @param id the id of the inscripcionAdicional to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inscripcionAdicional, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inscripcion-adicionals/{id}")
    public ResponseEntity<InscripcionAdicional> getInscripcionAdicional(@PathVariable Long id) {
        log.debug("REST request to get InscripcionAdicional : {}", id);
        Optional<InscripcionAdicional> inscripcionAdicional = inscripcionAdicionalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(inscripcionAdicional);
    }

    /**
     * {@code DELETE  /inscripcion-adicionals/:id} : delete the "id" inscripcionAdicional.
     *
     * @param id the id of the inscripcionAdicional to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inscripcion-adicionals/{id}")
    public ResponseEntity<Void> deleteInscripcionAdicional(@PathVariable Long id) {
        log.debug("REST request to delete InscripcionAdicional : {}", id);
        inscripcionAdicionalService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
