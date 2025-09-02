package com.test.security.controller.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record TransactionDTO (
        String descricao,
        BigDecimal valor,
        LocalDateTime data,
        Long categoriaId
) {
}
