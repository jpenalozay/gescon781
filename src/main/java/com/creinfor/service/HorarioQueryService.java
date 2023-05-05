package com.creinfor.service;

import com.creinfor.domain.*; // for static metamodels
import com.creinfor.domain.Horario;
import com.creinfor.repository.HorarioRepository;
import com.creinfor.service.criteria.HorarioCriteria;
import com.creinfor.service.dto.HorarioInfoDTO;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.criteria.JoinType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Horario} entities in the database.
 * The main input is a {@link HorarioCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Horario} or a {@link Page} of {@link Horario} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class HorarioQueryService extends QueryService<Horario> {

    private final Logger log = LoggerFactory.getLogger(HorarioQueryService.class);

    private final HorarioRepository horarioRepository;

    public HorarioQueryService(HorarioRepository horarioRepository) {
        this.horarioRepository = horarioRepository;
    }

    /**
     * Return a {@link List} of {@link Horario} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Horario> findByCriteria(HorarioCriteria criteria) {
        log.debug("find by criteria : {}", criteria
        );
        final Specification<Horario> specification = createSpecification(criteria);
        return horarioRepository.findAll(specification);
    }

    @Transactional(readOnly = true)
    public List<HorarioInfoDTO> findByCriteriaInfo(HorarioCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Horario> specification = createSpecification(criteria);
        List<Horario> horarios = horarioRepository.findAll(specification);
        List<HorarioInfoDTO> horariosInfo = new ArrayList<>();
        for (Horario horario : horarios) {
            // Obtener información adicional de otras entidades (alumno, persona, instructor)
            HorarioCatalogo horarioCatalogo = horario.getHorarioCatalogo();
            Fecha fecha = horario.getFecha();
            Alumno alumno = horario.getAlumno();            
            Persona persona = alumno.getPersona();
            Profesor instructor = horario.getInstructor();
            Empleado empleado = instructor.getEmpleado();
            Persona personaI = empleado.getPersona();
            Automovil automovil = horario.getAutomovil();
            LugarSalida lugarSalida = horario.getLugarSalida();
            HorarioInfoDTO horarioInfo = new HorarioInfoDTO();                        
            horarioInfo.setId(horario.getId());
            horarioInfo.setHorario(horarioCatalogo.getHoraInicio() + " - " + horarioCatalogo.getHoraFin() );
            horarioInfo.setFecha(fecha.getFecha().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));            
            horarioInfo.setAlumnoNombre(persona.getNombres() + " " + persona.getApellidoPaterno() + " " + persona.getApellidoMaterno());
            horarioInfo.setInstructorNombre(personaI.getNombres() + " " + personaI.getApellidoPaterno() + " " + personaI.getApellidoMaterno().charAt(0) + ".");            
            horarioInfo.setAutomovil(automovil.getPlaca() + " " + automovil.getCaja().toString().charAt(0));
            horarioInfo.setLugarSalida(lugarSalida.getNombre());
            // Agregar el objeto HorarioInfoDTO a la lista de resultados
            horariosInfo.add(horarioInfo);
        }
        return horariosInfo;
    }
    

    /**
     * Return a {@link Page} of {@link Horario} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Horario> findByCriteria(HorarioCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Horario> specification = createSpecification(criteria);
        return horarioRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(HorarioCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Horario> specification = createSpecification(criteria);
        return horarioRepository.count(specification);
    }

    /**
     * Function to convert {@link HorarioCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Horario> createSpecification(HorarioCriteria criteria) {
        Specification<Horario> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Horario_.id));
            }
            if (criteria.getActivo() != null) {
                specification = specification.and(buildSpecification(criteria.getActivo(), Horario_.activo));
            }
            if (criteria.getTipo() != null) {
                specification = specification.and(buildSpecification(criteria.getTipo(), Horario_.tipo));
            }
            if (criteria.getFechaDia() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaDia(), Horario_.fechaDia));
            }
            if (criteria.getFechaDiaSem() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFechaDiaSem(), Horario_.fechaDiaSem));
            }
            if (criteria.getHorarioDeshabilitacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioDeshabilitacionId(),
                            root -> root.join(Horario_.horarioDeshabilitacions, JoinType.LEFT).get(HorarioDeshabilitacion_.id)
                        )
                    );
            }
            if (criteria.getAlumnoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getAlumnoId(), root -> root.join(Horario_.alumno, JoinType.LEFT).get(Alumno_.id))
                    );
            }
            if (criteria.getInstructorId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getInstructorId(),
                            root -> root.join(Horario_.instructor, JoinType.LEFT).get(Profesor_.id)
                        )
                    );
            }
            if (criteria.getProgramacionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getProgramacionId(),
                            root -> root.join(Horario_.programacion, JoinType.LEFT).get(Programacion_.id)
                        )
                    );
            }
            if (criteria.getFechaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getFechaId(), root -> root.join(Horario_.fecha, JoinType.LEFT).get(Fecha_.id))
                    );
            }
            if (criteria.getHorarioCatalogoId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getHorarioCatalogoId(),
                            root -> root.join(Horario_.horarioCatalogo, JoinType.LEFT).get(HorarioCatalogo_.id)
                        )
                    );
            }
            if (criteria.getAutomovilId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getAutomovilId(),
                            root -> root.join(Horario_.automovil, JoinType.LEFT).get(Automovil_.id)
                        )
                    );
            }
            if (criteria.getLugarSalidaId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getLugarSalidaId(),
                            root -> root.join(Horario_.lugarSalida, JoinType.LEFT).get(LugarSalida_.id)
                        )
                    );
            }
        }
        return specification;
    }
}
