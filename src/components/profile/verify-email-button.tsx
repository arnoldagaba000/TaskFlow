import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const VerifyEmailButton = () => {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    async function handleVerify() {
        try {
            setLoading(true);
            await authClient.sendVerificationEmail(
                { email: "" },
                {
                    onSuccess: () => {
                        toast.success("Verification email sent");
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    },
                }
            );
            setSent(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button disabled={loading || sent} onClick={handleVerify} size="sm">
            {sent ? "Verification sent" : "Verify email"}
        </Button>
    );
};

export default VerifyEmailButton;
