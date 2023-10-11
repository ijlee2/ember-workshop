# ember-workshop

A demo app to illustrate core concepts in Ember

> [!IMPORTANT]
>
> What's new in `v5`:
>
> - [Embroider](https://github.com/embroider-build/embroider) on strict mode
> - TypeScript and [Glint](https://typed-ember.gitbook.io/glint/)
> - [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports)
> - Styling app with [`embroider-css-modules`](https://github.com/ijlee2/embroider-css-modules)
> - Creating a v2 addon


## Setup

<details>

<summary>Install dependencies</summary>

1. Clone this repo.

    ```bash
    git clone git@github.com:ijlee2/ember-workshop.git
    ```

1. Change directory.

    ```bash
    cd ember-workshop
    ```

1. Use `pnpm` to install dependencies.

    ```bash
    pnpm install
    ```

</details>


<details>

<summary>Run the app</summary>

1. Once dependencies have been installed, you can run the [app](./my-app).

    ```sh
    # From the workspace root
    pnpm start
    ```

1. Open the app at [http://localhost:4200](http://localhost:4200).

</details>


<details>

<summary>Lint files</summary>

1. When you write code, please check that it meets the linting rules.

    ```sh
    # From the workspace root
    pnpm lint
    ```

1. You can run `lint:fix` to automatically fix linting errors.

    ```sh
    # From the workspace root
    pnpm lint:fix
    ```

</details>


<details>

<summary>Run tests</summary>

1. When you write code, please check that all tests continue to pass.

    ```sh
    # From the workspace root
    pnpm test
    ```

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

- Recognize what to test in a unit, rendering, or application test
- Develop [best practices for writing tests](https://crunchingnumbers.live/2019/10/11/write-tests-like-a-mathematician-part-3/)
- Create test helpers and custom assertions
- A brief look at `ember-a11y-testing`, `ember-cli-mirage`, and `sinon`
- `error` and `loading` routes 


## Target Audience

I designed the app with 2 goals in mind:

- Help onboard developers to Ember.js
- Help existing users adopt newer patterns

Due to lack of time, I didn't write a step-by-step guide that would let you pursue self-learning. I hope to do so in the future.

For now, if you have a mentor role, please go over the [commit history](https://github.com/ijlee2/ember-workshop/commits/main) to decide what to cover in your onboarding.


## Contributing

To provide feedback, you can reach out to me on [Discord](https://discord.gg/emberjs) at `ijlee2`. Please star this project so that I can gauge its importance to you and the Ember community. ⭐
