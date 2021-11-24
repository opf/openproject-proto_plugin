FROM ruby:2.7.4-buster
LABEL org.openproject.image.authors="operations@openproject.com" 

ARG OPENPROJECT_BRANCH=v12.0.1
ARG PLUGIN_NAME

ENV NODE_VERSION="14.17.0"
ENV CHROME_SOURCE_URL="https://dl.google.com/dl/linux/direct/google-chrome-stable_current_amd64.deb https://openproject-public.s3.eu-central-1.amazonaws.com/binaries/google-chrome-stable_current_amd64.deb"
ENV USER=dev

RUN useradd -d /home/$USER -m $USER -s /bin/bash
WORKDIR /home/$USER

RUN curl -s https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz | tar xzf - -C /usr/local --strip-components=1

RUN wget --quiet -O- https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN echo "deb http://apt.postgresql.org/pub/repos/apt buster-pgdg main" > /etc/apt/sources.list.d/pgdg.list

RUN apt-get update -qq && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
    postgresql-9.6 postgresql-client-9.6 postgresql-13 postgresql-client-13 time pandoc imagemagick libpq-dev default-jre-headless firefox-esr git

# Try Downloading binary from fallback source if first one fails
RUN for url in $CHROME_SOURCE_URL; do \
      file_name="/tmp/`basename $url`"; \
      wget --no-verbose -O $file_name $url && \
        apt install -y $file_name && rm -f $file_name && \
        break; \
    done

ENV CI=true
ENV RAILS_ENV=test
ENV BUNDLER_VERSION="2.1.4"
ENV BUNDLE_WITHOUT="development:production:docker"
ENV OPENPROJECT_DISABLE_DEV_ASSET_PROXY=1
ENV CAPYBARA_DYNAMIC_BIND_IP=1
ENV CAPYBARA_DOWNLOADED_FILE_DIR=/tmp
# disable deprecations and other warnings in output
ENV RUBYOPT="-W0"
ENV DATABASE_URL=postgres://app:p4ssw0rd@127.0.0.1/app
ENV PGVERSION=9.6

RUN gem install bundler --version "$BUNDLER_VERSION" --no-document

RUN git clone --depth 1 --branch "$OPENPROJECT_BRANCH" https://github.com/opf/openproject.git /home/$USER/openproject

# Plugin specific
RUN echo "group :opf_plugins do\n\tgem '$PLUGIN_NAME', path: '~/plugin'\nend" > /home/$USER/openproject/Gemfile.plugins
VOLUME [ "/usr/local/bundle", "/home/$USER/plugin", "/home/$USER/openproject/tmp" ]

RUN chown -hR dev /home/$USER

WORKDIR /home/$USER/openproject

COPY ./entrypoint.sh /usr/sbin/entrypoint.sh
ENTRYPOINT [ "/usr/sbin/entrypoint.sh" ]
CMD ["setup-tests", "bash"]

# ruby servers
EXPOSE 3000-3016
# billy proxy servers
EXPOSE 4000-4016


## --- END CI environment ---
