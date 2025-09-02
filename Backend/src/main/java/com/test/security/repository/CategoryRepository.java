package com.test.security.repository;

import com.test.security.domain.entity.Category;
import com.test.security.domain.enums.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Custom query to find all categories of a specific type
    List<Category> findByTipo(CategoryType tipo);

}