package com.pack.api.service;

import com.pack.api.dto.UserDTO;
import com.pack.api.model.User;
import java.util.List;

public interface UserService {
    User createUser(UserDTO userDTO);
    User updateUser(Long id, UserDTO userDTO);
    User getUserById(Long id);
    List<User> getAllUsers();
    void deleteUser(Long id);
    User getUserByUsername(String username);
}