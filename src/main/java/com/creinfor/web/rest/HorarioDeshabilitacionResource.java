package com.creinfor.web.rest;

import com.creinfor.domain.HorarioDeshabilitacion;
import com.creinfor.repository.HorarioDeshabilitacionRepository;
import com.creinfor.service.HorarioDeshabilitacionQueryService;
import com.creinfor.service.HorarioDeshabilitacionService;
import com.creinfor.service.criteria.HorarioDeshabilitacionCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.HorarioDeshabilitacion}.
 */
@RestController
@RequestMapping("/api")
public class HorarioDeshabilitacionResource {

    private final Logger log = LoggerFactory.getLogger(HorarioDeshabilitacionResource.class);

    private static final String ENTITY_NAME = "horarioDeshabilitacion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HorarioDeshabilitacionService horarioDeshabilitacionService;

    private final HorarioDeshabilitacionRepository horarioDeshabilitacionRepository;

    private final HorarioDeshabilitacionQueryService horarioDeshabilitacionQueryService;

    public HorarioDeshabilitacionResource(
        HorarioDeshabilitacionService horarioDeshabilitacionService,
        HorarioDeshabilitacionRepository horarioDeshabilitacionRepository,
        HorarioDeshabilitacionQueryService horarioDeshabilitacionQueryService
    ) {
        this.horarioDeshabilitacionService = horarioDeshabilitacionService;
        this.horarioDeshabilitacionRepository = horarioDeshabilitacionRepository;
        this.horarioDeshabilitacionQueryService = horarioDeshabilitacionQueryService;
    }

    /**
     * {@code POST  /horario-deshabilitacions} : Create a new horarioDeshabilitacion.
     *
     * @param horarioDeshabilitacion the horarioDeshabilitacion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new horarioDeshabilitacion, or with status {@code 400 (Bad Request)} if the horarioDeshabilitacion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/horario-deshabilitacions")
    public ResponseEntity<HorarioDeshabilitacion> createHorarioDeshabilitacion(
        @Valid @RequestBody HorarioDeshabilitacion horarioDeshabilitacion
    ) throws URISyntaxException {
        log.debug("REST request to save HorarioDeshabilitacion : {}", horarioDeshabilitacion);
        if (horarioDeshabilitacion.getId() != null) {
            throw new BadRequestAlertException("A new horarioDeshabilitacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HorarioDeshabilitacion result = horarioDeshabilitacionService.save(horarioDeshabilitacion);
        return ResponseEntity
            .created(new URI("/api/horario-deshabilitacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /horario-deshabilitacions/:id} : Updates an existing horarioDeshabilitacion.
     *
     * @param id the id of the horarioDeshabilitacion to save.
     * @param horarioDeshabilitacion the horarioDeshabilitacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horarioDeshabilitacion,
     * or with status {@code 400 (Bad Request)} if the horarioDeshabilitacion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the horarioDeshabilitacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/horario-deshabilitacions/{id}")
    public ResponseEntity<HorarioDeshabilitacion> updateHorarioDeshabilitacion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody HorarioDeshabilitacion horarioDeshabilitacion
    ) throws URISyntaxException {
        log.debug("REST request to update HorarioDeshabilitacion : {}, {}", id, horarioDeshabilitacion);
        if (horarioDeshabilitacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, horarioDeshabilitacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!horarioDeshabilitacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HorarioDeshabilitacion result = horarioDeshabilitacionService.update(horarioDeshabilitacion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, horarioDeshabilitacion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /horario-deshabilitacions/:id} : Partial updates given fields of an existing horarioDeshabilitacion, field will ignore if it is null
     *
     * @param id the id of the horarioDeshabilitacion to save.
     * @param horarioDeshabilitacion the horarioDeshabilitacion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horarioDeshabilitacion,
     * or with status {@code 400 (Bad Request)} if the horarioDeshabilitacion is not valid,
     * or with status {@code 404 (Not Found)} if the horarioDeshabilitacion is not found,
     * or with status {@code 500 (Internal Server Error)} if the horarioDeshabilitacion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/horario-deshabilitacions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<HorarioDeshabilitacion> partialUpdateHorarioDeshabilitacion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody HorarioDeshabilitacion horarioDeshabilitacion
    ) throws URISyntaxException {
        log.debug("REST request to partial update HorarioDeshabilitacion partially : {}, {}", id, horarioDeshabilitacion);
        if (horarioDeshabilitacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, horarioDeshabilitacion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!horarioDeshabilitacionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HorarioDeshabilitacion> result = horarioDeshabilitacionService.partialUpdate(horarioDeshabilitacion);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, horarioDeshabilitacion.getId().toString())
        );
    }

    /**
     * {@code GET  /horario-deshabilitacions} : get all the horarioDeshabilitacions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of horarioDeshabilitacions in body.
     */
    @GetMapping("/horario-deshabilitacions")
    public ResponseEntity<List<HorarioDeshabilitacion>> getAllHorarioDeshabilitacions(HorarioDeshabilitacionCriteria criteria) {
        log.debug("REST request to get HorarioDeshabilitacions by criteria: {}", criteria);
        List<HorarioDeshabilitacion> entityList = horarioDeshabilitacionQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /horario-deshabilitacions/count} : count all the horarioDeshabilitacions.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/horario-deshabilitacions/count")
    public ResponseEntity<Long> countHorarioDeshabilitacions(HorarioDeshabilitacionCriteria criteria) {
        log.debug("REST request to count HorarioDeshabilitacions by criteria: {}", criteria);
        return ResponseEntity.ok().body(horarioDeshabilitacionQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /horario-deshabilitacions/:id} : get the "id" horarioDeshabilitacion.
     *
     * @param id the id of the horarioDeshabilitacion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the horarioDeshabilitacion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/horario-deshabilitacions/{id}")
    public ResponseEntity<HorarioDeshabilitacion> getHorarioDeshabilitacion(@PathVariable Long id) {
        log.debug("REST request to get HorarioDeshabilitacion : {}", id);
        Optional<HorarioDeshabilitacion> horarioDeshabilitacion = horarioDeshabilitacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(horarioDeshabilitacion);
    }

    /**
     * {@code DELETE  /horario-deshabilitacions/:id} : delete the "id" horarioDeshabilitacion.
     *
     * @param id the id of the horarioDeshabilitacion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/horario-deshabilitacions/{id}")
    public ResponseEntity<Void> deleteHorarioDeshabilitacion(@PathVariable Long id) {
        log.debug("REST request to delete HorarioDeshabilitacion : {}", id);
        horarioDeshabilitacionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
