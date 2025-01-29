# Use the official Node.js 20 Alpine image
FROM node:20-alpine

# Switch to root user to perform setup tasks
USER root

# Create the app directory and set ownership to the node user
RUN mkdir /app && chown node:node /app

# Set the working directory to /app
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Switch to the node user
USER node

# Set the timezone
ENV TZ='Europe/Rome'


# Install Zsh and necessary dependencies
USER root
RUN apk add --no-cache zsh git

# Switch back to the node user
USER node

# Set Zsh as the default shell
ENV SHELL /bin/zsh

# Clone Zsh plugins into the appropriate directories
RUN mkdir -p /home/node/.oh-my-zsh/custom/plugins && \
    git clone https://github.com/zsh-users/zsh-autosuggestions /home/node/.oh-my-zsh/custom/plugins/zsh-autosuggestions && \
    git clone https://github.com/zsh-users/zsh-syntax-highlighting /home/node/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting

# Add the custom .zshrc file
ADD ./config/zshrc /home/node/.zshrc

# Ensure the .zshrc file is owned by the node user
USER root
RUN chown node:node /home/node/.zshrc

# Switch back to the node user
USER node

# Set the default command to Zsh
CMD ["zsh"]