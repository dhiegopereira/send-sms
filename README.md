Aqui está um passo a passo que você pode adicionar ao seu README para configurar o envio de SMS usando a Twilio:

---

## Envio de SMS pela [Twilio](https://admin.twilio.com/)

### Passo a Passo

#### 1. **Criar uma Conta na Twilio**

1. Acesse [Twilio](https://www.twilio.com/).
2. Clique em "Sign Up" (Inscreva-se) para criar uma conta.
3. Complete o processo de inscrição fornecendo seu e-mail, criando uma senha e seguindo os passos necessários para verificar sua conta.

#### 2. **Comprar um Número de Telefone**

1. **Acesse o Console Twilio**:
   - Após fazer login, vá para o [Twilio Console](https://www.twilio.com/console).

2. **Adquira um Número de Telefone**:
   - No painel do console, navegue até a seção "Phone Numbers" (Números de Telefone).
   - Clique em "Buy a Number" (Comprar um Número).
   - Escolha um número que suporte o envio de SMS e complete a compra. 

3. **Anote o Número de Telefone**:
   - O número adquirido será listado no seu painel. Use este número para o campo `From` em suas configurações de envio de SMS.

#### 3. **Configurar as Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do seu projeto e adicione as seguintes variáveis:

```env
TWILIO_ACCOUNT_SID=seu_account_sid_aqui
TWILIO_AUTH_TOKEN=seu_auth_token_aqui
TWILIO_PHONE_NUMBER=seu_numero_de_telefone_twilio_aqui
```

- **TWILIO_ACCOUNT_SID**: Encontre o `Account SID` no [Twilio Console](https://www.twilio.com/console).
- **TWILIO_AUTH_TOKEN**: Encontre o `Auth Token` no [Twilio Console](https://www.twilio.com/console).
- **TWILIO_PHONE_NUMBER**: O número de telefone adquirido da Twilio (no formato E.164, ex: +15555555555).

#### 4. **Exemplo de Código para Envio de SMS**

Aqui está um exemplo de como configurar e usar a Twilio para enviar SMS:

**Classe `SmsSendUseCase.ts`:**

```typescript
import twilio from 'twilio';
import { SmsRequestDto, SmsResponseDto } from "../../../application/dto/SmsDto";
import SmsEntity from '../../entities/SmsEntity';
import { inject, injectable } from 'tsyringe';
import { SmsRepository } from '../../../infrastructure/persistence/SmsRepository';

@injectable()
export default class SmsSendUseCase {
    private readonly clientTwilio;

    constructor(
        @inject('SmsRepository') private readonly smsRepository: SmsRepository
    ) {
        this.clientTwilio = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    async execute(smsRequestDto: SmsRequestDto): Promise<SmsResponseDto> {
        await this.clientTwilio.messages.create({
            body: smsRequestDto.body,
            from: process.env.TWILIO_PHONE_NUMBER ?? 'DEFAULT_PHONE_NUMBER',
            to: smsRequestDto.to,
        });

        const smsEntity = new SmsEntity(process.env.TWILIO_PHONE_NUMBER ?? 'DEFAULT_PHONE_NUMBER',
            smsRequestDto.to,
            smsRequestDto.body,
            'Ok',
            new Date());

        await this.smsRepository.SaveSms(smsEntity);

        return smsEntity as SmsResponseDto;
    }
}
```

### Links Úteis

- [Twilio Console](https://www.twilio.com/console)
- [Documentação da API Twilio](https://www.twilio.com/docs/sms)
- [Preços e Planos da Twilio](https://www.twilio.com/pricing)
