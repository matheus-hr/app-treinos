# App-treinos

Projeto pessoal feito em react native junto ao expo com o intuito de consultar os treinos criados por terceiros que foram incluidos em uma página do notion e acessados através da api do notion.

## 🖼️ Imagem do projeto
<br/>

![image](https://github.com/matheus-hr/app-treinos/assets/78974230/dd0bb03a-333a-4194-88d0-3cea67248152)

## 🚀 Tecnologias utilizadas

* Path mapping
* Styled Components
* Local Storage / Async Storage
* Axios

## 💻 Funcionalidades

* Busca dos dados através da API do notion e salva-os localmente no dispositivo para evitar muitas buscas na API.
* Selecionar os treinos criados de forma dinamica na página do notion.
* Listagem dos exercicios por treino selecionado.
* Marcação do exercicos que ja foram realizados.
* Finalização dos treinos realizados no dia, fazendo as desmarcação automatica de todos e passando para o proximo treino.
* Remoção dos treinos da memoria interna no celular para o recarregamento e nova busca dos dados.

## ⚙️ Como utilizar este projeto?

Para executar o projeto é necessario ter o node instalado e o ambiente android configurado.
<br/>
O projeto foi feito utilizando expo.

### Gerando o APK

Gerado usando a documentação do expo

https://docs.expo.dev/build-reference/apk/

Ou utilizando o comando 

`eas build -p android --profile preview`
