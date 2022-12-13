package com.creinfor.web.rest;

import com.creinfor.domain.Dia;
import com.creinfor.repository.DiaRepository;
import com.creinfor.service.DiaQueryService;
import com.creinfor.service.DiaService;
import com.creinfor.service.criteria.DiaCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.Dia}.
 */
@RestController
@RequestMapping("/api")
public class DiaResource {

    private final Logger log = LoggerFactory.getLogger(DiaResource.class);

    private static final String ENTITY_NAME = "dia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiaService diaService;

    private final DiaRepository diaRepository;

    private final DiaQueryService diaQueryService;

    public DiaResource(DiaService diaService, DiaRepository diaRepository, DiaQueryService diaQueryService) {
        this.diaService = diaService;
        this.diaRepository = diaRepository;
        this.diaQueryService = diaQueryService;
    }

    /**
     * {@code POST  /dias} : Create a new dia.
     *
     * @param dia the dia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dia, or with status {@code 400 (Bad Request)} if the dia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dias")
    public ResponseEntity<Dia> createDia(@Valid @RequestBody Dia dia) throws URISyntaxException {
        log.debug("REST request to save Dia : {}", dia);
        if (dia.getId() != null) {
            throw new BadRequestAlertException("A new dia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dia result = diaService.save(dia);
        return ResponseEntity
            .created(new URI("/api/dias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dias/:id} : Updates an existing dia.
     *
     * @param id the id of the dia to save.
     * @param dia the dia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dia,
     * or with status {@code 400 (Bad Request)} if the dia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dias/{id}")
    public ResponseEntity<Dia> updateDia(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Dia dia)
        throws URISyntaxException {
        log.debug("REST request to update Dia : {}, {}", id, dia);
        if (dia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dia.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!diaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Dia result = diaService.update(dia);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dia.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /dias/:id} : Partial updates given fields of an existing dia, field will ignore if it is null
     *
     * @param id the id of the dia to save.
     * @param dia the dia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dia,
     * or with status {@code 400 (Bad Request)} if the dia is not valid,
     * or with status {@code 404 (Not Found)} if the dia is not found,
     * or with status {@code 500 (Internal Server Error)} if the dia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/dias/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Dia> partialUpdateDia(@PathVariable(value = "id", required = false) final Long id, @NotNull @RequestBody Dia dia)
        throws URISyntaxException {
        log.debug("REST request to partial update Dia partially : {}, {}", id, dia);
        if (dia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dia.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!diaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Dia> result = diaService.partialUpdate(dia);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dia.getId().toString())
        );
    }

    /**
     * {@code GET  /dias} : get all the dias.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dias in body.
     */
    @GetMapping("/dias")
    public ResponseEntity<List<Dia>> getAllDias(DiaCriteria criteria) {
        log.debug("REST request to get Dias by criteria: {}", criteria);
        List<Dia> entityList = diaQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /dias/count} : count all the dias.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/dias/count")
    public ResponseEntity<Long> countDias(DiaCriteria criteria) {
        log.debug("REST request to count Dias by criteria: {}", criteria);
        return ResponseEntity.ok().body(diaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /dias/:id} : get the "id" dia.
     *
     * @param id the id of the dia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dias/{id}")
    public ResponseEntity<Dia> getDia(@PathVariable Long id) {
        log.debug("REST request to get Dia : {}", id);
        Optional<Dia> dia = diaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dia);
    }

    /**
     * {@code DELETE  /dias/:id} : delete the "id" dia.
     *
     * @param id the id of the dia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dias/{id}")
    public ResponseEntity<Void> deleteDia(@PathVariable Long id) {
        log.debug("REST request to delete Dia : {}", id);
        diaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
