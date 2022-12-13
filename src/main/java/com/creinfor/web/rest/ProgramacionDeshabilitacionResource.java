package com.creinfor.web.rest;

import com.creinfor.domain.ProgramacionDeshabilitacion;
import com.creinfor.repository.ProgramacionDeshabilitacionRepository;
import com.creinfor.service.ProgramacionDeshabilitacionQueryService;
import com.creinfor.service.ProgramacionDeshabilitacionService;
import com.creinfor.service.criteria.ProgramacionDeshabilitacionCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.ProgramacionDeshabilitacion}.
 */
@RestController
@RequestMapping("/api")
public class ProgramacionDeshabilitacionResource {

    private final Logger log = LoggerFactory.getLogger(ProgramacionDeshabilitacionResource.class);

    private static final String ENTITY_NAME = "programacionDeshabilitacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProgramacionDeshabilitacionService programacionDeshabilitacionService;

    private final ProgramacionDeshabilitacionRepository programacionDeshabilitacionRepository;

    private final ProgramacionDeshabilitacionQueryService programacionDeshabilitacionQueryService;

    public ProgramacionDeshabilitacionResource(
        ProgramacionDeshabilitacionService programacionDeshabilitacionService,
        ProgramacionDeshabilitacionRepository programacionDeshabilitacionRepository,
        ProgramacionDeshabilitacionQueryService programacionDeshabilitacionQueryService
    ) {
        this.programacionDeshabilitacionService = programacionDeshabilitacionService;
        this.programacionDeshabilitacionRepository = programacionDeshabilitacionRepository;
        this.programacionDeshabilitacionQueryService = programacionDeshabilitacionQueryService;
    }

    /**
     * {@code POST  /programacion-deshabilitacions} : Create a new programacionDeshabilitacion.
     *
     * @param programacionDeshabilitacion the programacionDeshabilitacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new programacionDeshabilitacion, or with status {@code 400 (Bad Request)} if the programacionDeshabilitacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/programacion-deshabilitacions")
    public ResponseEntity<ProgramacionDeshabilitacion> createProgramacionDeshabilitacion(
        @Valid @RequestBody ProgramacionDeshabilitacion programacionDeshabilitacion
    ) throws URISyntaxException {
        log.debug("REST request to save ProgramacionDeshabilitacion : {}", programacionDeshabilitacion);
        if (programacionDeshabilitacion.getId() != null) {
            throw new BadRequestAlertException("A new programacionDeshabilitacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProgramacionDeshabilitacion result = programacionDeshabilitacionService.save(programacionDeshabilitacion);
        return ResponseEntity
            .created(new URI("/api/programacion-deshabilitacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /programacion-deshabilitacions/:id} : Updates an existing programacionDeshabilitacion.
     *
     * @param id the id of the programacionDeshabilitacion to save.
     * @param programacionDeshabilitacion the programacionDeshabilitacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated programacionDeshabilitacion,
     * or with status {@code 400 (Bad Request)} if the programacionDeshabilitacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the programacionDeshabilitacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/programacion-deshabilitacions/{id}")
    public ResponseEntity<ProgramacionDeshabilitacion> updateProgramacionDeshabilitacion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ProgramacionDeshabilitacion programacionDeshabilitacion
    ) throws URISyntaxException {
        log.debug("REST request to update ProgramacionDeshabilitacion : {}, {}", id, programacionDeshabilitacion);
        if (programacionDeshabilitacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, programacionDeshabilitacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!programacionDeshabilitacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProgramacionDeshabilitacion result = programacionDeshabilitacionService.update(programacionDeshabilitacion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, programacionDeshabilitacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /programacion-deshabilitacions/:id} : Partial updates given fields of an existing programacionDeshabilitacion, field will ignore if it is null
     *
     * @param id the id of the programacionDeshabilitacion to save.
     * @param programacionDeshabilitacion the programacionDeshabilitacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated programacionDeshabilitacion,
     * or with status {@code 400 (Bad Request)} if the programacionDeshabilitacion is not valid,
     * or with status {@code 404 (Not Found)} if the programacionDeshabilitacion is not found,
     * or with status {@code 500 (Internal Server Error)} if the programacionDeshabilitacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/programacion-deshabilitacions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProgramacionDeshabilitacion> partialUpdateProgramacionDeshabilitacion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ProgramacionDeshabilitacion programacionDeshabilitacion
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProgramacionDeshabilitacion partially : {}, {}", id, programacionDeshabilitacion);
        if (programacionDeshabilitacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, programacionDeshabilitacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!programacionDeshabilitacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProgramacionDeshabilitacion> result = programacionDeshabilitacionService.partialUpdate(programacionDeshabilitacion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, programacionDeshabilitacion.getId().toString())
        );
    }

    /**
     * {@code GET  /programacion-deshabilitacions} : get all the programacionDeshabilitacions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of programacionDeshabilitacions in body.
     */
    @GetMapping("/programacion-deshabilitacions")
    public ResponseEntity<List<ProgramacionDeshabilitacion>> getAllProgramacionDeshabilitacions(
        ProgramacionDeshabilitacionCriteria criteria
    ) {
        log.debug("REST request to get ProgramacionDeshabilitacions by criteria: {}", criteria);
        List<ProgramacionDeshabilitacion> entityList = programacionDeshabilitacionQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /programacion-deshabilitacions/count} : count all the programacionDeshabilitacions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/programacion-deshabilitacions/count")
    public ResponseEntity<Long> countProgramacionDeshabilitacions(ProgramacionDeshabilitacionCriteria criteria) {
        log.debug("REST request to count ProgramacionDeshabilitacions by criteria: {}", criteria);
        return ResponseEntity.ok().body(programacionDeshabilitacionQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /programacion-deshabilitacions/:id} : get the "id" programacionDeshabilitacion.
     *
     * @param id the id of the programacionDeshabilitacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the programacionDeshabilitacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/programacion-deshabilitacions/{id}")
    public ResponseEntity<ProgramacionDeshabilitacion> getProgramacionDeshabilitacion(@PathVariable Long id) {
        log.debug("REST request to get ProgramacionDeshabilitacion : {}", id);
        Optional<ProgramacionDeshabilitacion> programacionDeshabilitacion = programacionDeshabilitacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(programacionDeshabilitacion);
    }

    /**
     * {@code DELETE  /programacion-deshabilitacions/:id} : delete the "id" programacionDeshabilitacion.
     *
     * @param id the id of the programacionDeshabilitacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/programacion-deshabilitacions/{id}")
    public ResponseEntity<Void> deleteProgramacionDeshabilitacion(@PathVariable Long id) {
        log.debug("REST request to delete ProgramacionDeshabilitacion : {}", id);
        programacionDeshabilitacionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
