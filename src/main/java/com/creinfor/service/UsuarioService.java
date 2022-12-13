package com.creinfor.service;

import com.creinfor.domain.Usuario;
import com.creinfor.repository.UsuarioRepository;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Usuario}.
 */
@Service
@Transactional
public class UsuarioService {

    private final Logger log = LoggerFactory.getLogger(UsuarioService.class);

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    /**
     * Save a usuario.
     *
     * @param usuario the entity to save.
     * @return the persisted entity.
     */
    public Usuario save(Usuario usuario) {
        log.debug("Request to save Usuario : {}", usuario);
        return usuarioRepository.save(usuario);
    }

    /**
     * Update a usuario.
     *
     * @param usuario the entity to save.
     * @return the persisted entity.
     */
    public Usuario update(Usuario usuario) {
        log.debug("Request to save Usuario : {}", usuario);
        return usuarioRepository.save(usuario);
    }

    /**
     * Partially update a usuario.
     *
     * @param usuario the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Usuario> partialUpdate(Usuario usuario) {
        log.debug("Request to partially update Usuario : {}", usuario);

        return usuarioRepository
            .findById(usuario.getId())
            .map(existingUsuario -> {
                if (usuario.getCodigo() != null) {
                    existingUsuario.setCodigo(usuario.getCodigo());
                }
                if (usuario.getCodigoSecreto() != null) {
                    existingUsuario.setCodigoSecreto(usuario.getCodigoSecreto());
                }
                if (usuario.getImagen() != null) {
                    existingUsuario.setImagen(usuario.getImagen());
                }
                if (usuario.getImagenContentType() != null) {
                    existingUsuario.setImagenContentType(usuario.getImagenContentType());
                }

                return existingUsuario;
            })
            .map(usuarioRepository::save);
    }

    /**
     * Get all the usuarios.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Usuario> findAll() {
        log.debug("Request to get all Usuarios");
        return usuarioRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the usuarios with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Usuario> findAllWithEagerRelationships(Pageable pageable) {
        return usuarioRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one usuario by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Usuario> findOne(Long id) {
        log.debug("Request to get Usuario : {}", id);
        return usuarioRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the usuario by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Usuario : {}", id);
        usuarioRepository.deleteById(id);
    }
}
