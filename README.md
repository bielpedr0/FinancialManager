# Financial Manager - Gestor de Finanças Pessoais

![React.js](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat&logo=react)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=flat&logo=spring)
![Java](https://img.shields.io/badge/Language-Java-orange?style=flat&logo=java)

📌 **Sobre o Projeto**

O **Financial Manager** é uma aplicação web desenvolvida como Trabalho de Conclusão de Curso (TCC) com o objetivo de auxiliar no gerenciamento financeiro pessoal. A ferramenta permite que os usuários registrem e monitorem suas receitas e despesas de forma intuitiva, oferecendo uma visão clara de sua saúde financeira.

Este projeto visa não apenas fornecer uma solução tecnológica, mas também promover a educação financeira e o planejamento econômico entre os usuários, contribuindo para a redução do endividamento e a construção de um futuro financeiro mais seguro.

---

🚀 **Tecnologias Utilizadas**

O projeto é dividido em duas partes principais, o Front-end e o Back-end.

### Front-end
* **React:** Biblioteca JavaScript para construção da interface do usuário.

### Back-end
* **Java Spring Boot:** Framework para o desenvolvimento do servidor e da API REST.
* **PostgreSQL:** Sistema de gerenciamento de banco de dados (configurável via `application.properties`).

---

🔧 **Como Executar o Projeto**

Para rodar este projeto em sua máquina local, siga os passos abaixo. Você precisará do **Node.js** (para o Front-end) e do **Java** (para o Back-end) instalados.

### 1. Back-end (Java Spring Boot) - Configuração Essencial

O Back-end exige um arquivo de configuração (`application.properties`) para se conectar ao banco de dados e usar as chaves de segurança.

**ATENÇÃO:** Mantenha este arquivo fora do controle de versão (.gitignore) para não expor credenciais.

1.  Navegue até a pasta do **Back-end**.
2.  Crie a pasta **`resources`** (se ela não existir) dentro do caminho `src/main/`.
3.  Dentro da pasta `resources`, crie um arquivo chamado **`application.properties`**.
4.  Copie o conteúdo abaixo para o arquivo, **substituindo os valores entre colchetes** (`[]`) pelas suas próprias credenciais de banco de dados e chaves secretas:

    ```properties
    spring.application.name=security
    # Configuração do seu Banco de Dados (Exemplo PostgreSQL)
    spring.datasource.url=jdbc:postgresql://[SEU_HOST]:5432/[SEU_DB_NAME]
    spring.datasource.username=[SEU_USUARIO_DB]
    spring.datasource.password=[SUA_SENHA_DB]
    spring.datasource.driver-class-name=org.postgresql.Driver

    # Configuração JPA/Hibernate
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
    spring.jpa.show-sql=true

    # Chave Secreta para JWT (Mínimo 256 bits/32 caracteres)
    jwt.secret=[UMA_CHAVE_SECRETA_FORTE_AQUI]
    ```

5.  **Inicie a aplicação Back-end:**

    *(Use o comando apropriado para seu projeto, ex: Maven ou Gradle)*
    ```bash
    # Exemplo: Com Maven Wrapper
    ./mvnw spring-boot:run 
    ```
    Aguarde a mensagem indicando que o servidor Spring Boot foi iniciado (geralmente na porta 8080).

### 2. Front-end (React)

1.  Navegue até a pasta do Front-end:
    ```bash
    cd FinancialManager
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie a aplicação:
    ```bash
    npm start
    ```

A aplicação Front-end estará disponível em **http://localhost:3000**.

---

👨‍💻 **Autores**

* **Gabriel Pedro** - Desenvolvedor
* **Tiago Narita** - Desenvolvedor
