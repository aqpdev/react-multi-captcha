# react-multi-captcha
React Component to integrate reCAPTCHA v2 and v3, hCaptcha and SolveMedia captcha
## Installation

```bash
npm i react-multi-captcha
```
## Usage

### Global Component:
```javascript
import React, {useEffect, useRef} from "react"
import {Captcha} from "react-multi-captcha";

export function Page()
{
    const callbackFn = (token) => {
        console.log(token);
    }
    return(
        <>
            {/* Recaptcha v2 */}
            <Captcha type="recaptcha"
                     siteKey="recaptcha-site-key"
                     callback={callbackFn}
                     theme="dark"
            />
            {/* Recaptcha v3 */}
            <Captcha type="recaptcha"
                     siteKey="recaptcha-site-key"
                     recaptcha_version={3}
                     callback={callbackFn}
            />
            {/* hCaptcha */}
            <Captcha type="hcaptcha"
                     siteKey="hcaptcha-site-key"
                     recaptcha_version={3}
                     callback={callbackFn}
                     theme="dark"
            />
            {/* SolveMedia */}
            <Captcha type="solvemedia"
                     siteKey="solvemedia-site-key"
                     theme="black"
            />
        </>
    )
}
```

### Single Component
```javascript
import React, {useEffect, useRef} from "react"
import {RecaptchaV2, RecaptchaV3, HCaptcha, SolveMedia} from "react-multi-captcha";

export function Page()
{
    const callbackFn = (token) => {
        console.log(token);
    }
    return(
        <>
            {/* Recaptcha v2 */}
            <RecaptchaV2 siteKey="recaptcha-site-key" 
                         callback={callbackFn} 
                         theme="dark"
            />
            {/* Recaptcha v3 */}
            <RecaptchaV3 siteKey="recaptcha-site-key" 
                         callback={callbackFn}
            />
            {/* hCaptcha */}
            <HCaptcha siteKey="hcaptcha-site-key"
                      callback={callbackFn} 
                      theme="dark"
            />
            {/* SolveMedia */}
            <SolveMedia siteKey="solvemedia-site-key"
                     theme="purple"
            />
        </>
    )
}
```

### Important notes

**Reset Captcha**
```javascript
import React, {useEffect, useRef} from "react"
import {RecaptchaV2, captchaTools} from "react-multi-captcha";

export function Page()
{
    const submitForm = () => {
        captchaTools.reset();
    }
    ...
}
```

**SolveMedia token**

SolveMedia does not work like reCAPTCHA or hCaptcha, so you must get the token and user 
entered data manually:

**Reset Captcha**
```javascript
import React, {useEffect, useRef} from "react"
import {SolveMedia, captchaTools} from "react-multi-captcha";

export function Page()
{
    const submitForm = () => {
        const solvemediaData = captchaTools.solvemediaResponse();
    }
    ...
}
```
In the example above the captchaTools.solvemediaResponse will return a JSON data with the SolveMedia
params to validate the captcha:
```json
    { 
        adcopy_challenge: "2@OcL8CfF6AXq5V79D.or2-J7...Snm34n", 
        adcopy_response: "magic eight ball" 
    }
```