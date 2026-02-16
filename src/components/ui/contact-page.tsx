"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import {
    Check,
    Copy,
    LucideIcon,
    Mail,
    MapPin,
    Building2,
    GithubIcon,
    TwitterIcon,
    LinkedinIcon,
} from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import { LocationMap } from '@/components/ui/expand-map';
import { SecureMessageGateway } from '@/components/ui/secure-message-gateway';
import { useTranslations } from 'next-intl';

const APP_EMAIL = 'info@swarppay.com';

export function ContactPage() {
    const t = useTranslations('contact');
    const socialLinks = [
        {
            icon: GithubIcon,
            href: 'https://github.com/SwarpPay',
            label: t('social.github'),
        },
        {
            icon: TwitterIcon,
            href: 'https://twitter.com/Swarp_Pay',
            label: t('social.twitter'),
        },
        {
            icon: LinkedinIcon,
            href: 'https://linkedin.com/company/swarp-pay',
            label: t('social.linkedin'),
        },
    ];

    return (
        <div className="min-h-screen w-full">
            <div className="mx-auto h-full max-w-6xl lg:border-x border-swarp-blue/20">
                <div
                    aria-hidden
                    className="absolute inset-0 isolate -z-10 opacity-80 contain-strict"
                >
                    <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(0,212,255,0.06)_0,rgba(0,212,255,0.02)_50%,rgba(0,212,255,0.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,212,255,0.04)_0,rgba(0,212,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
                    <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,212,255,0.04)_0,rgba(0,212,255,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
                </div>
                <div className="flex grow flex-col justify-center px-4 md:px-6 pt-32 pb-16">
                    <h1 className="text-4xl font-bold md:text-5xl text-gradient">
                        {t('title')}
                    </h1>
                    <p className="text-gray-400 mb-5 text-base">
                        {t('subtitle')}
                    </p>
                </div>
                <BorderSeparator />
                <div className="grid md:grid-cols-3">
                    <Box
                        icon={Mail}
                        title={t('cards.email.title')}
                        description={t('cards.email.description')}
                    >
                        <a
                            href={`mailto:${APP_EMAIL}`}
                            className="font-mono text-base font-medium tracking-wide hover:underline text-swarp-cyan"
                        >
                            {APP_EMAIL}
                        </a>
                        <CopyButton className="size-6" test={APP_EMAIL} copiedLabel={t('copy.copied')} copyLabel={t('copy.copy')} />
                    </Box>
                    <Box
                        icon={MapPin}
                        title={t('cards.office.title')}
                        description={t('cards.office.description')}
                    >
                        <span className="font-mono text-sm font-medium tracking-wide text-gray-300">
                            Viale Tunisia 22, 20124, Milano (MI), Italy
                        </span>
                    </Box>
                    <Box
                        icon={Building2}
                        title={t('cards.company.title')}
                        description={t('cards.company.description')}
                        className="border-b-0 md:border-r-0"
                    >
                        <div className="space-y-1">
                            <span className="block font-mono text-xs font-medium tracking-wide text-gray-300">
                                VAT: IT14284090967
                            </span>
                            <span className="block font-mono text-xs font-medium tracking-wide text-gray-300">
                                REA: MI-2771688
                            </span>
                            <span className="block font-mono text-xs font-medium tracking-wide text-gray-400">
                                PEC: swarpfoundation@pec.it
                            </span>
                        </div>
                    </Box>
                </div>
                <BorderSeparator />

                {/* Location Map Section */}
                <div className="relative flex h-full min-h-[320px] items-center justify-center py-16">
                    <div
                        className={cn(
                            'z--10 absolute inset-0 size-full',
                            'bg-[radial-gradient(rgba(0,212,255,0.3)_1px,transparent_1px)]',
                            'bg-[size:32px_32px]',
                            '[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent)]',
                        )}
                    />

                    <div className="relative z-1 space-y-6">
                        <div className="text-center mb-8">
                            <p className="text-gray-500 text-xs font-medium tracking-[0.2em] uppercase mb-4">
                                {t('location.eyebrow')}
                            </p>
                            <h2 className="text-2xl font-bold text-gradient">
                                {t('location.title')}
                            </h2>
                        </div>
                        <LocationMap 
                            location={t('location.title')}
                            coordinates="45.4642\u00b0 N, 9.1900\u00b0 E"
                        />
                    </div>
                </div>
                <BorderSeparator />

                <div className="relative flex h-full min-h-[320px] items-center justify-center">
                    <div
                        className={cn(
                            'z--10 absolute inset-0 size-full',
                            'bg-[radial-gradient(rgba(0,212,255,0.3)_1px,transparent_1px)]',
                            'bg-[size:32px_32px]',
                            '[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent)]',
                        )}
                    />

                    <div className="relative z-1 space-y-6">
                        <h2 className="text-center text-3xl font-bold md:text-4xl text-gradient">
                            {t('online.title')}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 justify-center">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-swarp-dark/50 hover:bg-swarp-blue/20 border-swarp-blue/30 flex items-center gap-x-2 rounded-full border px-4 py-2 transition glow-blue"
                                >
                                    <link.icon className="size-4 text-swarp-cyan" />
                                    <span className="font-mono text-sm font-medium tracking-wide text-gray-300">
                                        {link.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <BorderSeparator />

                {/* Secure Message Gateway Section */}
                <div className="relative flex h-full min-h-[400px] items-center justify-center py-16">
                    <div
                        className={cn(
                            'z--10 absolute inset-0 size-full',
                            'bg-[radial-gradient(rgba(157,78,221,0.2)_1px,transparent_1px)]',
                            'bg-[size:32px_32px]',
                            '[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent)]',
                        )}
                    />

                    <div className="relative z-1 w-full max-w-3xl px-4">
                        <div className="text-center mb-8">
                            <p className="text-gray-500 text-xs font-medium tracking-[0.2em] uppercase mb-4">
                                {t('directLine.eyebrow')}
                            </p>
                            <h2 className="text-2xl font-bold text-gradient mb-2">
                                {t('directLine.title')}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {t('directLine.description')}
                            </p>
                        </div>
                        <SecureMessageGateway 
                            title={t('gateway.title')}
                            subtitle={t('gateway.subtitle')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function BorderSeparator() {
    return <div className="absolute inset-x-0 h-px w-full border-b border-swarp-blue/20" />;
}

type ContactBox = React.ComponentProps<'div'> & {
    icon: LucideIcon;
    title: string;
    description: string;
};

function Box({
    title,
    description,
    className,
    children,
    ...props
}: ContactBox) {
    return (
        <div
            className={cn(
                'flex flex-col justify-between border-b md:border-r md:border-b-0 border-swarp-blue/20',
                className,
            )}
        >
            <div className="bg-swarp-dark/40 flex items-center gap-x-3 border-b border-swarp-blue/20 p-4">
                <props.icon className="text-swarp-cyan size-5" strokeWidth={1} />
                <h2 className="text-lg font-medium tracking-wider text-swarp-cyan">
                    {title}
                </h2>
            </div>
            <div className="flex items-center gap-x-2 p-4 py-12">{children}</div>
            <div className="border-t border-swarp-blue/20 p-4">
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
        </div>
    );
}

type CopyButtonProps = ButtonProps & {
    test: string;
    copiedLabel: string;
    copyLabel: string;
};

function CopyButton({
        className,
        variant = 'ghost',
        size = 'sm',
        test,
        copiedLabel,
        copyLabel,
        ...props
}: CopyButtonProps) {
    const [copied, setCopied] = React.useState<boolean>(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(test);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            className={cn('disabled:opacity-100', className)}
            onClick={handleCopy}
            aria-label={copied ? copiedLabel : copyLabel}
            disabled={copied || props.disabled}
            {...props}
        >
            <div
                className={cn(
                    'transition-all',
                    copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                )}
            >
                <Check className="size-3.5 stroke-emerald-500" aria-hidden="true" />
            </div>
            <div
                className={cn(
                    'absolute transition-all',
                    copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                )}
            >
                <Copy aria-hidden="true" className="size-3.5 text-swarp-cyan" />
            </div>
        </Button>
    );
}
