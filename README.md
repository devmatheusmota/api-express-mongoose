# API REST com NodeJS + MongoDB + Mongoose + Express

## 🪧 Sobre

CRUD API desenvolvida em **NodeJS** com o framework **Express**, utilizando o banco não-relacional **MongoDB** e biblioteca **Mongoose** para fazer a conexão com o banco.

Update: Recentemente foi introduzido autenticaçao via Auth0

Videoaula base: **[Matheus Battisti](https://www.youtube.com/watch?v=K5QaTfE5ylk&ab_channel=MatheusBattisti-HoradeCodar)**

---

## 🚀 Tecnologias utilizadas

- [NodeJS](https://nodejs.org/en/)
- [Postman](https://www.postman.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

---

## 📦 Como baixar o projeto

```bash
  # Clonar o repositório
  $ git clone https://github.com/devmatheusmota/api-express-mongoose.git

  # Entrar no repositório
  $ cd api-express-mongoose

  # Instalar as dependências
  $ npm install

  # Criar suas próprias variáveis de ambiente
  # com o login e password do MongoDB
  # (substituir usuario/password e tirar as < >)
  $ echo -e 'DB_USER=<Usuario MongoDB>\nDB_PASSWORD=<Senha MongoDB>' >> .env
  # Lembrando que o comando acima da uma incompatibilidade no Power Shell
  # Nesse caso crie as variáveis de ambiente manualmente

  # Iniciar o projeto
  $ npm start
```

---

## Métodos

Requisições para a API devem seguir os padrões:
| Método | Recurso | Descrição |
|---|---|--|
| `GET` | /person | Retorna informações de um ou mais registros. |
| `POST` | /person | Utilizado para criar um novo registro. |
| `PATCH` | /person/{id} | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | /person/{id} | Remove um registro do sistema. |

---

## Corpo da requisicao para os métodos POST e PATCH

### **Exemplo**

```json
{
	"name": "Matheus",
	"salary": 4800,
	"approved": true
}
```
