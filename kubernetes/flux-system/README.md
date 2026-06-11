# Flux - Bootstrap (GitOps)

Este diretorio contem os manifestos do Flux (`gotk-components.yaml`, `gotk-sync.yaml`,
`kustomization.yaml`) que sao gerenciados automaticamente pelo comando `flux bootstrap`.
**Nao edite os arquivos `gotk-*` manualmente** - eles sao regenerados a cada bootstrap.

## O que e o bootstrap

`flux bootstrap` faz, em um unico comando:

1. Instala os controllers do Flux no cluster (namespace `flux-system`).
2. Commita os manifestos do Flux neste repositorio, no `path` informado.
3. Cria um `GitRepository` (fonte) e uma `Kustomization` que reconciliam o cluster
   continuamente a partir do path `./kubernetes` deste repo.

Neste repo o Flux observa o path `./kubernetes`, que possui um `kustomization.yaml`
de escopo aplicando somente `flux-system` + `monitoring` (Prometheus e Grafana).

## Pre-requisitos

- Um cluster Kubernetes acessivel (`kubectl get nodes` funcionando).
- CLI do Flux v2.x instalado (`flux version --client`). Para atualizar:

  ```bash
  curl -sL https://github.com/fluxcd/flux2/releases/download/v2.4.0/flux_2.4.0_linux_amd64.tar.gz \
    | tar -xz -C /tmp flux
  sudo install -m 0755 /tmp/flux /usr/local/bin/flux
  flux version --client   # deve mostrar v2.4.0
  ```

- Acesso de **escrita** ao repositorio. Aqui usamos a chave SSH `~/.ssh/id_ed25519`,
  que deve estar cadastrada na conta do GitHub (ou como deploy key com escrita).
  Teste com: `ssh -T git@github.com`.

## Como fazer o bootstrap (SSH)

```bash
flux bootstrap git \
  --url=ssh://git@github.com/JuliazzeDantas/portifolio \
  --branch=main \
  --path=./kubernetes \
  --private-key-file=$HOME/.ssh/id_ed25519
```

Alternativa com GitHub Personal Access Token (PAT):

```bash
export GITHUB_TOKEN=<seu_token>
flux bootstrap github \
  --owner=JuliazzeDantas \
  --repository=portifolio \
  --branch=main \
  --path=./kubernetes \
  --personal
```

## Verificar a sincronizacao

```bash
flux check
flux get sources git -A
flux get kustomizations -A
flux get helmreleases -A
kubectl get pods -n monitoring
```

Todos os recursos devem ficar `Ready=True`. Para forcar uma reconciliacao imediata:

```bash
flux reconcile kustomization flux-system --with-source
```

## Acessar as aplicacoes

- Grafana (NodePort 30080): http://localhost:30080 (login: `admin` / `admin`)
  - Fallback: `kubectl -n monitoring port-forward svc/grafana 3000:80` -> http://localhost:3000
- Prometheus: `kubectl -n monitoring port-forward svc/prometheus-server 9090:80` -> http://localhost:9090

## Remover o Flux do cluster

```bash
flux uninstall --namespace=flux-system
```
