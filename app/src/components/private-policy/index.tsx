import { Button, Dialog, DialogTitle, Divider, IconButton, List, ListItem, Stack, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from "react";

export interface IPrivacyPolicy {
    isOpen: boolean;
    handleClose: () => void
}
const PrivacyPolicy = (props: IPrivacyPolicy) => {
    const intro= 'Eliza ("I") is committed to protecting the privacy of our clients ("you" or "your") in compliance with Republic Act No. 10173 or the Data Privacy Act of 2012.. This Privacy Policy explains how we collect, use, and disclose information collected through our website, including information you provide when booking appointments.'
    const howWeUsetheData= "We use the information we collect solely for the purpose of scheduling and managing your appointments with Eliza. This may include:"
    const customizeListItem = (title: string, description:string, children?: ReactNode) => {
        return (
            <>
            <div className="py-2">
                <Typography variant="subtitle2" align="justify" >
                    <b>{title}{ title ? ": " : ""}</b>{description}
                </Typography>
                { children && children }
                <Divider sx={{ paddingTop: "10px" }} />
            </div>
            </>
        )
    }
    const { isOpen, handleClose } = props
    return (
        <Dialog onClose={handleClose} open={isOpen}>
            <DialogTitle>Privacy Policy for Online Appointment</DialogTitle>
            <IconButton 
                className="text-luxe-brown"
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <CloseIcon />
            </IconButton>
            <Stack className="text-luxe-nude text-xs px-5">
                { customizeListItem("Introduction", intro) }
                { customizeListItem("Information We Collect", "We collect the following information when you book an appointment:",  <List>
                        <ListItem>Name</ListItem>
                        <ListItem>Email Address</ListItem>
                        <ListItem>Contact Number</ListItem>
                        <ListItem>Chosen Services</ListItem>
                        <ListItem>Appointment Date</ListItem>
                    </List>) }
                { customizeListItem("How We Use Your Information", howWeUsetheData, <>
                    <List>
                        <ListItem>
                        Sending appointment confirmation emails
                        </ListItem>
                        <ListItem>
                        Contacting you regarding appointment changes or updates
                        </ListItem>
                        <ListItem>
                        Responding to your inquiries
                        </ListItem>
                    </List>
                    We will not share your information with any third party without your consent, except as necessary to fulfill your appointment or as required by law.
               </>) }
                { customizeListItem("Data Security", "We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction.  However, no internet transmission is completely secure, and we cannot guarantee the security of your information.") }
                { customizeListItem("Your Options", "You have the right to access, correct, or delete your personal information.  You can also opt-out of receiving any communication from us.  To exercise these rights, please contact us at lhiz.dungao@gmail.com.") }
                { customizeListItem("Changes to this Privacy Policy", "We may update this Privacy Policy from time to time.  We will post any changes on this page.  You are encouraged to review this Privacy Policy periodically for any updates.") }
                { customizeListItem("Contact Us", "If you have any questions about this Privacy Policy, please contact us.") }
                { customizeListItem("", "By using our online appointment website to book appointments, you consent to the collection, use, and sharing of your personal information in accordance with this privacy policy. If you do not agree with the terms of this policy, please do not use our online appointment website.")}
                <Button className="rounded-none mb-5 text-luxe-light px-6 py-2 hover:bg-luxe-brown bg-luxe-red" onClick={() => handleClose()}>
                    Continue
                </Button>
            </Stack>
        </Dialog>
    )
}

export default PrivacyPolicy;