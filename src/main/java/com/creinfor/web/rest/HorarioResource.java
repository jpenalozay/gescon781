package com.creinfor.web.rest;

import com.creinfor.domain.Horario;
import com.creinfor.repository.HorarioRepository;
import com.creinfor.service.HorarioQueryService;
import com.creinfor.service.HorarioService;
import com.creinfor.service.criteria.HorarioCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.Horario}.
 */
@RestController
@RequestMapping("/api")
public class HorarioResource {

    private final Logger log = LoggerFactory.getLogger(HorarioResource.class);

    private static final String ENTITY_NAME = "horario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HorarioService horarioService;

    private final HorarioRepository horarioRepository;

    private final HorarioQueryService horarioQueryService;

    public HorarioResource(HorarioService horarioService, HorarioRepository horarioRepository, HorarioQueryService horarioQueryService) {
        this.horarioService = horarioService;
        this.horarioRepository = horarioRepository;
        this.horarioQueryService = horarioQueryService;
    }

    /**
     * {@code POST  /horarios} : Create a new horario.
     *
     * @param horario the horario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new horario, or with status {@code 400 (Bad Request)} if the horario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/horarios")
    public ResponseEntity<Horario> createHorario(@Valid @RequestBody Horario horario) throws URISyntaxException {
        log.debug("REST request to save Horario : {}", horario);
        if (horario.getId() != null) {
            throw new BadRequestAlertException("A new horario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Horario result = horarioService.save(horario);
        return ResponseEntity
            .created(new URI("/api/horarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /horarios/:id} : Updates an existing horario.
     *
     * @param id the id of the horario to save.
     * @param horario the horario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horario,
     * or with status {@code 400 (Bad Request)} if the horario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the horario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/horarios/{id}")
    public ResponseEntity<Horario> updateHorario(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Horario horario
    ) throws URISyntaxException {
        log.debug("REST request to update Horario : {}, {}", id, horario);
        if (horario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, horario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!horarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Horario result = horarioService.update(horario);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, horario.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /horarios/:id} : Partial updates given fields of an existing horario, field will ignore if it is null
     *
     * @param id the id of the horario to save.
     * @param horario the horario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated horario,
     * or with status {@code 400 (Bad Request)} if the horario is not valid,
     * or with status {@code 404 (Not Found)} if the horario is not found,
     * or with status {@code 500 (Internal Server Error)} if the horario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/horarios/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Horario> partialUpdateHorario(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Horario horario
    ) throws URISyntaxException {
        log.debug("REST request to partial update Horario partially : {}, {}", id, horario);
        if (horario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, horario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!horarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Horario> result = horarioService.partialUpdate(horario);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, horario.getId().toString())
        );
    }

    /**
     * {@code GET  /horarios} : get all the horarios.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of horarios in body.
     */
    @GetMapping("/horarios")
    public ResponseEntity<List<Horario>> getAllHorarios(HorarioCriteria criteria) {
        log.debug("REST request to get Horarios by criteria: {}", criteria);
        List<Horario> entityList = horarioQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /horarios/count} : count all the horarios.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/horarios/count")
    public ResponseEntity<Long> countHorarios(HorarioCriteria criteria) {
        log.debug("REST request to count Horarios by criteria: {}", criteria);
        return ResponseEntity.ok().body(horarioQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /horarios/:id} : get the "id" horario.
     *
     * @param id the id of the horario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the horario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/horarios/{id}")
    public ResponseEntity<Horario> getHorario(@PathVariable Long id) {
        log.debug("REST request to get Horario : {}", id);
        Optional<Horario> horario = horarioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(horario);
    }

    /**
     * {@code DELETE  /horarios/:id} : delete the "id" horario.
     *
     * @param id the id of the horario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/horarios/{id}")
    public ResponseEntity<Void> deleteHorario(@PathVariable Long id) {
        log.debug("REST request to delete Horario : {}", id);
        horarioService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
