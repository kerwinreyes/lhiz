import { Stack, Typography } from "@mui/material";

const TermsAndAgreement = () => {
    return (
        <>
        <h3>Terms and Agreement</h3>
        <Stack>
        <Typography variant="h6"> 
            By submitting an appointment request through this website, you agree to the following terms and conditions:
        </Typography>
        <div>
            <span><b>Appointments:</b>Appointments are confirmed upon receiving a response from the dressmaker.</span>
        </div>
        <div>
            <span><b>Cancellations:</b> Cancellations with less than [number] days' notice may be subject to a cancellation fee of [percentage] of the estimated service cost.
            </span>
        </div>
        <div>
        <b>Quotes:</b> Quotes will be provided after an initial consultation.
            
        </div>
        <div><b>Estimates:</b> Estimates are subject to change based on the complexity of the project.</div>
        <div><b>Payments:</b>  Payment methods and terms will be discussed during the consultation.</div>
        <div>
            <b>Data Privacy:</b> We respect your privacy. Your information will be used only for appointment scheduling and communication related to your request.
        </div>
        
        </Stack>
      </>
    )
}
export default TermsAndAgreement;