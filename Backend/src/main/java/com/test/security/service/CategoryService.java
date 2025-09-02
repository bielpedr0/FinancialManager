package com.test.security.service;

import com.test.security.domain.entity.Category;
import com.test.security.domain.enums.CategoryType;

import java.util.List;

public interface CategoryService {
    List<Category> findAll(CategoryType tipo);
}
