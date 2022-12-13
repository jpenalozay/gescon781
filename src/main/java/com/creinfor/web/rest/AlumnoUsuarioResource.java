package com.creinfor.web.rest;

import com.creinfor.domain.AlumnoUsuario;
import com.creinfor.repository.AlumnoUsuarioRepository;
import com.creinfor.service.AlumnoUsuarioQueryService;
import com.creinfor.service.AlumnoUsuarioService;
import com.creinfor.service.criteria.AlumnoUsuarioCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.AlumnoUsuario}.
 */
@RestController
@RequestMapping("/api")
public class AlumnoUsuarioResource {

    private final Logger log = LoggerFactory.getLogger(AlumnoUsuarioResource.class);

    private static final String ENTITY_NAME = "alumnoUsuario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlumnoUsuarioService alumnoUsuarioService;

    private final AlumnoUsuarioRepository alumnoUsuarioRepository;

    private final AlumnoUsuarioQueryService alumnoUsuarioQueryService;

    public AlumnoUsuarioResource(
        AlumnoUsuarioService alumnoUsuarioService,
        AlumnoUsuarioRepository alumnoUsuarioRepository,
        AlumnoUsuarioQueryService alumnoUsuarioQueryService
    ) {
        this.alumnoUsuarioService = alumnoUsuarioService;
        this.alumnoUsuarioRepository = alumnoUsuarioRepository;
        this.alumnoUsuarioQueryService = alumnoUsuarioQueryService;
    }

    /**
     * {@code POST  /alumno-usuarios} : Create a new alumnoUsuario.
     *
     * @param alumnoUsuario the alumnoUsuario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alumnoUsuario, or with status {@code 400 (Bad Request)} if the alumnoUsuario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/alumno-usuarios")
    public ResponseEntity<AlumnoUsuario> createAlumnoUsuario(@Valid @RequestBody AlumnoUsuario alumnoUsuario) throws URISyntaxException {
        log.debug("REST request to save AlumnoUsuario : {}", alumnoUsuario);
        if (alumnoUsuario.getId() != null) {
            throw new BadRequestAlertException("A new alumnoUsuario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AlumnoUsuario result = alumnoUsuarioService.save(alumnoUsuario);
        return ResponseEntity
            .created(new URI("/api/alumno-usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /alumno-usuarios/:id} : Updates an existing alumnoUsuario.
     *
     * @param id the id of the alumnoUsuario to save.
     * @param alumnoUsuario the alumnoUsuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alumnoUsuario,
     * or with status {@code 400 (Bad Request)} if the alumnoUsuario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alumnoUsuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/alumno-usuarios/{id}")
    public ResponseEntity<AlumnoUsuario> updateAlumnoUsuario(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AlumnoUsuario alumnoUsuario
    ) throws URISyntaxException {
        log.debug("REST request to update AlumnoUsuario : {}, {}", id, alumnoUsuario);
        if (alumnoUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alumnoUsuario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alumnoUsuarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        AlumnoUsuario result = alumnoUsuarioService.update(alumnoUsuario);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alumnoUsuario.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /alumno-usuarios/:id} : Partial updates given fields of an existing alumnoUsuario, field will ignore if it is null
     *
     * @param id the id of the alumnoUsuario to save.
     * @param alumnoUsuario the alumnoUsuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alumnoUsuario,
     * or with status {@code 400 (Bad Request)} if the alumnoUsuario is not valid,
     * or with status {@code 404 (Not Found)} if the alumnoUsuario is not found,
     * or with status {@code 500 (Internal Server Error)} if the alumnoUsuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/alumno-usuarios/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AlumnoUsuario> partialUpdateAlumnoUsuario(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AlumnoUsuario alumnoUsuario
    ) throws URISyntaxException {
        log.debug("REST request to partial update AlumnoUsuario partially : {}, {}", id, alumnoUsuario);
        if (alumnoUsuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alumnoUsuario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alumnoUsuarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AlumnoUsuario> result = alumnoUsuarioService.partialUpdate(alumnoUsuario);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alumnoUsuario.getId().toString())
        );
    }

    /**
     * {@code GET  /alumno-usuarios} : get all the alumnoUsuarios.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alumnoUsuarios in body.
     */
    @GetMapping("/alumno-usuarios")
    public ResponseEntity<List<AlumnoUsuario>> getAllAlumnoUsuarios(AlumnoUsuarioCriteria criteria) {
        log.debug("REST request to get AlumnoUsuarios by criteria: {}", criteria);
        List<AlumnoUsuario> entityList = alumnoUsuarioQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /alumno-usuarios/count} : count all the alumnoUsuarios.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/alumno-usuarios/count")
    public ResponseEntity<Long> countAlumnoUsuarios(AlumnoUsuarioCriteria criteria) {
        log.debug("REST request to count AlumnoUsuarios by criteria: {}", criteria);
        return ResponseEntity.ok().body(alumnoUsuarioQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /alumno-usuarios/:id} : get the "id" alumnoUsuario.
     *
     * @param id the id of the alumnoUsuario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alumnoUsuario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/alumno-usuarios/{id}")
    public ResponseEntity<AlumnoUsuario> getAlumnoUsuario(@PathVariable Long id) {
        log.debug("REST request to get AlumnoUsuario : {}", id);
        Optional<AlumnoUsuario> alumnoUsuario = alumnoUsuarioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(alumnoUsuario);
    }

    /**
     * {@code DELETE  /alumno-usuarios/:id} : delete the "id" alumnoUsuario.
     *
     * @param id the id of the alumnoUsuario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/alumno-usuarios/{id}")
    public ResponseEntity<Void> deleteAlumnoUsuario(@PathVariable Long id) {
        log.debug("REST request to delete AlumnoUsuario : {}", id);
        alumnoUsuarioService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
