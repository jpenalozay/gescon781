package com.creinfor.web.rest;

import com.creinfor.domain.Programacion;
import com.creinfor.repository.ProgramacionRepository;
import com.creinfor.service.ProgramacionQueryService;
import com.creinfor.service.ProgramacionService;
import com.creinfor.service.criteria.ProgramacionCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.Programacion}.
 */
@RestController
@RequestMapping("/api")
public class ProgramacionResource {

    private final Logger log = LoggerFactory.getLogger(ProgramacionResource.class);

    private static final String ENTITY_NAME = "programacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProgramacionService programacionService;

    private final ProgramacionRepository programacionRepository;

    private final ProgramacionQueryService programacionQueryService;

    public ProgramacionResource(
        ProgramacionService programacionService,
        ProgramacionRepository programacionRepository,
        ProgramacionQueryService programacionQueryService
    ) {
        this.programacionService = programacionService;
        this.programacionRepository = programacionRepository;
        this.programacionQueryService = programacionQueryService;
    }

    /**
     * {@code POST  /programacions} : Create a new programacion.
     *
     * @param programacion the programacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new programacion, or with status {@code 400 (Bad Request)} if the programacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/programacions")
    public ResponseEntity<Programacion> createProgramacion(@Valid @RequestBody Programacion programacion) throws URISyntaxException {
        log.debug("REST request to save Programacion : {}", programacion);
        if (programacion.getId() != null) {
            throw new BadRequestAlertException("A new programacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Programacion result = programacionService.save(programacion);
        return ResponseEntity
            .created(new URI("/api/programacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /programacions/:id} : Updates an existing programacion.
     *
     * @param id the id of the programacion to save.
     * @param programacion the programacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated programacion,
     * or with status {@code 400 (Bad Request)} if the programacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the programacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/programacions/{id}")
    public ResponseEntity<Programacion> updateProgramacion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Programacion programacion
    ) throws URISyntaxException {
        log.debug("REST request to update Programacion : {}, {}", id, programacion);
        if (programacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, programacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!programacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Programacion result = programacionService.update(programacion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, programacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /programacions/:id} : Partial updates given fields of an existing programacion, field will ignore if it is null
     *
     * @param id the id of the programacion to save.
     * @param programacion the programacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated programacion,
     * or with status {@code 400 (Bad Request)} if the programacion is not valid,
     * or with status {@code 404 (Not Found)} if the programacion is not found,
     * or with status {@code 500 (Internal Server Error)} if the programacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/programacions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Programacion> partialUpdateProgramacion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Programacion programacion
    ) throws URISyntaxException {
        log.debug("REST request to partial update Programacion partially : {}, {}", id, programacion);
        if (programacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, programacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!programacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Programacion> result = programacionService.partialUpdate(programacion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, programacion.getId().toString())
        );
    }

    /**
     * {@code GET  /programacions} : get all the programacions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of programacions in body.
     */
    @GetMapping("/programacions")
    public ResponseEntity<List<Programacion>> getAllProgramacions(ProgramacionCriteria criteria) {
        log.debug("REST request to get Programacions by criteria: {}", criteria);
        List<Programacion> entityList = programacionQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /programacions/count} : count all the programacions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/programacions/count")
    public ResponseEntity<Long> countProgramacions(ProgramacionCriteria criteria) {
        log.debug("REST request to count Programacions by criteria: {}", criteria);
        return ResponseEntity.ok().body(programacionQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /programacions/:id} : get the "id" programacion.
     *
     * @param id the id of the programacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the programacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/programacions/{id}")
    public ResponseEntity<Programacion> getProgramacion(@PathVariable Long id) {
        log.debug("REST request to get Programacion : {}", id);
        Optional<Programacion> programacion = programacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(programacion);
    }

    /**
     * {@code DELETE  /programacions/:id} : delete the "id" programacion.
     *
     * @param id the id of the programacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/programacions/{id}")
    public ResponseEntity<Void> deleteProgramacion(@PathVariable Long id) {
        log.debug("REST request to delete Programacion : {}", id);
        programacionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
