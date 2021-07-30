FROM ubuntu

ENV DEBIAN_FRONTEND noninteractive
ENV LANG='ru_RU.UTF-8'

RUN apt -q -y update \
    && apt -q -y dist-upgrade \
    && apt -q -y install locales
RUN locale-gen

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt -q -y install nodejs

RUN apt -q -y autoremove \
    && apt clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && localedef -i ru_RU -c -f UTF-8 -A /usr/share/locale/locale.alias ru_RU.UTF-8

COPY . /opt/server
WORKDIR /opt/server
RUN npm install
EXPOSE 3001

CMD [ "node", "--inspect=0.0.0.0", "server.mjs" ]

