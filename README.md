# MyCareForce - My Hospital

## Visão Geral
Desenvolvido com Expo, Typescript, Aws Amplify e um Mockdata que simula o retorno de uma query.

- Proposta:
A proposta do app é permitir com que enfermeiros possam se candidatar a turnos  em unidades de saúde. Tentei trazer uma dinâmica mais visual, com animações durante as transições, e uma autenticação básica. O aplicativo possui uma página inicial onde é listado todas as unidades de saúde que possuem turnos disponíveis, onde os enfermeiros podem se candidatar.

Devido ao tempo de entrega e as prioridades precisei selecionar apenas 3 componentes para realizar os testes unitários com Jest (Header, Button e Card). Abaixo está a instrução de como rodar os testes, junto com as outras informações necessárias para rodar o projeto.

## Instalação

### Pré-requisitos
- Node.js (v14.x or later)
- npm or yarn
- amplify/cli

### Passo a Passo
1. **Clonar Repositório:**
   ```bash
   git clone https://github.com/GuilhermeFerreiraa/MyHospital.git
   cd myhospital

1. **Instalar Dependências:**
   ```bash
   npm install
   yarn install
   
## Configurar AWS Amplify:

Esclarecimento: Em um cenário real, com fins corporativos ou pessoais, o arquivo `aws-exports.js` deveria estar dentro do `.gitignore`, por se tratar de um arquivo sensível. Neste caso, estou utilizando exclusivamente para fins de testes sobre o projeto.

- Instalar o Aws-amplify CLI
```bash
npm install -g @aws-amplify/cli
# ou
yarn global add @aws-amplify/cli
```

*caso de dúvidas entre no site: https://docs.amplify.aws/gen1/react-native/prev/build-a-backend/


## Executar a aplicação
```bash
  npm run start
```

- Testes unitários com Jest:
```bash
  npm run test
```
