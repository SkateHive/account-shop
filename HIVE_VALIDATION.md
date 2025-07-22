# Hive Username Validation

This implementation adds real-time username validation for Hive accounts before allowing users to proceed with payment.

## Features

### 🔍 **Real-time Validation**
- Checks username format according to Hive rules
- Verifies availability on the Hive blockchain
- Debounced API calls (1 second delay) to prevent spam

### ✅ **Username Rules Enforced**
- Must be 3-16 characters long
- Must start with a letter
- Can only contain lowercase letters, numbers, and hyphens
- Cannot end with a hyphen
- Cannot have consecutive hyphens
- Automatically converts to lowercase

### 🎨 **Visual Feedback**
- ⏳ Loading spinner while checking
- ✅ Green checkmark for available usernames
- ❌ Red X for taken or invalid usernames
- Color-coded input border (green/red)
- Helpful error messages

### 🔒 **Payment Protection**
- Buy button disabled until username is validated
- Clear messaging when form is incomplete
- Prevents payments for invalid usernames

## Implementation Details

### Files Added/Modified:

1. **`/app/lib/hiveClient.ts`** - Hive blockchain client configuration
2. **`/app/lib/hiveUtils.ts`** - Username validation utilities
3. **`/app/components/HiveAccountForm.tsx`** - Enhanced form with validation
4. **`/app/components/BuyTransaction.tsx`** - Updated to check validation state
5. **`/app/components/SkateHiveAccountShop.tsx`** - State management for validation

### API Endpoints Used:
- `condenser_api.lookup_accounts` - Checks if username exists on Hive

### Dependencies Added:
- `@hiveio/dhive` - Official Hive JavaScript library

## Usage Flow

1. User types desired username
2. System validates format rules
3. After 1 second delay, checks Hive blockchain
4. Shows real-time feedback
5. Buy button only enabled when username is available
6. User proceeds with payment knowing username is valid

## Configuration

The Hive client uses multiple API endpoints for redundancy:
- api.deathwing.me
- techcoderx.com  
- api.hive.blog
- anyx.io
- hive-api.arcange.eu
- hive-api.3speak.tv

## Error Handling

- Network errors show "Failed to check username availability"
- Invalid format shows specific rule violations
- Taken usernames show "Username is already taken"
- Graceful fallback if API calls fail
