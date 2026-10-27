import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Droplets, HeartHandshake, Award } from 'lucide-react';

const ICON_COMPONENTS = [Award, Droplets, ShieldCheck, HeartHandshake];

export const QualityRibbon = () => {
  const { t } = useLanguage();

  return (
    <section className="quality-ribbon-section">
      <div className="container">
        <div className="quality-ribbon-card">
          <div className="quality-items-grid">
            {t.qualityRibbon.items.map((item, idx) => {
              const IconComponent = ICON_COMPONENTS[idx] || Award;
              return (
                <div key={idx} className="quality-item">
                  <div className="quality-icon-wrap">
                    <IconComponent size={20} className="text-amber-700" />
                  </div>
                  <div className="quality-text-wrap">
                    <h4 className="quality-label">{item.label}</h4>
                    <p className="quality-desc">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
