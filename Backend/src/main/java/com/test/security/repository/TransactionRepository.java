package com.test.security.repository;

import com.test.security.domain.entity.Transaction;
import com.test.security.domain.entity.User;
import com.test.security.domain.enums.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>,
        JpaSpecificationExecutor<Transaction> {
    Optional<Transaction> findByIdAndUsuario(Long transactionId, User user);

    @Query("""
        SELECT COALESCE(SUM(t.valor), 0) 
        FROM Transaction t 
        WHERE t.usuario = :user 
        AND t.categoria.tipo = :tipo 
        AND t.data BETWEEN :start AND :end
    """)
    BigDecimal sumByUserAndTypeAndDateBetween(
            @Param("user") User user,
            @Param("tipo") CategoryType tipo,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}
