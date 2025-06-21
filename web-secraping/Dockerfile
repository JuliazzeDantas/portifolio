FROM python:3.10-slim

ARG HOME=/app

USER root

# Set display port to avoid crash
ENV DISPLAY=:99

# Install Google Chrome
RUN apt-get -y update && apt-get install -y wget curl \
&& apt-get update && apt-get install -y gnupg  \
&& wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
&& sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
&& apt-get -y update \
&& apt-get install -y google-chrome-stable xvfb


RUN apt-get -y update


# Install Chrome Driver
RUN apt-get install -yqq unzip \
&& wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip \
&& unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/ \
&& apt-get -y --purge autoremove

# Python modules
COPY requirements.txt .

RUN pip install \
    --no-cache-dir \
    --user \
    -r ./requirements.txt \
&& rm -rf ./requirements.txt

COPY lists/list_acao.txt .
COPY get_stock.py .
COPY scrape_data.py .

CMD ["python3", "scrape_data.py"]
