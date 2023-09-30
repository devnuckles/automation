
module "lambda" {
  source = "./lambda"
}

module "cognito" {
  source = "./cognito"
  cognito_user_auto_confirm_function_arn = module.lambda.cognito_user_auto_confirm_function_arn
}
