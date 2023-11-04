<<<<<<< HEAD
resource "aws_iam_role" "lambda_role" {
  name = "automation-lambda-role"
=======
# Create IAM role for Lambda function
resource "aws_iam_role" "lambda_role" {
  name = "lambda-role"
>>>>>>> ff2600a (Cognito Initialized)

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_lambda_function" "cognito-user-auto-confirm" {
  function_name = "dev-automation-cognito-user-auto-confirm"
  runtime = "nodejs18.x"
  handler = "index.handler"
  filename = "../lambda/cognito-user-auto-confirm/cognito-user-auto-confirm.zip"
  role = aws_iam_role.lambda_role.arn
}

resource "aws_lambda_permission" "cognito-user-auto-confirm" {
  statement_id  = "AllowExecutionFromCognitoUserPool"
  action        = "lambda:InvokeFunction"
  function_name = "dev-automation-cognito-user-auto-confirm"
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = var.cognito_user_pool_arn
}