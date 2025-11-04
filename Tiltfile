# Load the restart_process extension
load('ext://restart_process', 'docker_build_with_restart')

### K8s Config ###

# Uncomment to use secrets
# k8s_yaml('./infra/development/k8s/secrets.yaml')

k8s_yaml('./infra/development/k8s/app-config.yaml')
k8s_yaml('./infra/development/k8s/postgres-deployment.yaml')

### End of K8s Config ###
### API Gateway ###

gateway_compile_cmd = 'CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o build/api-gateway ./services/api-gateway'
if os.name == 'nt':
  gateway_compile_cmd = './infra/development/docker/api-gateway-build.bat'

local_resource(
  'api-gateway-compile',
  gateway_compile_cmd,
  deps=['./services/api-gateway', './shared'], labels="compiles")


docker_build_with_restart(
  'ride-sharing/api-gateway',
  '.',
  entrypoint=['/app/build/api-gateway'],
  dockerfile='./infra/development/docker/api-gateway.Dockerfile',
  only=[
    './build/api-gateway',
    './shared',
  ],
  live_update=[
    sync('./build', '/app/build'),
    sync('./shared', '/app/shared'),
  ],
)

k8s_yaml('./infra/development/k8s/api-gateway-deployment.yaml')
k8s_resource('api-gateway', port_forwards=8081,
             resource_deps=['api-gateway-compile'], labels="services")
### End of API Gateway ###
### Auth Service ###

auth_compile_cmd = 'cd services/auth && CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ../../build/auth ./cmd/api'
if os.name == 'nt':
  auth_compile_cmd = './infra/development/docker/auth-build.bat'

local_resource(
  'auth-compile',
  auth_compile_cmd,
  deps=['./services/auth', './shared'], labels="compiles")


docker_build_with_restart(
  'ride-sharing/auth',
  '.',
  entrypoint=['/app/build/auth'],
  dockerfile='./infra/development/docker/auth.Dockerfile',
  only=[
    './build/auth',
    './shared',
  ],
  live_update=[
    sync('./build', '/app/build'),
    sync('./shared', '/app/shared'),
  ],
)

k8s_yaml('./infra/development/k8s/auth-deployment.yaml')
k8s_resource('auth', port_forwards=8080,
             resource_deps=['auth-compile'], labels="services")
# Postgres deployment is loaded but not shown in UI
# k8s_resource('postgres', labels="services")
### End of Auth Service ###
### Trip Service ###

# Uncomment once we have a trip service

#trip_compile_cmd = 'CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o build/trip-service ./services/trip-service/cmd/main.go'
#if os.name == 'nt':
#  trip_compile_cmd = './infra/development/docker/trip-build.bat'

# local_resource(
#   'trip-service-compile',
#   trip_compile_cmd,
#   deps=['./services/trip-service', './shared'], labels="compiles")

# docker_build_with_restart(
#   'ride-sharing/trip-service',
#   '.',
#   entrypoint=['/app/build/trip-service'],
#   dockerfile='./infra/development/docker/trip-service.Dockerfile',
#   only=[
#     './build/trip-service',
#     './shared',
#   ],
#   live_update=[
#     sync('./build', '/app/build'),
#     sync('./shared', '/app/shared'),
#   ],
# )

# k8s_yaml('./infra/development/k8s/trip-service-deployment.yaml')
# k8s_resource('trip-service', resource_deps=['trip-service-compile'], labels="services")

### End of Trip Service ###
### Web Frontend ###

docker_build(
  'ride-sharing/web',
  '.',
  dockerfile='./infra/development/docker/web.Dockerfile',
)

k8s_yaml('./infra/development/k8s/web-deployment.yaml')
k8s_resource('web-trip', port_forwards=3000, labels="frontend")

# Web Portal (Angular SSR)
docker_build(
  'ride-sharing/web-portal',
  '.',
  dockerfile='./infra/development/docker/web-portal.Dockerfile',
)

k8s_yaml('./infra/development/k8s/web-portal-deployment.yaml')
k8s_resource('web-portal', port_forwards=4000, labels="frontend")

### End of Web Frontend ###
### Portal API Gateway ###

docker_build(
  'ride-sharing/portal-api-gateway',
  '.',
  dockerfile='./infra/development/docker/portal-api-gateway.Dockerfile',
)

k8s_yaml('./infra/development/k8s/portal-api-gateway-deployment.yaml')
k8s_resource('portal-api-gateway', port_forwards=5050, labels="services")

### End of Portal API Gateway ###
### API .NET Gateway ###

# Temporarily disabled - uncomment to enable
# docker_build(
#   'ride-sharing/api-net-gateway',
#   '.',
#   dockerfile='./infra/development/docker/api-net-gateway.Dockerfile',
# )
# 
# k8s_yaml('./infra/development/k8s/api-net-gateway-deployment.yaml')
# k8s_resource('api-net-gateway', port_forwards=8080, labels="services")

### End of API .NET Gateway ###
### Word Search App ###

# Temporarily disabled - uncomment to enable
# docker_build(
#   'ride-sharing/web-ng-word-search',
#   '.',
#   dockerfile='./infra/development/docker/web-ng-word-search.Dockerfile',
# )
# 
# k8s_yaml('./infra/development/k8s/web-ng-word-search-deployment.yaml')
# k8s_resource('web-ng-word-search', port_forwards=6001, labels="frontend")

### End of Word Search App ###
### Flutter Mobile App ###

# Temporarily disabled - uncomment to enable
# docker_build(
#   'ride-sharing/ecom-flutter',
#   '.',
#   dockerfile='./infra/development/docker/ecom-flutter.Dockerfile',
# )
# 
# k8s_yaml('./infra/development/k8s/ecom-flutter-deployment.yaml')
# k8s_resource('ecom-flutter', port_forwards=5000, labels="mobile")

### End of Flutter Mobile App ###