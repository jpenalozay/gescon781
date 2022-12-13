package com.creinfor.web.rest;

import com.creinfor.domain.AsignaturaRequisito;
import com.creinfor.repository.AsignaturaRequisitoRepository;
import com.creinfor.service.AsignaturaRequisitoQueryService;
import com.creinfor.service.AsignaturaRequisitoService;
import com.creinfor.service.criteria.AsignaturaRequisitoCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.AsignaturaRequisito}.
 */
@RestController
@RequestMapping("/api")
public class AsignaturaRequisitoResource {

    private final Logger log = LoggerFactory.getLogger(AsignaturaRequisitoResource.class);

    private static final String ENTITY_NAME = "asignaturaRequisito";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsignaturaRequisitoService asignaturaRequisitoService;

    private final AsignaturaRequisitoRepository asignaturaRequisitoRepository;

    private final AsignaturaRequisitoQueryService asignaturaRequisitoQueryService;

    public AsignaturaRequisitoResource(
        AsignaturaRequisitoService asignaturaRequisitoService,
        AsignaturaRequisitoRepository asignaturaRequisitoRepository,
        AsignaturaRequisitoQueryService asignaturaRequisitoQueryService
    ) {
        this.asignaturaRequisitoService = asignaturaRequisitoService;
        this.asignaturaRequisitoRepository = asignaturaRequisitoRepository;
        this.asignaturaRequisitoQueryService = asignaturaRequisitoQueryService;
    }

    /**
     * {@code POST  /asignatura-requisitos} : Create a new asignaturaRequisito.
     *
     * @param asignaturaRequisito the asignaturaRequisito to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asignaturaRequisito, or with status {@code 400 (Bad Request)} if the asignaturaRequisito has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asignatura-requisitos")
    public ResponseEntity<AsignaturaRequisito> createAsignaturaRequisito(@Valid @RequestBody AsignaturaRequisito asignaturaRequisito)
        throws URISyntaxException {
        log.debug("REST request to save AsignaturaRequisito : {}", asignaturaRequisito);
        if (asignaturaRequisito.getId() != null) {
            throw new BadRequestAlertException("A new asignaturaRequisito cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AsignaturaRequisito result = asignaturaRequisitoService.save(asignaturaRequisito);
        return ResponseEntity
            .created(new URI("/api/asignatura-requisitos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asignatura-requisitos/:id} : Updates an existing asignaturaRequisito.
     *
     * @param id the id of the asignaturaRequisito to save.
     * @param asignaturaRequisito the asignaturaRequisito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asignaturaRequisito,
     * or with status {@code 400 (Bad Request)} if the asignaturaRequisito is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asignaturaRequisito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asignatura-requisitos/{id}")
    public ResponseEntity<AsignaturaRequisito> updateAsignaturaRequisito(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AsignaturaRequisito asignaturaRequisito
    ) throws URISyntaxException {
        log.debug("REST request to update AsignaturaRequisito : {}, {}", id, asignaturaRequisito);
        if (asignaturaRequisito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, asignaturaRequisito.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!asignaturaRequisitoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AsignaturaRequisito result = asignaturaRequisitoService.update(asignaturaRequisito);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asignaturaRequisito.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /asignatura-requisitos/:id} : Partial updates given fields of an existing asignaturaRequisito, field will ignore if it is null
     *
     * @param id the id of the asignaturaRequisito to save.
     * @param asignaturaRequisito the asignaturaRequisito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asignaturaRequisito,
     * or with status {@code 400 (Bad Request)} if the asignaturaRequisito is not valid,
     * or with status {@code 404 (Not Found)} if the asignaturaRequisito is not found,
     * or with status {@code 500 (Internal Server Error)} if the asignaturaRequisito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/asignatura-requisitos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AsignaturaRequisito> partialUpdateAsignaturaRequisito(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AsignaturaRequisito asignaturaRequisito
    ) throws URISyntaxException {
        log.debug("REST request to partial update AsignaturaRequisito partially : {}, {}", id, asignaturaRequisito);
        if (asignaturaRequisito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, asignaturaRequisito.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!asignaturaRequisitoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AsignaturaRequisito> result = asignaturaRequisitoService.partialUpdate(asignaturaRequisito);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asignaturaRequisito.getId().toString())
        );
    }

    /**
     * {@code GET  /asignatura-requisitos} : get all the asignaturaRequisitos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asignaturaRequisitos in body.
     */
    @GetMapping("/asignatura-requisitos")
    public ResponseEntity<List<AsignaturaRequisito>> getAllAsignaturaRequisitos(AsignaturaRequisitoCriteria criteria) {
        log.debug("REST request to get AsignaturaRequisitos by criteria: {}", criteria);
        List<AsignaturaRequisito> entityList = asignaturaRequisitoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /asignatura-requisitos/count} : count all the asignaturaRequisitos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/asignatura-requisitos/count")
    public ResponseEntity<Long> countAsignaturaRequisitos(AsignaturaRequisitoCriteria criteria) {
        log.debug("REST request to count AsignaturaRequisitos by criteria: {}", criteria);
        return ResponseEntity.ok().body(asignaturaRequisitoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /asignatura-requisitos/:id} : get the "id" asignaturaRequisito.
     *
     * @param id the id of the asignaturaRequisito to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asignaturaRequisito, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asignatura-requisitos/{id}")
    public ResponseEntity<AsignaturaRequisito> getAsignaturaRequisito(@PathVariable Long id) {
        log.debug("REST request to get AsignaturaRequisito : {}", id);
        Optional<AsignaturaRequisito> asignaturaRequisito = asignaturaRequisitoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(asignaturaRequisito);
    }

    /**
     * {@code DELETE  /asignatura-requisitos/:id} : delete the "id" asignaturaRequisito.
     *
     * @param id the id of the asignaturaRequisito to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asignatura-requisitos/{id}")
    public ResponseEntity<Void> deleteAsignaturaRequisito(@PathVariable Long id) {
        log.debug("REST request to delete AsignaturaRequisito : {}", id);
        asignaturaRequisitoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
