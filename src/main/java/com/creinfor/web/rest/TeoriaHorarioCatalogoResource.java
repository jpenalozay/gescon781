package com.creinfor.web.rest;

import com.creinfor.domain.TeoriaHorarioCatalogo;
import com.creinfor.repository.TeoriaHorarioCatalogoRepository;
import com.creinfor.service.TeoriaHorarioCatalogoQueryService;
import com.creinfor.service.TeoriaHorarioCatalogoService;
import com.creinfor.service.criteria.TeoriaHorarioCatalogoCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.TeoriaHorarioCatalogo}.
 */
@RestController
@RequestMapping("/api")
public class TeoriaHorarioCatalogoResource {

    private final Logger log = LoggerFactory.getLogger(TeoriaHorarioCatalogoResource.class);

    private static final String ENTITY_NAME = "teoriaHorarioCatalogo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TeoriaHorarioCatalogoService teoriaHorarioCatalogoService;

    private final TeoriaHorarioCatalogoRepository teoriaHorarioCatalogoRepository;

    private final TeoriaHorarioCatalogoQueryService teoriaHorarioCatalogoQueryService;

    public TeoriaHorarioCatalogoResource(
        TeoriaHorarioCatalogoService teoriaHorarioCatalogoService,
        TeoriaHorarioCatalogoRepository teoriaHorarioCatalogoRepository,
        TeoriaHorarioCatalogoQueryService teoriaHorarioCatalogoQueryService
    ) {
        this.teoriaHorarioCatalogoService = teoriaHorarioCatalogoService;
        this.teoriaHorarioCatalogoRepository = teoriaHorarioCatalogoRepository;
        this.teoriaHorarioCatalogoQueryService = teoriaHorarioCatalogoQueryService;
    }

    /**
     * {@code POST  /teoria-horario-catalogos} : Create a new teoriaHorarioCatalogo.
     *
     * @param teoriaHorarioCatalogo the teoriaHorarioCatalogo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new teoriaHorarioCatalogo, or with status {@code 400 (Bad Request)} if the teoriaHorarioCatalogo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/teoria-horario-catalogos")
    public ResponseEntity<TeoriaHorarioCatalogo> createTeoriaHorarioCatalogo(
        @Valid @RequestBody TeoriaHorarioCatalogo teoriaHorarioCatalogo
    ) throws URISyntaxException {
        log.debug("REST request to save TeoriaHorarioCatalogo : {}", teoriaHorarioCatalogo);
        if (teoriaHorarioCatalogo.getId() != null) {
            throw new BadRequestAlertException("A new teoriaHorarioCatalogo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TeoriaHorarioCatalogo result = teoriaHorarioCatalogoService.save(teoriaHorarioCatalogo);
        return ResponseEntity
            .created(new URI("/api/teoria-horario-catalogos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /teoria-horario-catalogos/:id} : Updates an existing teoriaHorarioCatalogo.
     *
     * @param id the id of the teoriaHorarioCatalogo to save.
     * @param teoriaHorarioCatalogo the teoriaHorarioCatalogo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated teoriaHorarioCatalogo,
     * or with status {@code 400 (Bad Request)} if the teoriaHorarioCatalogo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the teoriaHorarioCatalogo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/teoria-horario-catalogos/{id}")
    public ResponseEntity<TeoriaHorarioCatalogo> updateTeoriaHorarioCatalogo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody TeoriaHorarioCatalogo teoriaHorarioCatalogo
    ) throws URISyntaxException {
        log.debug("REST request to update TeoriaHorarioCatalogo : {}, {}", id, teoriaHorarioCatalogo);
        if (teoriaHorarioCatalogo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, teoriaHorarioCatalogo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!teoriaHorarioCatalogoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        TeoriaHorarioCatalogo result = teoriaHorarioCatalogoService.update(teoriaHorarioCatalogo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, teoriaHorarioCatalogo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /teoria-horario-catalogos/:id} : Partial updates given fields of an existing teoriaHorarioCatalogo, field will ignore if it is null
     *
     * @param id the id of the teoriaHorarioCatalogo to save.
     * @param teoriaHorarioCatalogo the teoriaHorarioCatalogo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated teoriaHorarioCatalogo,
     * or with status {@code 400 (Bad Request)} if the teoriaHorarioCatalogo is not valid,
     * or with status {@code 404 (Not Found)} if the teoriaHorarioCatalogo is not found,
     * or with status {@code 500 (Internal Server Error)} if the teoriaHorarioCatalogo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/teoria-horario-catalogos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<TeoriaHorarioCatalogo> partialUpdateTeoriaHorarioCatalogo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody TeoriaHorarioCatalogo teoriaHorarioCatalogo
    ) throws URISyntaxException {
        log.debug("REST request to partial update TeoriaHorarioCatalogo partially : {}, {}", id, teoriaHorarioCatalogo);
        if (teoriaHorarioCatalogo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, teoriaHorarioCatalogo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!teoriaHorarioCatalogoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<TeoriaHorarioCatalogo> result = teoriaHorarioCatalogoService.partialUpdate(teoriaHorarioCatalogo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, teoriaHorarioCatalogo.getId().toString())
        );
    }

    /**
     * {@code GET  /teoria-horario-catalogos} : get all the teoriaHorarioCatalogos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of teoriaHorarioCatalogos in body.
     */
    @GetMapping("/teoria-horario-catalogos")
    public ResponseEntity<List<TeoriaHorarioCatalogo>> getAllTeoriaHorarioCatalogos(TeoriaHorarioCatalogoCriteria criteria) {
        log.debug("REST request to get TeoriaHorarioCatalogos by criteria: {}", criteria);
        List<TeoriaHorarioCatalogo> entityList = teoriaHorarioCatalogoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /teoria-horario-catalogos/count} : count all the teoriaHorarioCatalogos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/teoria-horario-catalogos/count")
    public ResponseEntity<Long> countTeoriaHorarioCatalogos(TeoriaHorarioCatalogoCriteria criteria) {
        log.debug("REST request to count TeoriaHorarioCatalogos by criteria: {}", criteria);
        return ResponseEntity.ok().body(teoriaHorarioCatalogoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /teoria-horario-catalogos/:id} : get the "id" teoriaHorarioCatalogo.
     *
     * @param id the id of the teoriaHorarioCatalogo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the teoriaHorarioCatalogo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/teoria-horario-catalogos/{id}")
    public ResponseEntity<TeoriaHorarioCatalogo> getTeoriaHorarioCatalogo(@PathVariable Long id) {
        log.debug("REST request to get TeoriaHorarioCatalogo : {}", id);
        Optional<TeoriaHorarioCatalogo> teoriaHorarioCatalogo = teoriaHorarioCatalogoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(teoriaHorarioCatalogo);
    }

    /**
     * {@code DELETE  /teoria-horario-catalogos/:id} : delete the "id" teoriaHorarioCatalogo.
     *
     * @param id the id of the teoriaHorarioCatalogo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/teoria-horario-catalogos/{id}")
    public ResponseEntity<Void> deleteTeoriaHorarioCatalogo(@PathVariable Long id) {
        log.debug("REST request to delete TeoriaHorarioCatalogo : {}", id);
        teoriaHorarioCatalogoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
