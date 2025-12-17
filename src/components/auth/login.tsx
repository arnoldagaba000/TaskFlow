import { revalidateLogic, useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/schemas/auth-schema";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import GoogleIcon from "./google-icon";

const Login = () => {
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: { email: "", password: "", rememberMe: false },
        onSubmit: async ({ value }) => {
            await authClient.signIn.email(
                {
                    email: value.email,
                    password: value.password,
                    rememberMe: value.rememberMe,
                },
                {
                    onSuccess: (ctx) => {
                        toast.success(`Welcome back, ${ctx.data.user.name}`);
                        navigate({ to: "/", replace: true });
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                    },
                }
            );
        },
        validators: {
            onSubmit: loginSchema,
        },
        validationLogic: revalidateLogic({
            mode: "change",
            modeAfterSubmission: "change",
        }),
    });

    const handleGoogleSignIn = useCallback(() => {
        authClient.signIn.social({
            provider: "google",
            callbackURL: `${window.location.origin}`,
        });
    }, []);

    const lastMethod = authClient.getLastUsedLoginMethod();

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                    Login with your Google account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <Field>
                            <Button
                                className="relative"
                                onClick={() => handleGoogleSignIn()}
                                type="button"
                                variant="outline"
                            >
                                <GoogleIcon />
                                Login with Google{" "}
                                {lastMethod === "google" && (
                                    <Badge className="absolute -top-2 -right-1">
                                        Last used
                                    </Badge>
                                )}
                            </Button>
                        </Field>

                        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                            Or continue with
                        </FieldSeparator>

                        <form.Field name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor="email">
                                            Email Address
                                        </FieldLabel>
                                        <Input
                                            aria-invalid={isInvalid}
                                            disabled={form.state.isSubmitting}
                                            id={field.name}
                                            name={field.name}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your email address"
                                            type="email"
                                            value={field.state.value}
                                        />
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Field name="password">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">
                                                Password
                                            </FieldLabel>

                                            <Link
                                                className="ml-auto text-xs underline-offset-4 hover:underline"
                                                to="/forgot-password"
                                            >
                                                Forgot your password?
                                            </Link>
                                        </div>
                                        <Input
                                            aria-invalid={isInvalid}
                                            disabled={form.state.isSubmitting}
                                            id={field.name}
                                            name={field.name}
                                            onBlur={field.handleBlur}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your password"
                                            type="password"
                                            value={field.state.value}
                                        />
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Field name="rememberMe">
                            {(field) => (
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={Boolean(field.state.value)}
                                        id={field.name}
                                        name={field.name}
                                        onCheckedChange={(val) =>
                                            field.handleChange(Boolean(val))
                                        }
                                    />
                                    <FieldLabel htmlFor={field.name}>
                                        Remember me
                                    </FieldLabel>
                                </div>
                            )}
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
                                            ? "Logging in..."
                                            : "Login"}
                                    </Button>

                                    <FieldDescription className="text-center">
                                        Don&apos;t have an account?{" "}
                                        <Link to="/register">Sign up</Link>
                                    </FieldDescription>
                                </Field>
                            )}
                        </form.Subscribe>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
};

export default Login;
