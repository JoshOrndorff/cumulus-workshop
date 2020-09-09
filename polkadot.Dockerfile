# I found these resources helpful
# https://docs.docker.com/get-started/part2/
# https://blog.sedrik.se/posts/my-docker-setup-for-rust/

### The Builder Stage Compiles the code
FROM parity/rust-builder as builder

# Clone the polkadot code and checkout the right commit
RUN git clone https://github.com/paritytech/polkadot.git
WORKDIR /builds/polkadot
RUN git checkout 93f0029

# Build the Polkadot node
RUN cargo build --release

### The final stage just copies binary and chainspecs

# Choose the base image. Same on used in main Polkadot repo
FROM debian:stretch-slim

# Copy the node into the image
COPY --from=builder /builds/polkadot/target/release/polkadot .

## Copy chainspecs into the image
COPY specs/rococo-local.json .
COPY specs/rococo-3.json .
COPY specs/rococo-4.json .

# Open default ports. User is responsible for re-mapping these
# or using host or overlay networking.
EXPOSE 30333 9933 9944

ENTRYPOINT ["./polkadot"]
