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

# Development

FYI: **Swapi url** is not ~~swapi.co~~ anymore, it's https://swapi.dev
## Local Environment

```
ng --version

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 10.0.7
Node: 14.7.0
OS: linux x64

Angular: 10.0.11
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router
Ivy Workspace: Yes

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.1000.7
@angular-devkit/build-angular     0.1000.7
@angular-devkit/build-optimizer   0.1000.7
@angular-devkit/build-webpack     0.1000.7
@angular-devkit/core              10.0.7
@angular-devkit/schematics        10.0.7
@angular/cli                      10.0.7
@ngtools/webpack                  10.0.7
@schematics/angular               10.0.7
@schematics/update                0.1000.7
rxjs                              6.5.5
typescript                        3.9.7
webpack                           4.43.0
```

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
for the modernizing point of the **README** and make it close to Massimo Dutti's design.

To mock the backend responses, i'm using HttpInterceptor so auth.service can be use the same way whether we are in development or production
Duplicated email

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

_HttpClient get_ method is returning an observable, the be able to treat the response as an array of ships directly in **shipComponent**,
i'm using the [async pipe](https://angular.io/api/common/AsyncPipe) in **shipsComponent template**. The _async pipe_ will subscribe automatically to the Observable and return the latest value received.
This way, i can manipulate the ships array (ships[]) without having to subscribe to it from the component.

#### Creation of the Ship's list

We are using the trackBy directive along with the ngFor directive to iterate over the ships array.
This way, updating the array by appending the other pages (for the infinite scroll) won't make re-rendering the
whole DOM, but only the new nodes.

### The search Input

Even if it's not part of the project, i think it's a good thing to have it implemented
and also it doesn't require too much time to build it.
We are using a subject which emits the ngModel everytime it changes.
the subject allow us to use the rjxs operator debounceTime so we are subscribing only when
the user has finished typing. After that we just have to reset the starship\$ observable with the new result and rebuild the list

### The user account page

It's not a menu but an action button in the nav bar that navigates to the account component.
It can be modified to a menu later on if need.

### The ship details page

We have multiple options to get the details in this page.

- We can use a routed page and navigate to it with a **click** directive and pass the _id_ to the url
  - Do another call to the API to get the details
- Navigate to the details page and pass the whole ship data to the url
  - This way we don't have to call again the API
- Make the details page a child of shipsComponent and pass the _ship item_ with the **Input()** property
  - When using the click directive on the item, we can emit the ID to _ShipComponent_ using the **Output()** property
  * rewrite the route to our need, i.e. _/starships/details/3_
  * This way we don't need to call the API again and the url stays clean

This last solution seems to be the cleanest to me. The only problem is that if the user is trying to navigate
entering directly the url in the browser, it won't load the page.
We should be able to fix this by calling the API if the Input() is empty


### Handling Cache

We have multiple option to do that, 
* We could use the [**RXJS tap operator**](https://www.learnrxjs.io/learn-rxjs/operators/utility/do) ato store the data in a property of shipService and check if it's empty
before doing the request to API.
* The other solution is to use [**RXJS shareReplay operator**](https://www.learnrxjs.io/learn-rxjs/operators/multicasting/sharereplay) which will replay the last emitted value.

In both cases, we will have to handle the fact the if the data in the backend changes, we won't be able to
see those modifications/update in the UI.
To resolve this situation, one of the solution would be to use a [**timer**](https://www.learnrxjs.io/learn-rxjs/operators/creation/timer).
**timer** allow us to give an initialDelay to make sure the very first request is done a T(0). Then the interval I will be the period of our choice.
Then we'll have to subscribe to every get request and unsubscribe once done. We also need to be sure to take the very last result of the last subsciption.
Imagine that we are receiving the result of the request _X-1_ after the request _X_ because of some incident during the request _X-1_. In this case, 
we want to be sure that the result emitted is the result _X_ which hold the newest set of data. For this purpose, i.e. avoiding _race conditions_ and unsubscribing to the previous Observable, **rxjs** 
offers us [**switchMap**](https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap).
At this stage of this implementation, the UI will be reload with the new data after every interval of time I. This can be bad for the user as may be reloaded will watching a concrete ship.
To fix this behavior, we need to use [**take(1)**](https://www.learnrxjs.io/learn-rxjs/operators/filtering/take) on our observable in the component. The observable will emit only one result and then it will complete.
The last part will be to decide how to advise the user that there is new set of data available, a toast may be a good solution, it's discrete.


# Final comments

This project can be found here just in case you have any trouble using ng serve:
* [**Production verions**](https://idelub.com/starships) builded using command ```ng build --prod --base-href /starships/```
* [**Development version**](https://idelub.com/starships/dev) builded using command ```ng build --base-href /starship/dev/```
  
Also, the argument **{ useHash}: true** has been add to RouterModule.forRoot i'm using lighttpd for my web server, so .htaccess is not available.

## **!CAUTION**

For demonstration purposes, **ShipsComponent** is calling the API every 10 seconds. Do not leave the page opened once done otherwise the API
may return an **ERROR 429: TOO MANY REQUESTS**





