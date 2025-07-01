from scrape_data import Scraper
from pymongo import MongoClient
import sys
import json

def main(stock):
    # Instanciando o objeto Scraper
    scraper = Scraper()

    scraper = Scraper()
    scrape_data = scraper.get_acao_valuation(stock)
    print(json.dumps(scrape_data, indent=4, ensure_ascii=False))

    client = MongoClient("mongodb://localhost:27017/")

    mongo_db = client["stock_valuation"]
    valuation_collection = mongo_db["valuation"]

    valuation_collection.insert_one(scrape_data)
    

if __name__ == "__main__":
    print(main(sys.argv[1]))