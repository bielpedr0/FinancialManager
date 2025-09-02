package com.test.security.controller.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class TransactionResponseDTO {
    private Long id;
    private String descricao;
    private BigDecimal valor;
    private LocalDateTime data;
    private CategoryResponseDTO categoria; // Use the Category DTO
}
