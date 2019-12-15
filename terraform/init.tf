provider "docker" {
    host = "tcp://192.168.0.33:2376/"
}

# terraform {
#   backend "remote" {
#     hostname = "app.terraform.io"
#     organization = "kabala-tech"

#     workspaces {
#       name = "gtms-frontend"
#     }
#   }
# }

terraform {
  backend "s3" {
    bucket = "kabalatech-terraform"
    key    = "gtms_frontend.tfstate"
    region = "nl-ams"
    endpoint = "s3.nl-ams.scw.cloud"
    access_key = "SCWF56B6KRSFA9E6TRTH"
    secret_key = "0ea79b96-a54d-4648-95e0-2033c2051bc3"
    skip_credentials_validation = true
    skip_region_validation      = true
  }
}