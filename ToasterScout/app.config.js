import { ExpoConfig, ConfigContext } from '@expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'org.theflyingtoasters.scout.toasterscout.dev';
  }
  if (IS_PREVIEW) {
    return 'org.theflyingtoasters.scout.toasterscout.preview';
  }
  return 'org.theflyingtoasters.scout.toasterscout';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'ToasterScout (Dev)';
  }

  if (IS_PREVIEW) {
    return 'ToasterScout';
  }

  return 'ToasterScout (What)';
};


export default ({ config }) => ( {
  ...config,
    "name": getAppName(),
    "slug": "toasterscout",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": getUniqueIdentifier(),
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "a99cd494-3c64-406f-a2b5-dc5e4f8f872a"
      }
    },
    "owner": "frc-tft-3641"
  });
