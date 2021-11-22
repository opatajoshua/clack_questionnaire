# CLACK Coding Challenge Questionnaire (Ember.Js)

This is a a small questionnaire Web Application. I created a simple mockup to start my development. NB:Developed product looks better than mockup. [Link to mockup](https://www.figma.com/proto/UfuvVLIL5HCJ1WW8jH1BQk/CLACK-Questionnaire?node-id=0%3A1)
## Completed requirements and extra features
* <b>Elegant UI Design</b>
* <b>Dark mode support</b>
* User can answer questions very swiftly
* Questionnaire is based on a JSON that the frontend uses to drive the questions
* A user can go back to a previous question without losing the answers the have given in a current question
* Mobile First, uses SVG, uses JS ES 6-7 features, good conventions for CSS
* <b>Questions can be jumped based on answers supplied by user</b>
* <b>Required fields are validated</b>
* Tests for components
* <b>Uses Ember Data with Mirage</b>

NB: all tasks are done

## major integration tests
* tests/integration/components/question-item-test.js
* tests/integration/components/progress-bar-test.js
* tests/integration/components/input-option-test.js
* rest of components and the 'contains' helper

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd clack-questionnaire`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
