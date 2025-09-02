package com.test.security.domain.entity;

import com.test.security.domain.enums.CategoryType;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@ToString
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String nome;

    @Enumerated(EnumType.STRING) // Store enum as String in the database
    @Column(nullable = false, length = 10)
    private CategoryType tipo;

    // If you want a bidirectional relationship (Categoria to many Transacoes), you
    // can add:
    // @OneToMany(mappedBy = "categoria")
    // private List<Transacao> transacoes;
    // For now, keeping it unidirectional from Transacao to Categoria is simpler.
}
