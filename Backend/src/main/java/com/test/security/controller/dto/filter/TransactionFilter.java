package com.test.security.controller.dto.filter;

import com.test.security.domain.enums.CategoryType;

public class TransactionFilter {
    private Integer month;
    private Integer year;
    private CategoryType tipo;
    private String description;

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public CategoryType getTipo() {
        return tipo;
    }

    public void setTipo(CategoryType tipo) {
        this.tipo = tipo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
