# Koristimo zvanični image Node.js kao bazni image
FROM node:20.9.0 AS build

# Postavljamo radni direktorijum u kontejneru
WORKDIR /usr/src/app

# Kopiramo package.json i package-lock.json u radni direktorijum
COPY ../../package*.json ./

# Instaliramo zavisnosti
RUN npm install

# Kopiramo ceo projekat u radni direktorijum
COPY . .

# Izvršavamo komandu za build Angular aplikacije
RUN npm run build --prod

# Drugi build stage
FROM nginx:alpine

# Kopiramo izgrađenu aplikaciju iz prethodnog build stage-a u nginx folder za hosting
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/

# EXPOSE komanda definiše na kom portu će aplikacija biti dostupna u kontejneru
EXPOSE 80

# CMD komanda definiše komandu koja će se pokrenuti kada se kontejner pokrene
CMD ["nginx", "-g", "daemon off;"]
