//
//  MacroAdapter.h
//  TVBFunRN
//
//  Created by Tim Jiang on 4/7/2016.
//  Copyright © 2016 TVB. All rights reserved.
//

#import <Foundation/Foundation.h>

#ifndef MacroAdapter_h
#define MacroAdapter_h

/// Exposes macro definitions to Swift.
@interface TFMacros : NSObject
+ (NSString *)shortTargetName;
+ (BOOL)isDebugBuild;
@end

#endif /* MacroAdapter_h */
