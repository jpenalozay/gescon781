package com.creinfor.web.rest;

import com.creinfor.domain.Teoria;
import com.creinfor.repository.TeoriaRepository;
import com.creinfor.service.TeoriaQueryService;
import com.creinfor.service.TeoriaService;
import com.creinfor.service.criteria.TeoriaCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.Teoria}.
 */
@RestController
@RequestMapping("/api")
public class TeoriaResource {

    private final Logger log = LoggerFactory.getLogger(TeoriaResource.class);

    private static final String ENTITY_NAME = "teoria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TeoriaService teoriaService;

    private final TeoriaRepository teoriaRepository;

    private final TeoriaQueryService teoriaQueryService;

    public TeoriaResource(TeoriaService teoriaService, TeoriaRepository teoriaRepository, TeoriaQueryService teoriaQueryService) {
        this.teoriaService = teoriaService;
        this.teoriaRepository = teoriaRepository;
        this.teoriaQueryService = teoriaQueryService;
    }

    /**
     * {@code POST  /teorias} : Create a new teoria.
     *
     * @param teoria the teoria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new teoria, or with status {@code 400 (Bad Request)} if the teoria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/teorias")
    public ResponseEntity<Teoria> createTeoria(@Valid @RequestBody Teoria teoria) throws URISyntaxException {
        log.debug("REST request to save Teoria : {}", teoria);
        if (teoria.getId() != null) {
            throw new BadRequestAlertException("A new teoria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Teoria result = teoriaService.save(teoria);
        return ResponseEntity
            .created(new URI("/api/teorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /teorias/:id} : Updates an existing teoria.
     *
     * @param id the id of the teoria to save.
     * @param teoria the teoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated teoria,
     * or with status {@code 400 (Bad Request)} if the teoria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the teoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/teorias/{id}")
    public ResponseEntity<Teoria> updateTeoria(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Teoria teoria
    ) throws URISyntaxException {
        log.debug("REST request to update Teoria : {}, {}", id, teoria);
        if (teoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, teoria.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!teoriaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Teoria result = teoriaService.update(teoria);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, teoria.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /teorias/:id} : Partial updates given fields of an existing teoria, field will ignore if it is null
     *
     * @param id the id of the teoria to save.
     * @param teoria the teoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated teoria,
     * or with status {@code 400 (Bad Request)} if the teoria is not valid,
     * or with status {@code 404 (Not Found)} if the teoria is not found,
     * or with status {@code 500 (Internal Server Error)} if the teoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/teorias/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Teoria> partialUpdateTeoria(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Teoria teoria
    ) throws URISyntaxException {
        log.debug("REST request to partial update Teoria partially : {}, {}", id, teoria);
        if (teoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, teoria.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!teoriaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Teoria> result = teoriaService.partialUpdate(teoria);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, teoria.getId().toString())
        );
    }

    /**
     * {@code GET  /teorias} : get all the teorias.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of teorias in body.
     */
    @GetMapping("/teorias")
    public ResponseEntity<List<Teoria>> getAllTeorias(TeoriaCriteria criteria) {
        log.debug("REST request to get Teorias by criteria: {}", criteria);
        List<Teoria> entityList = teoriaQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /teorias/count} : count all the teorias.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/teorias/count")
    public ResponseEntity<Long> countTeorias(TeoriaCriteria criteria) {
        log.debug("REST request to count Teorias by criteria: {}", criteria);
        return ResponseEntity.ok().body(teoriaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /teorias/:id} : get the "id" teoria.
     *
     * @param id the id of the teoria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the teoria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/teorias/{id}")
    public ResponseEntity<Teoria> getTeoria(@PathVariable Long id) {
        log.debug("REST request to get Teoria : {}", id);
        Optional<Teoria> teoria = teoriaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(teoria);
    }

    /**
     * {@code DELETE  /teorias/:id} : delete the "id" teoria.
     *
     * @param id the id of the teoria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/teorias/{id}")
    public ResponseEntity<Void> deleteTeoria(@PathVariable Long id) {
        log.debug("REST request to delete Teoria : {}", id);
        teoriaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
