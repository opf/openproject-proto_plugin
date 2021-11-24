# Docker

The Docker CI is used to run linting and tests designed for a CI pipeline. Github workflows have been added to .github/workflows that will automatically run linting and tests for only the plugin.

These tests use OpenProject Core `v12.0.1` by default. To change this, go to `Dockerfile` and change `OPENPROJECT_BRANCH` to your desired version number.

## Usage

- To run locally, you need to build the image with the name of your plugin.

  > `docker-compose -f docker/ci/docker-compose.yml build --build-arg PLUGIN_NAME=YOUR_PLUGIN_NAME`.

- Alternatively, instead of passing the `build-arg` you can also modify the `docker-compose.yml` with

  > `PLUGIN_NAME: ${PLUGIN_NAME:-YOUR_PLUGIN_NAME}`

- Tests and linting are setup as different jobs, to run each you can use the command `docker-compose -f docker/ci/docker-compose.yml run ci setup-tests [job-name]`.
- Defined job-names are _run-angular-unit_, _run-rspec-unit_, _run-rspec-features_, _run-frontend-lint_.
- Example:
  > `docker-compose -f docker/ci/docker-compose.yml run ci setup-tests run-angular-unit`
- To add additional jobs, update the `entrypoint.sh` file and optionally update the github actions.

## GIthub Actions

To run github actions, you need to update `test.yml` in .github/workflows with the plugin name as well.
