package com.test.security.controller;

import com.test.security.controller.dto.TransactionDTO;
import com.test.security.controller.dto.filter.TransactionFilter;
import com.test.security.controller.dto.response.TransactionResponseDTO;
import com.test.security.domain.entity.User;
import com.test.security.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transactions")
@Tag(name = "Transactions", description = "Endpoints for managing user transactions") // Groups endpoints under "Transactions"
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Operation(summary = "Create new Transaction from DTO")
    @ApiResponse(responseCode = "201", description = "Transaction created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    @ApiResponse(responseCode = "401", description = "Unauthorized - JWT token is missing or invalid")
    @PostMapping
    public ResponseEntity<String> createTransaction(
            @RequestBody TransactionDTO transactionDTO,
            @AuthenticationPrincipal User user) {

        transactionService.createTransaction(transactionDTO, user);
        return ResponseEntity.status(201).body("Transaction successfully created"); // 201 Created
    }

    @GetMapping
    @Operation(
        summary = "Get paginated list of transactions",
        description = "Returns a paginated list of the authenticated user's transactions for a given month. Can be filtered by type (INCOME/EXPENSE).",
        security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<Page<TransactionResponseDTO>> getTransactions(
                     @AuthenticationPrincipal User user,
                     TransactionFilter filter,
                     Pageable pageable) {
        Page<TransactionResponseDTO> transactionsDtoPage = transactionService.findTransactionsByUser(user, filter, pageable);
        return ResponseEntity.ok(transactionsDtoPage);
    }

    @GetMapping("/{id}")
    @Operation(summary = "get transaction by id")
    @ApiResponse(responseCode = "200", description = "Transaction updated successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "403", description = "Forbidden - User does not own this transaction")
    @ApiResponse(responseCode = "404", description = "Transaction not found")
    public ResponseEntity<TransactionResponseDTO> getTransactionByID(
                                            @AuthenticationPrincipal User user
                                            ,@PathVariable Long id){
        return ResponseEntity.ok(transactionService.findTransactionById(id, user));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing transaction")
    @ApiResponse(responseCode = "200", description = "Transaction updated successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "403", description = "Forbidden - User does not own this transaction")
    @ApiResponse(responseCode = "404", description = "Transaction not found")
    public ResponseEntity<TransactionResponseDTO> updateTransactional(
                    @AuthenticationPrincipal User user,
                    @PathVariable Long id,
                    @RequestBody TransactionDTO transactionDTO
    ){
       return ResponseEntity.ok(transactionService.updateTransaction(id, transactionDTO, user));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Update an existing transaction")
    @ApiResponse(responseCode = "200", description = "Transaction updated successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "403", description = "Forbidden - User does not own this transaction")
    @ApiResponse(responseCode = "404", description = "Transaction not found")
    public ResponseEntity<String> deleteTransaction(@AuthenticationPrincipal User user, @PathVariable Long id){
        transactionService.deleteTransaction(id, user);
        return ResponseEntity.noContent().build();
    }
}
