resource "aws_s3_bucket" "s3_bucket" {
  bucket = "dev-automation-client-features"
}

resource "aws_s3_bucket_policy" "s3_bucket_policy" {
  bucket = aws_s3_bucket.s3_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = "*",
        Action = "s3:GetObject",
        Resource ="${aws_s3_bucket.s3_bucket.arn}/*",
      },
    ],
  })
}
