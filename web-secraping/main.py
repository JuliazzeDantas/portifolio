from scrape_data import Scraper
import sys
import json

def main(stock):
    # Instanciando o objeto Scraper
    scraper = Scraper()

    # Get list of Stocks
    with open('lists/list_acao.txt', 'r') as arq:
        acoes = arq.readlines()
    arq.close()

    acoes = [acao.strip() for acao in acoes]
    print(acoes)

    # passar para
    print(json.dumps(scraper.get_acao_valuation(stock), indent=4, ensure_ascii=False))

if __name__ == "__main__":
    print(main(sys.argv[1]))