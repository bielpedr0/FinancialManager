package com.test.security.service.impl;

import com.test.security.domain.entity.Category;
import com.test.security.domain.enums.CategoryType;
import com.test.security.repository.CategoryRepository;
import com.test.security.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findAll(CategoryType tipo) {
        if(tipo != null){
            return categoryRepository.findByTipo(tipo);
        }
        return categoryRepository.findAll();
    }
}
