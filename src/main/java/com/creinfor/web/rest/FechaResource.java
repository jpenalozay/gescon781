package com.creinfor.web.rest;

import com.creinfor.domain.Fecha;
import com.creinfor.repository.FechaRepository;
import com.creinfor.service.FechaQueryService;
import com.creinfor.service.FechaService;
import com.creinfor.service.criteria.FechaCriteria;
import com.creinfor.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.creinfor.domain.Fecha}.
 */
@RestController
@RequestMapping("/api")
public class FechaResource {

    private final Logger log = LoggerFactory.getLogger(FechaResource.class);

    private final FechaService fechaService;

    private final FechaRepository fechaRepository;

    private final FechaQueryService fechaQueryService;

    public FechaResource(FechaService fechaService, FechaRepository fechaRepository, FechaQueryService fechaQueryService) {
        this.fechaService = fechaService;
        this.fechaRepository = fechaRepository;
        this.fechaQueryService = fechaQueryService;
    }

    /**
     * {@code GET  /fechas} : get all the fechas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fechas in body.
     */
    @GetMapping("/fechas")
    public ResponseEntity<List<Fecha>> getAllFechas(FechaCriteria criteria) {
        log.debug("REST request to get Fechas by criteria: {}", criteria);
        List<Fecha> entityList = fechaQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }

    /**
     * {@code GET  /fechas/count} : count all the fechas.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/fechas/count")
    public ResponseEntity<Long> countFechas(FechaCriteria criteria) {
        log.debug("REST request to count Fechas by criteria: {}", criteria);
        return ResponseEntity.ok().body(fechaQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /fechas/:id} : get the "id" fecha.
     *
     * @param id the id of the fecha to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fecha, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fechas/{id}")
    public ResponseEntity<Fecha> getFecha(@PathVariable Long id) {
        log.debug("REST request to get Fecha : {}", id);
        Optional<Fecha> fecha = fechaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fecha);
    }
}
