package com.creinfor.web.rest;

import com.creinfor.domain.InscripcionAsignaturaRequisito;
import com.creinfor.repository.InscripcionAsignaturaRequisitoRepository;
import com.creinfor.service.InscripcionAsignaturaRequisitoQueryService;
import com.creinfor.service.InscripcionAsignaturaRequisitoService;
import com.creinfor.service.criteria.InscripcionAsignaturaRequisitoCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.InscripcionAsignaturaRequisito}.
 */
@RestController
@RequestMapping("/api")
public class InscripcionAsignaturaRequisitoResource {

    private final Logger log = LoggerFactory.getLogger(InscripcionAsignaturaRequisitoResource.class);

    private static final String ENTITY_NAME = "inscripcionAsignaturaRequisito";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InscripcionAsignaturaRequisitoService inscripcionAsignaturaRequisitoService;

    private final InscripcionAsignaturaRequisitoRepository inscripcionAsignaturaRequisitoRepository;

    private final InscripcionAsignaturaRequisitoQueryService inscripcionAsignaturaRequisitoQueryService;

    public InscripcionAsignaturaRequisitoResource(
        InscripcionAsignaturaRequisitoService inscripcionAsignaturaRequisitoService,
        InscripcionAsignaturaRequisitoRepository inscripcionAsignaturaRequisitoRepository,
        InscripcionAsignaturaRequisitoQueryService inscripcionAsignaturaRequisitoQueryService
    ) {
        this.inscripcionAsignaturaRequisitoService = inscripcionAsignaturaRequisitoService;
        this.inscripcionAsignaturaRequisitoRepository = inscripcionAsignaturaRequisitoRepository;
        this.inscripcionAsignaturaRequisitoQueryService = inscripcionAsignaturaRequisitoQueryService;
    }

    /**
     * {@code POST  /inscripcion-asignatura-requisitos} : Create a new inscripcionAsignaturaRequisito.
     *
     * @param inscripcionAsignaturaRequisito the inscripcionAsignaturaRequisito to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inscripcionAsignaturaRequisito, or with status {@code 400 (Bad Request)} if the inscripcionAsignaturaRequisito has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inscripcion-asignatura-requisitos")
    public ResponseEntity<InscripcionAsignaturaRequisito> createInscripcionAsignaturaRequisito(
        @Valid @RequestBody InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito
    ) throws URISyntaxException {
        log.debug("REST request to save InscripcionAsignaturaRequisito : {}", inscripcionAsignaturaRequisito);
        if (inscripcionAsignaturaRequisito.getId() != null) {
            throw new BadRequestAlertException("A new inscripcionAsignaturaRequisito cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InscripcionAsignaturaRequisito result = inscripcionAsignaturaRequisitoService.save(inscripcionAsignaturaRequisito);
        return ResponseEntity
            .created(new URI("/api/inscripcion-asignatura-requisitos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inscripcion-asignatura-requisitos/:id} : Updates an existing inscripcionAsignaturaRequisito.
     *
     * @param id the id of the inscripcionAsignaturaRequisito to save.
     * @param inscripcionAsignaturaRequisito the inscripcionAsignaturaRequisito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcionAsignaturaRequisito,
     * or with status {@code 400 (Bad Request)} if the inscripcionAsignaturaRequisito is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inscripcionAsignaturaRequisito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inscripcion-asignatura-requisitos/{id}")
    public ResponseEntity<InscripcionAsignaturaRequisito> updateInscripcionAsignaturaRequisito(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito
    ) throws URISyntaxException {
        log.debug("REST request to update InscripcionAsignaturaRequisito : {}, {}", id, inscripcionAsignaturaRequisito);
        if (inscripcionAsignaturaRequisito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcionAsignaturaRequisito.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionAsignaturaRequisitoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InscripcionAsignaturaRequisito result = inscripcionAsignaturaRequisitoService.update(inscripcionAsignaturaRequisito);
        return ResponseEntity
            .ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcionAsignaturaRequisito.getId().toString())
            )
            .body(result);
    }

    /**
     * {@code PATCH  /inscripcion-asignatura-requisitos/:id} : Partial updates given fields of an existing inscripcionAsignaturaRequisito, field will ignore if it is null
     *
     * @param id the id of the inscripcionAsignaturaRequisito to save.
     * @param inscripcionAsignaturaRequisito the inscripcionAsignaturaRequisito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscripcionAsignaturaRequisito,
     * or with status {@code 400 (Bad Request)} if the inscripcionAsignaturaRequisito is not valid,
     * or with status {@code 404 (Not Found)} if the inscripcionAsignaturaRequisito is not found,
     * or with status {@code 500 (Internal Server Error)} if the inscripcionAsignaturaRequisito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/inscripcion-asignatura-requisitos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InscripcionAsignaturaRequisito> partialUpdateInscripcionAsignaturaRequisito(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody InscripcionAsignaturaRequisito inscripcionAsignaturaRequisito
    ) throws URISyntaxException {
        log.debug("REST request to partial update InscripcionAsignaturaRequisito partially : {}, {}", id, inscripcionAsignaturaRequisito);
        if (inscripcionAsignaturaRequisito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, inscripcionAsignaturaRequisito.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!inscripcionAsignaturaRequisitoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InscripcionAsignaturaRequisito> result = inscripcionAsignaturaRequisitoService.partialUpdate(
            inscripcionAsignaturaRequisito
        );

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscripcionAsignaturaRequisito.getId().toString())
        );
    }

    /**
     * {@code GET  /inscripcion-asignatura-requisitos} : get all the inscripcionAsignaturaRequisitos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inscripcionAsignaturaRequisitos in body.
     */
    @GetMapping("/inscripcion-asignatura-requisitos")
    public ResponseEntity<List<InscripcionAsignaturaRequisito>> getAllInscripcionAsignaturaRequisitos(
        InscripcionAsignaturaRequisitoCriteria criteria
    ) {
        log.debug("REST request to get InscripcionAsignaturaRequisitos by criteria: {}", criteria);
        List<InscripcionAsignaturaRequisito> entityList = inscripcionAsignaturaRequisitoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /inscripcion-asignatura-requisitos/count} : count all the inscripcionAsignaturaRequisitos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/inscripcion-asignatura-requisitos/count")
    public ResponseEntity<Long> countInscripcionAsignaturaRequisitos(InscripcionAsignaturaRequisitoCriteria criteria) {
        log.debug("REST request to count InscripcionAsignaturaRequisitos by criteria: {}", criteria);
        return ResponseEntity.ok().body(inscripcionAsignaturaRequisitoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /inscripcion-asignatura-requisitos/:id} : get the "id" inscripcionAsignaturaRequisito.
     *
     * @param id the id of the inscripcionAsignaturaRequisito to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inscripcionAsignaturaRequisito, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inscripcion-asignatura-requisitos/{id}")
    public ResponseEntity<InscripcionAsignaturaRequisito> getInscripcionAsignaturaRequisito(@PathVariable Long id) {
        log.debug("REST request to get InscripcionAsignaturaRequisito : {}", id);
        Optional<InscripcionAsignaturaRequisito> inscripcionAsignaturaRequisito = inscripcionAsignaturaRequisitoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(inscripcionAsignaturaRequisito);
    }

    /**
     * {@code DELETE  /inscripcion-asignatura-requisitos/:id} : delete the "id" inscripcionAsignaturaRequisito.
     *
     * @param id the id of the inscripcionAsignaturaRequisito to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inscripcion-asignatura-requisitos/{id}")
    public ResponseEntity<Void> deleteInscripcionAsignaturaRequisito(@PathVariable Long id) {
        log.debug("REST request to delete InscripcionAsignaturaRequisito : {}", id);
        inscripcionAsignaturaRequisitoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
