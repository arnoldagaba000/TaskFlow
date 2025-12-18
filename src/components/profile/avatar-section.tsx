/** biome-ignore-all lint/nursery/noLeakedRender: No leaked values */

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { memo, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFileReader } from "@/hooks/use-file-reader";
import type { User } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { EditAvatar } from "./edit-avatar";

type AvatarSectionProps = {
    user: User;
};

const AvatarSection = memo(({ user }: AvatarSectionProps) => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { readFileAsBase64 } = useFileReader();

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
                { image: value.image },
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

    const handleImageChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) {
                return;
            }

            try {
                const base64 = await readFileAsBase64(file);
                form.setFieldValue("image", base64);
            } catch {
                toast.error("Failed to read image file");
            }
        },
        [readFileAsBase64, form]
    );

    const handleRemoveImage = useCallback(() => {
        form.setFieldValue("image", "");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, [form]);

    return (
        <div className="w-1/2 rounded p-2">
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
                                                onClick={handleRemoveImage}
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
    );
});

AvatarSection.displayName = "AvatarSection";

export default AvatarSection;
