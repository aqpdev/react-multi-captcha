import React, {useEffect, useRef} from "react"

export const captchaTools = {
    reset(){
        if(recaptchaFn.isUsed === true) {
            recaptchaFn.reset();
        }
        if (recaptchaV3Fn.isUsed === true) {
            recaptchaV3Fn.reset();
        }
        if (solvemediaFn.isUsed === true){
            solvemediaFn.reset();
        }
        if (hcaptchaFn.isUsed === true){
            hcaptchaFn.reset();
        }
    },
    solvemediaResponse()
    {
        const adcopy_response = document.getElementById('adcopy_response');
        const adcopy_challenge = document.getElementById('adcopy_challenge');
        return {
            adcopy_challenge: (typeof adcopy_challenge !== "undefined" && adcopy_challenge !== null) ? adcopy_challenge.value : '',
            adcopy_response: (typeof adcopy_response !== "undefined" && adcopy_response !== null) ? adcopy_response.value : '',
        }

    }
}


/*
    Recaptcha v2
 */
const recaptchaFn = {
    isUsed: false,
    siteKey: null,
    ref: null,
    callbackLocal: null,
    theme: null,
    handle(){
        window.grecaptcha.ready(function () {
            window.grecaptcha.render(recaptchaFn.ref, {
                sitekey: recaptchaFn.siteKey,
                callback: (recaptchaFn.callbackLocal !== null) ? recaptchaFn.callbackLocal : null,
                theme: recaptchaFn.theme
            })
        });
    },
    reset(){
        window.grecaptcha.reset();
    }
}
export function RecaptchaV2({siteKey, callback, className, theme})
{
    recaptchaFn.isUsed = true;
    recaptchaFn.siteKey = siteKey;
    recaptchaFn.callbackLocal = callback;
    recaptchaFn.theme = theme;
    const refInput = useRef(null);
    useEffect(() => {
        recaptchaFn.ref = refInput.current;
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
        script.async = "";
        script.addEventListener("load", recaptchaFn.handle);
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, [])
    return (
        <div className={className} ref={refInput}/>
    )
}

/*
    Recaptcha v3
 */
const recaptchaV3Fn = {
    isUsed: false,
    siteKey: null,
    ref: null,
    callbackLocal: null,

    handle(){
        window.grecaptcha.ready(function () {
            window.grecaptcha.execute(recaptchaV3Fn.siteKey, { action: 'submit' }).then(function (token) {
                if(recaptchaV3Fn.callbackLocal !== null){
                    recaptchaV3Fn.callbackLocal(token);
                }
            });
        });
    },
    reset(){
        window.grecaptcha.reset();
    }
}
export function RecaptchaV3({siteKey, callback})
{
    recaptchaV3Fn.isUsed = true;
    recaptchaV3Fn.siteKey = siteKey;
    recaptchaV3Fn.callbackLocal = callback;
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js?render="+siteKey;
        script.async = "";
        script.addEventListener("load", recaptchaV3Fn.handle);
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, [])

    return (
        <></>
    )
}

/*
    SolveMedia
 */
const solvemediaFn = {
    isUsed: false,
    siteKey: null,
    ref: null,
    callbackLocal: null,
    theme: null,
    handle(){
        const fetchData = new Promise(function(resolve) {
            setTimeout(function() {
                resolve("Promise resolved");
            }, 1000);
        });
        fetchData.then((res) => {
            window.ACPuzzle.create(solvemediaFn.siteKey, solvemediaFn.ref.id, {site: "standard", theme: (solvemediaFn.theme === null? '' : solvemediaFn.theme)});
        })
    },
    reset(){
        window.ACPuzzle.reload();
    }
}

export function SolveMedia({siteKey, className, theme})
{
    solvemediaFn.isUsed = true;
    solvemediaFn.siteKey = siteKey;
    solvemediaFn.theme = theme;
    const refInput = useRef(null);
    const server_url = (location.protocol === "https:") ? "https://api-secure.solvemedia.com" : "http://api.solvemedia.com";

    useEffect(() => {
        solvemediaFn.ref = refInput.current;
        const script = document.createElement('script');
        script.src = server_url+"/papi/challenge.ajax";
        script.async = "";
        script.addEventListener("load", solvemediaFn.handle);
        document.body.append(script);
        return () => document.body.removeChild(script);
    }, [])

    return (
        <div className={className} ref={refInput} id="solveMediaContainer"/>
    )
}


/*
    HCaptcha
 */

const hcaptchaFn = {
    isUsed: false,
    siteKey: null,
    ref: null,
    callbackLocal: null,
    theme: null,
    handle(){
        window.hcaptcha.render(hcaptchaFn.ref, {
            sitekey: hcaptchaFn.siteKey,
            theme: hcaptchaFn.theme,
            callback: (hcaptchaFn.callbackLocal !== null) ? hcaptchaFn.callbackLocal : null,
        })
    },
    reset(){
        window.hcaptcha.reset();
    }
}


export function HCaptcha({siteKey, callback, className, theme})
{
    hcaptchaFn.isUsed = true;
    hcaptchaFn.siteKey = siteKey;
    hcaptchaFn.theme = theme;
    hcaptchaFn.callbackLocal = callback;
    const refInput = useRef(null);
    useEffect(() => {
        hcaptchaFn.ref = refInput.current;
        const script = document.createElement('script');
        script.src = "https://js.hcaptcha.com/1/api.js?render=explicit";
        script.async = "";
        script.addEventListener("load", hcaptchaFn.handle);
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, [])

    return (
        <div className={className} ref={refInput}/>
    )
}

export function Captcha({type, siteKey, recaptcha_version, className, callback, theme}) {
    if(type === 'recaptcha') {
        if (parseInt(recaptcha_version) === 3) {
            return (
                <RecaptchaV3 siteKey={siteKey} callback={callback}/>
            )
        } else {
            return (
                <RecaptchaV2 className={className} siteKey={siteKey} callback={callback} theme={theme}/>
            )
        }
    }else if(type === "solvemedia"){
        return(
            <SolveMedia className={className} siteKey={siteKey} theme={theme}/>
        )
    }else if(type === "hcaptcha"){
        return(
            <HCaptcha className={className} siteKey={siteKey} theme={theme} callback={callback}/>
        )
    }else{
        return (
            <></>
        )
    }
}