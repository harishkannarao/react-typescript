# ReactJs + NodeJs stack for Java Developers

### Background

I am a Java Developer who enjoyed developing both server side web (frontend) and server side (backend) Http API. In recent years, Java or other JVM languages are predominantly used for server side API and NodeJs stack is the defacto standard for Frontend.

This page explores the frontend (UI) development using ReactJs + NodeJs stack using Java lens by comparing tools and framework in Java stack.

In this repository, I explored the ReactJs ecosystem to build, test (unit and integration) and deploy a pure client side rendering (CSR) web application.

### Development Stack

ReactJs is the basic building block to build the UI components and NextJs is built on top of ReactJs to create pages with routing and deployment tools for application built with ReactJs.

Axios is a very popular Http Client library to fetch data from server side Http APIs

|NodeJs|Java|
|----|---|
|ReactJs|Spring MVC with Thymeleaf or Velocity Macro|
|NextJs|Spring Boot|
|Axios|Spring RestClient or WebClient|

### Deployment Stack

Next Js offers various forms of deployment as:

* Client Side Rendering (CSR)
* Server Side Rendering (SSR)
* Pre-rendering
* Hybrid of above three

In this repo, I have explored the most simple form of deployement which is pure `Client Side Rendering (CSR)` by exporting the application as a static web site by substituing the parameters during export time. This static web site can then be copied to a AWS S3 storage bucket along with Content Distribution Network (CDN).

There are no additional tools needed as it `NextJs` provides out of box support for exporting as static website with parameter substituion using environment variables.

### Testing Stack

#### Unit and Component Testing

Jest Library is a test runner tool with built in assertion library and retry utilities to test async behaviours of a ReactJs Web application.

Testing Library is used to render the ReactJs Components in a headless html renderer and allows to interact with the DOM elements.

MSW Library is used to stub and verify the server side Http API interactions during the test run.

Jest stack has very fast feedback time, however it was hard to test the bits in `<head>` section of the html and unable to test the cross page navigations.

|NodeJs|Java|
|----|---|
|Jest|Junit or TestNg|
|Jest|AssertJ|
|Jest|Awaitility|
|Jest-Stare|Gradle or Maven Html Reporter|
|Testing Library|Html Unit or Chromedriver|
|Testing Library|WebDriver (Selenium)|
|MSW|WireMock|

#### Functional Testing

Cypress tool is a test runner tool with built in assertion library and implicit retry utilities to test any frontend Web application.

Higher level user journey based functional tests are mostly suitable for Cypress with very little mocking or stubbing. To simulate server side Http API or verify interaction with remote server, cypress has first class support using `cy.intercept()`.

It runs the test against a running application, hence we need additional libraries like `serve` and `start-server-and-test` to start and run the application in background during the CI. Since it tests the application in a real browser, it is easy to test the behaviour of the app from the user's perspective.

In essence, test as much as possible in a meaningful way with `Jest` and have journey based tests in `Cypress` which cannot be otherwise tested with `Jest`. 

|NodeJs|Java|
|----|---|
|Cypress|Junit or TestNg|
|Cypress|AssertJ|
|Cypress|Awaitility|
|Cypress|WireMock|
|Mochawesome|Gradle or Maven Html Reporter|
|serve and start-server-and-test|Spring Boot Test|

#### Post Deployment Acceptance Testing

To test an application in a deployed environment, `Cypress` will be most appropriate as its easier to test a deployed application. Also, there is built-in http client `cy.request()` which can perform http calls to set up test data or fixtures in the server side Http API.

|NodeJs|Java|
|----|---|
|Cypress|Junit or TestNg|
|Cypress|AssertJ|
|Cypress|Awaitility|
|Mochawesome|Gradle or Maven Html Reporter|