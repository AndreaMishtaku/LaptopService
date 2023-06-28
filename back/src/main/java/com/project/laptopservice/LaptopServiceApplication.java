package com.project.laptopservice;

import com.project.laptopservice.model.User;
import com.project.laptopservice.model.enums.Role;
import com.project.laptopservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Optional;

@SpringBootApplication
@EnableWebMvc
public class LaptopServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(LaptopServiceApplication.class, args);
    }


    @Bean
    public CommandLineRunner commandLineRunner(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {

        return args -> {
            User admin = new User();
            admin.setFirstName("Andrea");
            admin.setLastName("Mishtaku");
            admin.setEmail("admin@gmail.com");
            admin.setBirthday(LocalDate.parse("1997-12-09"));
            admin.setPassword(passwordEncoder.encode("123456"));
            admin.setAddress("Tirane,Albania");
            admin.setEducation("Computer Engineering,UPT");
            admin.setRole(Role.ADMIN);


            Optional<User> user=userRepository.findByEmail(admin.getEmail());
            if(user.isEmpty()) {
                userRepository.save(admin);
            }

        };
    }

}
