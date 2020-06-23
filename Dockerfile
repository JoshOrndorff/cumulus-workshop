# Base Image
FROM ubuntu:20.04

#TODO Probably better to do a multistage build here.
# Copy binaries into the container
COPY assets/polkadot-linux polkadot
COPY assets/test-collator-linux test-collator

# Expose ports for P2P traffic
EXPOSE 30333 30334 30335 30336 30337 30338

# Expose websocket ports
EXPOSE 9944 9955 9966 9977 9988 9999

# Expose http ports (not actually used in the workshop, but common nonetheless)
EXPOSE 9933 9934 9935 9936 9937 9938

# Setup non-root user
RUN useradd -m -u 1000 -U -s /bin/sh -d /substrate substrate
USER substrate

ENTRYPOINT ["/bin/bash"]
