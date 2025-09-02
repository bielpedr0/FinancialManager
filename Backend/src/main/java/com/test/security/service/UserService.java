package com.test.security.service;

import com.test.security.controller.dto.UserDTO;
import com.test.security.domain.entity.User;

public interface UserService {
    User registerUser(UserDTO userDTO);
}
