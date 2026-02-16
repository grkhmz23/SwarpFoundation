'use client';

import type { LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Globe,
  Wrench,
  Bot,
  Blocks,
  Shield,
  Cpu,
  Cloud,
  Users,
  Plug,
  Database,
  TestTube,
  Palette,
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  short: string;
  desc: string;
  proof: string[];
  timeline: string;
  hasContent: boolean;
  icon: LucideIcon;
  color: 'cyan' | 'purple';
}

export function useServicesData(): ServiceItem[] {
  const t = useTranslations('servicesPage.services');

  return [
    {
      id: 'web-mobile',
      title: t('webMobile.title'),
      short: t('webMobile.short'),
      desc: t('webMobile.desc'),
      proof: [t('webMobile.proof.0'), t('webMobile.proof.1'), t('webMobile.proof.2')],
      timeline: t('webMobile.timeline'),
      hasContent: true,
      icon: Globe,
      color: 'cyan',
    },
    {
      id: 'software-tools',
      title: t('softwareTools.title'),
      short: t('softwareTools.short'),
      desc: t('softwareTools.desc'),
      proof: [t('softwareTools.proof.0'), t('softwareTools.proof.1'), t('softwareTools.proof.2')],
      timeline: t('softwareTools.timeline'),
      hasContent: true,
      icon: Wrench,
      color: 'purple',
    },
    {
      id: 'ai-systems',
      title: t('aiSystems.title'),
      short: t('aiSystems.short'),
      desc: t('aiSystems.desc'),
      proof: [t('aiSystems.proof.0'), t('aiSystems.proof.1'), t('aiSystems.proof.2')],
      timeline: t('aiSystems.timeline'),
      hasContent: true,
      icon: Bot,
      color: 'cyan',
    },
    {
      id: 'blockchain',
      title: t('blockchain.title'),
      short: t('blockchain.short'),
      desc: t('blockchain.desc'),
      proof: [t('blockchain.proof.0'), t('blockchain.proof.1'), t('blockchain.proof.2')],
      timeline: t('blockchain.timeline'),
      hasContent: true,
      icon: Blocks,
      color: 'purple',
    },
    {
      id: 'security',
      title: t('security.title'),
      short: t('security.short'),
      desc: t('security.desc'),
      proof: [t('security.proof.0'), t('security.proof.1'), t('security.proof.2')],
      timeline: t('security.timeline'),
      hasContent: true,
      icon: Shield,
      color: 'cyan',
    },
    {
      id: 'hardware',
      title: t('hardware.title'),
      short: t('hardware.short'),
      desc: t('hardware.desc'),
      proof: [t('hardware.proof.0'), t('hardware.proof.1'), t('hardware.proof.2')],
      timeline: t('hardware.timeline'),
      hasContent: true,
      icon: Cpu,
      color: 'purple',
    },
    {
      id: 'cloud',
      title: t('cloud.title'),
      short: t('cloud.short'),
      desc: t('cloud.desc'),
      proof: [t('cloud.proof.0'), t('cloud.proof.1'), t('cloud.proof.2')],
      timeline: t('cloud.timeline'),
      hasContent: true,
      icon: Cloud,
      color: 'cyan',
    },
    {
      id: 'retainer',
      title: t('engineering.title'),
      short: t('engineering.short'),
      desc: t('engineering.desc'),
      proof: [t('engineering.proof.0'), t('engineering.proof.1'), t('engineering.proof.2')],
      timeline: t('engineering.timeline'),
      hasContent: true,
      icon: Users,
      color: 'purple',
    },
    {
      id: 'integrations',
      title: t('integrations.title'),
      short: t('integrations.short'),
      desc: t('integrations.desc'),
      proof: [t('integrations.proof.0'), t('integrations.proof.1'), t('integrations.proof.2')],
      timeline: t('integrations.timeline'),
      hasContent: true,
      icon: Plug,
      color: 'cyan',
    },
    {
      id: 'data',
      title: t('data.title'),
      short: t('data.short'),
      desc: t('data.desc'),
      proof: [t('data.proof.0'), t('data.proof.1'), t('data.proof.2')],
      timeline: t('data.timeline'),
      hasContent: true,
      icon: Database,
      color: 'purple',
    },
    {
      id: 'qa',
      title: t('qa.title'),
      short: t('qa.short'),
      desc: t('qa.desc'),
      proof: [t('qa.proof.0'), t('qa.proof.1'), t('qa.proof.2')],
      timeline: t('qa.timeline'),
      hasContent: true,
      icon: TestTube,
      color: 'cyan',
    },
    {
      id: 'design',
      title: t('design.title'),
      short: t('design.short'),
      desc: t('design.desc'),
      proof: [t('design.proof.0'), t('design.proof.1'), t('design.proof.2')],
      timeline: t('design.timeline'),
      hasContent: true,
      icon: Palette,
      color: 'purple',
    },
  ];
}
