import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

const DeleteAccountSection = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleDelete() {
        try {
            setLoading(true);
            await authClient.deleteUser({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Account deleted");
                        navigate({ to: "/register", replace: true });
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    },
                },
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
                <Button size="sm" variant="destructive">
                    Delete account
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete your account?</DialogTitle>
                </DialogHeader>

                <p className="text-muted-foreground text-sm">
                    This action is permanent and cannot be undone.
                </p>

                <Button
                    disabled={loading}
                    onClick={handleDelete}
                    variant="destructive"
                >
                    {loading ? "Deleting..." : "Confirm delete"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAccountSection;
