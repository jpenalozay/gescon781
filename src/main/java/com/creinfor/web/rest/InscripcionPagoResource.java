package com.creinfor.web.rest;

import com.creinfor.domain.InscripcionPago;
import com.creinfor.repository.InscripcionPagoRepository;
import com.creinfor.service.InscripcionPagoQueryService;
import com.creinfor.service.InscripcionPagoService;
import com.creinfor.service.criteria.InscripcionPagoCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.InscripcionPago}.
 */
@RestController
@RequestMapping("/api")
public class InscripcionPagoResource {

    private final Logger log = LoggerFactory.getLogger(InscripcionPagoResource.class);

    private static final String ENTITY_NAME = "inscripcionPago";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InscripcionPagoService inscripcionPagoService;

    private final InscripcionPagoRepository inscripcionPagoRepository;

    private final InscripcionPagoQueryService inscripcionPagoQueryService;

    public InscripcionPagoResource(
        InscripcionPagoService inscripcionPagoService,
        InscripcionPagoRepository inscripcionPagoRepository,
        InscripcionPagoQueryService inscripcionPagoQueryService
    ) {
        this.inscripcionPagoService = inscripcionPagoService;
        this.inscripcionPagoRepository = inscripcionPagoRepository;
        this.inscripcionPagoQueryService = inscripcionPagoQueryService;
    }

    /**
     * {@code POST  /inscripcion-pagos} : Create a new inscripcionPago.
     *
     * @param inscripcionPago the inscripcionPago to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inscripcionPago, or with status {@code 400 (Bad Request)} if the inscripcionPago has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inscripcion-pagos")
    public ResponseEntity<InscripcionPago> createInscripcionPago(@Valid @RequestBody InscripcionPago inscripcionPago)
        throws URISyntaxException {
        log.debug("REST request to save InscripcionPago : {}", inscripcionPago);
        if (inscripcionPago.getId() != null) {
            throw new BadRequestAlertException("A new inscripcionPago cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InscripcionPago result = inscripcionPagoService.save(inscripcionPago);
        return ResponseEntity
            .created(new URI("/api/inscripcion-pagos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inscripcion-pagos/:id} : Updates an existing inscripcionPago.
     *
     * @param id the id of the inscripcionPago to save.
     * @param inscripcionPago the inscripcionPago to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcionPago,
     * or with status {@code 400 (Bad Request)} if the inscripcionPago is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inscripcionPago couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inscripcion-pagos/{id}")
    public ResponseEntity<InscripcionPago> updateInscripcionPago(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody InscripcionPago inscripcionPago
    ) throws URISyntaxException {
        log.debug("REST request to update InscripcionPago : {}, {}", id, inscripcionPago);
        if (inscripcionPago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcionPago.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionPagoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InscripcionPago result = inscripcionPagoService.update(inscripcionPago);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcionPago.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /inscripcion-pagos/:id} : Partial updates given fields of an existing inscripcionPago, field will ignore if it is null
     *
     * @param id the id of the inscripcionPago to save.
     * @param inscripcionPago the inscripcionPago to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcionPago,
     * or with status {@code 400 (Bad Request)} if the inscripcionPago is not valid,
     * or with status {@code 404 (Not Found)} if the inscripcionPago is not found,
     * or with status {@code 500 (Internal Server Error)} if the inscripcionPago couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/inscripcion-pagos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InscripcionPago> partialUpdateInscripcionPago(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody InscripcionPago inscripcionPago
    ) throws URISyntaxException {
        log.debug("REST request to partial update InscripcionPago partially : {}, {}", id, inscripcionPago);
        if (inscripcionPago.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcionPago.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionPagoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InscripcionPago> result = inscripcionPagoService.partialUpdate(inscripcionPago);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcionPago.getId().toString())
        );
    }

    /**
     * {@code GET  /inscripcion-pagos} : get all the inscripcionPagos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inscripcionPagos in body.
     */
    @GetMapping("/inscripcion-pagos")
    public ResponseEntity<List<InscripcionPago>> getAllInscripcionPagos(InscripcionPagoCriteria criteria) {
        log.debug("REST request to get InscripcionPagos by criteria: {}", criteria);
        List<InscripcionPago> entityList = inscripcionPagoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /inscripcion-pagos/count} : count all the inscripcionPagos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/inscripcion-pagos/count")
    public ResponseEntity<Long> countInscripcionPagos(InscripcionPagoCriteria criteria) {
        log.debug("REST request to count InscripcionPagos by criteria: {}", criteria);
        return ResponseEntity.ok().body(inscripcionPagoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /inscripcion-pagos/:id} : get the "id" inscripcionPago.
     *
     * @param id the id of the inscripcionPago to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inscripcionPago, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inscripcion-pagos/{id}")
    public ResponseEntity<InscripcionPago> getInscripcionPago(@PathVariable Long id) {
        log.debug("REST request to get InscripcionPago : {}", id);
        Optional<InscripcionPago> inscripcionPago = inscripcionPagoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(inscripcionPago);
    }

    /**
     * {@code DELETE  /inscripcion-pagos/:id} : delete the "id" inscripcionPago.
     *
     * @param id the id of the inscripcionPago to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inscripcion-pagos/{id}")
    public ResponseEntity<Void> deleteInscripcionPago(@PathVariable Long id) {
        log.debug("REST request to delete InscripcionPago : {}", id);
        inscripcionPagoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
