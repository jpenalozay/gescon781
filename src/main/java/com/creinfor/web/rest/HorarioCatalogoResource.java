package com.creinfor.web.rest;

import com.creinfor.domain.HorarioCatalogo;
import com.creinfor.repository.HorarioCatalogoRepository;
import com.creinfor.service.HorarioCatalogoQueryService;
import com.creinfor.service.HorarioCatalogoService;
import com.creinfor.service.criteria.HorarioCatalogoCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.HorarioCatalogo}.
 */
@RestController
@RequestMapping("/api")
public class HorarioCatalogoResource {

    private final Logger log = LoggerFactory.getLogger(HorarioCatalogoResource.class);

    private static final String ENTITY_NAME = "horarioCatalogo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HorarioCatalogoService horarioCatalogoService;

    private final HorarioCatalogoRepository horarioCatalogoRepository;

    private final HorarioCatalogoQueryService horarioCatalogoQueryService;

    public HorarioCatalogoResource(
        HorarioCatalogoService horarioCatalogoService,
        HorarioCatalogoRepository horarioCatalogoRepository,
        HorarioCatalogoQueryService horarioCatalogoQueryService
    ) {
        this.horarioCatalogoService = horarioCatalogoService;
        this.horarioCatalogoRepository = horarioCatalogoRepository;
        this.horarioCatalogoQueryService = horarioCatalogoQueryService;
    }

    /**
     * {@code POST  /horario-catalogos} : Create a new horarioCatalogo.
     *
     * @param horarioCatalogo the horarioCatalogo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new horarioCatalogo, or with status {@code 400 (Bad Request)} if the horarioCatalogo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/horario-catalogos")
    public ResponseEntity<HorarioCatalogo> createHorarioCatalogo(@Valid @RequestBody HorarioCatalogo horarioCatalogo)
        throws URISyntaxException {
        log.debug("REST request to save HorarioCatalogo : {}", horarioCatalogo);
        if (horarioCatalogo.getId() != null) {
            throw new BadRequestAlertException("A new horarioCatalogo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HorarioCatalogo result = horarioCatalogoService.save(horarioCatalogo);
        return ResponseEntity
            .created(new URI("/api/horario-catalogos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /horario-catalogos/:id} : Updates an existing horarioCatalogo.
     *
     * @param id the id of the horarioCatalogo to save.
     * @param horarioCatalogo the horarioCatalogo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horarioCatalogo,
     * or with status {@code 400 (Bad Request)} if the horarioCatalogo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the horarioCatalogo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/horario-catalogos/{id}")
    public ResponseEntity<HorarioCatalogo> updateHorarioCatalogo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody HorarioCatalogo horarioCatalogo
    ) throws URISyntaxException {
        log.debug("REST request to update HorarioCatalogo : {}, {}", id, horarioCatalogo);
        if (horarioCatalogo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, horarioCatalogo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!horarioCatalogoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HorarioCatalogo result = horarioCatalogoService.update(horarioCatalogo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, horarioCatalogo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /horario-catalogos/:id} : Partial updates given fields of an existing horarioCatalogo, field will ignore if it is null
     *
     * @param id the id of the horarioCatalogo to save.
     * @param horarioCatalogo the horarioCatalogo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horarioCatalogo,
     * or with status {@code 400 (Bad Request)} if the horarioCatalogo is not valid,
     * or with status {@code 404 (Not Found)} if the horarioCatalogo is not found,
     * or with status {@code 500 (Internal Server Error)} if the horarioCatalogo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/horario-catalogos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<HorarioCatalogo> partialUpdateHorarioCatalogo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody HorarioCatalogo horarioCatalogo
    ) throws URISyntaxException {
        log.debug("REST request to partial update HorarioCatalogo partially : {}, {}", id, horarioCatalogo);
        if (horarioCatalogo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, horarioCatalogo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!horarioCatalogoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HorarioCatalogo> result = horarioCatalogoService.partialUpdate(horarioCatalogo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, horarioCatalogo.getId().toString())
        );
    }

    /**
     * {@code GET  /horario-catalogos} : get all the horarioCatalogos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of horarioCatalogos in body.
     */
    @GetMapping("/horario-catalogos")
    public ResponseEntity<List<HorarioCatalogo>> getAllHorarioCatalogos(HorarioCatalogoCriteria criteria) {
        log.debug("REST request to get HorarioCatalogos by criteria: {}", criteria);
        List<HorarioCatalogo> entityList = horarioCatalogoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /horario-catalogos/count} : count all the horarioCatalogos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/horario-catalogos/count")
    public ResponseEntity<Long> countHorarioCatalogos(HorarioCatalogoCriteria criteria) {
        log.debug("REST request to count HorarioCatalogos by criteria: {}", criteria);
        return ResponseEntity.ok().body(horarioCatalogoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /horario-catalogos/:id} : get the "id" horarioCatalogo.
     *
     * @param id the id of the horarioCatalogo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the horarioCatalogo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/horario-catalogos/{id}")
    public ResponseEntity<HorarioCatalogo> getHorarioCatalogo(@PathVariable Long id) {
        log.debug("REST request to get HorarioCatalogo : {}", id);
        Optional<HorarioCatalogo> horarioCatalogo = horarioCatalogoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(horarioCatalogo);
    }

    /**
     * {@code DELETE  /horario-catalogos/:id} : delete the "id" horarioCatalogo.
     *
     * @param id the id of the horarioCatalogo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/horario-catalogos/{id}")
    public ResponseEntity<Void> deleteHorarioCatalogo(@PathVariable Long id) {
        log.debug("REST request to delete HorarioCatalogo : {}", id);
        horarioCatalogoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
