# Docker

The Docker CI is used to run linting and tests designed for a CI pipeline. Github workflows have been added to .github/workflows that will automatically run linting and tests for only the plugin.

These tests use OpenProject Core `v12.0.1` by default. To change this, go to `Dockerfile` and change `OPENPROJECT_BRANCH` to your desired version number.

## Usage

- Update Gemfile.plugins to reflect plugin folder name. The path should remain unchanged.
- To run locally, first build the image with
  > `docker-compose -f docker/ci/docker-compose.yml build`.
- Tests and linting are setup as different jobs, to run each you can use the command `docker-compose -f docker/ci/docker-compose.yml run ci setup-tests [job-name]`.
- Defined job-names are _run-angular-unit_, _run-rspec-unit_, _run-rspec-features_, _run-frontend-lint_.
- Example:
  > `docker-compose -f docker/ci/docker-compose.yml run ci setup-tests run-angular-unit`
- To add additional jobs, update the `entrypoint.sh` file and optionally update the github actions.
