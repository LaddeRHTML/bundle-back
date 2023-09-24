###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development

# Set up the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm ci

# Copy app source
COPY --chown=node:node . .

# Use the node user
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Copy node_modules from development stage
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# Install sudo and modify prebuild script
RUN apk --no-cache add sudo && echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node

# Change ownership explicitly and run prebuild
USER root
RUN chown -R node:node /usr/src/app && npm run prebuild
USER node

COPY --chown=node:node . .

# Build the production bundle
RUN npm run build

# Install only production dependencies and clean npm cache
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

###################
# PRODUCTION
###################

FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copy node_modules and dist from the build stage
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
