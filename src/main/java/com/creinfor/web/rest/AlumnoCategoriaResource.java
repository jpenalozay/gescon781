package com.creinfor.web.rest;

import com.creinfor.domain.AlumnoCategoria;
import com.creinfor.repository.AlumnoCategoriaRepository;
import com.creinfor.service.AlumnoCategoriaQueryService;
import com.creinfor.service.AlumnoCategoriaService;
import com.creinfor.service.criteria.AlumnoCategoriaCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.AlumnoCategoria}.
 */
@RestController
@RequestMapping("/api")
public class AlumnoCategoriaResource {

    private final Logger log = LoggerFactory.getLogger(AlumnoCategoriaResource.class);

    private static final String ENTITY_NAME = "alumnoCategoria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlumnoCategoriaService alumnoCategoriaService;

    private final AlumnoCategoriaRepository alumnoCategoriaRepository;

    private final AlumnoCategoriaQueryService alumnoCategoriaQueryService;

    public AlumnoCategoriaResource(
        AlumnoCategoriaService alumnoCategoriaService,
        AlumnoCategoriaRepository alumnoCategoriaRepository,
        AlumnoCategoriaQueryService alumnoCategoriaQueryService
    ) {
        this.alumnoCategoriaService = alumnoCategoriaService;
        this.alumnoCategoriaRepository = alumnoCategoriaRepository;
        this.alumnoCategoriaQueryService = alumnoCategoriaQueryService;
    }

    /**
     * {@code POST  /alumno-categorias} : Create a new alumnoCategoria.
     *
     * @param alumnoCategoria the alumnoCategoria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alumnoCategoria, or with status {@code 400 (Bad Request)} if the alumnoCategoria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/alumno-categorias")
    public ResponseEntity<AlumnoCategoria> createAlumnoCategoria(@Valid @RequestBody AlumnoCategoria alumnoCategoria)
        throws URISyntaxException {
        log.debug("REST request to save AlumnoCategoria : {}", alumnoCategoria);
        if (alumnoCategoria.getId() != null) {
            throw new BadRequestAlertException("A new alumnoCategoria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlumnoCategoria result = alumnoCategoriaService.save(alumnoCategoria);
        return ResponseEntity
            .created(new URI("/api/alumno-categorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /alumno-categorias/:id} : Updates an existing alumnoCategoria.
     *
     * @param id the id of the alumnoCategoria to save.
     * @param alumnoCategoria the alumnoCategoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alumnoCategoria,
     * or with status {@code 400 (Bad Request)} if the alumnoCategoria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alumnoCategoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/alumno-categorias/{id}")
    public ResponseEntity<AlumnoCategoria> updateAlumnoCategoria(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AlumnoCategoria alumnoCategoria
    ) throws URISyntaxException {
        log.debug("REST request to update AlumnoCategoria : {}, {}", id, alumnoCategoria);
        if (alumnoCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alumnoCategoria.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alumnoCategoriaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AlumnoCategoria result = alumnoCategoriaService.update(alumnoCategoria);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alumnoCategoria.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /alumno-categorias/:id} : Partial updates given fields of an existing alumnoCategoria, field will ignore if it is null
     *
     * @param id the id of the alumnoCategoria to save.
     * @param alumnoCategoria the alumnoCategoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alumnoCategoria,
     * or with status {@code 400 (Bad Request)} if the alumnoCategoria is not valid,
     * or with status {@code 404 (Not Found)} if the alumnoCategoria is not found,
     * or with status {@code 500 (Internal Server Error)} if the alumnoCategoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/alumno-categorias/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AlumnoCategoria> partialUpdateAlumnoCategoria(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AlumnoCategoria alumnoCategoria
    ) throws URISyntaxException {
        log.debug("REST request to partial update AlumnoCategoria partially : {}, {}", id, alumnoCategoria);
        if (alumnoCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alumnoCategoria.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alumnoCategoriaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AlumnoCategoria> result = alumnoCategoriaService.partialUpdate(alumnoCategoria);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alumnoCategoria.getId().toString())
        );
    }

    /**
     * {@code GET  /alumno-categorias} : get all the alumnoCategorias.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alumnoCategorias in body.
     */
    @GetMapping("/alumno-categorias")
    public ResponseEntity<List<AlumnoCategoria>> getAllAlumnoCategorias(AlumnoCategoriaCriteria criteria) {
        log.debug("REST request to get AlumnoCategorias by criteria: {}", criteria);
        List<AlumnoCategoria> entityList = alumnoCategoriaQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /alumno-categorias/count} : count all the alumnoCategorias.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/alumno-categorias/count")
    public ResponseEntity<Long> countAlumnoCategorias(AlumnoCategoriaCriteria criteria) {
        log.debug("REST request to count AlumnoCategorias by criteria: {}", criteria);
        return ResponseEntity.ok().body(alumnoCategoriaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /alumno-categorias/:id} : get the "id" alumnoCategoria.
     *
     * @param id the id of the alumnoCategoria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alumnoCategoria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/alumno-categorias/{id}")
    public ResponseEntity<AlumnoCategoria> getAlumnoCategoria(@PathVariable Long id) {
        log.debug("REST request to get AlumnoCategoria : {}", id);
        Optional<AlumnoCategoria> alumnoCategoria = alumnoCategoriaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(alumnoCategoria);
    }

    /**
     * {@code DELETE  /alumno-categorias/:id} : delete the "id" alumnoCategoria.
     *
     * @param id the id of the alumnoCategoria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/alumno-categorias/{id}")
    public ResponseEntity<Void> deleteAlumnoCategoria(@PathVariable Long id) {
        log.debug("REST request to delete AlumnoCategoria : {}", id);
        alumnoCategoriaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
