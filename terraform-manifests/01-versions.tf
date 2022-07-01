terraform {
  required_version = ">= 1.0.0"
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "3.9.0"
    }
  }
  backend "azurerm" {
    resource_group_name = "TF-BACKEND"
    storage_account_name = "storagetfbackendmphelps"
    container_name = "tfstate"
    key = "terraform.tfstate"
    
  }
}

provider "azurerm" {
  features {
    
  }
  
}