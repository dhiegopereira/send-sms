export const emailTemplate = (message: string) => {
    return `
<html>
  <head>
    <style>
      .email-container {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .email-header {
        background-color: #f7f7f7;
        padding: 20px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .email-body {
        padding: 20px;
      }
      .email-footer {
        padding: 10px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        background-color: #007bff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        Bem-vindo ao Nosso Serviço!
      </div>
      <div class="email-body">
        <p>Olá,</p>
        <p>${message}</p>
        <p>Esperamos que você aproveite os nossos serviços!</p>
        <a href="https://www.example.com" class="button">Acesse agora</a>
      </div>
      <div class="email-footer">
        &copy; 2024 Nossa Empresa. Todos os direitos reservados.
      </div>
    </div>
  </body>
</html>
`
}