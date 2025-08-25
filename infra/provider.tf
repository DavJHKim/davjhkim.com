terraform {
    required_providers {
        aws = {
            version = ">=4.9.0"
            source = "hashicorp/aws"
        }
    }
}
provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  type    = string
  default = "sa-east-1"
}