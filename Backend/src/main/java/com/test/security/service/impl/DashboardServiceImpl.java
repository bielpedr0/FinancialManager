package com.test.security.service.impl;

import com.test.security.controller.dto.response.DashboardSummaryDTO;
import com.test.security.domain.entity.User;
import com.test.security.domain.enums.CategoryType;
import com.test.security.repository.TransactionRepository;
import com.test.security.service.DashboardService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final TransactionRepository repository;

    public DashboardServiceImpl(TransactionRepository repository) {
        this.repository = repository;
    }

    @Override
    public DashboardSummaryDTO getMonthlySummary(User user, Integer month, Integer year) {
         LocalDate now = LocalDate.now();
        YearMonth yearMonth = YearMonth.of(
                year != null ? year : now.getYear(),
                month != null ? month : now.getMonthValue()
        );

        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);

        BigDecimal totalIncome = repository.sumByUserAndTypeAndDateBetween(
                user, CategoryType.INCOME, startOfMonth, endOfMonth
        );

        BigDecimal totalExpense = repository.sumByUserAndTypeAndDateBetween(
                user, CategoryType.EXPENSE, startOfMonth, endOfMonth
        );

        BigDecimal balance = totalIncome.subtract(totalExpense);

        return new DashboardSummaryDTO(totalIncome, balance, totalExpense);
    }
}
