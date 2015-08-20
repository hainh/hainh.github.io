---
title: "first try"
layout: post
categories: ["cocos2d-x-js", "tutorial"]
tags: ["programming", "training"]
author: hainh
---


##Ok, I'll try this out

~~~ java
public static String getOwner() {
    return "Hainh";
}
~~~

~~~ css
html,
body {
  height: 100%;
  font-size: 17px;
  font-weight: 200;
  font-family: Verdana,san-serif;
}
#wrap {
  min-height: 100%;
  height: auto;
  margin: 0 auto -60px;
  padding: 0 0 60px;
}
#footer {
  height: 60px;
  background-color: #f5f5f5;
  font-size: 14px;
}
#footer .container {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.post-content .title,.post-content .meta-data-post{
	text-align: center;
}
.navbar{
	border-radius: 0;
}
.navbar-brand{
	font-size: 25px;
}
.vert-separator{
	border-left: solid 1px rgba(0,0,0,.1);
	margin: 0 4px;
}
.excerpt{
	margin-top: 7px;
	font-size: 14px;
	padding-bottom: 30px;
}
a.title{
	font-family: Verdana;
	font-weight: 300;
	font-size: 40px;
	color: #444;
}
p.title{
	font-family: Verdana;
	font-weight: 300;
	font-size: 40px;
}
a.title:focus,a.title:hover{
	color: #333;
	text-decoration: none;
}
.introduction{
	margin-top: 40px;
	font-style: italic;
}
.content{
}
.meta-data-post{
	font-style: italic;
	color: #888;
	font-family: "Times New Roman",serif;
	margin-bottom: 30px;
}
.toc{
	margin-top: 30px;
}
.hljs{
	background: transparent;
}
pre{
	padding: 0;
	background-color: #f9f9f9;
	border: 1px dashed #337ab7;
	border-radius: 0;
}
::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
}
::-webkit-scrollbar-track {
    background-color: rgba(220,220,220,0.1);
}
::-webkit-scrollbar-corner {
    background-color: transparent;
}
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
}
~~~

~~~ javascript

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
~~~

~~~ cpp
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include "platform/android/CCJavascriptJavaBridge.h"
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC)
#include "platform/ios/JavaScriptObjCBridge.h"
#endif

USING_NS_CC;
using namespace CocosDenshion;

AppDelegate::AppDelegate()
{
}

AppDelegate::~AppDelegate()
{
    ScriptEngineManager::destroyInstance();
}

void AppDelegate::initGLContextAttrs()
{
    GLContextAttrs glContextAttrs = {8, 8, 8, 8, 24, 8};
    
    GLView::setGLContextAttrs(glContextAttrs);
}

bool AppDelegate::applicationDidFinishLaunching()
{
    // initialize director
    auto director = Director::getInstance();
    auto glview = director->getOpenGLView();
    if(!glview) {
#if(CC_TARGET_PLATFORM == CC_PLATFORM_WP8) || (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT)
        glview = cocos2d::GLViewImpl::create("DogVsCat");
#else
        glview = cocos2d::GLViewImpl::createWithRect("DogVsCat", Rect(0,0,900,640));
#endif
        director->setOpenGLView(glview);
}

    // set FPS. the default value is 1.0/60 if you don't call this
    director->setAnimationInterval(1.0 / 60);
    
    ScriptingCore* sc = ScriptingCore::getInstance();
    sc->addRegisterCallback(register_all_cocos2dx);
    sc->addRegisterCallback(register_cocos2dx_js_core);
    sc->addRegisterCallback(jsb_register_system);

    // extension can be commented out to reduce the package
    sc->addRegisterCallback(register_all_cocos2dx_extension);
    sc->addRegisterCallback(register_all_cocos2dx_extension_manual);

    // chipmunk can be commented out to reduce the package
    sc->addRegisterCallback(jsb_register_chipmunk);
    // opengl can be commented out to reduce the package
    sc->addRegisterCallback(JSB_register_opengl);
   
    sc->addRegisterCallback(MinXmlHttpRequest::_js_register);


#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    sc->addRegisterCallback(JavascriptJavaBridge::_js_register);
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS || CC_TARGET_PLATFORM == CC_PLATFORM_MAC)
    sc->addRegisterCallback(JavaScriptObjCBridge::_js_register);
#endif
    sc->start();    
    sc->runScript("script/jsb_boot.js");
#if defined(COCOS2D_DEBUG) && (COCOS2D_DEBUG > 0)
    sc->enableDebugger();
#endif
    ScriptEngineProtocol *engine = ScriptingCore::getInstance();
    ScriptEngineManager::getInstance()->setScriptEngine(engine);
    ScriptingCore::getInstance()->runScript("main.js");

    return true;
}

// This function will be called when the app is inactive. When comes a phone call,it's be invoked too
void AppDelegate::applicationDidEnterBackground()
{
    auto director = Director::getInstance();
    director->stopAnimation();
    director->getEventDispatcher()->dispatchCustomEvent("game_on_hide");
    SimpleAudioEngine::getInstance()->pauseBackgroundMusic();
    SimpleAudioEngine::getInstance()->pauseAllEffects();    
}
~~~

~~~ csharp
public static delegate bool GetStaticName(string a, int keek, SomeType someType)
{
	someType.GetRef();
	a = keek;
	return false;
}
~~~
