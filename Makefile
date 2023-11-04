.PHONY: start

start-client:
	cd client && yarn start

start-server:
	cd server && go run main.go
