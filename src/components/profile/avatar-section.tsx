import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { User } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { EditAvatar } from "./edit-avatar";

type Props = {
    user: User;
};

const AvatarSection = ({ user }: Props) => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        defaultValues: {
            image: user.image ?? "",
        },
        validators: {
            onSubmit: ({ value }) => {
                if (!value.image) {
                    return {
                        image: "Please select an image",
                    };
                }
            },
        },
        validationLogic: revalidateLogic({
            mode: "submit",
            modeAfterSubmission: "change",
        }),
        onSubmit: async ({ value }) => {
            await authClient.updateUser(
                {
                    image: value.image,
                },
                {
                    onSuccess: () => {
                        toast.success("Profile picture updated");
                        form.reset();
                        router.invalidate();
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    },
                }
            );
        },
    });

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            form.setFieldValue("image", base64);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="w-1/2 rounded p-2">
            <div>
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field name="image">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Upload image
                                        </FieldLabel>

                                        <Input
                                            accept="image/*"
                                            aria-invalid={isInvalid}
                                            id={field.name}
                                            name={field.name}
                                            onBlur={field.handleBlur}
                                            onChange={handleImageChange}
                                            ref={fileInputRef}
                                            type="file"
                                        />

                                        {/* Preview */}
                                        {field.state.value && (
                                            <div className="relative mt-3 size-20">
                                                <EditAvatar
                                                    className="size-20"
                                                    image={field.state.value}
                                                    name={user.name}
                                                />

                                                <Button
                                                    aria-label="Remove image"
                                                    className="absolute -top-2 -right-2 size-6 rounded-full"
                                                    onClick={() => {
                                                        field.handleChange("");
                                                        if (
                                                            fileInputRef.current
                                                        ) {
                                                            fileInputRef.current.value =
                                                                "";
                                                        }
                                                    }}
                                                    type="button"
                                                    variant="ghost"
                                                >
                                                    <XIcon className="size-4" />
                                                </Button>
                                            </div>
                                        )}

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
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
                                        disabled={state.isSubmitting}
                                        type="submit"
                                    >
                                        {state.isSubmitting
                                            ? "Saving..."
                                            : "Save avatar"}
                                    </Button>
                                </Field>
                            )}
                        </form.Subscribe>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
};

export default AvatarSection;
