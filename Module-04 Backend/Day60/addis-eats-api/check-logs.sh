#!/usr/bin/env bash

set -euo pipefail

LOG_FILE="${1:-app.log}"

if [[ ! -f "$LOG_FILE" ]]; then
  echo "ERROR: Log file not found: $LOG_FILE"
  exit 1
fi

failed=0

if grep -Eq '09[0-9]{8}|\+2519[0-9]{8}' "$LOG_FILE"; then
  echo "FAIL: Phone number found in logs."
  failed=1
fi

unredacted_headers=$(
  sed -E 's/"(authorization|x-api-key)":"\[redacted\]"//g' "$LOG_FILE" |
    grep -E '"(authorization|x-api-key)":"[^"]+"' || true
)

if [[ -n "$unredacted_headers" ]]; then
  echo "FAIL: Unredacted authorization header or API key found."
  failed=1
fi

if [[ "$failed" -eq 0 ]]; then
  echo "PASS: No phone numbers or unredacted authentication headers found."
  exit 0
fi

exit 1
