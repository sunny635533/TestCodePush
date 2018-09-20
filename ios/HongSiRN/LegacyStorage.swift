//
//  LegacyStorage.swift
//  ReactNativeSeed
//
//  Created by user on 2017/3/8.
//  Copyright © 2017年 Example. All rights reserved.
//


import Foundation

@objc class TFLegacyAppConfig: NSObject {
    let language: String
    
    init(lang: String) {
        self.language = lang
    }
    
    func toJson0() -> [String: AnyObject] {
        return [
            "language": language as AnyObject,
            // iOS: Leave a dummy value here as it's not controlled by us.
            "notificationEnabled": false as AnyObject,
        ]
    }
    
    func toJson() -> NSDictionary {
        return toJson0() as NSDictionary
    }
    
    static func fromUserDefaults(_ uds: UserDefaults) -> TFLegacyAppConfig? {
        // | This could be nil!
        let lang = uds.string(forKey: "languageKey") ?? "zh"
        return TFLegacyAppConfig(lang: lang)
    }
}

