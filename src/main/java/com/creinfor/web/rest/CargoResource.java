package com.creinfor.web.rest;

import com.creinfor.domain.Cargo;
import com.creinfor.repository.CargoRepository;
import com.creinfor.service.CargoQueryService;
import com.creinfor.service.CargoService;
import com.creinfor.service.criteria.CargoCriteria;
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
 * REST controller for managing {@link com.creinfor.domain.Cargo}.
 */
@RestController
@RequestMapping("/api")
public class CargoResource {

    private final Logger log = LoggerFactory.getLogger(CargoResource.class);

    private static final String ENTITY_NAME = "cargo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CargoService cargoService;

    private final CargoRepository cargoRepository;

    private final CargoQueryService cargoQueryService;

    public CargoResource(CargoService cargoService, CargoRepository cargoRepository, CargoQueryService cargoQueryService) {
        this.cargoService = cargoService;
        this.cargoRepository = cargoRepository;
        this.cargoQueryService = cargoQueryService;
    }

    /**
     * {@code POST  /cargos} : Create a new cargo.
     *
     * @param cargo the cargo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cargo, or with status {@code 400 (Bad Request)} if the cargo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cargos")
    public ResponseEntity<Cargo> createCargo(@Valid @RequestBody Cargo cargo) throws URISyntaxException {
        log.debug("REST request to save Cargo : {}", cargo);
        if (cargo.getId() != null) {
            throw new BadRequestAlertException("A new cargo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cargo result = cargoService.save(cargo);
        return ResponseEntity
            .created(new URI("/api/cargos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cargos/:id} : Updates an existing cargo.
     *
     * @param id the id of the cargo to save.
     * @param cargo the cargo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cargo,
     * or with status {@code 400 (Bad Request)} if the cargo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cargo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cargos/{id}")
    public ResponseEntity<Cargo> updateCargo(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Cargo cargo)
        throws URISyntaxException {
        log.debug("REST request to update Cargo : {}, {}", id, cargo);
        if (cargo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cargo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cargoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Cargo result = cargoService.update(cargo);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cargo.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cargos/:id} : Partial updates given fields of an existing cargo, field will ignore if it is null
     *
     * @param id the id of the cargo to save.
     * @param cargo the cargo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cargo,
     * or with status {@code 400 (Bad Request)} if the cargo is not valid,
     * or with status {@code 404 (Not Found)} if the cargo is not found,
     * or with status {@code 500 (Internal Server Error)} if the cargo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cargos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Cargo> partialUpdateCargo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Cargo cargo
    ) throws URISyntaxException {
        log.debug("REST request to partial update Cargo partially : {}, {}", id, cargo);
        if (cargo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cargo.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cargoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Cargo> result = cargoService.partialUpdate(cargo);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cargo.getId().toString())
        );
    }

    /**
     * {@code GET  /cargos} : get all the cargos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cargos in body.
     */
    @GetMapping("/cargos")
    public ResponseEntity<List<Cargo>> getAllCargos(CargoCriteria criteria) {
        log.debug("REST request to get Cargos by criteria: {}", criteria);
        List<Cargo> entityList = cargoQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /cargos/count} : count all the cargos.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/cargos/count")
    public ResponseEntity<Long> countCargos(CargoCriteria criteria) {
        log.debug("REST request to count Cargos by criteria: {}", criteria);
        return ResponseEntity.ok().body(cargoQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /cargos/:id} : get the "id" cargo.
     *
     * @param id the id of the cargo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cargo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cargos/{id}")
    public ResponseEntity<Cargo> getCargo(@PathVariable Long id) {
        log.debug("REST request to get Cargo : {}", id);
        Optional<Cargo> cargo = cargoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cargo);
    }

    /**
     * {@code DELETE  /cargos/:id} : delete the "id" cargo.
     *
     * @param id the id of the cargo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cargos/{id}")
    public ResponseEntity<Void> deleteCargo(@PathVariable Long id) {
        log.debug("REST request to delete Cargo : {}", id);
        cargoService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
