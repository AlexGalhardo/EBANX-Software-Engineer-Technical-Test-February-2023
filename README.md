## Software Engineer Technical Test EBANX - February 2023

#### Author: Alex Galhardo Vieira
- Email: aleexgvieira@gmail.com
- GitHub: https://github.com/AlexGalhardo
- Linkedin: https://www.linkedin.com/in/alexgalhardo/
- Blog: https://galhardo-blog.vercel.app
- Source Code: https://github.com/AlexGalhardo/EBANX-Software-Engineer-Technical-Test-February-2023

## Tools Used
- Typescript
- LinuxMint 20.3
- Bash Terminal
- Git (of course)
- VSCode
- [Insomnia](https://insomnia.rest/download) to Test HTTP Requests
- NodeJS v16 & NPM v8
- ESLINT and Prettier for Typescript
- Jest for automatic/unit tests

## Keep in Mind
- Durability *IS NOT* a requirement, that is, you don’t need to use a database or persistence mechanism.
- There is no hidden agenda, if you code passes the tests, and you are happy about it:  you are done;
- Pay attention to the package/directory structure, naming and encapsulation;
- Separate your business logic from the HTTP transport layer;
- Keep your code simple, do not try to anticipate anything that is not part of the spec;
- Keep your code malleable, we may ask for modifications;
- AGAIN, Keep your code malleable, we may ask for modifications;
- Use version control, we would love to see your step-by-step process;
- Take your time, don’t rush it;
## Git Commits Semantic
- Use atomic commits
- chore: add new chore in this commit
- docs: add new documentation in this commit
- feat: add new feature/update in this commit
- fix: fix some bug or error in this commit
- refactor: refactor code logic in this commit
- style: improve code quality in this commit
- test: improve testing/tests in this commit

## Software Architecture
- I used some Clean Architecture principles
- My main reference about this topic is the book "Arquitetura Lima na Prática" from Otavio Lemos: https://www.otaviolemos.com.br/
## Instructions
### Reset state before starting tests
- POST /reset
- 200 OK
- [x] Done

### Get balance for non-existing account
- GET /balance?account_id=1234
- 404 0
- [x] Done

### Create account with initial balance
- POST /event {"type":"deposit", "destination":"100", "amount":10}
- 201 {"destination": {"id":"100", "balance":10}}
- [x] Done

### Deposit into existing account
- POST /event {"type":"deposit", "destination":"100", "amount":10}
- 201 {"destination": {"id":"100", "balance":20}}
- [x] Done

### Get balance for existing account
- GET /balance?account_id=100
- 200 20
- [x] Done

### Withdraw from non-existing account
- POST /event {"type":"withdraw", "origin":"HTTP_STATUS_CODE_OK", "amount":10}
- 404 0
- [x] Done

### Withdraw from existing account
- POST /event {"type":"withdraw", "origin":"100", "amount":5}
- 201 {"origin": {"id":"100", "balance":15}}
- [x] Done

### Transfer from existing account
- POST /event {"type":"transfer", "origin":"100", "amount":15, "destination":"300"}
- 201 {"origin": {"id":"100", "balance":0}, "destination": {"id":"300", "balance":15}}
- [x] Done

### Transfer from non-existing account
- POST /event {"type":"transfer", "origin":"HTTP_STATUS_CODE_OK", "amount":15, "destination":"300"}
- 404 0
- [x] Done

### Publish it to internet
- [x] API URL: https://galhardo-ebanx-software-engineer-technical-test-february-2023.vercel.app/

### Test API
- [x] All tests passing at https://ipkiss.pragmazero.com/

### Send Source Code
- [x] Send to: https://app3.greenhouse.io/tests/648ff8d3b48e2ca30ca33a27ec1b0ff4?utm_medium=email&utm_source=TakeHomeTest

## Installation && Local Setup
- Have sure to have NodeJS v16+ and NPM v8+ installed locally in your machine
- Install dependencies:
    - $ `npm install`
- To start Typescript API Server in vevelopment:
    - $ `npm run dev`
- To fix and format using ESLint/Prettier:
    - $ `npm run precommit`
- To build this project to Deploy:
    - $ `npm run build`
- To start API server in Production:
    - $ `npm start`
- To run tests:
    - $ `npm test`
- To watch tests while develop/refactor:
    - $ `npm run test:watch`

## How to test HTTP Requests with Insomnia HTTP Client
- Download Insomnia Http Requests Client in: https://insomnia.rest/download
- Import file: `INSOMNIA-HTTP-REQUESTS-EBANX-ALEX-GALHARDO` into your Insomnia

## Some Prints

![ebanx - print passando](https://user-images.githubusercontent.com/19540357/219883114-79042ef9-5843-4c21-a817-f6fc28f487aa.png)
![ebanx - print insomnia 1](https://user-images.githubusercontent.com/19540357/219883115-b03cb7c1-3636-4e84-8a5a-209e0920ad40.png)

https://user-images.githubusercontent.com/19540357/219883116-10adc85d-558a-4407-8f3b-f9f5a3cc4e53.mp4
