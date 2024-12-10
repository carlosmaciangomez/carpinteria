/*ackage com.example.carpinteria.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

import com.example.carpinteria.entity.Usuario;
import com.example.carpinteria.repository.UsuarioRepository;

@Component
public class ActualizarContrasenas {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void actualizarContrasenas() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // Obtener todos los usuarios
        List<Usuario> usuarios = usuarioRepository.findAll();

        for (Usuario usuario : usuarios) {
            String contrasenaActual = usuario.getContrasenaUsuario();

            // Verificar si ya está hasheada
            if (!contrasenaActual.startsWith("$2a$")) { // Bcrypt hashes start with "$2a$"
                // Hashear la contraseña y actualizar el usuario
                String contrasenaHasheada = passwordEncoder.encode(contrasenaActual);
                usuario.setContrasenaUsuario(contrasenaHasheada);

                // Guardar el usuario actualizado
                usuarioRepository.save(usuario);
            }
        }

        System.out.println("Todas las contraseñas han sido actualizadas.");
    }
}
*/