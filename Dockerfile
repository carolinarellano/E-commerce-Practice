#Usar una imagen base de Node.js
FROM node:14

#Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

#Copiar los archivos package.json y package-lock.json
COPY package*.json ./

#Instalar las dependencias
RUN npm install

#Copiar el resto del código de la aplicación
COPY . .

#Exponer el puerto de la app
EXPOSE 3000

#Comando para iniciar la app cuando se ejecute el contenedor
CMD ["npm", "start"]
