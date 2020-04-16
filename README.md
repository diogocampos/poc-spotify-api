# poc-spotify-api

## Fluxo

1. Usuário clica em um link `https://example.com/{linkId}`; o browser carrega um
   SPA que a princípio não mostra nada (ou só um spinner)

2. SPA chama rota `GET /checkout/{linkId}`

   - se o link existe, backend retorna instruções para a tela de autenticação
   - senão, backend retorna 404 e o SPA mostra alguma mensagem de erro
   - nessa PoC, eu defini as "instruções" como um objeto
     `{ stepId, title, fields, button }` contendo o título da tela, uma lista
     com os campos do formulário, uma string pro botão de envio do form e uma
     string pra identificar o passo ao enviar os dados.

3. Usuário preenche email/cpf, SPA envia para `PUT /checkout/start`

   - se o dado informado está correto, backend retorna um accessToken e as
     instruções para a próxima tela.

4. Usuário preenche os dados da tela atual, SPA envia com o accessToken para
   `PUT /checkout/{stepId}`

   - o `stepId` é o id informado no objeto de instruções da tela, junto com o
     título e os campos

5. Repete o passo 4 até chegar no fim.

## Referências:

- [The Brilliance of Spotify Internal APIs to Mitigate Payments (artigo)](https://nordicapis.com/the-brilliance-of-spotify-internal-apis-to-mitigate-payments/)
- [How Spotify Payments Creates APIs to Manage Complexity (video)](https://www.youtube.com/watch?v=1nz6muMNXF4)
- [How Spotify Payments Creates APIs to Manage Complexity (slides)](https://www.slideshare.net/nordicapis/how-spotify-payments-creates-apis-to-manage-complexity-horia-jurcut)
