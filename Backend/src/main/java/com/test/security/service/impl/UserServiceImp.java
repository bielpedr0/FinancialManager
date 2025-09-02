package com.test.security.service.impl;

import com.test.security.controller.dto.UserDTO;
import com.test.security.domain.entity.User;
import com.test.security.repository.UserRepository;
import com.test.security.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {


    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserServiceImp(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(UserDTO userDTO) {
        if(userRepository.findByEmail(userDTO.email()).isPresent()){
            throw new RuntimeException("Error: Email is already in use!");
        }


        User user = new User();
        user.setNome(userDTO.nome());
        user.setEmail(userDTO.email());

        user.setSenha(passwordEncoder.encode(userDTO.senha()));

        return userRepository.save(user);
    }
}
