package com.creinfor.web.rest;

import com.creinfor.domain.Asignatura;
import com.creinfor.repository.AsignaturaRepository;
import com.creinfor.service.AsignaturaQueryService;
import com.creinfor.service.AsignaturaService;
import com.creinfor.service.criteria.AsignaturaCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.Asignatura}.
 */
@RestController
@RequestMapping("/api")
public class AsignaturaResource {

    private final Logger log = LoggerFactory.getLogger(AsignaturaResource.class);

    private static final String ENTITY_NAME = "asignatura";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AsignaturaService asignaturaService;

    private final AsignaturaRepository asignaturaRepository;

    private final AsignaturaQueryService asignaturaQueryService;

    public AsignaturaResource(
        AsignaturaService asignaturaService,
        AsignaturaRepository asignaturaRepository,
        AsignaturaQueryService asignaturaQueryService
    ) {
        this.asignaturaService = asignaturaService;
        this.asignaturaRepository = asignaturaRepository;
        this.asignaturaQueryService = asignaturaQueryService;
    }

    /**
     * {@code POST  /asignaturas} : Create a new asignatura.
     *
     * @param asignatura the asignatura to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new asignatura, or with status {@code 400 (Bad Request)} if the asignatura has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/asignaturas")
    public ResponseEntity<Asignatura> createAsignatura(@Valid @RequestBody Asignatura asignatura) throws URISyntaxException {
        log.debug("REST request to save Asignatura : {}", asignatura);
        if (asignatura.getId() != null) {
            throw new BadRequestAlertException("A new asignatura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Asignatura result = asignaturaService.save(asignatura);
        return ResponseEntity
            .created(new URI("/api/asignaturas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /asignaturas/:id} : Updates an existing asignatura.
     *
     * @param id the id of the asignatura to save.
     * @param asignatura the asignatura to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asignatura,
     * or with status {@code 400 (Bad Request)} if the asignatura is not valid,
     * or with status {@code 500 (Internal Server Error)} if the asignatura couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/asignaturas/{id}")
    public ResponseEntity<Asignatura> updateAsignatura(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Asignatura asignatura
    ) throws URISyntaxException {
        log.debug("REST request to update Asignatura : {}, {}", id, asignatura);
        if (asignatura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, asignatura.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!asignaturaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Asignatura result = asignaturaService.update(asignatura);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asignatura.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /asignaturas/:id} : Partial updates given fields of an existing asignatura, field will ignore if it is null
     *
     * @param id the id of the asignatura to save.
     * @param asignatura the asignatura to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated asignatura,
     * or with status {@code 400 (Bad Request)} if the asignatura is not valid,
     * or with status {@code 404 (Not Found)} if the asignatura is not found,
     * or with status {@code 500 (Internal Server Error)} if the asignatura couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/asignaturas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Asignatura> partialUpdateAsignatura(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Asignatura asignatura
    ) throws URISyntaxException {
        log.debug("REST request to partial update Asignatura partially : {}, {}", id, asignatura);
        if (asignatura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, asignatura.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!asignaturaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Asignatura> result = asignaturaService.partialUpdate(asignatura);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, asignatura.getId().toString())
        );
    }

    /**
     * {@code GET  /asignaturas} : get all the asignaturas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of asignaturas in body.
     */
    @GetMapping("/asignaturas")
    public ResponseEntity<List<Asignatura>> getAllAsignaturas(AsignaturaCriteria criteria) {
        log.debug("REST request to get Asignaturas by criteria: {}", criteria);
        List<Asignatura> entityList = asignaturaQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /asignaturas/count} : count all the asignaturas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/asignaturas/count")
    public ResponseEntity<Long> countAsignaturas(AsignaturaCriteria criteria) {
        log.debug("REST request to count Asignaturas by criteria: {}", criteria);
        return ResponseEntity.ok().body(asignaturaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /asignaturas/:id} : get the "id" asignatura.
     *
     * @param id the id of the asignatura to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the asignatura, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/asignaturas/{id}")
    public ResponseEntity<Asignatura> getAsignatura(@PathVariable Long id) {
        log.debug("REST request to get Asignatura : {}", id);
        Optional<Asignatura> asignatura = asignaturaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(asignatura);
    }

    /**
     * {@code DELETE  /asignaturas/:id} : delete the "id" asignatura.
     *
     * @param id the id of the asignatura to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/asignaturas/{id}")
    public ResponseEntity<Void> deleteAsignatura(@PathVariable Long id) {
        log.debug("REST request to delete Asignatura : {}", id);
        asignaturaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
