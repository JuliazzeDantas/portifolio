from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time


url='https://statusinvest.com.br/fias'
xpath_list_fia='/html/body/main/div[2]/section/div[2]/div'
xpath_container='/html/body/main/div[2]/section/div[2]'
xpath_button_next='/html/body/main/div[2]/section/div[3]/ul/li[3]'
xpath_button_close_ad='/html/body/div[16]/div/div/div[1]/button'

permission=True

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service = service)
wait = WebDriverWait(driver, 10)

driver.get(url)
container=driver.find_element(By.XPATH, xpath_container)

def close_ad():
    time.sleep(10)
    print("Fechar propaganda")
    driver.find_element(By.XPATH, xpath_button_close_ad).click()
    print("Próxima Página")
    driver.find_element(By.XPATH, xpath_button_next).click()


def click_button():
    driver.execute_script("arguments[0].scrollIntoView({'block':'center','inline':'center'})", driver.find_element(By.XPATH, xpath_button_next))
    driver.find_element(By.XPATH, xpath_button_next).click()
    print("Próxima página")


def fix_exception():
    print("Erro com o botão NEXT")
    try:
        close_ad()
    except:
        print("ERRO desconhecido")
        return


def get_acao(arq):
    time.sleep(0.5)
    acoes=container.find_elements(By.XPATH, xpath_list_fia)
    for acao in acoes:
        arq.write(acao.find_element(By.TAG_NAME, 'a').get_attribute("href").replace('https://statusinvest.com.br/fias/','') + '\n')
    try:
        click_button()
    except:
        fix_exception()


def create_list():
    global permission
    with open('lists/list_fia.txt', 'w') as arq:
        while (driver.find_element(By.XPATH, xpath_button_next).get_attribute('class') != 'disabled') or (permission==True):
            
            if driver.find_element(By.XPATH, xpath_button_next).get_attribute('class') == 'disabled':
                permission=False

            get_acao(arq)
            
    arq.close()


if __name__ == '__main__':
    create_list()