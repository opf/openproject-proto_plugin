#4. run setup scripts for Coreproject & symlink frontend project
#5. run rails migrate and seed
#set whatever environment variable we need
#6. run frontend test
#7. run backend test

# Instructions https://www.openproject.org/docs/installation-and-operations/installation/docker/#openproject-plugins

# Pull the latest Production image from docker hub
FROM openproject/community:12.0.1
MAINTAINER info@bitcrowd.net

# Set the environment to the same configuration as the <core_app>/Docker/CI/Dockerfile

## --- START CI environment ---
ENV CHROME_SOURCE_URL="https://dl.google.com/dl/linux/direct/google-chrome-stable_current_amd64.deb https://openproject-public.s3.eu-central-1.amazonaws.com/binaries/google-chrome-stable_current_amd64.deb"

WORKDIR /app

RUN apt-get update -qq && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    time libpq-dev default-jre-headless firefox-esr

# Try Downloading binary from fallback source if first one fails
RUN for url in $CHROME_SOURCE_URL; do \
      file_name="/tmp/`basename $url`"; \
      wget --no-verbose -O $file_name $url && \
        apt install -y $file_name && rm -f $file_name && \
        break; \
    done

ENV CI=true
ENV RAILS_ENV=test

ENV BUNDLE_WITHOUT="development:production:docker"
ENV OPENPROJECT_DISABLE_DEV_ASSET_PROXY=1
ENV CAPYBARA_DYNAMIC_BIND_IP=1
ENV CAPYBARA_DOWNLOADED_FILE_DIR=/tmp
# disable deprecations and other warnings in output
ENV RUBYOPT="-W0"
ENV DATABASE_URL=postgres://app:p4ssw0rd@127.0.0.1/app


RUN gem install bundler --version "$BUNDLER_VERSION" --no-document

# Plugin specific
COPY Gemfile.plugins /app/

COPY ./entrypoint.sh /usr/sbin/entrypoint.sh

VOLUME ["/usr/local/bundle", "/plugin", "/app/tmp" ]

WORKDIR /app

ENTRYPOINT [ "/usr/sbin/entrypoint.sh" ]
CMD ["setup-tests", "bash"]

# ruby servers
EXPOSE 3000-3016
# billy proxy servers
EXPOSE 4000-4016


## --- END CI environment ---
