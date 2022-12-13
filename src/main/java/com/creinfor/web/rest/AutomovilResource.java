package com.creinfor.web.rest;

import com.creinfor.domain.Automovil;
import com.creinfor.repository.AutomovilRepository;
import com.creinfor.service.AutomovilQueryService;
import com.creinfor.service.AutomovilService;
import com.creinfor.service.criteria.AutomovilCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.Automovil}.
 */
@RestController
@RequestMapping("/api")
public class AutomovilResource {

    private final Logger log = LoggerFactory.getLogger(AutomovilResource.class);

    private static final String ENTITY_NAME = "automovil";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AutomovilService automovilService;

    private final AutomovilRepository automovilRepository;

    private final AutomovilQueryService automovilQueryService;

    public AutomovilResource(
        AutomovilService automovilService,
        AutomovilRepository automovilRepository,
        AutomovilQueryService automovilQueryService
    ) {
        this.automovilService = automovilService;
        this.automovilRepository = automovilRepository;
        this.automovilQueryService = automovilQueryService;
    }

    /**
     * {@code POST  /automovils} : Create a new automovil.
     *
     * @param automovil the automovil to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new automovil, or with status {@code 400 (Bad Request)} if the automovil has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/automovils")
    public ResponseEntity<Automovil> createAutomovil(@Valid @RequestBody Automovil automovil) throws URISyntaxException {
        log.debug("REST request to save Automovil : {}", automovil);
        if (automovil.getId() != null) {
            throw new BadRequestAlertException("A new automovil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Automovil result = automovilService.save(automovil);
        return ResponseEntity
            .created(new URI("/api/automovils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /automovils/:id} : Updates an existing automovil.
     *
     * @param id the id of the automovil to save.
     * @param automovil the automovil to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated automovil,
     * or with status {@code 400 (Bad Request)} if the automovil is not valid,
     * or with status {@code 500 (Internal Server Error)} if the automovil couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/automovils/{id}")
    public ResponseEntity<Automovil> updateAutomovil(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Automovil automovil
    ) throws URISyntaxException {
        log.debug("REST request to update Automovil : {}, {}", id, automovil);
        if (automovil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, automovil.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!automovilRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Automovil result = automovilService.update(automovil);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, automovil.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /automovils/:id} : Partial updates given fields of an existing automovil, field will ignore if it is null
     *
     * @param id the id of the automovil to save.
     * @param automovil the automovil to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated automovil,
     * or with status {@code 400 (Bad Request)} if the automovil is not valid,
     * or with status {@code 404 (Not Found)} if the automovil is not found,
     * or with status {@code 500 (Internal Server Error)} if the automovil couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/automovils/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Automovil> partialUpdateAutomovil(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Automovil automovil
    ) throws URISyntaxException {
        log.debug("REST request to partial update Automovil partially : {}, {}", id, automovil);
        if (automovil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, automovil.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!automovilRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Automovil> result = automovilService.partialUpdate(automovil);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, automovil.getId().toString())
        );
    }

    /**
     * {@code GET  /automovils} : get all the automovils.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of automovils in body.
     */
    @GetMapping("/automovils")
    public ResponseEntity<List<Automovil>> getAllAutomovils(AutomovilCriteria criteria) {
        log.debug("REST request to get Automovils by criteria: {}", criteria);
        List<Automovil> entityList = automovilQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /automovils/count} : count all the automovils.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/automovils/count")
    public ResponseEntity<Long> countAutomovils(AutomovilCriteria criteria) {
        log.debug("REST request to count Automovils by criteria: {}", criteria);
        return ResponseEntity.ok().body(automovilQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /automovils/:id} : get the "id" automovil.
     *
     * @param id the id of the automovil to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the automovil, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/automovils/{id}")
    public ResponseEntity<Automovil> getAutomovil(@PathVariable Long id) {
        log.debug("REST request to get Automovil : {}", id);
        Optional<Automovil> automovil = automovilService.findOne(id);
        return ResponseUtil.wrapOrNotFound(automovil);
    }

    /**
     * {@code DELETE  /automovils/:id} : delete the "id" automovil.
     *
     * @param id the id of the automovil to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/automovils/{id}")
    public ResponseEntity<Void> deleteAutomovil(@PathVariable Long id) {
        log.debug("REST request to delete Automovil : {}", id);
        automovilService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
