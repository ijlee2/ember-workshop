# ember-workshop

A demo app to illustrate _core and latest_ concepts in Ember.js


## Setup

<details>
<summary>Installation</summary>

1. Clone this repo.

    ```bash
    git clone git@github.com:ijlee2/ember-workshop.git
    ```

1. Change directory.

    ```bash
    cd ember-workshop
    ```

1. Use `yarn` to install dependencies.

    ```bash
    yarn install
    ```

</details>


<details>
<summary>Running demo app</summary>

1. After following the installation step, you can run the app.

    ```bash
    ember serve
    ```

1. Open the app at [http://localhost:4200](http://localhost:4200).

</details>


<details>
<summary>Linting</summary>

1. When you write code, please check if it meets linter standards.

    ```bash
    yarn lint
    ```

1. You can run `yarn lint:fix` to automatically fix CSS, HBS, and JS files.

</details>


<details>
<summary>Running tests</summary>

1. When you write code, please check if all tests continue to pass.

    ```bash
    ember test --server
    ```

1. You can add the flag `--filter` to run a subset of tests.

</details>


## Syllabus

Each day (session) is designed to take around 5 hours, not counting breaks. There is an optional homework at the end of each day. The sessions are spread apart by a week or two.


### Day 1

Learning outcomes:

- Navigate the folder structure
- Familiarize with the Ember CLI
- Understand syntax for components
- Design components that are accessible, extensible, and maintainable
- A brief look at helper, modifier, and utility


### Day 2

Learning outcomes:

- Load data and respond to the user
- Understand syntax for routes
- Analyze tradeoff between a nested and sibling route
- Inject a service to run A/B testing
- A brief look at `ember-concurrency`


### Day 3

Learning outcomes:

- Understand syntax for tests
- Recognize what to test in a unit, rendering, or application test
- Develop [best practices for writing tests](https://crunchingnumbers.live/2019/10/11/write-tests-like-a-mathematician-part-3/)
- Create test helpers and custom assertions
- A brief look at `ember-a11y-testing`, `ember-cli-mirage`, and `sinon.js`


### Day 4 (in planning)

Learning outcomes:

- Create an addon
- Create an engine
- Server-side render with FastBoot


## Target Audience

I designed the app with 2 goals in mind:

- Help onboard developers to Ember.js
- Help existing users adopt newer patterns

Due to lack of time, I didn't write a step-by-step guide that would let you pursue self-learning. I hope to do so in the future.

For now, if you have a mentor role, please go over the [commit history](https://github.com/ijlee2/ember-workshop/commits/main) to decide what to cover in your onboarding.


## Contributing

To provide feedback, you can reach out to me on [Discord](https://discord.gg/emberjs) at `ijlee2`. Please star this project so that I can gauge its importance to you and the Ember community. ⭐
