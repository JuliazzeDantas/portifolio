# Extrator de Dados de Ações Brasileiras

## Propósito

Esse projeto foi pensado para extrair dados de valuation de empresas listadas na B3.

## Funcionamento

O script abre um navegador e pega os dados do site do Status Invest. Após fazer isso, ele monta um JSON com as informações e printa ele na tela

### Como Rodar o projeto

#### Imprimir em Telq

~~~~source venv/bin/activate~~~~

python3 scrape_data.py '<brasilian_stock>'
It will return a JSON with valuation data from this stock
