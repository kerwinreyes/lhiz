import { useState, useRef, useCallback, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const useReCaptcha = () => {
    const [captchaToken, setCaptchaToken] = useState<string>("");
    const recaptchaRef = useRef<ReCAPTCHA | null>(null)

    const handleReCAPTCHA = useCallback((token: string | null) => {
        setCaptchaToken(token || "")
    }, [])

    useEffect(() =>{
        const refreshCaptcha = () => {
            if(recaptchaRef.current && captchaToken) {
                recaptchaRef.current.reset()
                setCaptchaToken("")
            }
        }
        let tokenRefreshTimeout: NodeJS.Timeout | null = null

        if (captchaToken) {
            tokenRefreshTimeout = setTimeout(refreshCaptcha, 110000);
        }
        return () => {
            if (tokenRefreshTimeout){
                clearTimeout(tokenRefreshTimeout)
            }
        }
    },[captchaToken])

    return { captchaToken, setCaptchaToken, recaptchaRef, handleReCAPTCHA };

}


export default useReCaptcha;