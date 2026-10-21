# Nuvina Gaming Store

Crie um site completo para uma loja digital chamada Nuvina.wtf, focada na venda de produtos digitais para o público gamer, incluindo softwares, ferramentas e cheats para jogos.

O objetivo é criar uma loja com aparência de um projeto real, desenvolvido por um designer experiente, com identidade visual própria. Não quero um template genérico de IA.

1. Identidade visual

O nome da marca é Nuvina.wtf.

Estilo visual:

Dark mode como padrão.

Fundo preto quase absoluto (#080808 ou #0A0A0A).

Cards em cinza muito escuro (#111111).

Bordas discretas (#222222).

Texto principal branco (#F2F2F2).

Textos secundários em cinza (#858585).

Uma única cor de destaque, preferencialmente roxo suave (#A78BFA), usada com moderação.

Tipografia moderna e compacta, como Inter ou Geist.

Layout inspirado em lojas digitais underground, painéis de software premium e marcas independentes de tecnologia.

Não utilize:

Gradientes coloridos ou gradientes de fundo.

Glow exagerado, neon por toda parte ou sombras coloridas.

Glassmorphism.

Esferas 3D, elementos flutuantes ou ilustrações genéricas de IA.

Emojis como parte da identidade visual.

Bordas excessivamente arredondadas.

Animações chamativas ou efeitos que prejudiquem o desempenho.

Layout com aparência de landing page genérica.

Quero uma interface sóbria, precisa, consistente e com personalidade. Use espaçamentos bem calculados, alinhamento perfeito, hierarquia tipográfica clara e elementos visuais discretos.

2. Cabeçalho

Crie uma navbar fixa ou sticky, compacta e minimalista.

À esquerda:

Logotipo textual Nuvina.wtf, com peso tipográfico forte.

Um pequeno detalhe visual exclusivo na marca, sem ícone genérico.

No centro ou à direita:

Início

Produtos

FAQ

Status

No extremo direito:

Botão discreto de login.

Ícone de carrinho com contador de itens.

O cabeçalho deve ter fundo escuro sólido, uma borda inferior sutil e bom funcionamento em dispositivos móveis.

3. Página inicial

Crie uma página inicial com aparência de loja real, sem um hero gigante ocupando toda a tela.

Na primeira seção, exiba um pequeno indicador de status da loja, por exemplo:

● ALL SYSTEMS OPERATIONAL

Abaixo, um título marcante:

Your advantage. Your rules.

Subtítulo:

"Premium gaming tools, built for performance. Simple, reliable and ready when you are."

Adicione dois botões:

Explore products

Join our community

Use um layout compacto, com alinhamento à esquerda e bastante espaço negativo. Não coloque imagens gigantes, personagens de jogos aleatórios ou fundos abstratos.

Inclua abaixo uma faixa horizontal com informações curtas:

Digital delivery

Secure checkout

Product updates

Customer support

Essas informações devem ser exibidas apenas como benefícios reais quando estiverem disponíveis e implementados.

4. Catálogo de produtos

Esta deve ser a seção mais importante do site.

Crie uma grade de produtos com cards discretos, consistentes e bem organizados.

Cada card deve conter:

Imagem ou thumbnail personalizada do produto.

Nome do jogo ou produto.

Nome do software.

Pequena descrição.

Indicador de status, como Available ou Updating.

Preço.

Tipo de licença, como 1 day, 7 days, 30 days ou Lifetime, quando aplicável.

Botão View product.

Exemplos de categorias para demonstração:

FPS

External tools

Internal tools

Miscellaneous

Use produtos fictícios claramente identificados como demonstração até que sejam substituídos por produtos reais. Não invente avaliações, vendas, clientes ou indicadores de segurança.

Inclua filtros funcionais por categoria, campo de pesquisa e ordenação por preço.

Os cards devem ter fundo sólido, bordas finas, imagens discretas e um efeito hover mínimo. Nada de gradientes nos cards.

5. Página individual do produto

Ao clicar em um produto, abrir uma página dedicada com:

Galeria de imagens ou screenshots.

Nome e descrição completa.

Jogo compatível.

Recursos disponíveis.

Requisitos do sistema.

Status de compatibilidade.

Opções de licença.

Preços por duração.

Quantidade.

Botão Add to cart.

Informações de entrega.

FAQ específico do produto.

Aviso claro sobre requisitos e limitações.

A seleção de licença deve atualizar o preço automaticamente. O botão de adicionar ao carrinho deve funcionar de verdade.

Não apresente alegações falsas de indetectabilidade, segurança absoluta ou compatibilidade universal.

6. Carrinho e checkout

Implemente um carrinho funcional, permitindo:

Adicionar e remover produtos.

Alterar a duração da licença.

Visualizar subtotal e total.

Aplicar cupons válidos.

Persistir o carrinho entre páginas.

Exibir estados vazios e mensagens de erro.

Crie uma página de checkout limpa e profissional, com resumo do pedido e formulário de pagamento.

Prepare a integração com um gateway de pagamento compatível com o Brasil, como Mercado Pago ou Stripe, conforme a disponibilidade para a operação. Não simule pagamentos aprovados nem armazene dados de cartão diretamente no frontend.

Se as credenciais ainda não estiverem configuradas, deixe o fluxo preparado para integração e mostre um estado claro de checkout indisponível, em vez de fingir que o pagamento foi concluído.

7. Conta do usuário

Crie páginas para:

Login.

Cadastro.

Recuperação de senha.

Perfil do usuário.

Histórico de pedidos.

Produtos comprados.

Licenças ativas.

Downloads e instruções de instalação.

Implemente autenticação real usando Supabase Auth, caso seja adequado ao projeto.

As informações de cada usuário devem ser privadas e acessíveis somente pelo próprio usuário e pelos administradores autorizados.

8. Painel administrativo

Crie um painel administrativo protegido, separado da loja pública.

Funcionalidades:

Criar, editar e remover produtos.

Gerenciar categorias.

Alterar preços e durações das licenças.

Atualizar imagens e descrições.

Gerenciar pedidos.

Consultar usuários.

Gerenciar cupons.

Atualizar status dos produtos.

Visualizar métricas reais de vendas.

Gerenciar anúncios de manutenção.

Não permita que usuários comuns acessem as rotas administrativas. Faça a autorização no backend, usando políticas de acesso e permissões seguras.

9. Status e comunidade

Crie uma seção de status com indicadores para:

Website.

API.

Sistema de autenticação.

Checkout.

Entrega digital.

Os estados devem vir de dados reais ou de uma configuração administrativa. Não exiba tudo como operacional por padrão se os serviços não tiverem sido verificados.

Adicione um botão para a comunidade no Discord. Use um link configurável, sem inventar um convite.

10. Rodapé

Rodapé minimalista com:

Logotipo Nuvina.wtf.

Breve descrição da marca.

Links para Terms of Service, Privacy Policy, Refund Policy, FAQ e Support.

Link para a comunidade.

Ano atualizado automaticamente.

Mantenha o rodapé compacto, com fundo sólido e borda superior discreta.

11. Experiência e responsividade

O site deve funcionar perfeitamente em desktop, tablet e celular.

Requisitos:

Navbar adaptada para dispositivos móveis.

Grade de produtos responsiva.

Formulários com validação.

Estados de carregamento.

Mensagens de erro claras.

Feedback visual ao adicionar produtos ao carrinho.

Navegação por teclado.

Contraste adequado.

Imagens otimizadas.

Carregamento rápido.

URLs organizadas e navegação funcional.

Todas as páginas devem compartilhar o mesmo sistema visual.

12. Tecnologias e arquitetura

Utilize:

React.

TypeScript.

Tailwind CSS.

Componentes reutilizáveis.

Supabase para banco de dados e autenticação, quando necessário.

Backend seguro para pedidos, pagamentos e licenças.

Variáveis de ambiente para credenciais.

Nunca exponha chaves privadas no frontend. Não confie no preço enviado pelo navegador para calcular o valor final de uma compra. Valide os pedidos no servidor e confirme pagamentos por webhooks.

13. Direção final de design

O resultado deve parecer uma loja digital independente que já possui uma identidade de marca consolidada.

Pense em uma estética de software premium underground: escura, minimalista, precisa e um pouco agressiva, mas sem exageros.

Quero que cada detalhe pareça intencional:

Espaçamento consistente.

Tipografia bem escolhida.

Botões compactos.

Cards alinhados.

Bordas discretas.

Ícones pequenos e coerentes.

Transições rápidas.

Nenhum elemento decorativo sem propósito.

Prioridade máxima: design autêntico, catálogo bem feito, navegação rápida e funcionamento real.

Não entregue somente uma landing page estática. Construa a estrutura completa da loja, com páginas navegáveis, componentes reutilizáveis e integrações preparadas corretamente.

Comece pela interface visual completa usando dados de demonstração e, em seguida, implemente as funcionalidades e integrações sem quebrar o design.

14. Integração com KeyAuth — autenticação e assinaturas

Utilize o KeyAuth como sistema principal de autenticação e gerenciamento de licenças da Nuvina.wtf.

Não crie um sistema de login paralelo com Supabase Auth. O KeyAuth deve ser a fonte de verdade para autenticação, licenças e assinaturas, utilizando a API ou o SDK oficial compatível com a aplicação.

Documentação de referência: https://keyauth.cc/

Login e cadastro

Crie uma página de autenticação integrada ao KeyAuth com:

Login com as credenciais suportadas pelo KeyAuth.

Cadastro de novas contas, caso esteja habilitado.

Validação das credenciais no servidor.

Mensagens de erro claras para credenciais inválidas, contas bloqueadas ou falhas de autenticação.

Persistência segura da sessão.

Opção de logout.

Redirecionamento para o dashboard após o login.

O visual deve seguir exatamente a identidade da Nuvina.wtf: fundo preto, componentes discretos, bordas finas e tipografia minimalista.

Dashboard do usuário

Após o login, o usuário deve acessar um painel pessoal com o título My Dashboard.

No topo, exiba:

Nome de usuário.

Status da conta.

Quantidade de assinaturas ativas.

Quantidade de assinaturas expiradas.

Botão para resgatar uma nova key.

Crie uma seção chamada My Subscriptions que liste individualmente todas as assinaturas e licenças associadas à conta autenticada.

Cada assinatura deve exibir:

Nome do produto.

Jogo ou categoria relacionada.

Identificador da licença, com informações sensíveis ocultadas quando necessário.

Status: Active, Expired, Revoked ou Updating, conforme os dados reais disponíveis.

Data de ativação, quando disponível.

Data e horário exatos de expiração.

Tempo restante até a expiração.

Tipo de licença: 1 Day, 7 Days, 30 Days, 90 Days ou Lifetime, conforme configurado para o produto.

Botão View details.

As assinaturas devem ser exibidas separadamente. Se um usuário possuir três keys de produtos diferentes, ele deverá visualizar as três, com seus respectivos estados e datas de expiração.

Não mostre uma única data de expiração para todas as assinaturas. Cada licença precisa apresentar a sua própria informação.

Sincronização com KeyAuth

Consulte os dados reais do KeyAuth para identificar as licenças pertencentes ao usuário autenticado.

A implementação deve:

Obter todas as assinaturas e licenças que a integração oficial permite consultar para a conta.

Relacionar cada licença ao produto correto.

Obter as datas de expiração reais, quando fornecidas pelo sistema.

Converter timestamps para datas legíveis, respeitando o fuso horário.

Atualizar os estados de assinatura quando necessário.

Tratar licenças expiradas, revogadas e inválidas corretamente.

Exibir estados de carregamento, ausência de dados e falhas de sincronização.

Não utilize dados fictícios no dashboard final. Dados de demonstração só podem ser utilizados durante o desenvolvimento.

Se o KeyAuth não disponibilizar diretamente uma listagem completa de todas as licenças de uma conta, implemente uma camada de integração segura no backend que mantenha um registro das keys resgatadas, associadas ao identificador autenticado do usuário, e sincronize o estado com o KeyAuth sempre que possível.

Não invente endpoints, métodos ou campos da API. Consulte a documentação oficial e utilize apenas funcionalidades efetivamente disponíveis.

Resgate de novas keys

Adicione uma seção chamada Redeem Key, acessível pelo dashboard.

Interface:

Campo para inserir a key.

Botão Redeem License.

Ícone para mostrar ou ocultar o conteúdo digitado.

Indicador de processamento.

Mensagens claras de sucesso ou erro.

Fluxo esperado:

O usuário faz login na Nuvina.wtf.

Acessa Redeem Key.

Digita ou cola uma key adquirida na loja.

O backend valida a sessão do usuário.

O servidor verifica a key usando a integração oficial com o KeyAuth.

Se válida, a licença é ativada ou associada à conta conforme as regras configuradas no KeyAuth.

O dashboard é atualizado para exibir a nova assinatura e sua expiração.

Se inválida, expirada, já utilizada ou incompatível, o usuário recebe uma mensagem apropriada.

Evite resgates duplicados e condições de corrida. A mesma key não pode gerar múltiplos registros ou benefícios indevidos.

Não exponha keys completas em logs, URLs, mensagens de erro ou respostas públicas.

Histórico de resgates

Crie uma seção Redemption History com:

Produto.

Data do resgate.

Status.

Data de expiração, quando disponível.

Identificador parcial da key.

O histórico deve incluir somente resgates reais e registros vinculados ao usuário autenticado.

Página de detalhes da assinatura

Ao clicar em View details, abra uma página ou modal contendo:

Nome do produto.

Estado atual da licença.

Data de ativação.

Data de expiração.

Tempo restante.

Informações de compatibilidade.

Instruções de instalação.

Link para suporte.

Caso a licença tenha expirado, apresente uma indicação discreta e uma opção para adquirir uma nova licença.

Integração com a loja

Conecte o catálogo da Nuvina.wtf ao sistema de licenças.

Quando um pagamento for confirmado pelo gateway:

Valide a confirmação no backend por meio de webhook.

Identifique o produto e o plano comprados.

Execute o fluxo de emissão ou entrega da licença conforme os recursos oficiais do KeyAuth.

Associe a licença ao comprador quando o sistema suportar essa operação.

Registre o pedido e o resultado da entrega.

Permita consultar a licença posteriormente no dashboard.

Se o fluxo de compra gerar uma key para resgate manual, mostre-a somente ao comprador autorizado, com opção de copiar. Se a integração permitir ativação direta, utilize esse mecanismo de acordo com a documentação.

Não marque pedidos como pagos apenas porque o frontend informou que o pagamento foi concluído.

Segurança obrigatória

Nunca exponha a owner secret, chaves privadas ou credenciais administrativas do KeyAuth no frontend.

Todas as operações privilegiadas devem acontecer no backend.

Valide a identidade do usuário em todas as requisições protegidas.

Não permita consultar assinaturas de outros usuários alterando parâmetros ou identificadores.

Implemente rate limiting para login e resgate de keys.

Valide os dados retornados pela API.

Utilize variáveis de ambiente para credenciais.

Registre erros sem salvar credenciais ou keys completas.

Não confie em datas de expiração ou status enviados pelo navegador.

Design do dashboard

Mantenha a estética minimalista da Nuvina.wtf.

Use:

Fundo #080808.

Cards #111111.

Bordas #252525.

Texto branco e cinza.

Roxo suave somente para ações e detalhes selecionados.

Tabelas compactas no desktop.

Cards organizados no mobile.

Indicadores discretos para os estados das licenças.

O resultado deve parecer um painel de gerenciamento de software premium, não um dashboard administrativo genérico.

Prioridade: login real com KeyAuth, visualização individual das assinaturas, datas corretas de expiração, resgate funcional de novas keys e integração segura com as compras da Nuvina.wtf.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/77a96e16-b6eb-55db-a96e-2cc455d4fc7f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
