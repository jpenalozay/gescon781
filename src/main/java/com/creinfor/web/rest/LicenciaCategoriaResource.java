package com.creinfor.web.rest;

import com.creinfor.domain.LicenciaCategoria;
import com.creinfor.repository.LicenciaCategoriaRepository;
import com.creinfor.service.LicenciaCategoriaQueryService;
import com.creinfor.service.LicenciaCategoriaService;
import com.creinfor.service.criteria.LicenciaCategoriaCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.LicenciaCategoria}.
 */
@RestController
@RequestMapping("/api")
public class LicenciaCategoriaResource {

    private final Logger log = LoggerFactory.getLogger(LicenciaCategoriaResource.class);

    private static final String ENTITY_NAME = "licenciaCategoria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LicenciaCategoriaService licenciaCategoriaService;

    private final LicenciaCategoriaRepository licenciaCategoriaRepository;

    private final LicenciaCategoriaQueryService licenciaCategoriaQueryService;

    public LicenciaCategoriaResource(
        LicenciaCategoriaService licenciaCategoriaService,
        LicenciaCategoriaRepository licenciaCategoriaRepository,
        LicenciaCategoriaQueryService licenciaCategoriaQueryService
    ) {
        this.licenciaCategoriaService = licenciaCategoriaService;
        this.licenciaCategoriaRepository = licenciaCategoriaRepository;
        this.licenciaCategoriaQueryService = licenciaCategoriaQueryService;
    }

    /**
     * {@code POST  /licencia-categorias} : Create a new licenciaCategoria.
     *
     * @param licenciaCategoria the licenciaCategoria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new licenciaCategoria, or with status {@code 400 (Bad Request)} if the licenciaCategoria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/licencia-categorias")
    public ResponseEntity<LicenciaCategoria> createLicenciaCategoria(@Valid @RequestBody LicenciaCategoria licenciaCategoria)
        throws URISyntaxException {
        log.debug("REST request to save LicenciaCategoria : {}", licenciaCategoria);
        if (licenciaCategoria.getId() != null) {
            throw new BadRequestAlertException("A new licenciaCategoria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LicenciaCategoria result = licenciaCategoriaService.save(licenciaCategoria);
        return ResponseEntity
            .created(new URI("/api/licencia-categorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /licencia-categorias/:id} : Updates an existing licenciaCategoria.
     *
     * @param id the id of the licenciaCategoria to save.
     * @param licenciaCategoria the licenciaCategoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated licenciaCategoria,
     * or with status {@code 400 (Bad Request)} if the licenciaCategoria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the licenciaCategoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/licencia-categorias/{id}")
    public ResponseEntity<LicenciaCategoria> updateLicenciaCategoria(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LicenciaCategoria licenciaCategoria
    ) throws URISyntaxException {
        log.debug("REST request to update LicenciaCategoria : {}, {}", id, licenciaCategoria);
        if (licenciaCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, licenciaCategoria.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!licenciaCategoriaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LicenciaCategoria result = licenciaCategoriaService.update(licenciaCategoria);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, licenciaCategoria.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /licencia-categorias/:id} : Partial updates given fields of an existing licenciaCategoria, field will ignore if it is null
     *
     * @param id the id of the licenciaCategoria to save.
     * @param licenciaCategoria the licenciaCategoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated licenciaCategoria,
     * or with status {@code 400 (Bad Request)} if the licenciaCategoria is not valid,
     * or with status {@code 404 (Not Found)} if the licenciaCategoria is not found,
     * or with status {@code 500 (Internal Server Error)} if the licenciaCategoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/licencia-categorias/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LicenciaCategoria> partialUpdateLicenciaCategoria(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LicenciaCategoria licenciaCategoria
    ) throws URISyntaxException {
        log.debug("REST request to partial update LicenciaCategoria partially : {}, {}", id, licenciaCategoria);
        if (licenciaCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, licenciaCategoria.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!licenciaCategoriaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LicenciaCategoria> result = licenciaCategoriaService.partialUpdate(licenciaCategoria);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, licenciaCategoria.getId().toString())
        );
    }

    /**
     * {@code GET  /licencia-categorias} : get all the licenciaCategorias.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of licenciaCategorias in body.
     */
    @GetMapping("/licencia-categorias")
    public ResponseEntity<List<LicenciaCategoria>> getAllLicenciaCategorias(LicenciaCategoriaCriteria criteria) {
        log.debug("REST request to get LicenciaCategorias by criteria: {}", criteria);
        List<LicenciaCategoria> entityList = licenciaCategoriaQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /licencia-categorias/count} : count all the licenciaCategorias.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/licencia-categorias/count")
    public ResponseEntity<Long> countLicenciaCategorias(LicenciaCategoriaCriteria criteria) {
        log.debug("REST request to count LicenciaCategorias by criteria: {}", criteria);
        return ResponseEntity.ok().body(licenciaCategoriaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /licencia-categorias/:id} : get the "id" licenciaCategoria.
     *
     * @param id the id of the licenciaCategoria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the licenciaCategoria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/licencia-categorias/{id}")
    public ResponseEntity<LicenciaCategoria> getLicenciaCategoria(@PathVariable Long id) {
        log.debug("REST request to get LicenciaCategoria : {}", id);
        Optional<LicenciaCategoria> licenciaCategoria = licenciaCategoriaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(licenciaCategoria);
    }

    /**
     * {@code DELETE  /licencia-categorias/:id} : delete the "id" licenciaCategoria.
     *
     * @param id the id of the licenciaCategoria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/licencia-categorias/{id}")
    public ResponseEntity<Void> deleteLicenciaCategoria(@PathVariable Long id) {
        log.debug("REST request to delete LicenciaCategoria : {}", id);
        licenciaCategoriaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
