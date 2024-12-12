# Case Melhor Celular

Este projeto foi criado para demonstrar uma aplicação moderna e eficiente utilizando tecnologias otimizadas para desenvolvimento rápido e flexível. Abaixo, você encontrará detalhes sobre as escolhas de tecnologia e a organização do projeto.

---

## Tecnologias Utilizadas

### **Vite**
- **Motivação:** Escolhemos o Vite por ser uma ferramenta de build mais leve e rápida, oferecendo uma experiência de desenvolvimento mais fluida, com hot-reload quase instantâneo.
- **Vantagens:** O Vite também gera um bundle final otimizado, geralmente menor em comparação a outras ferramentas como Webpack, o que contribui para uma melhor performance em produção.

### **Tailwind CSS**
- **Motivação:** Optamos por Tailwind devido à sua abordagem utilitária para estilização, que permite criar interfaces rapidamente sem sair do código, aumentando significativamente a produtividade.

### **React-Hook-Forms + Zod**
- **Motivação:** Utilizamos React-Hook-Forms para gerenciar estados e validações dos formulários de maneira eficiente, reduzindo o número de renders e melhorando a performance.
- **Validações:** Integrado com Zod para uma validação de dados poderosa e declarativa.

### **Material-UI**
- **Motivação:** A biblioteca foi escolhida para garantir consistência visual com ícones e componentes alinhados ao protótipo.

### **JSON-Server**
- **Motivação:** Utilizamos JSON-Server para mockar endpoints da API, permitindo simular requisições reais de forma rápida e fácil durante o desenvolvimento.

---

## Estrutura do Projeto

A estrutura do projeto foi organizada para garantir escalabilidade e separação de responsabilidades:

```
/src
  |-- components        # Componentes comuns da interface (ex.: Header, Footer)
  |-- contexts          # Contextos globais (ex.: Autenticação, Produtos)
  |-- layouts           # Layouts das páginas (ex.: estrutura com Header e Footer)
  |-- pages             # Páginas principais da aplicação (ex.: Home, Login, Produtos)
  |-- routes            # Rotas configuradas com React-Router e React-Hook-Forms
  |-- services          # Serviços para chamadas à API (ex.: integração com JSON-Server)
```

---

## Decisões Técnicas

### **Contextos**
- **Autenticação:** Criamos um contexto de autenticação fake para capturar o CPF do usuário, simulando a experiência de login e utilizando o CPF nas requisições subsequentes.
- **Produtos:** Implementamos um contexto global para armazenar informações de produtos, melhorando a fluidez e experiência do usuário ao evitar múltiplas requisições para a mesma informação em diferentes telas.

### **Separação de Responsabilidades**
- Adotamos uma abordagem granular de componentização, organizando os elementos de interface em componentes reutilizáveis. Isso evita a sobrecarga de arquivos grandes e facilita a manutenção e evolução do código.

---

## Como Executar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o JSON-Server para mockar os endpoints:
   ```bash
   npx json-server --watch db.json --port 3001
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse o projeto no navegador:
   ```
   http://localhost:5173
   ```

---

