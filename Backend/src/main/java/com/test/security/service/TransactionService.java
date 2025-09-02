package com.test.security.service;

import com.test.security.controller.dto.TransactionDTO;
import com.test.security.controller.dto.filter.TransactionFilter;
import com.test.security.controller.dto.response.TransactionResponseDTO;
import com.test.security.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TransactionService {
    void createTransaction(TransactionDTO transactionDTO, User user);

    Page<TransactionResponseDTO> findTransactionsByUser(User user, TransactionFilter filter, Pageable pageable);

    TransactionResponseDTO updateTransaction(Long transactionId, TransactionDTO transactionDTO,User user);

    void deleteTransaction(Long id, User user);

    TransactionResponseDTO findTransactionById(Long transactionId, User user);
}
