provider "docker" {
    host = "tcp://192.168.0.33:2376/"
}

terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "kabala-tech"

    workspaces {
      name = "gtms-frontend"
    }
  }
}

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

data "terraform_remote_state" "gtms-frontend" {
  backend = "remote"
  config = {
    organization = "kabala-tech"
    workspaces = {
      name = "gtms-frontend"
    }
  }
}