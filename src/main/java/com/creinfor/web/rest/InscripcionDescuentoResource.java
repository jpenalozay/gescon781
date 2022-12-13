package com.creinfor.web.rest;

import com.creinfor.domain.InscripcionDescuento;
import com.creinfor.repository.InscripcionDescuentoRepository;
import com.creinfor.service.InscripcionDescuentoQueryService;
import com.creinfor.service.InscripcionDescuentoService;
import com.creinfor.service.criteria.InscripcionDescuentoCriteria;
import com.creinfor.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.creinfor.domain.InscripcionDescuento}.
 */
@RestController
@RequestMapping("/api")
public class InscripcionDescuentoResource {

    private final Logger log = LoggerFactory.getLogger(InscripcionDescuentoResource.class);

    private static final String ENTITY_NAME = "inscripcionDescuento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InscripcionDescuentoService inscripcionDescuentoService;

    private final InscripcionDescuentoRepository inscripcionDescuentoRepository;

    private final InscripcionDescuentoQueryService inscripcionDescuentoQueryService;

    public InscripcionDescuentoResource(
        InscripcionDescuentoService inscripcionDescuentoService,
        InscripcionDescuentoRepository inscripcionDescuentoRepository,
        InscripcionDescuentoQueryService inscripcionDescuentoQueryService
    ) {
        this.inscripcionDescuentoService = inscripcionDescuentoService;
        this.inscripcionDescuentoRepository = inscripcionDescuentoRepository;
        this.inscripcionDescuentoQueryService = inscripcionDescuentoQueryService;
    }

    /**
     * {@code POST  /inscripcion-descuentos} : Create a new inscripcionDescuento.
     *
     * @param inscripcionDescuento the inscripcionDescuento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inscripcionDescuento, or with status {@code 400 (Bad Request)} if the inscripcionDescuento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inscripcion-descuentos")
    public ResponseEntity<InscripcionDescuento> createInscripcionDescuento(@RequestBody InscripcionDescuento inscripcionDescuento)
        throws URISyntaxException {
        log.debug("REST request to save InscripcionDescuento : {}", inscripcionDescuento);
        if (inscripcionDescuento.getId() != null) {
            throw new BadRequestAlertException("A new inscripcionDescuento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InscripcionDescuento result = inscripcionDescuentoService.save(inscripcionDescuento);
        return ResponseEntity
            .created(new URI("/api/inscripcion-descuentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inscripcion-descuentos/:id} : Updates an existing inscripcionDescuento.
     *
     * @param id the id of the inscripcionDescuento to save.
     * @param inscripcionDescuento the inscripcionDescuento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcionDescuento,
     * or with status {@code 400 (Bad Request)} if the inscripcionDescuento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inscripcionDescuento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inscripcion-descuentos/{id}")
    public ResponseEntity<InscripcionDescuento> updateInscripcionDescuento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody InscripcionDescuento inscripcionDescuento
    ) throws URISyntaxException {
        log.debug("REST request to update InscripcionDescuento : {}, {}", id, inscripcionDescuento);
        if (inscripcionDescuento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcionDescuento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionDescuentoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InscripcionDescuento result = inscripcionDescuentoService.update(inscripcionDescuento);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcionDescuento.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /inscripcion-descuentos/:id} : Partial updates given fields of an existing inscripcionDescuento, field will ignore if it is null
     *
     * @param id the id of the inscripcionDescuento to save.
     * @param inscripcionDescuento the inscripcionDescuento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcionDescuento,
     * or with status {@code 400 (Bad Request)} if the inscripcionDescuento is not valid,
     * or with status {@code 404 (Not Found)} if the inscripcionDescuento is not found,
     * or with status {@code 500 (Internal Server Error)} if the inscripcionDescuento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/inscripcion-descuentos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InscripcionDescuento> partialUpdateInscripcionDescuento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody InscripcionDescuento inscripcionDescuento
    ) throws URISyntaxException {
        log.debug("REST request to partial update InscripcionDescuento partially : {}, {}", id, inscripcionDescuento);
        if (inscripcionDescuento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcionDescuento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionDescuentoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InscripcionDescuento> result = inscripcionDescuentoService.partialUpdate(inscripcionDescuento);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcionDescuento.getId().toString())
        );
    }

    /**
     * {@code GET  /inscripcion-descuentos} : get all the inscripcionDescuentos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inscripcionDescuentos in body.
     */
    @GetMapping("/inscripcion-descuentos")
    public ResponseEntity<List<InscripcionDescuento>> getAllInscripcionDescuentos(InscripcionDescuentoCriteria criteria) {
        log.debug("REST request to get InscripcionDescuentos by criteria: {}", criteria);
        List<InscripcionDescuento> entityList = inscripcionDescuentoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /inscripcion-descuentos/count} : count all the inscripcionDescuentos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/inscripcion-descuentos/count")
    public ResponseEntity<Long> countInscripcionDescuentos(InscripcionDescuentoCriteria criteria) {
        log.debug("REST request to count InscripcionDescuentos by criteria: {}", criteria);
        return ResponseEntity.ok().body(inscripcionDescuentoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /inscripcion-descuentos/:id} : get the "id" inscripcionDescuento.
     *
     * @param id the id of the inscripcionDescuento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inscripcionDescuento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inscripcion-descuentos/{id}")
    public ResponseEntity<InscripcionDescuento> getInscripcionDescuento(@PathVariable Long id) {
        log.debug("REST request to get InscripcionDescuento : {}", id);
        Optional<InscripcionDescuento> inscripcionDescuento = inscripcionDescuentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(inscripcionDescuento);
    }

    /**
     * {@code DELETE  /inscripcion-descuentos/:id} : delete the "id" inscripcionDescuento.
     *
     * @param id the id of the inscripcionDescuento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inscripcion-descuentos/{id}")
    public ResponseEntity<Void> deleteInscripcionDescuento(@PathVariable Long id) {
        log.debug("REST request to delete InscripcionDescuento : {}", id);
        inscripcionDescuentoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
