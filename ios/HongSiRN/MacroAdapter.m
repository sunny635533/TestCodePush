//
//  MacroAdapter.m
//  TVBFunRN
//
//  Created by Tim Jiang on 4/7/2016.
//  Copyright © 2016 TVB. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "MacroAdapter.h"

@implementation TFMacros

+ (BOOL)isDebugBuild {
#ifndef DEBUG
    return NO;
#else
    // Assume it's either 0 or 1.
    return DEBUG;
#endif
}


+ (NSString *)shortTargetName {
#define FOREACH_TARGET(F) \
F(Dev) F(Production) F(Staging) F(QA)
#define MK_LOCAL(x) \
NSString *Tar##x = @#x; \
(void) Tar##x;

    FOREACH_TARGET(MK_LOCAL)
    
     //Defined in the Project setting.
    return TF_TARGET_NAME;
    
#undef MK_LOCAL
#undef FOREACH_TARGET

    
}

@end
