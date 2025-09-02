package com.test.security.repository.specification;


import com.test.security.controller.dto.filter.TransactionFilter;
import com.test.security.domain.entity.Category;
import com.test.security.domain.entity.Transaction;
import com.test.security.domain.entity.User;
import com.test.security.domain.enums.CategoryType;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class TransactionSpecification {

    public static Specification<Transaction> getTransactionsByFilter(User user, TransactionFilter filter, LocalDateTime start, LocalDateTime end) {
        // Start with a specification that finds transactions for the given user
        Specification<Transaction> spec = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("usuario"), user);

        // Add the date range filter (this one is mandatory)
        spec = spec.and((root, query, criteriaBuilder) ->
                criteriaBuilder.between(root.get("data"), start, end));

        // If a type filter is provided, add it to the specification
        if (filter.getTipo() != null) {
            spec = spec.and(hasType(filter.getTipo()));
        }

        if (filter.getDescription() != null && !filter.getDescription().isEmpty()) {
            spec = spec.and(hasDescription(filter.getDescription()));
        }

        return spec;
    }

    // Private helper specification to filter by CategoryType
    private static Specification<Transaction> hasType(CategoryType tipo) {
        return (root, query, criteriaBuilder) -> {
            Join<Transaction, Category> categoryJoin = root.join("categoria");
            return criteriaBuilder.equal(categoryJoin.get("tipo"), tipo);
        };
    }

    private static Specification<Transaction> hasDescription(String description) {
    return (root, query, criteriaBuilder) ->
            criteriaBuilder.like(criteriaBuilder.lower(root.get("descricao")), "%" + description.toLowerCase() + "%");
    }
}
