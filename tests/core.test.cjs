const {test}=require("node:test");const assert=require("node:assert/strict");const C=require("../docs/core.js");const roi={x:0,y:0,w:1,h:1},opts={hue:0,tolerance:20,minS:.1,minV:.1};
test("red hue interval wraps through 360 degrees",()=>{assert.equal(C.hueDistance(359,1),2);assert.equal(C.hueDistance(10,350),20);});
test("neutral pixels have undefined hue",()=>{assert.equal(C.rgbToHsv(130,130,130).h,null);});
test("color coverage uses sample area, mean RGB uses every valid pixel",()=>{const s=C.summarize(Uint8ClampedArray.from([255,0,0,255,0,0,255,255]),2,1,roi,opts);assert.equal(s.coverage,50);assert.equal(s.r,127.5);assert.equal(s.b,127.5);});
test("transparent pixels are excluded",()=>{const s=C.summarize(Uint8ClampedArray.from([255,0,0,0,255,0,0,255]),2,1,roi,opts);assert.equal(s.n,1);assert.equal(s.coverage,100);});
test("a grayscale ROI has no pigment coverage measurement",()=>{const s=C.summarize(Uint8ClampedArray.from([100,100,100,255,200,200,200,255]),2,1,roi,opts);assert.equal(s.grayscale,true);assert.equal(s.coverage,null);assert.equal(s.h,null);});
test("circular mean is near red across the hue boundary",()=>{let s=C.summarize(Uint8ClampedArray.from([255,0,4,255,255,4,0,255]),2,1,roi,opts);assert.ok(s.h<1||s.h>359);});
test("ROI conversion is clamped to actual pixel bounds",()=>{assert.deepEqual(C.roiPixels({x:.99,y:.99,w:4,h:4},10,10),{x:9,y:9,w:1,h:1});});
test("reference camera contrast has explicit dark-pixel handling",()=>{assert.ok(Math.abs(C.logRatio(50,100)-Math.log10(2))<1e-12);assert.equal(C.logRatio(0,100),null);});
test("CSV quotes fields and protects formula-like file names",()=>{let s=C.csv(["file","value"],[{file:'=HYPERLINK("x")',value:-.5}]);assert.ok(s.includes("'=HYPERLINK"));assert.ok(s.endsWith(",-0.5"));});

