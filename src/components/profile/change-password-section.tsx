import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { updatePasswordSchema } from "@/schemas/auth-schema";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ChangePasswordSection = () => {
    const [open, setOpen] = useState(false);

    const form = useForm({
        defaultValues: { currentPassword: "", newPassword: "" },
        validators: { onSubmit: updatePasswordSchema },
        validationLogic: revalidateLogic({
            mode: "change",
            modeAfterSubmission: "change",
        }),
        onSubmit: async ({ value }) => {
            await authClient.changePassword(
                {
                    currentPassword: value.currentPassword,
                    newPassword: value.newPassword,
                },
                {
                    onSuccess: () => {
                        setOpen(false);
                        toast.success("Password updated successfully");
                    },
                    onError: (ctx) => {
                        toast.error(
                            ctx.error.message ?? "Failed to update password"
                        );
                    },
                }
            );
        },
    });

    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-sm">Password</p>
                <p className="text-muted-foreground text-xs">
                    Update your account password
                </p>
            </div>

            <Dialog
                onOpenChange={(value) => {
                    setOpen(value);
                    if (!value) {
                        form.reset();
                    }
                }}
                open={open}
            >
                <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                        Change password
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Change password</DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup>
                            <form.Field name="currentPassword">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <Label htmlFor={field.name}>
                                                Current password
                                            </Label>
                                            <Input
                                                autoComplete="current-password"
                                                disabled={
                                                    form.state.isSubmitting
                                                }
                                                id={field.name}
                                                name={field.name}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                type="password"
                                                value={field.state.value}
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            <form.Field name="newPassword">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <Label htmlFor={field.name}>
                                                New password
                                            </Label>
                                            <Input
                                                autoComplete="new-password"
                                                disabled={
                                                    form.state.isSubmitting
                                                }
                                                id={field.name}
                                                name={field.name}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                type="password"
                                                value={field.state.value}
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            <form.Subscribe>
                                {(state) => (
                                    <Field>
                                        <Button
                                            aria-busy={state.isSubmitting}
                                            disabled={
                                                state.isSubmitting ||
                                                !state.canSubmit
                                            }
                                            type="submit"
                                        >
                                            {state.isSubmitting
                                                ? "Updating..."
                                                : "Update password"}
                                        </Button>
                                    </Field>
                                )}
                            </form.Subscribe>
                        </FieldGroup>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChangePasswordSection;
