
module "lambda" {
  source = "./lambda"
  cognito_user_pool_arn = module.cognito.cognito_user_pool_arn
}

module "cognito" {
  source = "./cognito"
  cognito_user_auto_confirm_function_arn = module.lambda.cognito_user_auto_confirm_function_arn
}
