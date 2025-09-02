package com.test.security.controller;

import com.test.security.domain.entity.Category;
import com.test.security.domain.enums.CategoryType;
import com.test.security.service.impl.CategoryServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoryController {
    private final CategoryServiceImpl categoryServiceImpl;

    public CategoryController(CategoryServiceImpl categoryServiceImpl) {
        this.categoryServiceImpl = categoryServiceImpl;
    }

   @GetMapping
   @Operation(summary = "Get all categories", description = "Returns a list of all available categories. This endpoint is public.")
   @ApiResponse(responseCode = "200", description = "Successfully retrieved list")
   public ResponseEntity<List<Category>> getAllCategories(@RequestParam(required = false) CategoryType tipo){
        return ResponseEntity.ok(categoryServiceImpl.findAll(tipo));
   }
}
