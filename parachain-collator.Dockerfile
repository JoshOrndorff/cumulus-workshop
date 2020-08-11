### The Builder Stage Compiles the code
FROM parity/rust-builder as builder

# Clone the template code and checkout the right commit
RUN git clone https://github.com/substrate-developer-hub/substrate-parachain-template.git
WORKDIR /builds/substrate-parachain-template
RUN pwd
RUN git checkout 2710c42

# Build the Parachain Collator node
RUN cargo build --release

### The final stage just copies binary and chainspecs

# Choose the base image. Same on used in main Polkadot repo
FROM debian:stretch-slim

# Copy the node into the image
COPY --from=builder /builds/polkadot/target/release/polkadot .

## TODO Copy chainspecs into the image
# COPY rococo-local-3.json .
# COPY rococo-local-4.json .

# Open default ports. User is responsible for re-mapping these
# or using host or overlay networking.
EXPOSE 30333 9933 9944

ENTRYPOINT ["./utxo-workshop"]
