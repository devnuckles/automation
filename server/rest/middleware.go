package rest

import (
	"crypto/rsa"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"math/big"
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/schemetech-developer/automation/logger"
	"github.com/schemetech-developer/automation/util"
)

const (
	authorizationHeaderKey  = "token"
	authenticationHeaderKey = "identity"
	authorizationPayloadKey = "authorization_payload"
)

func (s *Server) authMiddleware() gin.HandlerFunc {

	return func(ctx *gin.Context) {
		idToken, err := ctx.Cookie(authenticationHeaderKey)
		if err != nil {
			logger.Error(ctx, "error in getting cookie", err)
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, s.svc.Error(ctx, util.EN_UNAUTHENTICATED_ERROR, "Unauthorized"))
			return
		}

		if len(idToken) == 0 {
			logger.Error(ctx, "authorization header is not provided", nil)
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, s.svc.Error(ctx, util.EN_UNAUTHENTICATED_ERROR, "Unauthorized"))
			return
		}

		// parse the JWT.
		parsedToken, err := jwt.Parse(idToken, s.validateJWT)
		if err != nil {
			logger.Error(ctx, "failed to parse the JWT", err)
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, s.svc.Error(ctx, util.EN_UNAUTHENTICATED_ERROR, "Unauthorized"))
			return
		}

		// Check if the token is valid.
		if !parsedToken.Valid {
			logger.Error(ctx, "failed to create JWKS from resource at the given URL", err)
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, s.svc.Error(ctx, util.EN_UNAUTHENTICATED_ERROR, "Unauthorized"))
			return
		}

		logger.Info(ctx, "The token is valid", nil)

		// Get the token claims.
		claims := parsedToken.Claims.(jwt.MapClaims)

		payload := Payload{
			ID:        claims["sub"].(string),
			Email:     claims["email"].(string),
			Role:      claims["custom:role"].(string),
			Status:    claims["custom:status"].(string),
			CreatedBy: claims["custom:createdBy"].(string),
		}

		logger.Info(ctx, "User Payload", payload)

		ctx.Set(authorizationPayloadKey, payload)
		ctx.Next()
	}
}

func (s *Server) validateJWT(token *jwt.Token) (interface{}, error) {
	jwksUrl := fmt.Sprintf("https://cognito-idp.ap-southeast-1.amazonaws.com/%s/.well-known/jwks.json", s.cognitoConfig.PoolId)
	res, err := http.Get(jwksUrl)
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()
	var jwks JWKS

	if err := json.NewDecoder(res.Body).Decode(&jwks); err != nil {
		return nil, err
	}

	if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}

	kid, ok := token.Header["kid"].(string)
	if !ok {
		return nil, fmt.Errorf("Key ID (kid) not found in token header")
	}
	for _, key := range jwks.Keys {
		if key.Kid == kid {
			nBytes, err := base64.RawURLEncoding.DecodeString(key.N)
			if err != nil {
				return nil, err
			}

			eBytes, err := base64.RawURLEncoding.DecodeString(key.E)
			if err != nil {
				return nil, err
			}

			var n, e big.Int
			n.SetBytes(nBytes)
			e.SetBytes(eBytes)

			publicKey := &rsa.PublicKey{
				E: int(e.Int64()),
				N: &n,
			}

			return publicKey, nil
		}
	}

	return nil, fmt.Errorf("Public key not found for key ID")
}

func corsMiddleware(c *gin.Context) {
	// Get the origin from the request header
	origin := c.Request.Header.Get("Origin")

	// Set the Access-Control-Allow-Origin header to the origin of the client application
	c.Writer.Header().Set("Access-Control-Allow-Origin", origin)

	// Allow specific headers
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token")

	// Allow all methods
	c.Writer.Header().Set("Access-Control-Allow-Methods", "*")

	// Allow credentials
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

	// Handle OPTIONS method
	if c.Request.Method == "OPTIONS" {
		c.AbortWithStatus(204)
		return
	}

	c.Next()
}
