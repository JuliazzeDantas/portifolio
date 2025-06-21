from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time


url='https://statusinvest.com.br/acoes'
xpath_list_acoes='/html/body/main/div[4]/section/div[2]/div'
xpath_container='/html/body/main/div[4]/section/div[2]'
xpath_button_next='/html/body/main/div[4]/section/div[3]/ul/li[9]'
xpath_button_close_ad='/html/body/div[16]/div/div/div[1]/button'
# '/html/body/div[NUMERO]/div/div/div[1]/button'  ---->> NUMERO de 11+

permission=True

options = webdriver.ChromeOptions()
options.add_argument("--no-sandbox")
options.add_argument("--headless=new")
options.add_argument("ignore-certificate-errors")
options.add_argument("--start-fullscreen")
options.add_argument("--disable-logging")
options.add_argument("--disable-gpu")
options.add_argument("--window-size=1920,1080")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36")

        # Instala o driver do Chrome e inicia o Browser
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service = service, options=options)
wait = WebDriverWait(driver, 10)

driver.get(url)
container=driver.find_element(By.XPATH, xpath_container)

def close_ad():
    time.sleep(0.5)
    flag = True
    local_variado_ad = 2 # Verificou-se que a propaganda muda de lugar em uma lista do número 2+
    while flag:
        try:
            driver.find_element(By.XPATH, f'/html/body/div[{local_variado_ad}]/div/div/div[1]/button').click()
            flag = False
        except:
            print(f"div[{local_variado_ad}] não encontrada")
            local_variado_ad += 1
    print("Propaganda fechada")
    print("Próxima Página")
    driver.find_element(By.XPATH, xpath_button_next).click()


def click_button_next_page():
    driver.execute_script("arguments[0].scrollIntoView({'block':'center','inline':'center'})", driver.find_element(By.XPATH, xpath_button_next))
    driver.find_element(By.XPATH, xpath_button_next).click()
    print("Próxima página")


def fix_exception():
    print("Apareceu uma propaganda ou um erro desconhecido")
    try:
        close_ad()
    except:
        print("ERRO desconhecido")
        return


def get_acao(arq):
    time.sleep(0.5)
    acoes=container.find_elements(By.XPATH, xpath_list_acoes)
    for acao in acoes:
        arq.write(acao.find_element(By.TAG_NAME, 'a').get_attribute("href").replace('https://statusinvest.com.br/acoes/','') + '\n')
    try:
        click_button_next_page()
    except:
        fix_exception()


def create_list():
    global permission
    with open('lists/list_acao.txt', 'w') as arq:
        while (driver.find_element(By.XPATH, xpath_button_next).get_attribute('class') != 'disabled') or (permission==True):
            
            if driver.find_element(By.XPATH, xpath_button_next).get_attribute('class') == 'disabled':
                permission=False

            get_acao(arq)
            
    arq.close()


if __name__ == '__main__':
    create_list()