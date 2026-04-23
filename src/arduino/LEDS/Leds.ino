#include <FastLED.h>

#define NUM_LEDS 300      
#define DATA_PIN 11       
#define CLOCK_PIN 13      
#define BRIGHTNESS 150    
#define LED_TYPE APA102   
#define COLOR_ORDER BRG   

CRGB leds[NUM_LEDS];

float targetSpeed = 0.00;    
float actualSpeed = 0.10; 
float lastLoggedSpeed = -999.00; 
float subPixelPos = 0.00; 

// --- SPAWN CONTROL ---
unsigned long lastSpawnTime = 0;
unsigned long nextSpawnInterval = 100; 

// --- TUNING ---
const float idleDrift = 0.12;   
const float accelRate = 0.003;  
const float friction = 0.992;   
const float globalScale = 0.008; 
const CRGB bgColor = CRGB(0, 0, 45);

void setup() {
    Serial.begin(115200);  
    Serial.setTimeout(2);
    
    delay(500);
    FastLED.addLeds<LED_TYPE, DATA_PIN, CLOCK_PIN, COLOR_ORDER>(leds, NUM_LEDS);
    FastLED.setBrightness(BRIGHTNESS);
    
    fill_solid(leds, NUM_LEDS, bgColor);
    // Start with 20 stars for the idle look
    for(int i = 0; i < 20; i++) leds[random16(NUM_LEDS)] = CRGB::White;
    FastLED.show();

    Serial.println("--- DRIVE CORE ONLINE (V40 - HIGH DENSITY WARP) ---");
}

void loop() {
    unsigned long currentTime = millis();

    // 1. SERIAL INPUT
    if (Serial.available() > 0) {
        float input = Serial.parseFloat(); 
        while(Serial.available() > 0) { Serial.read(); } 
        float newTarget = constrain(input, -10.0, 10.0);

        if (abs(newTarget - lastLoggedSpeed) > 0.01) {
            Serial.print("THRUST: "); Serial.println(newTarget, 2);
            targetSpeed = newTarget;
            lastLoggedSpeed = newTarget;
        }
    }

    // 2. MOMENTUM ENGINE
    if (abs(actualSpeed) > abs(targetSpeed)) {
        actualSpeed *= friction; 
        if (abs(actualSpeed) < abs(targetSpeed)) actualSpeed = targetSpeed;
    } else {
        actualSpeed += (targetSpeed - actualSpeed) * accelRate;
    }

    // 3. DENSITY MONITORING
    // INCREASED MAX CAPACITY: 20 stars at idle, up to 120 stars at speed 10
    int targetStarCount = map(abs(actualSpeed) * 100, 0, 1000, 20, 120);
    
    int currentStarCount = 0;
    for(int i = 0; i < NUM_LEDS; i++) {
        if(leds[i] != bgColor) currentStarCount++;
    }

    // 4. SMART SPAWNING
    if (currentStarCount < targetStarCount) {
        if (currentTime - lastSpawnTime >= nextSpawnInterval) {
            lastSpawnTime = currentTime;
            
            // At high speeds, we reduce the interval so stars fill in faster
            // This prevents gaps during acceleration
            int minGap = map(abs(actualSpeed) * 100, 0, 1000, 100, 10);
            int maxGap = map(abs(actualSpeed) * 100, 0, 1000, 400, 80);
            nextSpawnInterval = random(minGap, maxGap); 

            bool forward = (actualSpeed >= 0);
            int spawnIdx = forward ? (NUM_LEDS - 1) : 0;
            
            CRGB starColor = CRGB::White;
            // Aesthetic blue shifts for high speeds
            if (abs(actualSpeed) > 6.0) starColor = CRGB(160, 210, 255);
            if (abs(actualSpeed) > 8.5) starColor = CRGB(70, 130, 255);

            leds[spawnIdx] = starColor;
        }
    } 
    else if (currentStarCount > targetStarCount) {
        // Smoothly delete the excess when slowing down
        int toDelete = (currentStarCount - targetStarCount) / 4 + 1;
        for(int i = 0; i < toDelete; i++) {
            int rIdx = random16(NUM_LEDS);
            if (leds[rIdx] != bgColor) leds[rIdx] = bgColor;
        }
    }

    // 5. MOVEMENT
    float speedMagnitude = actualSpeed * actualSpeed; 
    float moveAmount = speedMagnitude * globalScale;
    float minMove = idleDrift * globalScale;
    if (moveAmount < minMove) moveAmount = minMove;
    if (actualSpeed < 0) moveAmount = -moveAmount;

    subPixelPos += moveAmount; 

    int pixelsToMove = (int)subPixelPos; 
    if (abs(pixelsToMove) >= 1) {
        shiftStrip(pixelsToMove);
        subPixelPos -= pixelsToMove; 
    }

    FastLED.show();
}

void shiftStrip(int amount) {
    if (amount > 0) { // Forward
        for(int i = 0; i < NUM_LEDS - amount; i++) leds[i] = leds[i + amount];
        for(int i = NUM_LEDS - amount; i < NUM_LEDS; i++) leds[i] = bgColor;
    } else { // Backward
        int absAmt = abs(amount);
        for(int i = NUM_LEDS - 1; i >= absAmt; i--) leds[i] = leds[i - absAmt];
        for(int i = 0; i < absAmt; i++) leds[i] = bgColor;
    }
}
