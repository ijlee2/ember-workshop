# ember-workshop

A demo app to illustrate core concepts in Ember

> [!IMPORTANT]
>
> What's new in `v6`:
>
> - Development with Vite
> - `<template>` tag everywhere
> - Greater emphasis on v2 addons
> - Simplified tests


## Local development

You can get started in 2 steps:

1. Run `pnpm install` to install project dependencies. The `install` command will then build `blueprints-v2-addon` and `my-addon`.
1. Run `pnpm start` to start `my-app` ([http://localhost:4200](http://localhost:4200)).


<details>

<summary>Check and fix errors</summary>

1. As you write code, please check that it meets formatting and linting rules.

    ```sh
    # From the workspace root
    pnpm lint
    ```

1. You can run `lint:fix` to fix errors.

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

Each day (session) may take around 5 hours, not counting breaks. There is an optional homework at the end of each day. The sessions are spread apart by a week or two.


### Day 1

Learning outcomes:

- Navigate the folder structure
- Familiarize with Ember CLI
- Understand syntax for components
- Write components that are accessible, extensible, and maintainable
- A brief look at helpers, modifiers, and utilities


### Day 2

Learning outcomes:

- Understand syntax for routes
- Make API requests
- Compare nested and sibling routes
- Run A/B testing
- A brief look at `ember-concurrency`


### Day 3

Learning outcomes:

- Apply [best practices for writing tests](https://crunchingnumbers.live/2019/10/11/write-tests-like-a-mathematician-part-3/)
- Create test helpers and custom assertions
- Extract business logic to a utility class
- Test `error` and `loading` routes
- A brief look at `miragejs` and `sinon`


## Target Audience

I designed the app with 2 goals in mind:

- Help onboard developers to Ember.js
- Help existing users adopt newer patterns

Due to lack of time, I didn't write a step-by-step guide that would let you pursue self-learning. I hope to do so in the future.

For now, if you have a mentor role, please go over the [commit history](https://github.com/ijlee2/ember-workshop/commits/main) to decide what to cover in your onboarding.


## Contributing

To provide feedback, you can reach out to me on [Discord](https://discord.gg/emberjs) at `ijlee2`. Please star this project so that I can gauge its importance to you and the Ember community. ⭐
