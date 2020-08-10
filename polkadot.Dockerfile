# I found these resources helpful
# https://docs.docker.com/get-started/part2/
# https://blog.sedrik.se/posts/my-docker-setup-for-rust/

# TODO This could be helpful for building and publishing the image from github actions
# https://github.com/docker/build-push-action

### The Builder Stage Compiles the code
FROM parity/rust-builder as builder

# Clone the polkadot code adn checkout the right commit
RUN git clone https://github.com/paritytech/polkadot.git
WORKDIR /builds/polkadot
RUN pwd
RUN git checkout bb02af4

# Build the Polkadot node
RUN cargo build --release

### The final stage just copies binary and chainspecs

# Choose the base image. Same on used in main Polkadot repo
FROM debian:stretch-slim

# Copy the node into the image
COPY --from=builder target/release/polkadot .

## TODO Copy chainspecs into the image
# COPY rococo-local-2.json .
# COPY rococo-local-3.json .
# COPY rococo-local-4.json .

# Open default ports. User is responsible for re-mapping these
# or using host or overlay networking.
EXPOSE 30333 9933 9944

ENTRYPOINT ["./utxo-workshop"]
