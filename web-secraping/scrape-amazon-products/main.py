# Imports do Selenium e WebDriver
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

# pip install selenium
# pip install webdriver-manager

import sys
import time

class Scraper():
    driver:webdriver.Chrome
    service:Service
    wait:WebDriverWait

    url='https://www.amazon.com/ref=nav_logo'

    def __init__(self):
        # Configura Options para o selelnium rodar em modo headless
        self.options = webdriver.ChromeOptions()
        self.options.add_argument("--no-sandbox")
        # self.options.add_argument("--headless=new")
        self.options.add_argument("ignore-certificate-errors")
        self.options.add_argument("--start-fullscreen")
        self.options.add_argument("--disable-logging")
        self.options.add_argument("--disable-gpu")
        self.options.add_argument("--window-size=1920,1080")
        self.options.add_argument("--disable-dev-shm-usage")
        self.options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36")

        # Instala o driver do Chrome e inicia o Browser
        self.service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service = self.service   , options=self.options)
        self.wait = WebDriverWait(self.driver, 15)

        self.get_url(self.url)

    def get_url(self, url):
        self.driver.get(url)
        print("Accessing page")
        return
    
    def input_new_product(self, product):
        xpath_input_product = '/html/body/div[1]/header/div/div[1]/div[2]/div/form/div[2]/div[1]/input'
        xpath_input_product_2 = '/html/body/div[1]/div[1]/div/div[2]/form/div/div/input'
        xpath_button_search = '/html/body/div[1]/header/div/div[1]/div[2]/div/form/div[3]/div/span/input'
        xpath_button_search_2 = '/html/body/div[1]/div[1]/div/div[2]/form/input'
        try:
            self.driver.find_element(By.XPATH, xpath_input_product).send_keys(product)
            self.driver.find_element(By.XPATH, xpath_button_search).click()
            print("First approach successful.")
        except NoSuchElementException:
            print("First approach failure. Trying second approach...")
            try:
                self.driver.find_element(By.XPATH, xpath_input_product_2).send_keys(product)
                self.driver.find_element(By.XPATH, xpath_button_search_2).click()
            except NoSuchElementException:
                print("Second approach also failed. Exiting...")

    def get_information_from_products(self):
        for cont in range(2,60):
            try:
                xpath_product = f'/html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[{cont}]'
                product = self.driver.find_element(By.XPATH, xpath_product)
                # print(f"Product {cont} - XPATH {xpath_product}")
                class_information = 'div.a-section.a-spacing-small.puis-padding-left-small.puis-padding-right-small'
                value = product.find_element(By.CSS_SELECTOR, class_information).text
                print(xpath_product)
            except NoSuchElementException:
                print(f"FAIL: Product {cont} - XPATH {xpath_product}")

    xpath_button_next = '/html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[68]/div/div/span/ul/li[4]/span/a'

    /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[54]/div/div/span/ul/li[4]/span/a
    /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[68]/div/div/span/ul/li[5]/span/a
    /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[68]/div/div/span/ul/li[5]


    # aria-disabled="true"


    # page1
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[51]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[8]/div/div/span/div
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[7]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[2]/div/div/span/div/div/div[3]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[2]/div/div/span/div/div/div[3]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[4]/div/div/span/div/div/div[3]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[3]/div/div/span/div/div/div[3]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[2]/div/div/span/div/div/div[3]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[4]/div/div/span/div/div/div[2]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[2]/div/div/span/div/div/div[3]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[3]/div/div/span/div/div/div[3]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[7]/div/div/span/div/div/div[2]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[10]/div/div/span/div/div/div[2]
    # page2
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[2]/div/div/span/div/div/div[2]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[23]/div/div/span/div/div/div[2]
    # /html/body/div[1]/div[1]/div[1]/div[1]/div/span[1]/div[1]/div[27]/div/div/span/div/div/div[3]




    

def main():
    scraper = Scraper()
    time.sleep(2)  # Espera o site carregar
    try:
        scraper.input_new_product('shoes')
        scraper.get_information_from_products()
    except Exception as e:
        print("ERRO!")
        print(e)
        while True:
            x=1
    while True:
        x=1


if __name__ == "__main__":
    main()  # Executar código