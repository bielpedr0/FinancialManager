package com.test.security.config;

import com.test.security.domain.entity.Category;
import com.test.security.domain.enums.CategoryType; // Make sure to import the new enum
import com.test.security.repository.CategoryRepository; // Import the renamed repository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository; // Use the renamed repository

    @Override
    public void run(String... args) throws Exception {
        // Only load data if the repository is empty
        if (categoryRepository.count() == 0) {
            // Expenses
            Category food = new Category(null, "Food", CategoryType.EXPENSE);
            Category transport = new Category(null, "Transport", CategoryType.EXPENSE);
            Category housing = new Category(null, "Housing", CategoryType.EXPENSE);
            Category leisure = new Category(null, "Leisure", CategoryType.EXPENSE);
            Category otherExpenses = new Category(null, "Other Expenses", CategoryType.EXPENSE);

            // Incomes
            Category salary = new Category(null, "Salary", CategoryType.INCOME);
            Category freelance = new Category(null, "Freelance", CategoryType.INCOME);
            Category otherIncomes = new Category(null, "Other Incomes", CategoryType.INCOME);

            categoryRepository.saveAll(Arrays.asList(
                    food, transport, housing, leisure, otherExpenses,
                    salary, freelance, otherIncomes
            ));
            System.out.println("Initial categories loaded into the database.");
        }
    }
}
