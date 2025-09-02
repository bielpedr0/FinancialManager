package com.test.security.service.impl;

import com.test.security.controller.dto.TransactionDTO;
import com.test.security.controller.dto.filter.TransactionFilter;
import com.test.security.controller.dto.response.CategoryResponseDTO;
import com.test.security.controller.dto.response.TransactionResponseDTO;
import com.test.security.domain.entity.Category;
import com.test.security.domain.entity.Transaction;
import com.test.security.domain.entity.User;
import com.test.security.exception.ResourceNotFoundException;
import com.test.security.repository.CategoryRepository;
import com.test.security.repository.TransactionRepository;
import com.test.security.repository.specification.TransactionSpecification;
import com.test.security.service.TransactionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;

@Service
public class TransactionServiceImpl implements TransactionService {

    public TransactionServiceImpl(TransactionRepository transactionRepository, CategoryRepository categoryRepository){
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
    }

    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public void createTransaction(TransactionDTO transactionDTO, User user) {
        Transaction transaction = buildTransaction(transactionDTO, user);
        try {
            transactionRepository.save(transaction);
        } catch (RuntimeException e) {
            throw new RuntimeException("It was not possible to create a new Transaction");
        }
    }

    private Transaction buildTransaction(TransactionDTO transactionDTO, User user) {
        Category category = categoryRepository.findById(transactionDTO.categoriaId())
                .orElseThrow(() -> new RuntimeException("Category not found!"));

        Transaction transaction = new Transaction();
        transaction.setDescricao(transactionDTO.descricao());
        transaction.setValor(transactionDTO.valor());
        transaction.setData(transactionDTO.data());
        transaction.setCategoria(category);
        transaction.setUsuario(user); // Set the authenticated user
        return transaction;
    }

    @Override
    public Page<TransactionResponseDTO> findTransactionsByUser(User user, TransactionFilter filter, Pageable pageable) {
        LocalDate now = LocalDate.now();
        YearMonth yearMonth = YearMonth.of(
                filter.getYear() != null ? filter.getYear() : now.getYear(),
                filter.getMonth() != null ? filter.getMonth() : now.getMonthValue()
        );

        LocalDateTime startOfMonth = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = yearMonth.atEndOfMonth().atTime(23, 59, 59);

        Specification<Transaction> spec = TransactionSpecification.getTransactionsByFilter(user, filter, startOfMonth, endOfMonth);

        Page<Transaction> transactionPage = transactionRepository.findAll(spec, pageable);

        return transactionPage.map(this::convertToDto);
    }

    @Override
    public TransactionResponseDTO updateTransaction(Long transactionId, TransactionDTO transactionDTO, User user) {
        Transaction transaction = getValidTransaction(transactionId, user);
        return saveTransactional(transaction, transactionDTO);
    }

    @Override
    public void deleteTransaction(Long transactionId, User user) {
        Transaction transaction = getValidTransaction(transactionId, user);
        transactionRepository.delete(transaction);
    }

    @Override
    public TransactionResponseDTO findTransactionById(Long transactionId, User user) {
        Transaction transaction = getValidTransaction(transactionId, user);
        return this.convertToDto(transaction);
    }

    private Transaction getValidTransaction(Long transactionId, User user) {
         return transactionRepository.findByIdAndUsuario(transactionId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + transactionId));
    }

    private void setCategory(Long categoryId, Transaction transaction) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found!"));
        transaction.setCategoria(category);
    }

    private TransactionResponseDTO saveTransactional(Transaction transaction, TransactionDTO transactionDTO) {
        setCategory(transactionDTO.categoriaId(), transaction);
        transaction.setDescricao(transactionDTO.descricao());
        transaction.setValor(transactionDTO.valor());
        transaction.setData(transactionDTO.data());

        Transaction updatedTransaction = transactionRepository.save(transaction);
        return convertToDto(updatedTransaction);
    }

    private TransactionResponseDTO convertToDto(Transaction transaction) {
        TransactionResponseDTO dto = new TransactionResponseDTO();
        dto.setId(transaction.getId());
        dto.setDescricao(transaction.getDescricao());
        dto.setValor(transaction.getValor());
        dto.setData(transaction.getData());

        // Create and set the category DTO
        CategoryResponseDTO categoryDto = new CategoryResponseDTO();
        Category category = transaction.getCategoria();
        categoryDto.setId(category.getId());
        categoryDto.setNome(category.getNome());
        categoryDto.setTipo(category.getTipo());
        dto.setCategoria(categoryDto);
        return dto;
    }
}
