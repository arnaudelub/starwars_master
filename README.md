# StarWarsMasterV2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3.

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

## Coding Path

### Generating the project structure

After reading carefuly the received **README**, i chose the migration point as i'm used to develop in Angular 7+ and
because AngularJS LTS ends in June of 21.
my first step was to generate the project structure using _Angular CLI_:

1. `ng g m ships --routing` to generate the ships module along with its routing module allowing us to lazy load it
2. `ng g c ships --module ships` to generate the root component of the ships part
3. `ng g c ships/ships-list --module ships` to generate the component that will hold the ships list
4. `ng g c ships/ship-detail --module ships` for the details of each ships
5. `ng g m auth --routing` for the authentication part
6. `ng g c auth --module auth` to generate the root component of the authentication part
7. `ng g c auth/login --module auth`
8. `ng g c auth/register --module auth`

### Starting with the auth part

My first doubt was whether to choose reactive form using formControl or template driven form using ngModel for the login and register page.
As Reactive form is much more flexible once written and as the register form may evolve during time, i thought it was the best choice.
While coding the login template and not knowing if i should go with angular-material, bootsrap, ionic,... for the design, i've decided to go
for the modernizing point of the **README** and make it close to Massimo Dutti's page

To mock the backend responses, i'm using HttpInterceptor so auth.service can be use the same way whether we are in development or production

### Starting with starships part

First of all, to fix the error of the _"Mas Datos"_ button, the API of swapi is giving us an URL in next and previous with SSL,
so we just need to replace http with https in **ships.service.js**:

```javascript
    function GetStarships(url) {
      if (!url) {
        url = "https://swapi.dev/api/starships/";
      }
      url = url.replace(/^http:\/\//i, "https://"); // <== just add this line
      return $http
        .get(url, {
          headers: {
            Authorization: "none",
          },
        })
        .then(function (res) {
          console.log(res);
          return res.data;
        });
    }
  }
```

#### Handling the Observables

_HttpClient_ get method is returning an observable, the be able to threat the response as an array of ships directly in **shipComponent**,
i'm using the [async pipe](https://angular.io/api/common/AsyncPipe) in **shipsListComponent** input. The _async pipe_ will subscribe automatically to the Observable and return the latest value received.
This way, i can manipulate the ships array (ships[]) without having to subscribe to it from the component.
