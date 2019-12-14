provider "docker" {
    host = "tcp://127.0.0.1:2376/"
}

# declare any input variables

# create docker volume resource

# create docker network resource

# create db container
resource "docker_container" "gtms-frontend" {
  name  = "gtms-frontend"
  image = "docker-registry.kabala.tech/gtms-frontend:latest"
  restart = "always"
  networks_advanced {
      name = "kabala-net"
  }
  labels = {
     "traefik.backend" = "gtms-frontend"
     "traefik.frontend.rule" = "Host:geotags.pl"
     "traefik.port" = "3000"
     "traefik.protocol" = "http"
     "traefik.enable" = "true"
  }
}