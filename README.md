# AnOrpSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Project cli commands

- ng new orp-search --style=scss --skip-tests=true
- cd orp-search
- ng g c auth/signup
- ng g c auth/signin
- ng g c recherche
- ng g c recherche-list
- ng g c recherche-hist
- ng g c header
- ng g s shared/auth
- ng g s shared/auth-guard
- ng g s shared/recherches
- npm install bootstrap --save
- npm install firebase --save
- npm install angularfire2 --save
- ng add ngx-bootstrap
- ng add jquery
- npm i popper.js --save
- npm install --save rxjs-compat 

## Docker

1 Build local
docker build -t matkasdocker/ang-suivi-recherches-aws .
1.1 Run local
docker run --rm -d -p 4202:80 matkasdocker/ang-suivi-recherches-aws:latest
1.2 Active containers
docker container ls
1.3 Stop container
docker container stop <container id>
1.4 Run sh on in a container
docker exec -it c1819be8ec61 /bin/sh
2 Push to docker.io
docker push matkasdocker/ang-suivi-recherches-aws
3 Run
docker run --rm -d -p 4202:80 matkasdocker/ang-suivi-recherches-aws:latest

## AWS EC2
1 Connect
ssh -i "~/.ssh/firstKeyAws.pem" ec2-user@ec2-3-19-239-63.us-east-2.compute.amazonaws.com
2 update yum
sudo yum update -y
3 install docker
sudo yum install docker -y
4 start docker
sudo service docker start
5 Run container
docker run --rm -d -p 4202:80 matkasdocker/ang-suivi-recherches-aws:latest
