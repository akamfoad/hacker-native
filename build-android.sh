#!/bin/bash

# This script builds the Android app

# Navigate to the project directory
cd "$(dirname "$0")"

# Run the build command
expo build:android
