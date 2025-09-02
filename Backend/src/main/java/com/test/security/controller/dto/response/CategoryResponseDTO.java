package com.test.security.controller.dto.response;

import com.test.security.domain.enums.CategoryType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryResponseDTO {
    private Long id;
    private String nome;
    private CategoryType tipo;
}
