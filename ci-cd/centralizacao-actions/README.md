# Actions Centralizadas

## Alvo:
Empresas com múltiplos projetos sendo desenvolvidos em paralelo.

## Objetivo:

### Agilizar a manutenção
Imagine uma empresa com 200 repositórios ativos. Realizar uma manutenção nas esteiras de forma individual levaria muito tempo. Além disso, esse trabalho monótono e repetitivo aumenta o risco de erros passarem despercebidos. Ao centralizar as esteiras em uma única action, qualquer alteração passa a ser feita em apenas um lugar, poupando tempo e reduzindo falhas. Outro benefício é que qualquer mudança no fluxo pode ser testada rapidamente e propagada para todos os projetos de forma automática.

### Diminuir a exposição dos secrets
Armazenar dados sensíveis, como credenciais de acesso da cloud, em secrets expostos para toda a organização pode representar um risco. Embora seus valores não sejam diretamente visíveis, qualquer usuário pode utilizá-los para construir fluxos mal-intencionados. Ao adotar as actions centralizadas, os secrets podem ser armazenados exclusivamente nos repositórios das actions, e os demais usuários terão apenas acesso de leitura, garantindo uma segregação ainda maior e protegendo esses dados críticos.

### Facilitar a implementação de novas ferramentas
Considere novamente uma organização com mais de 200 repositórios. Suponha agora que o Trivy, ou qualquer outra ferramenta, precise ser implementada em todos os repositórios que realizam o build de imagens. Com as actions centralizadas, essa alteração e sua validação precisam ser feitas apenas uma vez, no repositório das actions centralizadas, promovendo eficiência e consistência na adoção de novas tecnologias.

### Padronizar o fluxo
A centralização permite uma padronização mais rigorosa dos fluxos, garantindo que todos utilizem actions adequadas e homologadas. Ainda assim, o modelo oferece flexibilidade: caso alguns repositórios precisem de etapas específicas que outros não necessitam, o fluxo pode ser configurado para atender essas particularidades sem comprometer a padronização geral.

## Funcionamento
Este projeto opera em duas etapas. O repositório de origem chama uma action de suporte, que direciona a requisição para a esteira apropriada (action executora) e acompanha o andamento do fluxo. A action executora, por sua vez, realiza todas as ações necessárias para concluir a demanda.

### Repositório de Origem
O repositório de origem é o responsável por ativar a action centralizada, utilizando a action de suporte. Isso é feito com a seguinte instrução:

`uses: <ORGANIZAÇÃO>/<ACTION_DE_SUPORTE>/<ACTION_EXECUTORA>@main`

Neste caso, a branch `main` está sendo referenciada para que todas as atualizações no fluxo sejam automaticamente refletidas em todos os repositórios, eliminando a necessidade de alterar manualmente as tags. No entanto, caso seja mais adequado, é possível referenciar uma tag ou um commit específico para maior controle.
