#!/bin/bash

# CONFIGURATION
FIREBASE_API_KEY="AIzaSyBuuKcCc4Qj4g-HE4nBqLVWd2hlWOr1g80"
EMAIL="admin@example.com"
PASSWORD="admin123"
PROJECT_ID="tenniscommunity-org"
USER_UID="NS9it6ZpOhMic7HC2zLgJi38SYv2"
USER_NAME="Admin User"
OPPONENT_UID="opponent123"
MATCH_DATE="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

# STEP 1: Authenticate user
echo "🔐 Authenticating..."
ID_TOKEN=$(curl -s \
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=$FIREBASE_API_KEY" \
  -H "Content-Type: application/json" \
  --data-binary "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\",
    \"returnSecureToken\": true
  }" | jq -r .idToken)

if [ "$ID_TOKEN" == "null" ] || [ -z "$ID_TOKEN" ]; then
  echo "❌ Failed to authenticate. Check email/password/API key."
  exit 1
fi

echo "✅ Token acquired."

# STEP 2: Create user document
echo "👤 Creating user document for $USER_UID..."
curl -s -X PATCH \
  "https://firestore.googleapis.com/v1/projects/$PROJECT_ID/databases/(default)/documents/users/$USER_UID" \
  -H "Authorization: Bearer $ID_TOKEN" \
  -H "Content-Type: application/json" \
  --data-binary "{
    \"fields\": {
      \"name\": { \"stringValue\": \"$USER_NAME\" },
      \"email\": { \"stringValue\": \"$EMAIL\" }
    }
  }" | jq

# STEP 3: Create opponent user
echo "👤 Creating opponent document..."
curl -s -X PATCH \
  "https://firestore.googleapis.com/v1/projects/$PROJECT_ID/databases/(default)/documents/users/$OPPONENT_UID" \
  -H "Authorization: Bearer $ID_TOKEN" \
  -H "Content-Type: application/json" \
  --data-binary "{
    \"fields\": {
      \"name\": { \"stringValue\": \"Opponent Player\" },
      \"email\": { \"stringValue\": \"opponent@example.com\" }
    }
  }" | jq

# STEP 4: Create match document
echo "🎾 Creating match document..."
curl -s -X POST \
  "https://firestore.googleapis.com/v1/projects/$PROJECT_ID/databases/(default)/documents/matches" \
  -H "Authorization: Bearer $ID_TOKEN" \
  -H "Content-Type: application/json" \
  --data-binary "{
    \"fields\": {
      \"playerId\": { \"stringValue\": \"$USER_UID\" },
      \"opponentId\": { \"stringValue\": \"$OPPONENT_UID\" },
      \"set1\": { \"stringValue\": \"6-4\" },
      \"set2\": { \"stringValue\": \"7-5\" },
      \"set3\": { \"stringValue\": \"\" },
      \"matchDate\": { \"timestampValue\": \"$MATCH_DATE\" },
      \"createdAt\": { \"timestampValue\": \"$MATCH_DATE\" }
    }
  }" | jq

