<<<<<<< HEAD
variable "cognito_user_auto_confirm_function_arn" {
  type        = string
}
=======
variable "cognito_user_pool_id" {
  type = string
}

variable "cognito_user_auto_confirm_function_arn" {
  type = string
}


data "aws_caller_identity" "current" {}

output "account_id" {
  value = data.aws_caller_identity.current.account_id
}


data "aws_region" "current" {}

output "region" {
  value = data.aws_region.current.name
}
>>>>>>> 26940e0 (Resolve Conflicts)
