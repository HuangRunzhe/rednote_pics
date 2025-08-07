#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RedNote API Test Script
"""

import requests
import json

def test_api():
    """Test if the backend API is working properly"""
    
    # Test basic connection
    try:
        response = requests.get("http://localhost:8000/")
        print("✅ Backend service connection successful")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"❌ Backend service connection failed: {e}")
        return False
    
    # Test note generation API
    test_data = {
        "text": "Today I learned React development, it's very interesting and I want to share some learning experiences with everyone",
        "style": "小红书风格"
    }
    
    try:
        response = requests.post(
            "http://localhost:8000/api/generate-note",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Note generation API test successful")
            print(f"Generated title: {result.get('title')}")
            print(f"Content points: {len(result.get('content', []))}")
            print(f"Tags count: {len(result.get('tags', []))}")
            return True
        else:
            print(f"❌ API request failed, status code: {response.status_code}")
            print(f"Error message: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ API test failed: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Starting RedNote API test...")
    print("=" * 50)
    
    success = test_api()
    
    print("=" * 50)
    if success:
        print("🎉 All tests passed! Application is ready to use.")
    else:
        print("⚠️  Test failed, please check if backend service is running properly.") 