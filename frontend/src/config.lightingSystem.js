// lighting config vi babyyyyy

export const LIGHTING_CONFIG = {
    // 🌑 Global lighting behavior
    global: {
        maxLight: 1.0,        // clamp total brightness
        maxDarkness: 0.5,     // max overlay alpha
        baseDarkness: 0.05,   // always slightly dark (even with lights on)
        overlayColor: 0x0a0a1a // optional tint for darkness overlay
    },

    // 💡 Individual light sources
    lights: {
        lavaLamp: {
            intensity: 0.35,
            color: 0xb68cff,        // soft purple
            radius: 120,
            useSprite: true,
            texture: 'RadialGlow',  // key from asset loader
            flicker: false
        },

        tvRoku: {
            intensity: 0.4,
            color: 0x6fa8ff,        // bluish glow
            radius: 140,
            useSprite: true,
            texture: 'WideGlow',
            flicker: true,
            flickerSpeed: 0.08
        },

        tvHome: {
            intensity: 0.3,
            color: 0x88c0ff,
            radius: 130,
            useSprite: true,
            texture: 'RadialGlow',
            flicker: false
        },

        computerMonitor: {
            intensity: 0.25,
            color: 0x9be7ff,
            radius: 100,
            useSprite: true,
            texture: 'RadialGlow',
            flicker: false
        },

        growLight: {
            intensity: 0.3,
            color: 0xff6b6b,        // warm/red plant light
            radius: 110,
            useSprite: true,
            texture: 'RadialGlow',
            flicker: false
        },

        onlineSign: {
            intensity: 0.2,
            color: 0x00ff9f,        // neon green
            radius: 90,
            useSprite: true,
            texture: 'OnlineGlow',
            flicker: true,
            flickerSpeed: 0.15
        }
    },
    textures: {
        default: 'RadialGlow',
        soft: 'softGlow',
        wide: 'wideGlow',
        neon: 'neonGlow'
    },  
}
