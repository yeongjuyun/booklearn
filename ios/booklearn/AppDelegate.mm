#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import <RNKakaoLogins.h>

// Splash Screen
#import "RNSplashScreen.h"

// Google Login
#import <Firebase.h>

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Google Login - Firebase 초기화
  [FIRApp configure];

  self.moduleName = @"booklearn";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // Splash Screen
  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// kakao
- (BOOL)application:(UIApplication *)app
     openURL:(NSURL *)url
     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
 if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl: url];
 }
 return NO;
}

@end
