.PHONY: start

start-client:
	cd client && npm run start

start-server:
	cd server && go run main.go
