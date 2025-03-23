# Usa a imagem oficial do Apache
FROM httpd:latest

# Copia os arquivos do projeto para a pasta raiz do Apache
COPY . /usr/local/apache2/htdocs/

# Expõe a porta 8080
EXPOSE 8080

# Inicia o Apache em primeiro plano
CMD ["httpd", "-D", "FOREGROUND"]