from scrape_data import Scraper
import sys

def main(stocks):
    
    # Se stocks não for uma lista, transforma em lista
    if isinstance(stocks, str):
        stocks = [stocks]
    
    # Instanciando o objeto Scraper
    scraper = Scraper()

    # Para cada stock na lista recebida, chama o método
    for stock in stocks:
        print(scraper.get_acao_valuation(stock))

if __name__ == "__main__":
    print(main(sys.argv[1]))