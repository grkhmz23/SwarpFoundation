'use client'
import { Code2, Brain, Shield, Wrench } from 'lucide-react';
import { ElectricCard } from '@/components/ui/electric-card';
import { useTranslations } from 'next-intl';

const serviceIcons = [Code2, Brain, Shield, Wrench];

export function Services() {
  const t = useTranslations('sections.services');
  
  const services = [
    { icon: 0, title: t('items.0.title'), desc: t('items.0.description') },
    { icon: 1, title: t('items.1.title'), desc: t('items.1.description') },
    { icon: 2, title: t('items.2.title'), desc: t('items.2.description') },
    { icon: 3, title: t('items.3.title'), desc: t('items.3.description') },
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-white text-center mb-16">{t('title')}</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {services.map(s => {
            const Icon = serviceIcons[s.icon];
            return (
              <ElectricCard 
                key={s.title}
                color="#39E0CF"
                badge={Icon.name}
                title={s.title}
                description={s.desc}
                width="100%"
                aspectRatio="4 / 5"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
